export type ResumeCategory = "education" | "experience";

export type ResumeEntry = {
  id: number;
  category: ResumeCategory;
  year: string;
  title: string;
  desc: string;
  rate: string;
};

export const resume: ResumeEntry[] = [
  {
    id: 1,
    category: "education",
    year: "Ideal Institute of Business & Science (IIBS), (2018 - 2023)",
    title: "Bachelor of Science (BSc) in Computer Science & Engineering (CSE)",
    desc: "I completed my Bachelor of Science (BSc) in Computer Science & Engineering (CSE) from Ideal Institute of Business & Science (IIBS), Mirpur-11, Dhaka, under National University, Bangladesh, with a CGPA of 3.00 out of 4.00, from 2018 to 2023.",
    rate: "3.00/4",
  },
  {
    id: 2,
    category: "education",
    year: "Quality Education College, Khilgaon, Dhaka (2015 - 2017)",
    title: "Higher Secondary School Certificate (HSC) in Science",
    desc: "I completed my Higher Secondary School Certificate (HSC) in Science from Quality Education College, Khilgaon, Dhaka, with a GPA of 4.58 out of 5.00, from 2015 to 2017.",
    rate: "4.58/5",
  },
  {
    id: 3,
    category: "education",
    year: "Shahid Zia High School, Mymensingh (2013 - 2015)",
    title: "Secondary School Certificate (SSC) in Science",
    desc: "I completed my Secondary School Certificate (SSC) in Science from Shahid Zia High School, Mymensingh, with a GPA of 4.50 out of 5.00, from 2013 to 2015.",
    rate: "4.50/5",
  },
  {
    id: 4,
    category: "experience",
    year: "Multibrand Workshop ltd (June, 2025 - Present)",
    title: "Frontend Developer",
    desc: "Led the frontend development of a multi-module ERP system using React, Tailwind CSS, RTK Query, and TanStack Table. Developed interactive dashboards with reusable, accessible components and dynamic visualizations (Pie, Bar, Line, 3D) using Radix UI and ECharts. Implemented secure authentication and role-based access control (RBAC) for multi-user access.",
    rate: "ERP System",
  },
  {
    id: 5,
    category: "experience",
    year: "Parts Bazar (Apr 2025 - June 2025)",
    title: "Frontend Developer",
    desc: "Led the design, development, and deployment of partsbazar.com.bd — a fully functional e-commerce platform for vehicle parts business. The project included building a client-facing storefront, a user dashboard, and a admin panel.",
    rate: "E-Commerce",
  },
  {
    id: 6,
    category: "experience",
    year: "TS4U IT (Oct 2024 - Mar 2025)",
    title: "Jr. Frontend Developer",
    desc: "I contributed to the development of Bootcamps Hub (LMS) and Bizcoms (PM Tool). My responsibilities included building 20+ reusable components, fixing over 1,000+ bugs, implementing drag-and-drop features and creating dashboards and test management tools.",
    rate: "In-house products",
  },
];

export const resumeHeadings = {
  education: { range: "2013-2023", title: "Education Quality" },
  experience: { range: "2024-Present", title: "Job Experience" },
} as const;
