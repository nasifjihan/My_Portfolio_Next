import {
  FaCode,
  FaLaptopCode,
  FaServer,
  FaMobileScreen,
  FaPlug,
  FaFolderOpen,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

export type Feature = {
  id: number;
  icon: IconType;
  title: string;
  desc: string;
};

/**
 * Replaces the previous remote `img.icons8.com` PNGs with inlined SVG icons so
 * the section renders without any third-party image requests.
 */
export const features: Feature[] = [
  {
    id: 1,
    icon: FaCode,
    title: "Full-Stack Development",
    desc: "Building dynamic web applications using MongoDB, Express.js, React, and Node.js.",
  },
  {
    id: 2,
    icon: FaLaptopCode,
    title: "Frontend Development",
    desc: "Creating responsive and engaging user interfaces with React and modern JavaScript.",
  },
  {
    id: 3,
    icon: FaServer,
    title: "Backend Development",
    desc: "Developing robust server-side applications with Node.js and Express.js.",
  },
  {
    id: 4,
    icon: FaMobileScreen,
    title: "Mobile App Development",
    desc: "Designing and developing mobile applications using React Native.",
  },
  {
    id: 5,
    icon: FaPlug,
    title: "API Integration",
    desc: "Integrating third-party APIs to enhance application functionality and performance.",
  },
  {
    id: 6,
    icon: FaFolderOpen,
    title: "Personal Projects",
    desc: "Showcasing various personal projects that demonstrate my skills in MERN stack development.",
  },
];
