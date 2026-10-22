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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8">
          {skillGroups.map((group) => (
            <NeoCard
              key={group.title}
              className="group duration-350ms h-full p-6 transition-[background,color,translate] hover:-translate-y-2.5 hover:bg-brand hover:bg-none hover:text-white xl:p-8"
            >
              <h3 className="mb-5 text-center text-2xl">{group.title}</h3>

              <ul className="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-3 p-0">
                {group.skills.map(({ name, level, icon: Icon }) => (
                  <li key={name} className="flex w-full flex-col items-start">
                    <Icon
                      className="duration-350ms mb-[0.35rem] text-[1.4rem] opacity-55 transition-opacity group-hover:opacity-85"
                      aria-hidden
                    />
                    <span className="text-[13px] leading-5 font-medium">{name}</span>
                    <span className="duration-350ms mt-[0.2rem] text-[0.78rem] text-[#555] transition-colors group-hover:text-white">
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
