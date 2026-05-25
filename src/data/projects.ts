import { type Project } from "@/types";

export const projects: Project[] = [
  {
    id: 1,
    title: "Vizionary — AI Data Analytics Co-Pilot",
    category: "LLM",
    status: "Completed",
    shortDesc:
      "Agentic AI pipeline interpreting 500+ natural-language commands, cutting analytics time by 70% for non-technical users.",
    fullDesc:
      "An agentic AI analytics co-pilot built with multi-step prompt engineering and the Google Gemini API. Vizionary enables non-technical users to explore datasets through natural language, get ML model recommendations, and generate visualizations — all with zero code.",
    tech: ["Python", "Gemini API", "Flask", "Agentic AI", "Prompt Engineering", "REST APIs"],
    metrics: [
      { label: "Analytics Time Reduction", value: "70%" },
      { label: "Algorithm Selection Accuracy", value: "85%" },
      { label: "NL Commands Supported", value: "500+" },
    ],
    problem:
      "Non-technical stakeholders couldn't independently query or explore data, creating analytics bottlenecks and dependency on engineers.",
    solution:
      "Architected a multi-step agentic prompt pipeline using Google Gemini API that interprets natural language, routes to the right tool (SQL query, ML recommender, chart generator), and returns human-readable results via a Flask REST API.",
    architecture:
      "NL Input → Gemini Agentic Pipeline → Tool Router → [SQL / ML Recommender / Chart] → Flask API → Frontend",
    challenges: [
      "Designing reliable multi-step agentic prompt chains",
      "Achieving 85%+ ML algorithm selection accuracy across 10+ task types",
      "Keeping latency low on complex multi-hop queries",
    ],
    github: "https://github.com/syed-fouzaan/Vizionary",
    demo: null,
    featured: true,
  },
  {
    id: 2,
    title: "PhysioFlex — Real-Time Posture Analysis",
    category: "Computer Vision",
    status: "Completed",
    shortDesc:
      "Real-time physiotherapy assistant detecting incorrect exercise form with up to 90% accuracy using MediaPipe & OpenCV.",
    fullDesc:
      "A real-time physiotherapy assistant that trains a classifier on 5,000 labelled pose samples across 33 body landmarks to detect incorrect exercise form, count reps, and provide live audio-visual feedback. Per-session analytics logged to SQL for longitudinal tracking.",
    tech: ["Python", "OpenCV", "MediaPipe", "scikit-learn", "SQL", "Flask"],
    metrics: [
      { label: "Pose Classification Accuracy", value: "90%" },
      { label: "Training Samples", value: "5,000+" },
      { label: "Body Landmarks Tracked", value: "33" },
    ],
    problem:
      "Patients doing physiotherapy at home without supervision frequently use incorrect form, risking injury and slowing recovery.",
    solution:
      "Trained a classifier on 5,000 labelled pose samples from MediaPipe's 33-landmark skeleton model. Built rep counting, form scoring, and live audio-visual feedback. Logged session data (rep counts, form scores, timestamps) to SQL for progress tracking.",
    architecture:
      "Webcam → MediaPipe Holistic → 33 Landmark Extraction → scikit-learn Classifier → Feedback Engine → SQL Logging",
    challenges: [
      "Handling landmark occlusion and varied body proportions",
      "Achieving sub-50ms inference on CPU for real-time feedback",
      "Building reliable rep-counting across 12+ exercise types",
    ],
    github: "https://github.com/syed-fouzaan/PhysioFlex-AI/",
    demo: null,
    featured: true,
  },
  {
    id: 3,
    title: "Air-Command — Gesture Control Interface",
    category: "Computer Vision",
    status: "Completed",
    shortDesc:
      "Touchless gesture control achieving 92% accuracy across 8 gestures at 30 FPS with 35% latency reduction.",
    fullDesc:
      "A touchless system control interface built with MediaPipe Hands, trained on 2,000+ augmented samples. Achieved 92% accuracy across 8 gesture types, reduced end-to-end latency from 180ms to 117ms (35% faster), and cut false positives by 10% with landmark distance-threshold filters.",
    tech: ["Python", "OpenCV", "MediaPipe", "TensorFlow", "PyAutoGUI"],
    metrics: [
      { label: "Gesture Accuracy", value: "92%" },
      { label: "Latency Reduction", value: "35%" },
      { label: "Gestures Supported", value: "8" },
    ],
    problem:
      "Physical input devices create friction in touchless and accessibility contexts; existing solutions had poor accuracy under varied lighting.",
    solution:
      "Trained a TensorFlow classifier on 2,000+ augmented gesture samples. Engineered landmark distance-threshold filters to reduce false-positive triggers by 10%. Optimized the pipeline from 180ms to 117ms latency at stable 30 FPS.",
    architecture:
      "Webcam → MediaPipe Hand Landmarks → TensorFlow Classifier → Threshold Filters → PyAutoGUI System Control",
    challenges: [
      "Reducing false positives across varied lighting environments",
      "Cutting latency from 180ms to 117ms without GPU",
      "Maintaining 30 FPS with real-time landmark computation",
    ],
    github: "https://github.com/syed-fouzaan/Air-Command",
    demo: null,
    featured: true,
  },
  {
    id: 4,
    title: "Real-Time Object Detection System",
    category: "Computer Vision",
    status: "Completed",
    shortDesc:
      "YOLOv8 fine-tuned on 5,000+ images achieving 89% mAP@0.5 at 25 FPS on CPU — edge-deployment ready.",
    fullDesc:
      "A custom-trained object detection pipeline fine-tuning YOLOv8 on 5,000+ images across 12 classes. Applied mosaic, rotation, and flip augmentation to raise precision by 15% over baseline. Achieves 89% mAP@0.5 at 25 FPS on CPU — ready for edge deployment.",
    tech: ["Python", "YOLOv8", "OpenCV", "Roboflow", "PyTorch"],
    metrics: [
      { label: "mAP@0.5", value: "89%" },
      { label: "Inference Speed", value: "25 FPS" },
      { label: "Classes", value: "12" },
    ],
    problem:
      "Generic pre-trained models fail on domain-specific objects. Real-time CPU inference without GPU is required for edge deployment.",
    solution:
      "Fine-tuned YOLOv8 on 5,000+ Roboflow-annotated images across 12 classes. Applied mosaic, rotation, and flip augmentation raising precision by 15%. Achieved 89% mAP@0.5 at 25 FPS on CPU.",
    architecture:
      "Dataset (5K+ images) → Roboflow Annotation → YOLOv8 Fine-tuning → Augmentation → CPU Inference → Real-time Output",
    challenges: [
      "Class imbalance across 12 categories",
      "Achieving 25 FPS on CPU without GPU acceleration",
      "Designing augmentation pipeline that boosted precision by 15%",
    ],
    github: "https://github.com/syed-fouzaan/Object-Detection-Using-YOLO-v8",
    demo: null,
    featured: false,
  },
  {
    id: 5,
    title: "Crypto-Predictor — LSTM Forecasting",
    category: "AI/ML",
    status: "Completed",
    shortDesc:
      "LSTM forecasting engine delivering 82% directional accuracy with 12% MAPE on 30-day crypto price predictions.",
    fullDesc:
      "A deep learning forecasting engine using LSTM networks trained on 3 years of crypto price data. Engineered 15+ technical indicators (RSI, MACD, Bollinger Bands) that boosted baseline accuracy by 28%. Achieves 82% directional accuracy with 12% MAPE on 30-day forecasts.",
    tech: ["Python", "LSTM", "TensorFlow", "YFinance", "Pandas", "Matplotlib"],
    metrics: [
      { label: "Directional Accuracy", value: "82%" },
      { label: "MAPE", value: "12%" },
      { label: "Baseline Improvement", value: "+28%" },
    ],
    problem:
      "Crypto markets are highly volatile. Standard price prediction models that lack feature engineering underperform on directional forecasting.",
    solution:
      "Built an LSTM model trained on 3 years of YFinance data. Engineered 15+ technical indicators including RSI, MACD, and Bollinger Bands, boosting baseline directional accuracy by 28%. Forecasts 30-day crypto price movements.",
    architecture:
      "YFinance Data → Feature Engineering (15+ Indicators) → LSTM Training → 30-Day Forecast → Visualization",
    challenges: [
      "Engineering meaningful features from raw OHLCV data",
      "Preventing LSTM overfitting on volatile market data",
      "Achieving 12% MAPE while maintaining 82% directional accuracy",
    ],
    github: "https://github.com/syed-fouzaan/Crypto-Predictor-using-yfinance",
    demo: null,
    featured: false,
  },
];
