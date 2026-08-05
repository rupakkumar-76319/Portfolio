// ============================================================
// RUPAK KUMAR — PORTFOLIO DATA
// ============================================================

export const personalInfo = {
  name: "Rupak Kumar",
  title: "AI / ML Engineer",
  subtitle: "Building Intelligent Data Systems",
  photo: "/images/profile/RRR.jpg",
  email: "rupakkumar76319@gmail.com",
  github: "https://github.com/rupakkumar-76319",
  linkedin: "https://www.linkedin.com/in/rupak-kumar-76319-24f2001886/",
  resumeUrl: "/pdf_models/Resume/Resume_MLDS.pdf",
}

export const aboutText = {
  intro:
    "I am a B.Tech student in Electronics and Communication Engineering at Assam University, Silchar, and a BS in Data Science student at IIT Madras.",

  story:
    "I enjoy working with Artificial Intelligence, Machine Learning, and  Data Science because they allow me to solve real problems using data. I like understanding how things work, experimenting with different approaches, and building projects that help me learn while creating something useful. Every project I build teaches me something new and pushes me to improve as an AI engineer.",

  philosophy:
    "I believe learning AI is more than training models. I focus on understanding the complete process—from working with data and building models to deploying them as real applications. My goal is to build AI systems that are reliable, practical, and solve meaningful problems.",

  goal:
    "My goal is to become an AI/ML Engineer capable of designing and deploying scalable real-world AI systems that create practical impact. I follow a structured AI/ML learning methodology — outlined below in my working process.",

  currentFocus: [
    "Strengthening AI and Machine Learning fundamentals",
    "Building projects with modern AI technologies",
    "Learning how to design scalable AI applications",
    "Preparing for a career as an AI/ML Engineer"
  ]
};

export const skills = [
  {
    category: "Programming Languages",
    icon: "💻",
    color: "#00d4ff",
    items: [
      { name: "Python", level: "Proficient" },
      { name: "SQL", level: "Intermediate" },
      { name: "C++", level: "Intermediate" },
    ],
  },

  {
    category: "Data Science",
    icon: "📊",
    color: "#7b2fff",
    items: [
      { name: "Pandas", level: "Proficient" },
      { name: "NumPy", level: "Proficient" },
      { name: "Data Cleaning & Preprocessing", level: "Proficient" },
      { name: "Exploratory Data Analysis (EDA)", level: "Proficient" },
      { name: "Feature Engineering", level: "Intermediate" },
      { name: "Matplotlib", level: "Intermediate" },
      { name: "Seaborn", level: "Intermediate" },
    ],
  },

  {
    category: "Machine Learning",
    icon: "🧠",
    color: "#00ffaa",
    items: [
      { name: "Scikit-learn", level: "Proficient" },
      { name: "Supervised Learning", level: "Proficient" },
      { name: "Unsupervised Learning", level: "Proficient" },
      { name: "Model Training", level: "Proficient" },
      { name: "Model Evaluation", level: "Proficient" },
      { name: "Model Selection", level: "Intermediate" },
      { name: "OpenCV", level: "Intermediate" },
    ],
  },

  {
    category: "AI Engineering",
    icon: "🤖",
    color: "#ff6b35",
    items: [
      { name: "Large Language Models (LLMs)", level: "Intermediate" },
      { name: "Prompt Engineering", level: "Intermediate" },
      { name: "Model Context Protocol (MCP)", level: "Intermediate" },
      { name: "AI Agents", level: "Learning" },
      { name: "Retrieval-Augmented Generation (RAG)", level: "Learning" },
    ],
  },

  {
    category: "Backend Development",
    icon: "⚙️",
    color: "#ff5ea8",
    items: [
      { name: "FastAPI", level: "Intermediate" },
      { name: "REST APIs", level: "Intermediate" },
      { name: "Flask", level: "Learning" },
      { name: "GitHub REST API", level: "Intermediate" },
    ],
  },

  {
    category: "Developer Tools",
    icon: "🛠️",
    color: "#ffaa00",
    items: [
      { name: "Git", level: "Intermediate" },
      { name: "GitHub", level: "Intermediate" },
      { name: "Cursor IDE", level: "Intermediate" },
      { name: "VS Code", level: "Proficient" },
      { name: "Jupyter Notebook", level: "Proficient" },
      { name: "Linux", level: "Learning" },
    ],
  },
];

