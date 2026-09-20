export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  category: string;
  verified?: boolean;
};

export const jobs: Job[] = [
  {
    id: 1,
    title: "AI Data Annotator",
    company: "CloudFactory",
    location: "Remote",
    salary: "$8–12/hr",
    type: "Contract",
    category: "AI Data",
    verified: true,
  },

  {
    id: 2,
    title: "LLM Trainer",
    company: "Outlier AI",
    location: "Remote",
    salary: "$20–35/hr",
    type: "Contract",
    category: "AI Training",
    verified: false,
  },

  {
    id: 3,
    title: "Prompt Engineer",
    company: "Invisible Technologies",
    location: "Remote",
    salary: "$30–50/hr",
    type: "Contract",
    category: "AI & LLM",
    verified: false,
  },

  {
    id: 4,
    title: "ML Engineer",
    company: "Scale AI",
    location: "Remote",
    salary: "$40–70/hr",
    type: "Contract",
    category: "Machine Learning",
    verified: false,
  },

  {
    id: 5,
    title: "Quality Reviewer",
    company: "DataForce",
    location: "Remote",
    salary: "$15–25/hr",
    type: "Contract",
    category: "AI Evaluation",
    verified: false,
  },

  {
    id: 6,
    title: "Computer Vision Annotator",
    company: "TELUS Digital",
    location: "Remote",
    salary: "$10–18/hr",
    type: "Contract",
    category: "Computer Vision",
    verified: false,
  },

  {
    id: 7,
    title: "AI Trainer",
    company: "Outlier AI",
    location: "Remote",
    salary: "$20–35/hr",
    type: "Contract",
    category: "AI Training",
    verified: false,
  },

  {
    id: 8,
    title: "AI Data Trainer",
    company: "Scale AI",
    location: "Remote",
    salary: "$18–30/hr",
    type: "Contract",
    category: "AI Data",
    verified: false,
  },

  {
    id: 9,
    title: "AI Operations Specialist",
    company: "Invisible Technologies",
    location: "Remote",
    salary: "$22–40/hr",
    type: "Contract",
    category: "AI Operations",
    verified: false,
  },

  {
    id: 10,
    title: "AI Data Annotator",
    company: "TELUS Digital",
    location: "Remote",
    salary: "$15–25/hr",
    type: "Contract",
    category: "AI Data",
    verified: false,
  },
];