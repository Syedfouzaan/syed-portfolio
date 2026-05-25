import { type Skill } from "@/types";

export const skills: Record<string, Skill[]> = {
  "AI/ML": [
    { name: "Python", level: "Expert", proficiency: 92 },
    { name: "LLMs / Prompt Eng.", level: "Advanced", proficiency: 85 },
    { name: "Agentic AI", level: "Advanced", proficiency: 80 },
    { name: "TensorFlow / Keras", level: "Advanced", proficiency: 82 },
    { name: "scikit-learn", level: "Advanced", proficiency: 80 },
    { name: "Hugging Face", level: "Advanced", proficiency: 75 },
    { name: "RAG Systems", level: "Advanced", proficiency: 78 },
    { name: "Gemini API", level: "Advanced", proficiency: 85 },
  ],
  "Computer Vision": [
    { name: "OpenCV", level: "Expert", proficiency: 90 },
    { name: "MediaPipe", level: "Expert", proficiency: 90 },
    { name: "YOLOv8", level: "Advanced", proficiency: 88 },
    { name: "Pose Estimation", level: "Expert", proficiency: 90 },
    { name: "Object Detection", level: "Advanced", proficiency: 88 },
    { name: "LSTM", level: "Advanced", proficiency: 78 },
  ],
  "Frontend": [
    { name: "React.js", level: "Advanced", proficiency: 82 },
    { name: "Next.js", level: "Advanced", proficiency: 80 },
    { name: "JavaScript (ES6+)", level: "Advanced", proficiency: 85 },
    { name: "TypeScript", level: "Intermediate", proficiency: 70 },
    { name: "HTML5 / CSS3", level: "Expert", proficiency: 90 },
    { name: "Tailwind CSS", level: "Advanced", proficiency: 85 },
  ],
  "Backend": [
    { name: "Flask", level: "Advanced", proficiency: 82 },
    { name: "REST APIs", level: "Advanced", proficiency: 85 },
    { name: "PostgreSQL", level: "Advanced", proficiency: 78 },
    { name: "MongoDB", level: "Advanced", proficiency: 75 },
    { name: "Firebase", level: "Advanced", proficiency: 75 },
    { name: "Supabase", level: "Intermediate", proficiency: 68 },
  ],
  "Tools": [
    { name: "Git / GitHub", level: "Expert", proficiency: 90 },
    { name: "Docker", level: "Intermediate", proficiency: 65 },
    { name: "Pandas / NumPy", level: "Advanced", proficiency: 88 },
    { name: "Roboflow", level: "Advanced", proficiency: 82 },
    { name: "Matplotlib", level: "Advanced", proficiency: 80 },
  ],
};
