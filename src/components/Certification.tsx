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

        <ul className="divide-y divide-gray-100">
          {certifications.map((item) => (
            <li
              key={`${item.name}-${item.date}`}
              className={cn(
                neoSurface,
                "group mb-5 flex flex-col justify-between gap-x-6 p-[30px] transition-[background,color] duration-[350ms] hover:bg-brand-soft hover:bg-none hover:text-white hover:shadow-none sm:flex-row",
              )}
            >
              <div className="flex min-w-0 gap-x-4">
                <Image
                  src={item.image}
                  alt=""
                  width={48}
                  height={48}
                  className="size-12 flex-none rounded-full bg-gray-50 object-cover"
                />
              </div>

              <div className="flex grow flex-col justify-between">
                <div className="flex flex-col justify-between md:flex-row">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-sm font-semibold">{item.company}</p>
                </div>

                <div className="mt-2 flex flex-col justify-between md:flex-row">
                  <p className="truncate text-xs text-ink-muted group-hover:text-white">
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
