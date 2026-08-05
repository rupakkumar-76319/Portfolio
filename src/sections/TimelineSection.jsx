import React, { useEffect, useRef } from "react";
import { timeline } from "../data/portfolioData";
import "./TimelineSection.css";

export default function TimelineSection() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("in-view")
        ),
      { threshold: 0.1 }
    );

    ref.current
      ?.querySelectorAll(".timeline-item")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" className="timeline-section" ref={ref}>
      <div className="container">

        <div className="section-label proj-reveal in-view">
          <span>07</span> Journey
        </div>

        <h2 className="section-title proj-reveal in-view">
          My Learning <span style={{ color: "var(--accent-primary)" }}>Path</span>
        </h2>

        <p className="section-subtitle proj-reveal in-view">
          From building fundamentals to developing intelligent systems —
          my journey into AI/ML engineering.
        </p>

        <div className="timeline">
          {timeline.map((item, i) => (
            <div
              key={i}
              className={`timeline-item ${i % 2 === 0 ? "left" : "right"} ${item.type || 'base'}`}
            >
              <div className="timeline-node"></div>
              
              <div className="timeline-content">

                <span className="timeline-date mono">
                  {item.date}
                </span>

                <h3 className="timeline-title">
                  {item.title}
                </h3>

                <p className="timeline-desc">
                  {item.description}
                </p>

                <div className="timeline-focus">
                  <span className="mono focus-label">Focus:</span>
                  <div className="focus-tags">
                    {item.focus.map((f, idx) => (
                      <span key={idx} className="focus-tag">{f}</span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}