export const pipeline = [
  {
    step: "01",
    title: "Data Understanding & Analysis",
    desc:
      "Exploring datasets using Pandas and NumPy, performing EDA, identifying patterns, handling missing values, and defining problem objectives.",
    icon: "📊",
    tools: ["Python", "Pandas", "NumPy", "EDA"],
    outcome:
      "Raw data transformed into meaningful patterns and analytical insights.",
    impact:
      "Ensures correct problem understanding and prevents biased or misleading models.",
    executeText: "discover_hidden_patterns",
  },
  {
    step: "02",
    title: "Data Preparation & Feature Engineering",
    desc:
      "Cleaning data, encoding categorical variables, scaling features, and engineering meaningful inputs to improve model performance.",
    icon: "⚡",
    tools: ["Scikit-learn", "Feature Engineering", "Data Processing"],
    outcome:
      "High-quality structured dataset optimized for machine learning algorithms.",
    impact:
      "Improves model accuracy, stability, and generalization performance.",
    executeText: "build_model_ready_data",
  },
  {
    step: "03",
    title: "Model Development & Training",
    desc:
      "Building machine learning models using Scikit-learn, experimenting with algorithms, and optimizing performance through evaluation metrics.",
    icon: "🧠",
    tools: ["Scikit-learn", "Model Training", "Evaluation"],
    outcome:
      "Trained machine learning model capable of learning real-world patterns.",
    impact:
      "Creates predictive intelligence capable of solving practical problems.",
    executeText: "train_intelligent_system",
  },
  {
    step: "04",
    title: "Prediction & Insights",
    desc:
      "Generating predictions, interpreting results, and extracting actionable insights from trained models.",
    icon: "🎯",
    tools: ["Prediction", "Data Insights"],
    outcome:
      "Model predictions converted into understandable and actionable insights.",
    impact:
      "Supports data-driven decision making for business or real-world applications.",
    executeText: "transform_predictions_into_decisions",
  },
  {
    step: "05",
    title: "Deployment & Real-World Integration",
    desc:
      "Deploying ML models using FastAPI/Flask and integrating them into real-world applications through APIs.",
    icon: "🚀",
    tools: ["FastAPI", "Flask", "API Deployment"],
    outcome:
      "Production-ready AI system accessible through real applications.",
    impact:
      "Turns machine learning models into scalable real-world solutions.",
    executeText: "deploy_ai_to_production",
  },
];

export const aiPipeline = [
  {
    step: "01",
    title: "Problem Definition & AI Strategy",
    desc:
      "Analyzing the problem space to determine whether it requires traditional ML, LLM-based AI, or a hybrid approach. Defining success criteria and system requirements.",
    icon: "🎯",
    tools: ["Research", "Use-case Analysis", "System Design"],
    outcome:
      "Clear problem definition with a chosen AI strategy and architecture direction.",
    impact:
      "Prevents wasted effort by ensuring the right approach is selected from the start.",
    executeText: "define_ai_strategy",
  },
  {
    step: "02",
    title: "Foundation Model Selection",
    desc:
      "Evaluating and selecting the right LLM or foundation model based on task requirements, cost, latency, and capability benchmarks.",
    icon: "🤖",
    tools: ["OpenAI API", "Gemini API", "Open-source LLMs", "Benchmarking"],
    outcome:
      "Optimal foundation model selected and configured for the target use case.",
    impact:
      "Balances performance, cost, and reliability for production-grade AI systems.",
    executeText: "select_foundation_model",
  },
  {
    step: "03",
    title: "Prompt Engineering & RAG Design",
    desc:
      "Crafting effective prompts, designing retrieval-augmented generation pipelines, and integrating external knowledge sources for context-aware responses.",
    icon: "⚡",
    tools: ["Prompt Engineering", "RAG", "Vector Databases", "Embeddings"],
    outcome:
      "Optimized prompt templates and retrieval pipelines producing accurate, grounded outputs.",
    impact:
      "Dramatically improves response quality and reduces hallucinations in AI systems.",
    executeText: "engineer_prompt_pipeline",
  },
  {
    step: "04",
    title: "AI Agent & Tool Integration",
    desc:
      "Building agentic AI systems with tool-use capabilities, multi-step reasoning, and Model Context Protocol (MCP) integration for real-world task execution.",
    icon: "🧠",
    tools: ["AI Agents", "MCP", "Function Calling", "Tool Integration"],
    outcome:
      "Autonomous AI agents capable of reasoning, planning, and executing complex tasks.",
    impact:
      "Transforms static AI into dynamic systems that can interact with external tools and APIs.",
    executeText: "build_ai_agent",
  },
  {
    step: "05",
    title: "Deployment & Evaluation",
    desc:
      "Deploying AI systems via APIs, implementing evaluation frameworks, and monitoring output quality, latency, and reliability in production.",
    icon: "🚀",
    tools: ["FastAPI", "Evaluation Metrics", "Monitoring", "API Deployment"],
    outcome:
      "Production-ready AI system with continuous quality monitoring and feedback loops.",
    impact:
      "Ensures AI systems remain reliable, accurate, and performant in real-world usage.",
    executeText: "deploy_and_evaluate",
  },
];

