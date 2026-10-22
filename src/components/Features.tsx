import { FaArrowRight } from "react-icons/fa6";
import Container from "@/components/ui/Container";
import Grid from "@/components/ui/Grid";
import NeoCard from "@/components/ui/NeoCard";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { features } from "@/content/features";

export default function Features() {
  return (
    <Section id="features">
      <Container>
        <SectionHeading eyebrow="Features" title="What I Do" />

        <Grid>
          {features.map(({ id, icon: Icon, title, desc }) => (
            <NeoCard
              key={id}
              className="group reveal p-[30px_30px_30px_40px] transition-[background,color,translate] duration-[350ms] hover:-translate-y-2.5 hover:bg-brand hover:bg-none hover:text-white"
            >
              <Icon
                className="text-[34px] text-brand transition-colors duration-[350ms] group-hover:text-white"
                aria-hidden
              />
              <h2 className="mt-[15px] mb-[18px] text-2xl">{title}</h2>
              <p className="transition-colors duration-[350ms]">{desc}</p>
              <FaArrowRight
                className="mt-5 text-[30px] opacity-0 transition-opacity duration-[350ms] group-hover:opacity-100"
                aria-hidden
              />
            </NeoCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
