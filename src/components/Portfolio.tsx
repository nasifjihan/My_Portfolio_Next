"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useState } from "react";
import { FaArrowRight, FaChevronRight, FaHeart, FaXmark } from "react-icons/fa6";
import Container from "@/components/ui/Container";
import Grid from "@/components/ui/Grid";
import { NeoButton, NeoLink } from "@/components/ui/NeoButton";
import { neoSurface } from "@/components/ui/NeoCard";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects, type Project } from "@/content/portfolio";
import { cn } from "@/lib/cn";

export default function Portfolio() {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <Section id="portfolio">
      <Container>
        <SectionHeading
          eyebrow="VISIT MY PORTFOLIO AND KEEP YOUR FEEDBACK"
          title="My Portfolio"
          centered
        />

        <Grid>
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setOpenProject(project)}
              aria-haspopup="dialog"
              className={cn(
                neoSurface,
                "group relative block w-full reveal cursor-pointer text-left hover:bg-none",
              )}
            >
              <div className="relative h-[220px] overflow-hidden rounded-[10px] min-[640px]:h-[300px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 900px) 45vw, 30vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110 group-focus-visible:scale-110"
                />
              </div>

              <div className="flex items-center justify-between pt-[15px]">
                <h2 className="text-2xl transition-colors duration-[350ms] group-hover:text-brand group-focus-visible:text-brand">
                  {project.title}
                </h2>
                <span className="flex items-center gap-1 text-sm text-ink-muted">
                  <FaHeart aria-hidden />
                  {project.totalLike}
                </span>
              </div>

              <div className="my-[10px] uppercase">
                <span className="text-[13px] font-medium">{project.subtitle}</span>
                <span
                  className="absolute right-[30px] -rotate-45 text-brand opacity-0 transition-opacity duration-[350ms] group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden
                >
                  <FaArrowRight />
                </span>
              </div>
            </button>
          ))}
        </Grid>
      </Container>

      <Dialog.Root
        open={openProject !== null}
        onOpenChange={(open) => {
          if (!open) setOpenProject(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[9999] overflow-y-auto bg-surface/90" />
          {openProject && (
            <Dialog.Content
              aria-describedby={undefined}
              className="relative z-[10000] mx-auto my-[6vh] w-[min(85%,1100px)] rounded-[10px] bg-[#f0f3f5] p-10 leading-[1.4] shadow-neu max-[900px]:p-6"
            >
              <Dialog.Close asChild>
                <NeoButton
                  shape="circle"
                  className="absolute top-3.5 right-3.5 text-brand hover:translate-y-0"
                  aria-label="Close project"
                >
                  <FaXmark aria-hidden />
                </NeoButton>
              </Dialog.Close>

              <div className="flex flex-wrap gap-8">
                <div className="shrink-0 basis-full min-[900px]:basis-[42%]">
                  <Image
                    src={openProject.image}
                    alt={openProject.title}
                    width={826}
                    height={540}
                    sizes="(max-width: 900px) 100vw, 40vw"
                    className="h-auto w-full rounded-[10px]"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div>
                    <Dialog.Title asChild>
                      <h1 className="mb-[10px] text-3xl text-brand">{openProject.title}</h1>
                    </Dialog.Title>
                    <p className="text-[15px] text-[#555]">{openProject.description}</p>

                    <h4 className="my-[15px_0_10px] text-2xl text-[#333]">Technologies Used:</h4>
                    <ul className="flex list-none flex-wrap p-0">
                      {openProject.technologies.map((tech) => (
                        <li key={tech} className="text-brand">
                          {tech} <span className="mx-2 text-[#555]">|</span>
                        </li>
                      ))}
                    </ul>

                    <h4 className="my-[15px_0_10px] text-2xl text-[#333]">Key Features:</h4>
                    <ul>
                      {openProject.features.map((feature) => (
                        <li key={feature} className="mb-[5px] text-[15px] text-[#555]">
                          - {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-[22px] flex flex-wrap gap-3.5">
                    <NeoLink
                      href={openProject.view}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold"
                    >
                      VIEW PROJECT <FaChevronRight aria-hidden />
                    </NeoLink>
                  </div>
                </div>
              </div>
            </Dialog.Content>
          )}
        </Dialog.Portal>
      </Dialog.Root>
    </Section>
  );
}
