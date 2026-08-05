/* ═══════════════════════════════════════════════════════════════════════════════
 *  LoadingScreen.jsx — "Genesis of Intelligence"
 *
 *  Cinematic loading animation for an AI/ML Engineer portfolio.
 *  Visual narrative told entirely through ~2 000 persistent binary-digit particles:
 *
 *    Scene 1 — Digital Universe    (0 – 2 s)    Full-viewport binary rain
 *    Scene 2 — Intelligence Awaken (2 – 3.8 s)  Spiral vortex convergence
 *    Scene 3 — DNA Formation       (3.8 – 6 s)  Double helix with strand backbones
 *    Scene 4 — Neurons Emerge      (6 – 8 s)    Neural network with soma clusters
 *    Scene 5 — Birth of Mind       (8 – 10 s)   Recognisable brain silhouette
 *    Reveal  —                     (10 – 11 s)  Energy pulse → fade to portfolio
 *
 *  Architecture
 *  ─────────────
 *  •  ONE canvas, ONE requestAnimationFrame loop.
 *  •  Snapshot-based phase transitions: when a phase starts, every particle's
 *     current position is frozen as `snapX/snapY`; a per-particle eased blend
 *     interpolates from that snapshot to the new dynamic target.
 *  •  Staggered arrival within each phase ensures organic wave-like motion.
 *  •  Pre-computed 3-D targets for DNA, neural spread and brain surface;
 *     runtime Y/X-axis rotation + perspective projection each frame.
 *
 *  Performance
 *  ───────────
 *  •  Device-pixel-ratio aware (capped at 2 × for GPU budget).
 *  •  Particle count scales with viewport area (1 500 – 3 500).
 *  •  All allocations happen in initialisation; the draw loop is zero-alloc.
 *  •  Connection counts are capped (900 brain, 120 neural).
 *  •  Pre-rendered soma glow sprite eliminates per-frame gradient creation.
 *
 * ═══════════════════════════════════════════════════════════════════════════════ */

import React, { useEffect, useRef, useState } from 'react';
import './LoadingScreen.css';

// ═══════════════════════════════════════════════════════════════════════════════
// § 1  TIMING
// ═══════════════════════════════════════════════════════════════════════════════

/** When each phase transition begins (seconds). */
const T = Object.freeze({
  CONVERGE: 2.0,
  DNA:      3.8,
  NEURAL:   6.0,
  BRAIN:    8.0,
  REVEAL:   10.0,
  END:      11.2,
});

/** How long the positional blend lasts once a phase starts (seconds). */
const BLEND = Object.freeze({
  converge: 1.6,
  dna:      1.6,
  neural:   1.4,
  brain:    1.6,
  reveal:   1.0,
});

/** Status-bar messages shown during each scene. */
const STATUS_MESSAGES = [
  'INITIALIZING NEURAL SYSTEMS…',      // Scene 1
  'COLLECTING DATA STREAMS…',           // Scene 2
  'ENCODING GENETIC ARCHITECTURE…',     // Scene 3
  'GENERATING NEURAL PATHWAYS…',        // Scene 4
  'ASSEMBLING COGNITIVE FRAMEWORK…',    // Scene 5
  'INTELLIGENCE — ONLINE',              // Reveal
];

// ═══════════════════════════════════════════════════════════════════════════════
// § 2  PURE MATH UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════

const PI  = Math.PI;
const PI2 = PI * 2;
const { sin, cos, sqrt, abs, max, min, floor, random, pow, acos, atan2 } = Math;

/** Linear interpolation. */
function lerp(a, b, t) { return a + (b - a) * t; }

/** Clamp a value to [0, 1]. */
function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

/** Hermite smooth-step. */
function smoothstep(lo, hi, x) {
  const t = clamp01((x - lo) / (hi - lo));
  return t * t * (3 - 2 * t);
}

/* ── Easing curves ─────────────────────────────────────────────────────────── */

/** Cubic ease-in-out — workhorse for most transitions. */
function easeIO3(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - pow(-2 * t + 2, 3) / 2;
}

/** Quartic ease-out — fast attack, gentle settle. */
function easeO4(t) { return 1 - pow(1 - t, 4); }

/** Quintic ease-out — even gentler settle. */
function easeO5(t) { return 1 - pow(1 - t, 5); }

/* ── 3-D transforms ────────────────────────────────────────────────────────── */

/** Rotate (x, y, z) around the Y axis by `a` radians. Returns [x′, y, z′]. */
function rotY(x, y, z, a) {
  const c = cos(a), s = sin(a);
  return [c * x + s * z, y, -s * x + c * z];
}

/** Rotate (x, y, z) around the X axis by `a` radians. Returns [x, y′, z′]. */
function rotX(x, y, z, a) {
  const c = cos(a), s = sin(a);
  return [x, c * y - s * z, s * y + c * z];
}

/**
 * Perspective-project a 3-D point onto 2-D screen space.
 * @returns {{ sx, sy, sc, rz }}  screen x/y, scale factor, raw depth
 */
function proj(x3, y3, z3, cx, cy, fov) {
  const sc = fov / (fov + z3 + 220);
  return { sx: cx + x3 * sc, sy: cy + y3 * sc, sc, rz: z3 };
}

// ═══════════════════════════════════════════════════════════════════════════════
// § 3  BRAIN GEOMETRY — 3-D POINT-CLOUD GENERATION
// ═══════════════════════════════════════════════════════════════════════════════
//
// Anatomy breakdown:
//   • 82 % of points → cerebrum  (two hemispheres, longitudinal fissure)
//   • 12 % of points → cerebellum (posterior-inferior)
//   •  6 % of points → brain stem (inferior cylinder)
//
// The hemispheres use Fibonacci-sphere sampling for even surface coverage,
// then undergo:
//   1.  Lateral shift  → visible fissure between L/R hemispheres
//   2.  Inferior flatten → temporal-lobe / base-of-skull contour
//   3.  Frontal protrude → the frontal-lobe bulge characteristic of brain profile
//   4.  Occipital narrow → slightly tapered posterior
//   5.  Sulcus perturbation → sine-wave wrinkles on the surface
//
// ═══════════════════════════════════════════════════════════════════════════════

