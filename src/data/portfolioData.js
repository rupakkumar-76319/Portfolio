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
  resumeUrl: "/pdf_models/Resume/Resume_DA.pdf",
}

export const aboutText = {
  intro:
    "I am a B.Tech student in Electronics and Communication Engineering at Assam University, Silchar, and a BS in Data Science student at IIT Madras.",

  story:
    "I am passionate about Artificial Intelligence and Machine Learning, focusing on transforming data into intelligent systems through structured problem solving and model development.",

  philosophy:
    "I follow a structured AI/ML learning methodology — understanding data, building models, and developing end-to-end intelligent solutions. I believe in building systems, not just models.",

  goal:
  "My goal is to become an AI/ML Engineer capable of designing and deploying scalable real-world AI systems that create practical impact. I follow a structured AI/ML learning methodology — outlined below in my working process.",

  currentFocus: [
    "Data analysis and preprocessing",
    "Machine learning model development",
    "Building real-world prediction systems",
    "End-to-end AI project development"
  ]
};

export const skills = [
  {
    category: "Programming",
    icon: "💻",
    color: "#00d4ff",
    items: [
      { name: "Python", level: "Core" },
      { name: "C++ (Intermediate)", level: "Learning" },
      { name: "SQL", level: "Intermediate" },
    ],
  },

  {
    category: "Data Analysis & Processing",
    icon: "📊",
    color: "#7b2fff",
    items: [
      { name: "Pandas & NumPy", level: "Core" },
      { name: "Data Cleaning & Preprocessing", level: "Core" },
      { name: "Exploratory Data Analysis (EDA)", level: "Working" },
      { name: "Data Visualization (Matplotlib, Seaborn)", level: "Working" },
    ],
  },

  {
    category: "Machine Learning",
    icon: "🧠",
    color: "#00ffaa",
    items: [
      { name: "Scikit-learn", level: "Core" },
      { name: "Feature Engineering", level: "Working" },
      { name: "Model Training & Evaluation", level: "Core" },
      { name: "Supervised Learning", level: "Core" },
      { name: "Unsupervised Learning", level: "Core" },
    ],
  },

  {
    category: "AI/ML Engineering",
    icon: "⚙️",
    color: "#ff6b35",
    items: [
      { name: "End-to-End ML Pipelines", level: "Working" },
      { name: "Model Deployment (Flask)", level: "Learning" },
      { name: "REST API Development", level: "Learning" },
      { name: "Basic MLOps Concepts", level: "Learning" },
    ],
  },

  {
    category: "Tools & Technologies",
    icon: "🛠️",
    color: "#ffaa00",
    items: [
      { name: "Git & GitHub", level: "Working" },
      { name: "VS Code", level: "Core" },
      { name: "Jupyter Notebook", level: "Core" },
      { name: "Linux (Basic)", level: "Learning" },
    ],
  },
];

export const pipeline = [
  {
    step: "01",
    title: "Data Understanding & Analysis",
    desc:
      "Exploring datasets using Pandas and NumPy, performing EDA, identifying patterns, handling missing values, and defining problem objectives.",
    icon:"📊",
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
    icon:"⚡",
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
    icon:"🧠",
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
    icon:"🎯",
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
    icon:"🚀",
    tools: ["FastAPI", "Flask", "API Deployment"],
    outcome:
      "Production-ready AI system accessible through real applications.",
    impact:
      "Turns machine learning models into scalable real-world solutions.",
    executeText: "deploy_ai_to_production",
  },
];

export const projects = [
  {
    id: 1,
    title: "Wheather Cast ML System",
    desc: "End-to-end ML pipeline for classification with deployed REST API.",
    tags: ["Data Science", "Machine Learning", "Python", "Data Preprocessing", "Scikit-learn", "FastAPI", "Logistic Regression", "Random-Forest", "Xgboost",],
    github: "https://github.com/rupakkumar-76319/weathercast-ml-systems_Full",
    powerBI: "#",
    details: "/project_details_pages/WeatherCast_MLSystem.html",
    pipeline: ["Data", "Preprocessing", "Model", "Deploy"],
    demo: "https://weathercast-ml-systems.onrender.com/",
    status: "completed",
    
  },
  {
    id: 2,
    title: "Algorithmic Trading Backtester",
    desc: "Algorithmic trading backtesting system using a moving average crossover strategy, with performance evaluation (Sharpe ratio, drawdown) and visual insights in Python.",
    tags: ["Python", "Pandas", "Finance", "Matplotlib", "Quantitative Finance", "Trading Strategy"],
    github: "https://github.com/rupakkumar-76319/algorithmic_trading_backtester",
    powerBI: "#",
    details: "/project_details_pages/Algorithmic_Trading_Backtester.html",
    pipeline: ["Data", "Preprocessing", "Strategy", "Backtest", "Evaluate"],
    demo: "#",
    status: "completed",
  },
  {
    id: 3,
    title: "E-Commerce Sales & Customer Analytics",
    desc: "Built an end-to-end Power BI analytics solution using real e-commerce transaction data to analyze sales performance, customer behavior, product contribution, country-wise trends, and time-based growth.",
    tags: ["Data", "SQL", "Power BI", "DAX"],
    github: "#",
    powerBI: "https://app.powerbi.com/groups/me/reports/169c2686-9f52-4315-90b5-6924a181f9b6/",
    details: "/project_details_pages/E_commerce_sales_and_Analytics.html",
    pipeline: ["Data", "Preprocessing", "SQL", "DAX", "Power BI dashboards"],
    demo: "#",
    status: "completed",
  },
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
  },
  {
    date: "Present",
    title: "AI/ML Engineering Journey 🚀",
    description:
      "Building complete AI/ML systems and improving deployment skills.",
    focus: [
      "ML Pipelines",
      "Model Deployment",
      "Prediction Systems",
    ],
  },
]

export const guideMessages = {
  hero: "Hi! I'm Aria — Rupak's AI guide. Let me take you through his journey in AI/ML engineering! ✨",
  about: "Here you'll learn about Rupak's background in ECE and his passion for building intelligent systems. 📖",
  skills: "These are the tools and technologies Rupak uses to build AI systems — from data to deployment! 🛠️",
  pipeline: "This is Rupak's structured approach to building end-to-end ML solutions. Every step matters! ⚡",
  projects: "Check out the real-world AI projects Rupak has built. Each one tells a story! 🚀",
  timeline: "Follow Rupak's journey from curious coder to AI/ML engineer. The story continues! 🌟",
  contact: "Interested in collaborating? Rupak is open to internships and AI/ML opportunities! 📬",
}
