"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaQuoteRight } from "react-icons/fa6";
import Container from "@/components/ui/Container";
import NeoCard from "@/components/ui/NeoCard";
import { NeoButton } from "@/components/ui/NeoButton";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { references } from "@/content/references";
import { cn } from "@/lib/cn";

const AUTOPLAY_MS = 3000;
const total = references.length;

export default function Reference() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((next: number) => {
    setIndex(((next % total) + total) % total);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => setIndex((current) => (current + 1) % total), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [isPaused]);

  return (
    <Section id="references">
      <Container>
        <SectionHeading eyebrow="REFERENCES" title="Reference" centered />

        <div
          className="relative mx-auto flex min-h-[70vh] max-w-[90%] overflow-hidden min-[900px]:min-h-[500px]"
          role="group"
          aria-roledescription="carousel"
          aria-label="Client and colleague references"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {references.map((reference, slideIndex) => {
            const isActive = slideIndex === index;
            const isPrevious = slideIndex === (index - 1 + total) % total;

            return (
              <article
                key={reference.id}
                aria-hidden={!isActive}
                aria-roledescription="slide"
                aria-label={`${slideIndex + 1} of ${total}`}
                className={cn(
                  "absolute inset-0 flex size-full flex-col p-5 transition-[opacity,translate] duration-[400ms] ease-linear min-[900px]:flex-row min-[900px]:p-0",
                  isActive && "translate-x-0 opacity-100",
                  !isActive && "pointer-events-none opacity-0",
                  !isActive && (isPrevious ? "-translate-x-full" : "translate-x-full"),
                )}
              >
                <NeoCard className="m-0 mt-[15%] flex w-full p-0 min-[900px]:m-5 min-[900px]:w-[35%] min-[900px]:p-[35px]">
                  <div className="relative h-full min-h-[190px] w-full max-w-[190px] overflow-hidden rounded-[10px] min-[900px]:min-h-[320px] min-[900px]:max-w-none">
                    <Image
                      src={reference.image}
                      alt={reference.name}
                      fill
                      sizes="(max-width: 900px) 190px, 30vw"
                      className="object-cover"
                    />
                  </div>
                </NeoCard>

                <div className="m-0 w-full p-0 min-[900px]:mt-5 min-[900px]:mr-5 min-[900px]:w-[65%] min-[900px]:pl-[50px]">
                  <div className="hidden min-[900px]:block" aria-hidden>
                    <FaQuoteRight className="text-[clamp(56px,10vw,120px)] opacity-10" />
                  </div>

                  <NeoCard className="mt-5 p-6 min-[900px]:p-[50px]">
                    <h1 className="mb-1 text-2xl font-black text-brand">{reference.name}</h1>
                    <h3 className="text-sm leading-[22px] font-normal text-ink">
                      {reference.designation}
                    </h3>
                    <h3 className="text-sm leading-[22px] font-normal text-ink">
                      {reference.company}
                    </h3>
                    <h3 className="text-sm leading-[22px] font-normal text-ink">
                      {reference.address}
                    </h3>
                    <p className="mt-5 text-black">{reference.desc}</p>
                  </NeoCard>
                </div>
              </article>
            );
          })}

          <div className="absolute top-3 right-3 z-10 flex gap-[30px] min-[900px]:top-[30px] min-[900px]:right-[30px]">
            <NeoButton
              shape="circle"
              onClick={() => goTo(index - 1)}
              aria-label="Previous reference"
              className="text-brand"
            >
              <FaArrowLeft aria-hidden />
            </NeoButton>
            <NeoButton
              shape="circle"
              onClick={() => goTo(index + 1)}
              aria-label="Next reference"
              className="text-brand"
            >
              <FaArrowRight aria-hidden />
            </NeoButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}