function generateBrainTargets(count, sc) {
  const out = new Array(count);
  const golden = (1 + sqrt(5)) / 2;

  const nCereb  = floor(count * 0.82);
  const nCbell   = floor(count * 0.12);
  const nStem    = count - nCereb - nCbell;
  const hemiN    = floor(nCereb / 2);

  let idx = 0;

  /* ── Cerebrum (two hemispheres) ─────────────────────────────────────────── */
  for (let h = 0; h < 2; h++) {
    const side = h === 0 ? -1 : 1;
    for (let i = 0; i < hemiN; i++) {
      const theta = PI2 * i / golden;             // golden-angle spacing
      const phi   = acos(1 - 2 * (i + 0.5) / hemiN);  // uniform latitude

      const sp = sin(phi), cp = cos(phi);
      /* Ellipsoid radii per hemisphere — 50 wide, 64 tall, 56 deep */
      const rx = 50 * sc, ry = 64 * sc, rz = 56 * sc;

      let x = sp * cos(theta) * rx;
      let y = cp * ry;
      let z = sp * sin(theta) * rz;

      /* 1. Hemisphere separation (fissure width ≈ 22 × sc) */
      x = side * abs(x) + side * 11 * sc;

      /* 2. Flatten inferior surface (temporal / base-of-skull) */
      const flatY = 34 * sc;
      if (y > flatY) y = flatY + (y - flatY) * 0.2;

      /* 3. Frontal protrusion */
      if (z > 18 * sc) z *= 1.09;

      /* 4. Occipital narrowing */
      if (z < -18 * sc) x *= 0.91;

      /* 5. Surface wrinkle perturbation (sulci / gyri) */
      const w1 = sin(theta * 7 + y * 0.07 / sc) * 3.5 * sc;
      const w2 = cos(theta * 4 - z * 0.05 / sc) * 2.5 * sc;
      const norm = sqrt(x * x + y * y + z * z) || 1;
      x += (x / norm) * w1;
      y += (y / norm) * w2;
      z += (z / norm) * w1 * 0.35;

      /* Slight depth variation so points aren't all on exact surface */
      const dv = 0.88 + random() * 0.12;

      out[idx++] = {
        x: x * dv,
        y: y * dv - 10 * sc,   // shift cerebrum upward
        z: z * dv,
      };
    }
  }

  /* ── Cerebellum (posterior-inferior rounded mass) ────────────────────────── */
  for (let i = 0; i < nCbell; i++) {
    const theta = PI2 * i / golden;
    const phi   = acos(1 - 2 * (i + 0.5) / nCbell);
    const sp = sin(phi), cp = cos(phi);

    const rx = 34 * sc, ry = 22 * sc, rz = 27 * sc;
    const dv = 0.88 + random() * 0.12;

    out[idx++] = {
      x: sp * cos(theta) * rx * dv,
      y: cp * ry * dv + 48 * sc,          // below cerebrum
      z: sp * sin(theta) * rz * dv - 30 * sc,  // posterior
    };
  }

  /* ── Brain stem (inferior narrow cylinder) ──────────────────────────────── */
  for (let i = 0; i < nStem; i++) {
    const t = i / nStem;
    const angle = t * PI2 * 3;
    const r = (7 + sin(t * PI) * 3) * sc;

    out[idx++] = {
      x: cos(angle) * r,
      y: (58 + t * 28) * sc,         // below cerebellum
      z: sin(angle) * r - 17 * sc,   // slightly posterior
    };
  }

  return out;
}

