import Certification from "@/components/Certification";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Reference from "@/components/Reference";
import Resume from "@/components/Resume";
import Skills from "@/components/Skills";

export default function HomePage() {
  return (
    <main className="flex-1 space-y-40">
      <Hero />
      <Features />
      <Skills />
      <Portfolio />
      <Resume />
      <Certification />
      <Reference />
      <Contact />
    </main>
  );
}
