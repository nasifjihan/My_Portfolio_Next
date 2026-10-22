import Container from "@/components/ui/Container";
import NeoCard from "@/components/ui/NeoCard";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { resume, resumeHeadings, type ResumeEntry } from "@/content/resume";

function ResumeCard({ entry }: { entry: ResumeEntry }) {
  return (
    <NeoCard className="group timeline-marker relative mb-10 reveal p-10 transition-[background,color] duration-[350ms] hover:bg-brand hover:bg-none hover:text-white">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl">{entry.title}</h2>
          <span>{entry.year}</span>
        </div>
        <div>
          <span className="inline-block rounded-md bg-[linear-gradient(145deg,#e2e8ec,#ffffff)] px-[30px] py-[15px] font-bold text-brand shadow-neu transition-colors duration-500 group-hover:bg-brand-soft group-hover:bg-none group-hover:text-white group-hover:shadow-none">
            {entry.rate}
          </span>
        </div>
      </div>

      <hr className="my-[30px] border border-[#e3e9ed] bg-[#e3e9ed]" />

      <p className="text-lg transition-colors duration-[350ms]">{entry.desc}</p>
    </NeoCard>
  );
}

export default function Resume() {
  return (
    <Section id="resume">
      <Container>
        <SectionHeading eyebrow="4+ YEARS OF EXPERIENCE" title="My Resume" centered />

        <div className="flex flex-col gap-10 min-[900px]:flex-row min-[900px]:gap-[6%]">
          {(["education", "experience"] as const).map((category) => (
            <div key={category} className="timeline-rail relative flex-1">
              <div className="mt-[50px]">
                <h4 className="text-base font-normal tracking-[2px] text-brand">
                  {resumeHeadings[category].range}
                </h4>
                <h1 className="text-[clamp(1.5rem,3vw,40px)] leading-[1.15] text-ink">
                  {resumeHeadings[category].title}
                </h1>
              </div>

              <div className="mx-auto max-w-[85%] max-[900px]:max-w-full">
                {resume
                  .filter((entry) => entry.category === category)
                  .map((entry) => (
                    <ResumeCard key={entry.id} entry={entry} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
