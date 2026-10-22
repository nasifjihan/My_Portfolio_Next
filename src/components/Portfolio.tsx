"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useState } from "react";
import { FaArrowRight, FaChevronRight, FaHeart, FaXmark } from "react-icons/fa6";
import SectionHeading from "@/components/SectionHeading";
import { projects, type Project } from "@/content/portfolio";

export default function Portfolio() {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <section className="Portfolio top" id="portfolio">
      <div className="container">
        <SectionHeading
          eyebrow="VISIT MY PORTFOLIO AND KEEP YOUR FEEDBACK"
          title="My Portfolio"
          centered
        />

        <div className="content grid">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              className="box btn_shadow reveal"
              onClick={() => setOpenProject(project)}
              aria-haspopup="dialog"
            >
              <div className="img">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 900px) 45vw, 30vw"
                  className="object-cover"
                />
              </div>

              <div className="title d_flex">
                <h2>{project.title}</h2>
                <span className="flex items-center gap-1 text-sm text-ink-muted">
                  <FaHeart aria-hidden />
                  {project.totalLike}
                </span>
              </div>

              <div className="category">
                <span>{project.subtitle}</span>
                <span className="arrow" aria-hidden>
                  <FaArrowRight />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog.Root
        open={openProject !== null}
        onOpenChange={(open) => {
          if (!open) setOpenProject(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          {openProject && (
            <Dialog.Content className="dialog-content" aria-describedby={undefined}>
              <Dialog.Close className="dialog-close" aria-label="Close project">
                <FaXmark aria-hidden />
              </Dialog.Close>

              <div className="d_flex flex-wrap gap-8">
                <div className="dialog-media">
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
                  <div className="project-details">
                    <Dialog.Title asChild>
                      <h1>{openProject.title}</h1>
                    </Dialog.Title>
                    <p>{openProject.description}</p>

                    <h4>Technologies Used:</h4>
                    <ul className="tech">
                      {openProject.technologies.map((tech) => (
                        <li key={tech}>
                          {tech} <span>|</span>
                        </li>
                      ))}
                    </ul>

                    <h4>Key Features:</h4>
                    <ul>
                      {openProject.features.map((feature) => (
                        <li key={feature}>- {feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="dialog-actions">
                    <a
                      className="btn_shadow"
                      href={openProject.view}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      VIEW PROJECT <FaChevronRight aria-hidden />
                    </a>
                  </div>
                </div>
              </div>
            </Dialog.Content>
          )}
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