// ═══════════════════════════════════════════════════════════════════════════════
// § 4  REACT COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function LoadingScreen({ onComplete }) {
  const canvasRef = useRef(null);
  const [progress, setProgress]     = useState(0);
  const [statusText, setStatusText] = useState(STATUS_MESSAGES[0]);
  const [phase, setPhase]           = useState('rain');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    /* ── Responsive canvas sizing (DPR-aware, capped at 2×) ─────────────── */
    let W, H, cx, cy;
    const DPR = min(window.devicePixelRatio || 1, 2);

    function resize() {
      W  = window.innerWidth;
      H  = window.innerHeight;
      cx = W / 2;
      cy = H / 2;
      canvas.width  = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    // ─────────────────────────────────────────────────────────────────────────
    // § 4.1  PARTICLE POOL
    // ─────────────────────────────────────────────────────────────────────────
    //
    // Count scales with viewport area.  Base 2 000 on 1920 × 1080.
    // This single pool lives through every scene — particles never respawn.

    const AREA_BASE = 1920 * 1080;
    const COUNT = min(3500, max(1500,
      floor(2000 * sqrt((W * H) / AREA_BASE))
    ));

    const COL_W   = 22;                          // wider columns prevent overlap
    const numCols = Math.ceil(W / COL_W);
    const FOV     = 500;                          // perspective field-of-view

    /* Pre-allocate flat particle array (zero-alloc during draw) */
    const P = new Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const col   = i % numCols;
      const depth = random();                     // 0 = far  ·  1 = near

      P[i] = {
        /* Identity ──────────────────────────────────────────────────────── */
        char:   random() > 0.5 ? '1' : '0',
        depth,
        col,

        /* Rain state ────────────────────────────────────────────────────── */
        colX:      col * COL_W + COL_W * 0.5 + (random() - 0.5) * 8,
        rainY:     random() * (H + 200) - 100,
        rainSpeed: 60 + depth * 180 + random() * 60,   // px/s  (60–300, faster)

        /* Visual properties ─────────────────────────────────────────────── */
        baseSize:    8 + depth * 8,                    // font-size  8 – 16 px
        flicker:     random() * PI2,
        flickerSpd:  2 + random() * 5,
        fireTimer:   0,                                // neural / brain firing glow

        /* Runtime position (mutated every frame) ────────────────────────── */
        x: 0, y: 0,

        /* Snapshot (frozen at each phase transition) ────────────────────── */
        snapX: 0, snapY: 0,

        /* Pre-computed phase targets ────────────────────────────────────── */
        /* Convergence (spiral parameters) */
        convFinalR: 0, convSpiralAmt: 0,
        /* DNA helix */
        dnaStrand: 0, dnaT: 0,
        dnaBX: 0, dnaBY: 0, dnaBZ: 0,
        /* Neural network */
        neuX: 0, neuY: 0,
        neuCluster: 0,
        /* Brain surface */
        brainX: 0, brainY: 0, brainZ: 0,

        /* Render scratch (avoid GC) */
        _rz: 0, _sc: 1,
      };
    }

    /* Initialise rain positions so frame-0 is valid */
    for (let i = 0; i < COUNT; i++) {
      P[i].x = P[i].colX;
      P[i].y = P[i].rainY;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // § 4.2  STREAM HEADS (column-based Matrix trailing glow)
    // ─────────────────────────────────────────────────────────────────────────
    //
    // Each column has an independent "head" sweep that illuminates particles
    // as it passes.  Creates the classic Matrix stream effect.

    const streamPhase    = new Float32Array(numCols);
    const streamSpeed    = new Float32Array(numCols);
    const streamBright   = new Float32Array(numCols);
    const streamTrailLen = new Float32Array(numCols);
    for (let c = 0; c < numCols; c++) {
      streamPhase[c]    = random() * (H + 400) - 200;
      streamSpeed[c]    = 140 + random() * 260;
      streamBright[c]   = 0.45 + random() * 0.55;
      streamTrailLen[c] = 160 + random() * 220;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // § 4.3  PRE-COMPUTE CONVERGENCE TARGETS
    // ─────────────────────────────────────────────────────────────────────────
    //
    // Spiral parameters: each particle spirals inward with its own rate.
    // Final radius 45–95 px creates a visible energy cluster, not a dot.

    for (let i = 0; i < COUNT; i++) {
      P[i].convFinalR    = 45 + random() * 50;
      P[i].convSpiralAmt = 1.0 + random() * 0.6;     // 1 – 1.6 full rotations
    }

    // ─────────────────────────────────────────────────────────────────────────
    // § 4.4  PRE-COMPUTE DNA HELIX TARGETS
    // ─────────────────────────────────────────────────────────────────────────
    //
    // Two intertwined helices, offset by π.
    // Height ≈ 70 % of viewport;  radius scales with min(W,H).
    // Split: 40 % strand 0, 40 % strand 1, 20 % ambient floaters.

    const DNA_R     = min(W, H) * 0.085;              // ~130 px on 1536 px screen
    const DNA_H     = H * 0.70;                        // helix height
    const DNA_TURNS = 3;                                // complete rotations
    const STRAND_N     = floor(COUNT * 0.40);
    const AMBIENT_START = STRAND_N * 2;

    for (let i = 0; i < COUNT; i++) {
      if (i < STRAND_N) {
        /* ── Strand 0 ────────────────────────────────────────────────────── */
        const t     = i / STRAND_N;
        const theta = t * PI2 * DNA_TURNS;
        P[i].dnaStrand = 0;
        P[i].dnaT      = t;
        P[i].dnaBX     = cos(theta) * DNA_R;
        P[i].dnaBY     = (t - 0.5) * DNA_H;
        P[i].dnaBZ     = sin(theta) * DNA_R;
      } else if (i < AMBIENT_START) {
        /* ── Strand 1 (offset by π) ──────────────────────────────────────── */
        const si    = i - STRAND_N;
        const t     = si / STRAND_N;
        const theta = t * PI2 * DNA_TURNS + PI;
        P[i].dnaStrand = 1;
        P[i].dnaT      = t;
        P[i].dnaBX     = cos(theta) * DNA_R;
        P[i].dnaBY     = (t - 0.5) * DNA_H;
        P[i].dnaBZ     = sin(theta) * DNA_R;
      } else {
        /* ── Ambient floaters (orbit gently around helix) ────────────────── */
        const at    = (i - AMBIENT_START) / (COUNT - AMBIENT_START);
        const angle = random() * PI2;
        const orbR  = DNA_R * (1.5 + random() * 1.5);
        P[i].dnaStrand = 2;
        P[i].dnaT      = at;
        P[i].dnaBX     = cos(angle) * orbR;
        P[i].dnaBY     = (at - 0.5) * DNA_H * 0.8;
        P[i].dnaBZ     = sin(angle) * orbR;
      }
    }

    /* Cross-links (base pairs) at regular intervals along the helix */
    const dnaCross = [];
    const crossStep = max(1, floor(STRAND_N / 50));
    for (let i = 0; i < STRAND_N; i += crossStep) {
      let bestJ = STRAND_N, bestD = 1;
      for (let j = STRAND_N; j < AMBIENT_START; j++) {
        const d = abs(P[j].dnaT - P[i].dnaT);
        if (d < bestD) { bestD = d; bestJ = j; }
      }
      if (bestD < 0.02) {
        dnaCross.push({ a: i, b: bestJ, t: P[i].dnaT });
      }
    }

    /* Sorted strand indices for backbone rendering */
    const strand0Idx = [];
    const strand1Idx = [];
    for (let i = 0; i < STRAND_N; i++) strand0Idx.push(i);
    for (let i = STRAND_N; i < AMBIENT_START; i++) strand1Idx.push(i);
    strand0Idx.sort((a, b) => P[a].dnaT - P[b].dnaT);
    strand1Idx.sort((a, b) => P[a].dnaT - P[b].dnaT);

    // ─────────────────────────────────────────────────────────────────────────
    // § 4.5  PRE-COMPUTE BRAIN TARGETS
    // ─────────────────────────────────────────────────────────────────────────

    const brainSc = min(W, H) / 420;
    const brainPts = generateBrainTargets(COUNT, brainSc);
    for (let i = 0; i < COUNT; i++) {
      P[i].brainX = brainPts[i].x;
      P[i].brainY = brainPts[i].y;
      P[i].brainZ = brainPts[i].z;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // § 4.6  PRE-COMPUTE NEURAL TARGETS (neuron cluster layout)
    // ─────────────────────────────────────────────────────────────────────────
    //
    // Instead of a scaled-up brain shape, we place 30 actual neuron clusters
    // via Poisson-disk distribution across the viewport.  Each cluster has
    // a bright soma centre with particles arranged around it.

    const NEURON_COUNT = 30;
    const neuronCenters = [];
    const neuPad = 100;

    for (let n = 0; n < NEURON_COUNT; n++) {
      let nx, ny, valid;
      let attempts = 0;
      do {
        nx = neuPad + random() * (W - 2 * neuPad);
        ny = neuPad + random() * (H - 2 * neuPad);
        valid = neuronCenters.every(c => {
          const dx = nx - c.x, dy = ny - c.y;
          return dx * dx + dy * dy > 90 * 90;
        });
        attempts++;
      } while (!valid && attempts < 100);
      neuronCenters.push({ x: nx, y: ny });
    }

    /* Assign particles to clusters */
    const PER_NEURON = floor(COUNT / NEURON_COUNT);
    for (let i = 0; i < COUNT; i++) {
      const cluster = min(NEURON_COUNT - 1, floor(i / PER_NEURON));
      const nc      = neuronCenters[cluster];
      const angle   = random() * PI2;
      const dist    = random() * 25;
      P[i].neuX       = nc.x + cos(angle) * dist;
      P[i].neuY       = nc.y + sin(angle) * dist;
      P[i].neuCluster = cluster;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // § 4.7  PRE-COMPUTE CONNECTION NETWORKS
    // ─────────────────────────────────────────────────────────────────────────

    /* ── Neural connections (between cluster centres, with staggered delay) ── */
    const neuralConns = [];
    outer_n:
    for (let i = 0; i < NEURON_COUNT; i++) {
      for (let j = i + 1; j < NEURON_COUNT; j++) {
        const dx = neuronCenters[i].x - neuronCenters[j].x;
        const dy = neuronCenters[i].y - neuronCenters[j].y;
        const d  = sqrt(dx * dx + dy * dy);
        if (d < 300) {
          neuralConns.push({
            fromP: i * PER_NEURON,      // representative particle index
            toP:   j * PER_NEURON,
            dist:  d,
            fp:    random() * PI2,
            delay: random() * 0.45,     // stagger appearance within phase
          });
          if (neuralConns.length >= 120) break outer_n;
        }
      }
    }

    /* ── Brain connections (dense, tight) ──────────────────────────────────── */
    const brainConns = [];
    const brainDistSq = (35 * brainSc) ** 2;        // slightly wider threshold
    outer_b:
    for (let i = 0; i < COUNT; i += 2) {
      for (let j = i + 2; j < COUNT; j += 2) {
        const dx = P[i].brainX - P[j].brainX;
        const dy = P[i].brainY - P[j].brainY;
        const dz = P[i].brainZ - P[j].brainZ;
        if (dx * dx + dy * dy + dz * dz < brainDistSq) {
          brainConns.push({ a: i, b: j, fp: random() * PI2 });
          if (brainConns.length >= 900) break outer_b;  // up from 600
        }
      }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // § 4.8  PRE-RENDERED SOMA GLOW SPRITE
    // ─────────────────────────────────────────────────────────────────────────
    //
    // A small off-screen canvas with a radial gradient.  Drawing this as an
    // image is dramatically cheaper than creating a gradient per-neuron per-frame.

    const SOMA_SIZE = 48;
    const somaCanvas = document.createElement('canvas');
    somaCanvas.width  = SOMA_SIZE;
    somaCanvas.height = SOMA_SIZE;
    const somaCtx = somaCanvas.getContext('2d');
    const somaGrad = somaCtx.createRadialGradient(
      SOMA_SIZE / 2, SOMA_SIZE / 2, 0,
      SOMA_SIZE / 2, SOMA_SIZE / 2, SOMA_SIZE / 2
    );
    somaGrad.addColorStop(0,   'rgba(0,220,255,0.50)');
    somaGrad.addColorStop(0.3, 'rgba(100,60,255,0.20)');
    somaGrad.addColorStop(1,   'rgba(0,0,0,0)');
    somaCtx.fillStyle = somaGrad;
    somaCtx.fillRect(0, 0, SOMA_SIZE, SOMA_SIZE);

    // ─────────────────────────────────────────────────────────────────────────
    // § 4.9  RUNTIME ANIMATION STATE
    // ─────────────────────────────────────────────────────────────────────────

    let elapsed   = 0;
    let lastTime  = performance.now();
    let curPhase  = 'rain';
    let phStart   = 0;             // elapsed at current-phase start
    let rafId     = 0;

    let dnaRot    = 0;             // DNA Y-rotation (radians)
    let brainRot  = 0;             // brain Y-rotation (radians)

    /* ── Camera ────────────────────────────────────────────────────────────── */
    let camZoom = 0.97;

    /* ── Phase transition helper ───────────────────────────────────────────── */
    function transitionTo(ph, t) {
      for (let i = 0; i < COUNT; i++) { P[i].snapX = P[i].x; P[i].snapY = P[i].y; }
      curPhase = ph;
      phStart  = t;
    }

    // ═════════════════════════════════════════════════════════════════════════
    // § 5  DRAW LOOP
    // ═════════════════════════════════════════════════════════════════════════

    function draw(now) {
      const dt = min((now - lastTime) / 1000, 0.05);   // cap to avoid jumps
      lastTime = now;
      elapsed += dt;

      // ── 5.1  Clear + background ────────────────────────────────────────────
      ctx.clearRect(0, 0, W, H);

      const bgG = ctx.createRadialGradient(cx, cy, 0, cx, cy, max(W, H) * 0.72);
      bgG.addColorStop(0,   '#080316');
      bgG.addColorStop(0.5, '#050210');
      bgG.addColorStop(1,   '#020108');
      ctx.fillStyle = bgG;
      ctx.fillRect(0, 0, W, H);

      /* Subtle vignette for depth */
      const vigG = ctx.createRadialGradient(cx, cy, min(W, H) * 0.25, cx, cy, max(W, H) * 0.72);
      vigG.addColorStop(0, 'rgba(0,0,0,0)');
      vigG.addColorStop(1, 'rgba(0,0,0,0.35)');
      ctx.fillStyle = vigG;
      ctx.fillRect(0, 0, W, H);

      // ── 5.2  Camera (subtle zoom + slight pan) ────────────────────────────
      if (elapsed < T.DNA) {
        camZoom = lerp(0.97, 1.0, clamp01(elapsed / T.DNA));
      } else if (elapsed < T.BRAIN) {
        camZoom = lerp(1.0, 1.025, clamp01((elapsed - T.DNA) / (T.BRAIN - T.DNA)));
      } else if (elapsed < T.REVEAL) {
        camZoom = lerp(1.025, 1.0, clamp01((elapsed - T.BRAIN) / 2));
      } else {
        camZoom = lerp(1.0, 1.04, clamp01((elapsed - T.REVEAL) / BLEND.reveal));
      }

      const camOY = elapsed < T.DNA
        ? lerp(0, -4, clamp01(elapsed / T.DNA))
        : lerp(-4, 0, clamp01((elapsed - T.DNA) / 4));

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(camZoom, camZoom);
      ctx.translate(-cx, -cy + camOY);

      // ── 5.3  Phase transition detection ────────────────────────────────────
      if (curPhase === 'rain'     && elapsed >= T.CONVERGE) { transitionTo('converge', elapsed); setPhase('converge'); setStatusText(STATUS_MESSAGES[1]); }
      if (curPhase === 'converge' && elapsed >= T.DNA)      { transitionTo('dna',      elapsed); setPhase('dna');      setStatusText(STATUS_MESSAGES[2]); }
      if (curPhase === 'dna'      && elapsed >= T.NEURAL)   { transitionTo('neural',   elapsed); setPhase('neural');   setStatusText(STATUS_MESSAGES[3]); }
      if (curPhase === 'neural'   && elapsed >= T.BRAIN)    { transitionTo('brain',    elapsed); setPhase('brain');    setStatusText(STATUS_MESSAGES[4]); }
      if (curPhase === 'brain'    && elapsed >= T.REVEAL)   { curPhase = 'reveal'; phStart = elapsed; setPhase('reveal'); setStatusText(STATUS_MESSAGES[5]); setProgress(100); }

      // ── 5.4  Rotation updates ──────────────────────────────────────────────
      dnaRot   += dt * 0.85;
      brainRot += dt * 0.55;                              // faster (was 0.32)
      const brainTilt = sin(elapsed * 0.35) * 0.14;       // slightly more tilt

      // ── 5.5  Blend progress for current phase ─────────────────────────────
      const blendDur = BLEND[curPhase] || 1;
      const rawT     = clamp01((elapsed - phStart) / blendDur);

      // ── 5.6  Progress bar ─────────────────────────────────────────────────
      if (curPhase !== 'reveal') {
        setProgress(floor(clamp01(elapsed / T.REVEAL) * 98));
      }

      // ── 5.6b  Update stream heads (rain phase) ────────────────────────────
      if (curPhase === 'rain' || curPhase === 'converge') {
        for (let c = 0; c < numCols; c++) {
          streamPhase[c] += streamSpeed[c] * dt;
          if (streamPhase[c] > H + 200) streamPhase[c] -= H + 400;
        }
      }

      // ═════════════════════════════════════════════════════════════════════
      // 5.7  COMPUTE PARTICLE POSITIONS
      // ═════════════════════════════════════════════════════════════════════

      for (let i = 0; i < COUNT; i++) {
        const p = P[i];

        /* Character flicker (≈ 2.5 % chance per frame) */
        if (random() < 0.025) p.char = p.char === '0' ? '1' : '0';

        /* Neural/brain fire glow countdown */
        if (p.fireTimer > 0) p.fireTimer--;

        switch (curPhase) {

          // ─── RAIN ──────────────────────────────────────────────────────
          case 'rain': {
            p.rainY += p.rainSpeed * dt;
            if (p.rainY > H + 60) {
              p.rainY -= H + 120;
              p.char = random() > 0.5 ? '1' : '0';
            }
            p.x = p.colX + sin(elapsed * 0.5 + p.flicker) * 2.5;
            p.y = p.rainY;
            break;
          }

          // ─── CONVERGENCE (spiral vortex) ────────────────────────────────
          case 'converge': {
            const dx = p.snapX - cx, dy = p.snapY - cy;
            const initR     = sqrt(dx * dx + dy * dy);
            const initAngle = atan2(dy, dx);
            const distNorm  = clamp01(initR / max(W, H));

            /* Edge particles converge FIRST (inward ripple) */
            const stag = (1 - distNorm) * 0.30;
            const st = clamp01((rawT - stag) / (1 - stag));
            const e  = easeIO3(st);

            /* Spiral: angle rotates while radius shrinks */
            const finalR = min(p.convFinalR, initR * 0.08 + 5);
            const angle  = initAngle + e * PI2 * p.convSpiralAmt;
            const radius = lerp(initR, finalR, e);

            p.x = cx + cos(angle) * radius;
            p.y = cy + sin(angle) * radius;
            break;
          }

          // ─── DNA HELIX ─────────────────────────────────────────────────
          case 'dna': {
            /* Rotate helix base coordinates */
            const [rx, ry, rz] = rotY(p.dnaBX, p.dnaBY, p.dnaBZ, dnaRot);
            /* Slight X tilt for more dynamic 3-D feel */
            const tilt = sin(elapsed * 0.25) * 0.12;
            const [rx2, ry2, rz2] = rotX(rx, ry, rz, tilt);
            const pr = proj(rx2, ry2, rz2, cx, cy, FOV);

            /* Stagger: top of helix arrives first, bottom last */
            const stag = p.dnaStrand === 2
              ? 0.15 + p.dnaT * 0.15       // ambient floaters arrive slightly later
              : p.dnaT * 0.30;
            const st = clamp01((rawT - stag) / (1 - stag));
            const e  = easeO4(st);

            p.x = lerp(p.snapX, pr.sx, e);
            p.y = lerp(p.snapY, pr.sy, e);
            p._rz = rz2;
            p._sc = pr.sc;
            break;
          }

          // ─── NEURAL NETWORK (2-D cluster positions) ─────────────────────
          case 'neural': {
            /* Gentle drift for organic feel */
            const drift  = sin(elapsed * 0.6 + i * 0.015) * 3;
            const driftY = sin(elapsed * 0.4 + i * 0.02)  * 2;
            const tx = p.neuX + drift;
            const ty = p.neuY + driftY;

            const e = easeIO3(rawT);
            p.x = lerp(p.snapX, tx, e);
            p.y = lerp(p.snapY, ty, e);
            p._rz = 0;
            p._sc = 1;
            break;
          }

          // ─── BRAIN ─────────────────────────────────────────────────────
          case 'brain': {
            const breathe = 1 + sin(elapsed * 1.4) * 0.035;   // 3.5 % (was 1.8 %)
            const bx = p.brainX * breathe;
            const by = p.brainY * breathe;
            const bz = p.brainZ * breathe;

            let [rx, ry, rz] = rotY(bx, by, bz, brainRot);
            /* gentle tilt oscillation */
            const ct = cos(brainTilt), st2 = sin(brainTilt);
            const ry2 = ct * ry - st2 * rz;
            const rz2 = st2 * ry + ct * rz;

            const pr = proj(rx, ry2, rz2, cx, cy, FOV);

            /* Stagger: front of brain (positive z) forms first */
            const stag = clamp01((p.brainZ + 60 * brainSc) / (120 * brainSc)) * 0.25;
            const ste = clamp01((rawT - stag) / (1 - stag));
            const e = easeO4(ste);

            p.x = lerp(p.snapX, pr.sx, e);
            p.y = lerp(p.snapY, pr.sy, e);
            p._rz = rz2;
            p._sc = pr.sc;
            break;
          }

          // ─── REVEAL ────────────────────────────────────────────────────
          case 'reveal': {
            const revT = clamp01((elapsed - phStart) / BLEND.reveal);
            const push = easeO4(revT) * 120;              // 120 px (was 35)

            const breathe = 1 + sin(elapsed * 1.4) * 0.035;
            const bx = p.brainX * breathe;
            const by = p.brainY * breathe;
            const bz = p.brainZ * breathe;

            let [rx, ry, rz] = rotY(bx, by, bz, brainRot);
            const ct = cos(brainTilt), st2 = sin(brainTilt);
            const ry2 = ct * ry - st2 * rz;
            const rz2 = st2 * ry + ct * rz;

            /* Push particles outward along their radial direction */
            const n = sqrt(rx * rx + ry2 * ry2 + rz2 * rz2) || 1;
            const prj = proj(rx + (rx / n) * push, ry2 + (ry2 / n) * push, rz2 + (rz2 / n) * push, cx, cy, FOV);
            p.x   = prj.sx;
            p.y   = prj.sy;
            p._rz = rz2;
            p._sc = prj.sc;
            break;
          }
        } // end switch
      } // end particle loop

      // ═════════════════════════════════════════════════════════════════════
      // 5.8  RENDER CONNECTIONS (drawn BEHIND particles)
      // ═════════════════════════════════════════════════════════════════════

      /* ── DNA strand backbone lines (NEW — makes helix instantly recognisable) */
      if (curPhase === 'dna') {
        const bbAlpha = rawT > 0.25 ? min(1, (rawT - 0.25) / 0.30) : 0;
        if (bbAlpha > 0.01) {
          ctx.lineWidth = 1.8;

          /* Strand 0 backbone (cyan) */
          ctx.beginPath();
          const step0 = max(1, floor(strand0Idx.length / 200));
          for (let k = 0; k < strand0Idx.length; k += step0) {
            const p = P[strand0Idx[k]];
            if (k === 0) ctx.moveTo(p.x, p.y);
            else         ctx.lineTo(p.x, p.y);
          }
          ctx.strokeStyle = `rgba(0,212,255,${(bbAlpha * 0.40).toFixed(3)})`;
          ctx.stroke();

          /* Strand 1 backbone (purple) */
          ctx.beginPath();
          const step1 = max(1, floor(strand1Idx.length / 200));
          for (let k = 0; k < strand1Idx.length; k += step1) {
            const p = P[strand1Idx[k]];
            if (k === 0) ctx.moveTo(p.x, p.y);
            else         ctx.lineTo(p.x, p.y);
          }
          ctx.strokeStyle = `rgba(160,80,255,${(bbAlpha * 0.40).toFixed(3)})`;
          ctx.stroke();
        }
      }

      /* ── DNA cross-links (base pairs — thicker, no unreadable labels) ───── */
      if (curPhase === 'dna') {
        const cAlpha = rawT > 0.35 ? min(1, (rawT - 0.35) / 0.30) : 0;
        if (cAlpha > 0.005) {
          ctx.lineWidth = 1.5;                           // thicker (was 0.8)
          for (let k = 0; k < dnaCross.length; k++) {
            const lk = dnaCross[k];
            const pa = P[lk.a], pb = P[lk.b];

            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.strokeStyle = `rgba(0,255,180,${(cAlpha * 0.35).toFixed(3)})`;
            ctx.stroke();
          }
        }
      }

      /* ── Neural connections (progressive growth + traveling impulses) ───── */
      if (curPhase === 'neural' || (curPhase === 'brain' && rawT < 0.25)) {
        const phaseVis = curPhase === 'neural' ? 1 : max(0, 1 - rawT / 0.25);

        if (phaseVis > 0.005) {
          ctx.lineWidth = 1.2;                           // much thicker (was 0.55)
          for (let k = 0; k < neuralConns.length; k++) {
            const cn = neuralConns[k];

            /* Progressive appearance: each connection has a staggered delay */
            const connT = curPhase === 'neural'
              ? clamp01((rawT - cn.delay) / (0.8 - cn.delay))
              : 1;
            if (connT <= 0) continue;

            const pa = P[cn.fromP], pb = P[cn.toP];

            /* Connection line grows toward destination */
            const endX = lerp(pa.x, pb.x, connT);
            const endY = lerp(pa.y, pb.y, connT);

            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = `rgba(0,180,255,${(phaseVis * 0.25).toFixed(3)})`;
            ctx.stroke();

            /* Traveling impulse (only on fully grown connections) */
            if (connT > 0.8) {
              const fire = 0.3 + 0.7 * sin(elapsed * 4.5 + cn.fp);
              if (fire > 0.55) {
                const pt = ((elapsed * 2.0 + cn.fp) % 1);
                const px = lerp(pa.x, pb.x, pt);
                const py = lerp(pa.y, pb.y, pt);
                ctx.beginPath();
                ctx.arc(px, py, 3, 0, PI2);              // 3 px (was 1.6)
                ctx.fillStyle = `rgba(0,255,180,${(phaseVis * 0.6).toFixed(3)})`;
                ctx.fill();
              }
            }
          }

          /* ── Soma glow at each neuron cluster centre ─────────────────────── */
          if (curPhase === 'neural') {
            const somaVis = rawT > 0.15 ? min(1, (rawT - 0.15) / 0.35) : 0;
            if (somaVis > 0.01) {
              ctx.globalAlpha = somaVis;
              for (let n = 0; n < NEURON_COUNT; n++) {
                const repP = P[n * PER_NEURON];
                ctx.drawImage(
                  somaCanvas,
                  repP.x - SOMA_SIZE / 2,
                  repP.y - SOMA_SIZE / 2
                );
              }
              ctx.globalAlpha = 1;
            }
          }
        }
      }

      /* ── Brain connections (tight synaptic network) ─────────────────────── */
      if (curPhase === 'brain' || curPhase === 'reveal') {
        const bpT = curPhase === 'brain' ? rawT : 1;
        const connVis = bpT > 0.20 ? min(1, (bpT - 0.20) / 0.40) : 0;
        const revFade = curPhase === 'reveal'
          ? max(0, 1 - clamp01((elapsed - phStart) / BLEND.reveal))
          : 1;
        const vis = connVis * revFade;

        if (vis > 0.005) {
          ctx.lineWidth = 0.7;                           // was 0.4
          for (let k = 0; k < brainConns.length; k++) {
            const cn = brainConns[k];
            const pa = P[cn.a], pb = P[cn.b];
            const fire = 0.25 + 0.75 * sin(elapsed * 5 + cn.fp);

            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.strokeStyle = `rgba(90,130,255,${(vis * fire * 0.15).toFixed(4)})`;
            ctx.stroke();                                // alpha 0.15 (was 0.08)

            /* Bright synapse pulse */
            if (fire > 0.78) {
              const pt = ((elapsed * 3 + cn.fp) % 1);
              ctx.beginPath();
              ctx.arc(
                pa.x + (pb.x - pa.x) * pt,
                pa.y + (pb.y - pa.y) * pt,
                1.8, 0, PI2                              // larger (was 1.3)
              );
              ctx.fillStyle = `rgba(0,220,255,${(vis * 0.50).toFixed(3)})`;
              ctx.fill();
            }
          }
        }
      }

      // ═════════════════════════════════════════════════════════════════════
      // 5.9  RENDER PARTICLES
      // ═════════════════════════════════════════════════════════════════════
      //
      // Each particle is drawn as a single binary character.
      // Colour, alpha, size, and optional glow vary by scene.

      for (let i = 0; i < COUNT; i++) {
        const p = P[i];

        /* Skip particles far off-screen */
        if (p.x < -60 || p.x > W + 60 || p.y < -60 || p.y > H + 60) continue;

        const flick = 0.55 + 0.45 * sin(elapsed * p.flickerSpd + p.flicker);
        let alpha = 0, size = 0, hue = 0, sat = 90, lit = 50;
        let glow  = false;
        let glowColor = '';

        switch (curPhase) {

          /* ── RAIN (stream-head trailing glow) ──────────────────────────── */
          case 'rain': {
            const headY = streamPhase[p.col];
            let dist = headY - p.y;
            /* Handle wrap-around */
            if (dist < -(H * 0.5)) dist += H + 400;
            if (dist >   H * 0.5)  dist -= H + 400;

            const trailLen = streamTrailLen[p.col];
            const colBright = streamBright[p.col];

            size = p.baseSize;
            hue  = 140 + sin(elapsed + i * 0.02) * 10;
            sat  = 85;

            if (dist >= -12 && dist < 0) {
              /* AT the head — brightest character */
              alpha = 0.95 * colBright;
              lit   = 92;
              sat   = 15;
              glow  = true;
              glowColor = 'rgba(0,255,120,0.7)';
            } else if (dist >= 0 && dist < trailLen) {
              /* In the trail — quadratic falloff for dramatic fading */
              const fade   = 1 - dist / trailLen;
              const fadeSq = fade * fade;
              alpha = (0.06 + p.depth * 0.15 + fadeSq * 0.65) * colBright;
              lit   = 28 + fadeSq * 35 + p.depth * 18;
            } else {
              /* Out of trail — very dim ambient */
              alpha = (0.03 + p.depth * 0.08) * colBright * flick;
              lit   = 22 + p.depth * 12;
            }
            break;
          }

          /* ── CONVERGENCE (spiral inward) ───────────────────────────────── */
          case 'converge': {
            const e = easeIO3(rawT);
            alpha = (0.15 + p.depth * 0.50) * flick;
            size  = p.baseSize * lerp(1, 0.85, e);
            hue   = lerp(140, 195, e);                   // green → cyan
            lit   = 35 + p.depth * 22;

            /* Particles near centre glow brighter */
            const dc = sqrt((p.x - cx) ** 2 + (p.y - cy) ** 2);
            if (dc < 90) {
              const prox = 1 - dc / 90;
              alpha = min(1, alpha + prox * 0.4);
              lit  += prox * 25;
            }
            break;
          }

          /* ── DNA ────────────────────────────────────────────────────────── */
          case 'dna': {
            const d01 = (p._rz + 220) / 440;
            alpha = (0.18 + d01 * 0.62) * flick;
            size  = max(7, p.baseSize * p._sc);

            if (p.dnaStrand === 0) {
              hue = 192;                                 // cyan
            } else if (p.dnaStrand === 1) {
              hue = 265;                                 // purple
            } else {
              hue = 210;                                 // ambient: blue
              alpha *= 0.35;                             // dim ambient particles
            }
            lit = 38 + d01 * 24;
            break;
          }

          /* ── NEURAL ────────────────────────────────────────────────────── */
          case 'neural': {
            alpha = (0.20 + p.depth * 0.45) * flick;
            size  = p.baseSize;
            hue   = 255 + sin(i * 0.08) * 18;           // violet range
            sat   = 78;
            lit   = 42 + p.depth * 22;

            /* Random firing glow */
            if (p.fireTimer > 0) { alpha = min(1, alpha * 2.2); lit += 25; glow = true; glowColor = 'rgba(0,255,200,0.5)'; }
            else if (random() < 0.004) { p.fireTimer = floor(random() * 10) + 4; }
            break;
          }

          /* ── BRAIN ─────────────────────────────────────────────────────── */
          case 'brain': {
            const d01  = (p._rz + 220) / 440;
            const pulse = 0.65 + 0.35 * sin(elapsed * 2.8 + p.flicker);
            alpha = (0.22 + d01 * 0.58) * flick * pulse;
            size  = max(7, p.baseSize * p._sc);
            hue   = 218 + d01 * 42;                      // deep blue → cyan
            sat   = 82;
            lit   = 42 + d01 * 20 + pulse * 6;

            if (p.fireTimer > 0) { alpha = min(1, alpha * 2); lit += 20; glow = true; glowColor = `rgba(0,230,255,0.4)`; }
            else if (random() < 0.004) { p.fireTimer = floor(random() * 12) + 4; }
            break;
          }

          /* ── REVEAL ────────────────────────────────────────────────────── */
          case 'reveal': {
            const revT = clamp01((elapsed - phStart) / BLEND.reveal);
            const d01  = (p._rz + 220) / 440;
            const pulse = 0.7 + 0.3 * sin(elapsed * 2.8 + p.flicker);
            alpha = max(0, (0.3 + d01 * 0.5) * pulse * (1 - revT * 0.85));
            size  = max(7, p.baseSize * p._sc);
            hue   = 218 + d01 * 42;
            sat   = max(0, 80 - revT * 40);
            lit   = 48 + revT * 25;
            break;
          }
        }

        /* ── Draw character ──────────────────────────────────────────────── */
        if (alpha < 0.01) continue;

        ctx.globalAlpha = alpha;
        ctx.fillStyle   = `hsl(${hue},${sat}%,${lit}%)`;
        ctx.font        = `${size | 0}px "JetBrains Mono",monospace`;

        if (glow) {
          ctx.shadowColor = glowColor;
          ctx.shadowBlur  = 10;
        }

        ctx.fillText(p.char, p.x, p.y);

        if (glow) { ctx.shadowBlur = 0; }
      }

      ctx.globalAlpha = 1;

      // ═════════════════════════════════════════════════════════════════════
      // 5.10  AMBIENT EFFECTS (rendered ON TOP of particles)
      // ═════════════════════════════════════════════════════════════════════

      /* ── Convergence pulse (central glow) ──────────────────────────────── */
      if (curPhase === 'converge') {
        const breathe = 0.65 + 0.35 * sin(elapsed * 3.2);
        const vis = easeIO3(rawT) * 0.25 * breathe;
        const pg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 150);
        pg.addColorStop(0, `rgba(0,200,255,${vis.toFixed(3)})`);
        pg.addColorStop(0.5, `rgba(80,40,200,${(vis * 0.25).toFixed(3)})`);
        pg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = pg;
        ctx.fillRect(0, 0, W, H);

        /* Pulsing ring around convergence point */
        const ringR = 60 + sin(elapsed * 2.5) * 15;
        ctx.beginPath();
        ctx.arc(cx, cy, ringR, 0, PI2);
        ctx.strokeStyle = `rgba(0,200,255,${(vis * 0.6).toFixed(3)})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      /* ── DNA glow ───────────────────────────────────────────────────────── */
      if (curPhase === 'dna') {
        const vis = rawT > 0.3 ? min(1, (rawT - 0.3) / 0.45) * 0.15 : 0;
        if (vis > 0.002) {
          const dg = ctx.createRadialGradient(cx, cy, 0, cx, cy, DNA_H * 0.45);
          dg.addColorStop(0, `rgba(0,190,255,${vis.toFixed(4)})`);
          dg.addColorStop(0.5, `rgba(100,40,220,${(vis * 0.3).toFixed(4)})`);
          dg.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = dg;
          ctx.fillRect(0, 0, W, H);
        }
      }

      /* ── Brain glow + energy arcs ───────────────────────────────────────── */
      if (curPhase === 'brain' || curPhase === 'reveal') {
        const bpT = curPhase === 'brain' ? rawT : 1;
        const vis = bpT > 0.35 ? min(1, (bpT - 0.35) / 0.40) : 0;
        const revFade = curPhase === 'reveal'
          ? max(0, 1 - clamp01((elapsed - phStart) / BLEND.reveal))
          : 1;
        const gVis = vis * revFade;

        if (gVis > 0.005) {
          const breathe = 0.65 + 0.35 * sin(elapsed * 1.8);
          const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200 * brainSc);
          bg.addColorStop(0,   `rgba(100,50,255,${(gVis * breathe * 0.18).toFixed(4)})`);
          bg.addColorStop(0.4, `rgba(0,150,255,${(gVis * breathe * 0.08).toFixed(4)})`);
          bg.addColorStop(1,   'rgba(0,0,0,0)');
          ctx.fillStyle = bg;
          ctx.fillRect(0, 0, W, H);

          /* Energy arcs — thicker and brighter, 3 pairs */
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(elapsed * 0.14);
          const arcR = 185 * brainSc + sin(elapsed) * 8;
          ctx.lineWidth = 2;                             // thicker (was 1.3)

          ctx.beginPath();
          ctx.arc(0, 0, arcR, 0, PI * 0.35);
          ctx.strokeStyle = `rgba(0,200,255,${(gVis * 0.25).toFixed(3)})`;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(0, 0, arcR, PI, PI * 1.35);
          ctx.strokeStyle = `rgba(100,50,255,${(gVis * 0.25).toFixed(3)})`;
          ctx.stroke();

          /* Second arc pair */
          ctx.rotate(PI * 0.33);
          ctx.beginPath();
          ctx.arc(0, 0, arcR * 0.92, 0, PI * 0.28);
          ctx.strokeStyle = `rgba(0,255,180,${(gVis * 0.15).toFixed(3)})`;
          ctx.stroke();

          /* Third arc pair */
          ctx.beginPath();
          ctx.arc(0, 0, arcR * 0.85, PI * 0.6, PI * 0.82);
          ctx.strokeStyle = `rgba(0,200,255,${(gVis * 0.12).toFixed(3)})`;
          ctx.stroke();

          ctx.restore();
        }
      }

      // ═════════════════════════════════════════════════════════════════════
      // 5.11  REVEAL — energy pulse + smooth fade
      // ═════════════════════════════════════════════════════════════════════

      if (curPhase === 'reveal') {
        const revT = clamp01((elapsed - phStart) / BLEND.reveal);

        /* Expanding energy ring */
        const ringR     = easeO4(revT) * max(W, H) * 0.85;
        const ringAlpha = max(0, 1 - revT * 1.4) * 0.55;
        if (ringAlpha > 0.005) {
          ctx.lineWidth = 2.5 + revT * 8;

          ctx.beginPath();
          ctx.arc(cx, cy, ringR, 0, PI2);
          ctx.strokeStyle = `rgba(0,200,255,${ringAlpha.toFixed(3)})`;
          ctx.stroke();

          /* Inner secondary ring */
          ctx.beginPath();
          ctx.arc(cx, cy, ringR * 0.65, 0, PI2);
          ctx.strokeStyle = `rgba(120,60,255,${(ringAlpha * 0.50).toFixed(3)})`;
          ctx.lineWidth = 1.5 + revT * 4;
          ctx.stroke();
        }

        /* Central glow bloom */
        if (revT < 0.55) {
          const gT = revT / 0.55;
          const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, max(W, H) * 0.45);
          cg.addColorStop(0, `rgba(0,180,255,${(gT * 0.35).toFixed(3)})`);
          cg.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = cg;
          ctx.fillRect(0, 0, W, H);
        }

        /* Smooth fade to dark (matched to portfolio bg #030609) */
        if (revT > 0.40) {
          const fadeVal = easeIO3((revT - 0.40) / 0.60);
          ctx.fillStyle = `rgba(3,6,9,${fadeVal.toFixed(3)})`;
          ctx.fillRect(0, 0, W, H);
        }

        if (revT >= 1) {
          ctx.restore();
          cancelAnimationFrame(rafId);
          onComplete?.();
          return;
        }
      }

      ctx.restore();   // ── undo camera transform

      // ═════════════════════════════════════════════════════════════════════
      // 5.12  SCREEN-SPACE OVERLAYS (not affected by camera)
      // ═════════════════════════════════════════════════════════════════════

      /* ── Scanlines (rain + early convergence only) ─────────────────────── */
      if (elapsed < T.DNA + 0.5) {
        const slAlpha = elapsed < T.CONVERGE
          ? 0.013
          : 0.013 * max(0, 1 - (elapsed - T.CONVERGE) / 2);
        if (slAlpha > 0.001) {
          ctx.fillStyle = `rgba(0,255,120,${slAlpha.toFixed(4)})`;
          for (let sy = 0; sy < H; sy += 3) ctx.fillRect(0, sy, W, 1);
        }
      }

      /* ── HUD corner brackets ───────────────────────────────────────────── */
      if (curPhase !== 'reveal') {
        const bs = 20, bo = 26;
        ctx.strokeStyle = 'rgba(0,200,255,0.18)';
        ctx.lineWidth = 1.5;

        const corners = [[bo, bo, 1, 1], [W - bo, bo, -1, 1], [bo, H - bo, 1, -1], [W - bo, H - bo, -1, -1]];
        for (let c = 0; c < 4; c++) {
          const [bx, by, sx, sy] = corners[c];
          ctx.beginPath();
          ctx.moveTo(bx, by + sy * bs);
          ctx.lineTo(bx, by);
          ctx.lineTo(bx + sx * bs, by);
          ctx.stroke();
        }

        /* Dashed crosshair — very subtle depth marker */
        ctx.strokeStyle = 'rgba(0,200,255,0.04)';
        ctx.lineWidth = 0.5;
        ctx.setLineDash([5, 10]);
        ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
        ctx.setLineDash([]);
      }

      rafId = requestAnimationFrame(draw);
    }

    // ── Start the loop ──────────────────────────────────────────────────────
    rafId = requestAnimationFrame(draw);

    // ── Status text timer cascade ───────────────────────────────────────────
    const timers = [
      setTimeout(() => setStatusText(STATUS_MESSAGES[1]), T.CONVERGE * 1000),
      setTimeout(() => setStatusText(STATUS_MESSAGES[2]), T.DNA      * 1000),
      setTimeout(() => setStatusText(STATUS_MESSAGES[3]), T.NEURAL   * 1000),
      setTimeout(() => setStatusText(STATUS_MESSAGES[4]), T.BRAIN    * 1000),
      setTimeout(() => setStatusText(STATUS_MESSAGES[5]), T.REVEAL   * 1000),
    ];

    // ── Cleanup ─────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      timers.forEach(clearTimeout);
      window.removeEventListener('resize', resize);
    };
  }, [onComplete]);

  // ═══════════════════════════════════════════════════════════════════════════
  // § 6  JSX
  // ═══════════════════════════════════════════════════════════════════════════

  return (
    <div className={`loading-screen ${phase === 'reveal' ? 'fading' : ''}`}>
      <canvas ref={canvasRef} className="loading-canvas" />

      {/* ── Name + role ──────────────────────────────────────────────────── */}
      <div className="loading-hud">
        <div className="loading-name">
          <span className="name-bracket">&lt;</span>
          RUPAK KUMAR
          <span className="name-bracket">/&gt;</span>
        </div>
        <div className="loading-role">AI / ML ENGINEER</div>
      </div>

      {/* ── Bottom status bar ────────────────────────────────────────────── */}
      <div className="loading-footer">
        <div className="loading-status">
          <span className="status-ping" />
          <span className="loading-status-text">{statusText}</span>
        </div>
        <div className="loading-progress-wrap">
          <div className="loading-progress-bar">
            <div
              className="loading-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="loading-progress-num">
            {String(progress).padStart(3, '0')}%
          </span>
        </div>
      </div>
    </div>
  );
}
