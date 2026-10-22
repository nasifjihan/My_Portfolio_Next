import Container from "@/components/ui/Container";
import NeoCard from "@/components/ui/NeoCard";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { resume, resumeHeadings, type ResumeEntry } from "@/content/resume";

function ResumeCard({ entry }: { entry: ResumeEntry }) {
  return (
    <NeoCard className="group duration-350ms timeline-marker relative mb-8 reveal p-8 transition-[background,color] hover:bg-brand hover:bg-none hover:text-white xl:mb-10 xl:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl">{entry.title}</h2>
          <span>{entry.year}</span>
        </div>
        <div>
          <span className="inline-block rounded-md bg-[linear-gradient(145deg,#e2e8ec,#ffffff)] px-7.5 py-4 font-bold text-brand shadow-neu transition-colors duration-500 group-hover:bg-brand-soft group-hover:bg-none group-hover:text-white group-hover:shadow-none">
            {entry.rate}
          </span>
        </div>
      </div>

      <hr className="my-7.5 border border-[#e3e9ed] bg-[#e3e9ed]" />

      <p className="duration-350ms text-[15px] leading-7 transition-colors">{entry.desc}</p>
    </NeoCard>
  );
}

export default function Resume() {
  return (
    <Section id="resume">
      <Container>
        <SectionHeading eyebrow="4+ YEARS OF EXPERIENCE" title="My Resume" centered />

        <div className="flex flex-col gap-8 min-[900px]:flex-row min-[900px]:gap-[5%] xl:gap-[6%]">
          {(["education", "experience"] as const).map((category) => (
            <div key={category} className="timeline-rail relative flex-1">
              <div className="my-12 min-[900px]:pl-14">
                <h4 className="text-base font-normal tracking-[2px] text-brand">
                  {resumeHeadings[category].range}
                </h4>
                <h1 className="text-[clamp(1.5rem,3vw,40px)] leading-[1.15] text-ink">
                  {resumeHeadings[category].title}
                </h1>
              </div>

              <div className="mx-auto max-w-[85%] max-[900px]:max-w-full min-[900px]:max-w-none min-[900px]:pr-2 min-[900px]:pl-14">
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
