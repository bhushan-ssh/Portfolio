export const projects = [
  {
    id: "uptime",
    title: "Uptime",
    category: "Machine Learning",
    featured: true,
    subtitle: "AI-powered predictive maintenance",
    description:
      "A predictive maintenance solution using machine learning to estimate remaining useful life and predict failures.",
    tech: ["Python", "Machine Learning", "LSTM"],
    result: "85% accuracy · 1st place at SVIT HackVerse 2K26",
    detail:
      "Led a 4-person team to turn machine sensor data into maintenance insights.",
    repo: "https://github.com/bhushan-ssh/Uptime",
    image: "projects/uptime.webp",
    width: 1117,
    height: 613,
    alt: "Uptime predictive maintenance preview showing a remaining useful life graph and failure mode insights",
  },
  {
    id: "careerlink",
    title: "CareerLink",
    category: "Web",
    subtitle: "Connecting students with opportunities",
    description:
      "A career platform connecting students with opportunities, featuring role-based access and REST APIs.",
    tech: ["Vue 3", "Flask-RESTful", "SQLAlchemy", "SQLite", "Redis", "Celery"],
    result: "Designed to connect 500+ students",
    repo: "https://github.com/bhushan-ssh/CareerLink",
    image: "projects/careerlink.webp",
    width: 1440,
    height: 681,
    alt: "CareerLink home page with a job search form and student career profile",
    caseStudy: {
      problem:
        "Campus placement work spans student profiles, company job postings, applications, and placement tracking. CareerLink brings those workflows into one portal for students, companies, and administrators.",
      contribution:
        "Built this academic full-stack project, including the Vue frontend, Flask API, role-based workflows, data model, and background processing features.",
      decisions: [
        "Separated the Vue 3 single-page app from the Flask-RESTful API.",
        "Used token authentication and role-based access for student, company, and admin actions.",
        "Used SQLAlchemy with SQLite for the relational workflow data.",
        "Added Redis and Celery for caching, CSV exports, interview reminders, and scheduled reports.",
      ],
      outcome:
        "The project demonstrates the placement lifecycle end to end, including application status tracking and async exports. The 500+ student figure is a design target, not a measured user count.",
    },
  },
  {
    id: "quizmaster",
    title: "QuizMaster",
    category: "Web",
    subtitle: "A better way to manage quizzes",
    description:
      "A quiz management application with CRUD functionality, session handling, and role-based access control.",
    tech: ["Python", "Flask", "SQLAlchemy", "SQLite"],
    result: "Built to support 100+ concurrent users",
    repo: "https://github.com/bhushan-ssh/Quizmaster",
    image: "projects/quizmaster.webp",
    width: 1440,
    height: 684,
    alt: "QuizMaster welcome screen with the quiz logo and login button",
  },
  {
    id: "heavy-equipment-price-prediction",
    title: "Heavy Equipment Price Prediction",
    category: "Machine Learning",
    subtitle: "Predicting used equipment selling prices",
    description:
      "An end-to-end regression pipeline that estimates resale prices from equipment specifications, usage, and transaction data.",
    tech: ["Python", "Pandas", "XGBoost", "CatBoost", "scikit-learn"],
    result: "0.20217 OOF RMSLE · 5-fold ensemble",
    detail:
      "Combines XGBoost and CatBoost predictions with non-negative least-squares blending.",
    repo: "https://github.com/bhushan-ssh/Heavy_Equipment_Selling_Price_Prediction",
    image: "projects/heavy_equipement_price_prediction.jpg",
    width: 800,
    height: 766,
    alt: "Heavy equipment selling price prediction project preview",
    caseStudy: {
      problem:
        "Used equipment prices depend on age, operating hours, equipment specifications, location, and transaction details. The task is to estimate selling prices from 138,701 historical transactions.",
      contribution:
        "Built a regression pipeline with feature engineering, five-fold model evaluation, and an ensemble for final price predictions.",
      decisions: [
        "Modelled log prices to align training with the RMSLE evaluation metric.",
        "Added structural-missingness indicators and equipment-age features; encoded high-cardinality categories and identifiers.",
        "Compared XGBoost, CatBoost, and HistGradientBoosting with five-fold cross-validation.",
        "Blended fold predictions with non-negative least squares in log-price space.",
      ],
      outcome:
        "The ensemble reached 0.20217 out-of-fold RMSLE, where lower is better. This is a cross-validation result, not a score on an unseen competition leaderboard.",
    },
  },
  {
    id: "titanic-survival-prediction",
    title: "Titanic Survival Prediction",
    category: "Machine Learning",
    subtitle: "An interactive passenger survival predictor",
    description:
      "A classification workflow with exploratory analysis, feature engineering, model comparison, and an interactive Streamlit app.",
    tech: ["Python", "Pandas", "scikit-learn", "Streamlit"],
    result: "81.56% validation accuracy",
    repo: "https://github.com/bhushan-ssh/Titanic_Survival_Prediction",
    demo: "https://bhushan-titanic-ml.streamlit.app/",
    image: "projects/titatic_survival_prediction.jpg",
    width: 1280,
    height: 853,
    alt: "Titanic survival prediction project preview",
  },
  {
    id: "smart-mcq-solver",
    title: "Smart MCQ Solver",
    category: "Machine Learning",
    subtitle: "Deep learning for multiple-choice questions",
    description:
      "Compares BiLSTM, BiGRU with attention, and fine-tuned BERT to rank the top three answers for each question.",
    tech: ["Python", "PyTorch", "BERT", "Transformers", "Streamlit"],
    result: "0.7503 validation MAP@3 ensemble",
    detail:
      "A weighted ensemble combines neural models for top-three answer ranking.",
    repo: "https://github.com/bhushan-ssh/Smart_MCQ_Solver",
    image: "projects/smart_mcq_solver.jpg",
    width: 1280,
    height: 720,
    alt: "Smart MCQ Solver project preview",
    caseStudy: {
      problem:
        "For five-option multiple-choice questions, selecting the top answer is not the only goal: the correct choice should appear in the top three, which is what MAP@3 rewards.",
      contribution:
        "Built and compared three approaches—BiLSTM, BiGRU with attention, and fine-tuned BERT—then optimized a validation-weighted ensemble and connected it to a Streamlit interface.",
      decisions: [
        "Implemented the BiLSTM and BiGRU models in PyTorch and fine-tuned bert-base-uncased for multiple-choice classification.",
        "Used a group-aware train/validation split to reduce leakage between related questions.",
        "Compared all models on the same validation set and optimized ensemble weights for MAP@3.",
      ],
      outcome:
        "The ensemble improved validation MAP@3 from 0.7201 for BERT alone to 0.7503. These are validation results; performance on unseen data may differ.",
    },
  },
];