export const projects = [
  {
    id: 1,
    title: "GitHub Intelligence MCP Server",
    desc: "An AI-powered GitHub MCP Server that enables AI assistants to interact with GitHub through structured tools for repository analysis, issue management, pull request insights, and developer workflows.",
    category: "ai-eng",
    tags: ["AI", "Python", "MCP", "LLM", "GitHub API"],
    github: "https://github.com/rupakkumar-76319/GitHub-Intelligence-MCP-Server",
    powerBI: "#",
    details: "#",
    pipeline: ["MCP Server", "Tools", "AI Integration"],
    demo: "#",
    status: "in-progress",
  },
  {
    id: 2,
    title: "ATS Resume Analyzer",
    desc: "AI-Powered ATS Resume Analyzer designed to automatically parse, evaluate, and score job applications against a target Job Description (JD).",
    category: "ai-eng",
    tags: ["AI", "NLP", "Python", "HTML", "Resume Parsing"],
    github: "https://github.com/rupakkumar-76319/ATS-Resume-Analyzer",
    powerBI: "#",
    details: "#",
    pipeline: ["NLP", "Feature Extraction", "Scoring", "Web App"],
    demo: "https://ats-resume-analyzer-mba7.onrender.com/",
    status: "completed",
  },
  {
    id: 3,
    title: "WeatherCast ML System",
    desc: "End-to-end ML pipeline for classification predicting rainfall using historical weather data. Includes a deployed REST API via FastAPI.",
    category: "ml-eng",
    tags: ["Machine Learning", "Python", "Scikit-learn", "FastAPI", "Random-Forest", "XGBoost"],
    github: "https://github.com/rupakkumar-76319/weathercast-ml-systems_Full",
    powerBI: "#",
    details: "/project_details_pages/WeatherCast_MLSystem.html",
    pipeline: ["Data", "Preprocessing", "Model", "Deploy"],
    demo: "https://weathercast-ml-systems.onrender.com/",
    status: "completed",
  },
  {
    id: 4,
    title: "Sign Language Gesture Recognition",
    desc: "Real-time ASL gesture recognition using MediaPipe Hands + Deep Learning. Benchmarked 6 architectures (LSTM, GRU, CNN-BiLSTM) on a 36-class sequence dataset.",
    category: "ml-eng",
    tags: ["Deep Learning", "Computer Vision", "Python", "LSTM", "MediaPipe"],
    github: "https://github.com/rupakkumar-76319/Sequence-Based-Hand-Gesture-Recognition-For-Sign-Language-Using-Deep-Learning",
    powerBI: "#",
    details: "#",
    pipeline: ["Data Collection", "MediaPipe", "Model Training", "Evaluation"],
    demo: "#",
    status: "completed",
  },
  {
    id: 5,
    title: "Algorithmic Trading Backtester",
    desc: "Algorithmic trading backtesting system using a moving average crossover strategy, with performance evaluation (Sharpe ratio, drawdown) and visual insights.",
    category: "ml-eng",
    tags: ["Python", "Pandas", "Finance", "Quantitative Analysis"],
    github: "https://github.com/rupakkumar-76319/algorithmic_trading_backtester",
    powerBI: "#",
    details: "/project_details_pages/Algorithmic_Trading_Backtester.html",
    pipeline: ["Data", "Strategy", "Backtest", "Evaluate"],
    demo: "#",
    status: "completed",
  },
  {
    id: 6,
    title: "E-Commerce Sales & Customer Analytics",
    desc: "Built an end-to-end Power BI analytics solution using real e-commerce transaction data to analyze sales performance and customer behavior.",
    category: "power-bi",
    tags: ["Data", "SQL", "Power BI", "DAX"],
    github: "https://github.com/rupakkumar-76319/E-Commerce-Sales-Performance-Customer-Analytics",
    powerBI: "https://app.powerbi.com/groups/me/reports/169c2686-9f52-4315-90b5-6924a181f9b6/",
    details: "/project_details_pages/E_commerce_sales_and_Analytics.html",
    pipeline: ["Data", "SQL", "DAX", "Power BI dashboards"],
    demo: "#",
    status: "completed",
  },
  {
    id: 7,
    title: "E-Commerce Sales Analysis (UCI)",
    desc: "Data analysis on ~500K transactions from a UK-based online retailer, including product purchases, customer IDs, and country details.",
    category: "data-analysis",
    tags: ["Python", "Data Analysis", "EDA", "Pandas"],
    github: "https://github.com/rupakkumar-76319/E-Commerce-Sales-Analysis-UCI-Online-Retail-Dataset-2010-2011-",
    powerBI: "#",
    details: "#",
    pipeline: ["Data Cleaning", "EDA", "Insights"],
    demo: "#",
    status: "completed",
  }
]

