import Image from "next/image";
import Container from "@/components/ui/Container";
import { neoSurface } from "@/components/ui/NeoCard";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { certifications } from "@/content/certifications";
import { cn } from "@/lib/cn";

export default function Certification() {
  return (
    <Section id="certification">
      <Container>
        <SectionHeading eyebrow="MY COURSES & CERTIFICATIONS" title="Certification" centered />

        <ul className="space-y-4">
          {certifications.map((item) => (
            <li
              key={`${item.name}-${item.date}`}
              className={cn(
                neoSurface,
                "group duration-350ms flex flex-col gap-4 p-6 transition-[background,color] hover:bg-brand-soft hover:bg-none hover:text-white hover:shadow-none sm:flex-row sm:items-start sm:gap-5",
              )}
            >
              <div className="flex min-w-0 shrink-0 gap-x-4">
                <Image
                  src={item.image}
                  alt=""
                  width={48}
                  height={48}
                  className="size-12 flex-none rounded-full bg-gray-50 object-cover"
                />
              </div>

              <div className="flex grow flex-col justify-between gap-3">
                <div className="flex flex-col justify-between gap-1 md:flex-row md:gap-4">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-sm font-semibold md:text-right">{item.company}</p>
                </div>

                <div className="flex flex-col justify-between gap-2 md:flex-row md:gap-4">
                  <p className="text-xs break-all text-ink-muted group-hover:text-white md:truncate">
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.link}
                    </a>
                  </p>
                  <p className="text-xs text-ink-muted group-hover:text-white">{item.date}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
