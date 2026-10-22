import {
  SiHtml5,
  SiCss,
  SiSass,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiReactquery,
  SiBootstrap,
  SiTailwindcss,
  SiMui,
  SiAntdesign,
  SiShadcnui,
  SiChartdotjs,
  SiApacheecharts,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMongoose,
  SiPostgresql,
  SiMysql,
  SiPrisma,
  SiRedis,
  SiFirebase,
  SiJsonwebtokens,
  SiCloudinary,
  SiMinutemailer,
  SiDocker,
  SiGithubactions,
  SiGithub,
  SiGitlab,
  SiGooglechrome,
  SiPostman,
  SiHoppscotch,
  SiAuth0,
  SiAxios,
  SiZod,
  SiJira,
  SiCypress,
  SiClickup,
  SiNetlify,
  SiVercel,
  SiRender,
  SiLinux,
  SiFigma,
  SiSketch,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import {
  FaDatabase,
  FaToolbox,
  FaObjectUngroup,
  FaImage,
  FaPenNib,
  FaFilm,
  FaClapperboard,
  FaFileLines,
  FaPalette,
} from "react-icons/fa6";
import { TbApi } from "react-icons/tb";
import type { IconType } from "react-icons";

export type SkillLevel = "Basic" | "Intermediate" | "Advanced";

export type Skill = {
  name: string;
  level: SkillLevel;
  icon: IconType;
};

export type SkillGroup = {
  title: string;
  skills: Skill[];
};

/**
 * Brand icons ship as tree-shaken inline SVGs, replacing the previous
 * `devicon` webfont loaded from a CDN (~1 MB of font for ~30 glyphs).
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML", level: "Basic", icon: SiHtml5 },
      { name: "CSS", level: "Advanced", icon: SiCss },
      { name: "SCSS", level: "Advanced", icon: SiSass },
      { name: "JavaScript", level: "Advanced", icon: SiJavascript },
      { name: "TypeScript", level: "Intermediate", icon: SiTypescript },
      { name: "React JS", level: "Advanced", icon: SiReact },
      { name: "Next JS", level: "Advanced", icon: SiNextdotjs },
      { name: "Redux", level: "Advanced", icon: SiRedux },
      { name: "Redux Toolkit", level: "Advanced", icon: SiRedux },
      { name: "RTK Query", level: "Advanced", icon: SiRedux },
      { name: "TanStack Query", level: "Advanced", icon: SiReactquery },
      { name: "Bootstrap", level: "Intermediate", icon: SiBootstrap },
      { name: "Tailwind", level: "Advanced", icon: SiTailwindcss },
      { name: "Material UI", level: "Intermediate", icon: SiMui },
      { name: "Ant Design", level: "Advanced", icon: SiAntdesign },
      { name: "ShadCN", level: "Advanced", icon: SiShadcnui },
      { name: "Recharts", level: "Advanced", icon: SiChartdotjs },
      { name: "ECharts", level: "Advanced", icon: SiApacheecharts },
      { name: "AOS", level: "Advanced", icon: SiFramer },
      { name: "Motion", level: "Advanced", icon: SiFramer },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node JS", level: "Intermediate", icon: SiNodedotjs },
      { name: "Express JS", level: "Intermediate", icon: SiExpress },
      { name: "SQL", level: "Intermediate", icon: FaDatabase },
      { name: "NoSQL", level: "Intermediate", icon: FaDatabase },
      { name: "MongoDB", level: "Intermediate", icon: SiMongodb },
      { name: "Mongoose", level: "Intermediate", icon: SiMongoose },
      { name: "PostgreSQL", level: "Intermediate", icon: SiPostgresql },
      { name: "MySQL", level: "Intermediate", icon: SiMysql },
      { name: "Prisma ORM", level: "Intermediate", icon: SiPrisma },
      { name: "Redis", level: "Intermediate", icon: SiRedis },
      { name: "Firebase", level: "Intermediate", icon: SiFirebase },
      { name: "REST API", level: "Intermediate", icon: TbApi },
      { name: "JWT", level: "Intermediate", icon: SiJsonwebtokens },
      { name: "Cloudinary", level: "Intermediate", icon: SiCloudinary },
      { name: "Nodemailer", level: "Intermediate", icon: SiMinutemailer },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Docker", level: "Intermediate", icon: SiDocker },
      { name: "CI/CD", level: "Intermediate", icon: SiGithubactions },
      { name: "GitHub", level: "Intermediate", icon: SiGithub },
      { name: "GitLab", level: "Intermediate", icon: SiGitlab },
      { name: "VS Code", level: "Intermediate", icon: VscVscode },
      { name: "Dev Tools", level: "Intermediate", icon: SiGooglechrome },
      { name: "Postman", level: "Intermediate", icon: SiPostman },
      { name: "Hoppscotch", level: "Intermediate", icon: SiHoppscotch },
      { name: "OAuth", level: "Intermediate", icon: SiAuth0 },
      { name: "Bcrypt", level: "Intermediate", icon: FaToolbox },
      { name: "Axios", level: "Advanced", icon: SiAxios },
      { name: "Zod", level: "Advanced", icon: SiZod },
      { name: "Jira", level: "Intermediate", icon: SiJira },
      { name: "Cypress", level: "Intermediate", icon: SiCypress },
      { name: "ClickUp", level: "Intermediate", icon: SiClickup },
      { name: "Netlify", level: "Intermediate", icon: SiNetlify },
      { name: "Vercel", level: "Intermediate", icon: SiVercel },
      { name: "Render", level: "Intermediate", icon: SiRender },
      { name: "Linux", level: "Intermediate", icon: SiLinux },
    ],
  },
  {
    title: "Design",
    skills: [
      { name: "Figma", level: "Intermediate", icon: SiFigma },
      { name: "Adobe XD", level: "Intermediate", icon: FaObjectUngroup },
      { name: "Adobe Photoshop", level: "Intermediate", icon: FaImage },
      {
        name: "Adobe Illustrator",
        level: "Intermediate",
        icon: FaPenNib,
      },
      {
        name: "Adobe Premiere Pro",
        level: "Intermediate",
        icon: FaFilm,
      },
      {
        name: "Adobe After Effect",
        level: "Intermediate",
        icon: FaClapperboard,
      },
      { name: "MS Office", level: "Intermediate", icon: FaFileLines },
      { name: "Sketch", level: "Intermediate", icon: SiSketch },
      { name: "Canva", level: "Intermediate", icon: FaPalette },
    ],
  },
];