export const timeline = [
  {
    date: "Aug 2023",
    title: "Academic Foundation",
    description:
      "Started B.Tech in Electronics & Communication Engineering at Assam University, Silchar. Began exploring programming and technical problem-solving.",
    focus: ["Programming Basics", "Logical Thinking"],
  },
  {
    date: "Jan 2024",
    title: "Programming Fundamentals",
    description:
      "Learned C++ and built a strong foundation in problem-solving and coding practices.",
    focus: ["C++", "Problem Solving"],
  },
  {
    date: "May 2024",
    title: "Entering Data Science",
    description:
      "Joined BS in Data Science from IIT Madras and explored how data drives decision-making.",
    focus: ["Data Science Fundamentals"],
    type: "data"
  },
  {
    date: "May 2024 – Jan 2025",
    title: "Data Science Foundation Phase",
    description:
      "Completed foundational coursework and developed strong interest in working with data.",
    focus: [
      "Pandas & NumPy",
      "EDA",
      "Data-driven Thinking",
    ],
    type: "data"
  },
  {
    date: "Jan 2025",
    title: "Core Technical Expansion",
    description:
      "Strengthened core technical skills required for real-world systems.",
    focus: ["SQL", "DSA", "System Environment"],
  },
  {
    date: "Mid 2025",
    title: "Data Analysis & Visualization",
    description:
      "Applied analytics skills on real datasets and built dashboards.",
    focus: ["Power BI", "Tableau", "Data Insights"],
    type: "data"
  },
  {
    date: "Sep 2025",
    title: "Machine Learning Foundation",
    description:
      "Transitioned into Machine Learning and AI concepts.",
    focus: [
      "Supervised Learning",
      "Unsupervised Learning",
      "Model Evaluation",
    ],
    type: "ml"
  },
  {
    date: "Dec 2025",
    title: "ML Engineering Journey",
    description:
      "Started building complete Machine Learning systems and focusing on deployment.",
    focus: [
      "ML Pipelines",
      "Model Deployment",
      "Prediction Systems",
    ],
    type: "ml"
  },
  {
    date: "Mid April 2026",
    title: "AI Eng. Foundation",
    description:
      "Expanding into GenAI, focusing on Large Language Models and prompt engineering.",
    focus: [
      "Prompt Engineering",
      "LLMs",
      "RAG Basics",
    ],
    type: "ai"
  },
  {
    date: "May 2026",
    title: "AI Eng. Journey 🚀",
    description:
      "Developing agentic architectures, MCP integrations, and intelligent real-world automation systems.",
    focus: [
      "Agentic Architectures",
      "MCP Integration",
      "Real-world AI Systems",
    ],
    type: "ai"
  }
]

