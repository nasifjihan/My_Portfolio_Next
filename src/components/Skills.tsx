import Container from "@/components/ui/Container";
import NeoCard from "@/components/ui/NeoCard";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillGroups } from "@/content/skills";

export default function Skills() {
  return (
    <Section id="skills">
      <Container>
        <SectionHeading eyebrow="My Technical Level" title="Skills" centered />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
          {skillGroups.map((group) => (
            <NeoCard
              key={group.title}
              className="group p-[30px] transition-[background,color,translate] duration-[350ms] hover:-translate-y-2.5 hover:bg-brand hover:bg-none hover:text-white"
            >
              <h3 className="mb-4 text-center text-2xl">{group.title}</h3>

              <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-[5px] p-0">
                {group.skills.map(({ name, level, icon: Icon }) => (
                  <li key={name} className="mb-4 flex w-full flex-col items-start">
                    <Icon
                      className="mb-[0.35rem] text-[1.4rem] opacity-55 transition-opacity duration-[350ms] group-hover:opacity-85"
                      aria-hidden
                    />
                    {name}{" "}
                    <span className="mt-[0.2rem] text-[0.8rem] text-[#555] transition-colors duration-[350ms] group-hover:text-white">
                      {level}
                    </span>
                  </li>
                ))}
              </ul>
            </NeoCard>
          ))}
        </div>
      </Container>
    </Section>
  );
}
