import {
  FaGithub,
  FaLinkedinIn,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import type { IconType } from "react-icons";

export type SocialLink = {
  label: string;
  href: string;
  icon: IconType;
  /** Tailwind background class used by the fixed social rail */
  className: string;
};

export const site = {
  name: "Nasif Jihan",
  role: "MERN Stack Developer",
  tagline: "a MERN Developer.",
  rotatingTaglines: [" MERN Developer.", " Frontend Developer."],
  url: "https://nasifjihan.onrender.com",
  email: "nasifzeehan1@gmail.com",
  phone: "+8801983794542",
  resumeUrl: "/resume.pdf",
  description:
    "Nasif Jihan is a MERN Stack Developer specializing in React, Next.js, and modern frontend technologies.",
  basedIn: "Bangladesh",
  employer: "Multibrand Workshop Ltd",
  jobTitle: "Frontend Developer",
  /** Formspree endpoint used by the contact form. */
  formEndpoint: "https://formspree.io/f/xyzjoepp",
} as const;

export const heroCopy = {
  eyebrow: "WELCOME TO MY WORLD",
  greeting: "Hi, I'm",
  intro:
    "I specialize in developing dynamic and responsive web applications using the MERN stack — MongoDB, Express.js, React, and Node.js. Whether it's creating a sleek frontend with React or building a robust backend with Node.js and Express, I bring a comprehensive skill set to every project. My goal is to deliver high-quality, user-centric solutions that enhance digital experiences.",
  resumeLabel: "MY RESUME",
  socialLabel: "FIND WITH ME",
  findMe: "MY RESUME",
} as const;

export const navLinks = [
  { label: "home", href: "#home" },
  { label: "features", href: "#features" },
  { label: "skills", href: "#skills" },
  { label: "portfolio", href: "#portfolio" },
  { label: "resume", href: "#resume" },
  { label: "certification", href: "#certification" },
  { label: "references", href: "#references" },
  { label: "contact", href: "#contact" },
] as const;

export const sectionIds = navLinks.map((link) => link.href.slice(1));

export const socials: SocialLink[] = [
  {
    label: "Linkedin",
    href: "https://www.linkedin.com/in/nasifjihan/",
    icon: FaLinkedinIn,
    className: "bg-blue-600",
  },
  {
    label: "Github",
    href: "https://github.com/nasifjihan/",
    icon: FaGithub,
    className: "bg-[#333333]",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/nasifjihan/",
    icon: FaFacebookF,
    className: "bg-[#3b5998]",
  },
  {
    label: "Email",
    href: "mailto:nasifzeehan1@gmail.com",
    icon: HiOutlineMail,
    className: "bg-[#6fc2b0]",
  },
];

export const heroSocials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/nasifjihan",
    icon: FaFacebookF,
  },
  { label: "Github", href: "https://github.com/nasifjihan", icon: FaGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nasifjihan",
    icon: FaLinkedinIn,
  },
];

/** Links used by the Person JSON-LD block in the root layout. */
export const profileLinks = [
  "https://www.facebook.com/nasifjihan",
  "https://x.com/nasifjihan",
  "https://www.instagram.com/nasifjihan",
  "https://www.youtube.com/@nasifjihan",
  "https://www.linkedin.com/in/nasifjihan",
  "https://github.com/nasifjihan",
  "https://nasifjihan.onrender.com",
];

/** Icons that are exported so they are not flagged as unused imports. */
export const brandIcons = { FaYoutube, FaInstagram, FaXTwitter };