export const guideMessages = {
  hero: "Hi! I'm Aria — Rupak's AI guide. Let me take you through his journey in AI/ML engineering! ✨",
  about: "Here you'll learn about Rupak's background in ECE and his passion for building intelligent systems. 📖",
  experience: "Check out Rupak's real-world professional experience and internships. 💼",
  skills: "These are the tools and technologies Rupak uses to build AI systems — from data to deployment! 🛠️",
  pipeline: "This is Rupak's structured approach to building end-to-end ML solutions. Every step matters! ⚡",
  projects: "Check out the real-world AI projects Rupak has built. Each one tells a story! 🚀",
  certificates: "These are Rupak's verified credentials and certifications. Continuous learning is key! 📜",
  timeline: "Follow Rupak's journey from curious coder to AI/ML engineer. The story continues! 🌟",
  contact: "Interested in collaborating? Rupak is open to internships and AI/ML opportunities! 📬",
}

export const experience = [
  {
    id: 1,
    role: "AI Training Intern",
    company: "Skillfi Solutions Pvt Ltd",
    type: "Remote",
    date: "June 2026 – July 2026",
    desc: "1-Month structured AI Training Internship Program focusing on modern AI engineering and agentic workflows.",
    focus: [
      "Artificial Intelligence",
      "Agentic AI",
      "Claude API Development",
      "Model Context Protocol (MCP)",
      "AI-Assisted Development Workflows"
    ],
    certificate: "/certificates/INT_Rupak.pdf"
  },
  {
    id: 2,
    role: "AI/ML Engineering Intern",
    company: "CODECRAFT CONSULTING SERVICES LLP",
    type: "Remote",
    date: "1 June 2026 – 15 July 2026",
    desc: "45 Days structured Internship program focusing on the Development of Intelligent Applications powered by Machine Learning and Large Language Models. Worked as Prompt Engineering, AI model integration API development, and optimizing inter workflows for Performance and Reliability.",
    focus: [
      "Machine Learning",
      "Large Language Models",
      "Prompt Engineering",
      "AI model integration API development",
      "Optimizing inter workflows for Performance and Reliability"
    ],
    certificate: "/certificates/Internship_in_CODECRAFT.pdf"
  }
]

export const certificates = [
  {
    id: 1,
    name: "Claude Code in Action",
    issuer: "Anthropic",
    date: "2026",
    link: "/certificates/certificate-5n4r7i6ivwrp-1782382045.pdf",
    category: "ai-eng",
    icon: "🧠"
  },
  {
    id: 2,
    name: "Introduction to agent skills",
    issuer: "Anthropic",
    date: "2026",
    link: "/certificates/certificate-bb8zp3as36ko-1781123175.pdf",
    category: "ai-eng",
    icon: "🤖"
  },
  {
    id: 3,
    name: "Claude with the Anthropic API",
    issuer: "Anthropic",
    date: "2026",
    link: "/certificates/API.pdf",
    category: "ai-eng",
    icon: "⚡"
  },
  {
    id: 4,
    name: "Introduction to Model Context Protocol",
    issuer: "Anthropic",
    date: "2026",
    link: "/certificates/MCP.pdf",
    category: "ai-eng",
    icon: "🔌"
  },
  {
    id: 5,
    name: "OpenCV Bootcamp",
    issuer: "OpenCV University",
    date: "2026",
    link: "/certificates/OpenCV Cerificate.png",
    category: "ml-eng",
    icon: "👁️"
  },
  {
    id: 6,
    name: "Data Analytics Job Simulation",
    issuer: "Deloitte / Forage",
    date: "Jan 2026",
    link: "/certificates/Deloitte_Data_Analysits.pdf",
    category: "data-analysis",
    icon: "📊"
  },
  {
    id: 7,
    name: "SQL (Intermediate)",
    issuer: "HackerRank",
    date: "Sep 2025",
    link: "/certificates/SQL(Intermediate).png",
    category: "data-analysis",
    icon: "🗄️"
  }
]
