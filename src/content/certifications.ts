export type Certification = {
  name: string;
  link: string;
  company: string;
  image: string;
  date: string;
};

const hero = "/image/certificationImage/hero.jpg";
const udemy = "/image/certificationImage/udemy.png";
const linkedin = "/image/certificationImage/linkedin2.png";
const bymp = "/image/certificationImage/bymp.jpg";

export const certifications: Certification[] = [
  {
    name: "Complete Web Development Course With Jhankar Mahbub",
    link: "https://web.programming-hero.com",
    company: "Programming Hero",
    image: hero,
    date: "December 20, 2021",
  },
  {
    name: "Next Level Web Development",
    link: "https://web.programming-hero.com/home/level2",
    company: "Programming Hero",
    image: hero,
    date: "October 24, 2023",
  },
  {
    name: "Think In A Redux Way",
    link: "https://learnwithsumit.com/think-in-a-redux-way",
    company: "Learn with Sumit",
    image: "/image/certificationImage/learnwithsumit.jpg",
    date: "June 14, 2025",
  },
  {
    name: "CSE Fundamentals With Phitron",
    link: "https://phitron.io",
    company: "Phitron",
    image: "/image/certificationImage/phitron.png",
    date: "21-09-2023",
  },
  {
    name: "Photoshop CC for Beginners – A Comprehensive Crash course",
    link: "https://www.udemy.com/course/photoshop-cc-for-beginners-a-comprehensive-crash-course",
    company: "Udemy",
    image: udemy,
    date: "April 1, 2020",
  },
  {
    name: "Adobe Photoshop CC Complete Course + NEW Generative AI Tools",
    link: "https://www.udemy.com/course/adobe-photoshop-course",
    company: "Udemy",
    image: udemy,
    date: "July 15, 2020",
  },
  {
    name: "Illustrator for Non-Illustrators",
    link: "https://www.linkedin.com/learning/illustrator-for-non-illustrators",
    company: "LinkedIn Learning",
    image: linkedin,
    date: "February 13, 2019",
  },
  {
    name: "Video Editing Masterclass",
    link: "https://learningbangladesh.com/course/video-editing-masterclass/",
    company: "Learning Bangladesh",
    image: "/image/certificationImage/learning.png",
    date: "February 21, 2024",
  },
  {
    name: "Cameras, Exposure and Photography",
    link: "https://www.coursera.org/learn/exposure-photography",
    company: "Coursera",
    image: "/image/certificationImage/coursera2.png",
    date: "April 2, 2021",
  },
  {
    name: "Co-Ordinator, 12th & 13th Session of Bangladesh Youth Mock Parliament",
    link: "https://www.facebook.com/youthmockparliament",
    company: "BYMP",
    image: bymp,
    date: "2022-2023",
  },
  {
    name: "Parliamentarian, 9th, 10th & 11th Session of Bangladesh Youth Mock Parliament",
    link: "https://www.facebook.com/youthmockparliament",
    company: "BYMP",
    image: bymp,
    date: "2019-2021",
  },
  {
    name: "Volunteer, 7th & 8th Session of Bangladesh Youth Mock Parliament",
    link: "https://www.facebook.com/youthmockparliament",
    company: "BYMP",
    image: bymp,
    date: "2017-2018",
  },
];
