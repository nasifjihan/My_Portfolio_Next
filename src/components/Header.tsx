"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaBars, FaDownload, FaXmark } from "react-icons/fa6";
import Container from "@/components/ui/Container";
import { NeoButton, NeoLink } from "@/components/ui/NeoButton";
import { navLinks, sectionIds, site, socials } from "@/content/site";
import { cn } from "@/lib/cn";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>(sectionIds[0]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const first = sectionIds.find((id) => visible.has(id));
        if (first) setActiveId(first);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={cn(
          "duration-350ms sticky top-0 z-1000 h-[10vh] min-h-18 bg-surface transition-[height,box-shadow]",
          isScrolled && "h-[12vh] shadow-header max-[980px]:h-[10vh]",
        )}
      >
        <Container className="flex h-full items-center justify-between">
          <a
            className="block w-12 shrink-0 cursor-pointer"
            href="#home"
            aria-label={`${site.name} — home`}
          >
            <Image
              src="/image/nasif-profile.jpg"
              alt=""
              width={50}
              height={50}
              priority
              className="h-auto w-full rounded-full"
            />
          </a>

          <div className="flex items-center">
            <nav aria-label="Primary">
              <ul className="hidden items-center uppercase min-[980px]:flex">
                {navLinks.map((link) => (
                  <li key={link.href} className="ml-7.5">
                    <a
                      href={link.href}
                      data-active={activeId === link.href.slice(1)}
                      aria-current={activeId === link.href.slice(1) ? "true" : undefined}
                      className="duration-350ms text-[13px] font-medium tracking-[1px] transition-colors hover:text-brand data-[active=true]:text-brand"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="ml-7.5">
                  <NeoLink
                    className="h-fit px-5 py-4 text-[13px] text-brand hover:translate-y-0"
                    href={site.resumeUrl}
                    download
                    aria-label="Download resume as PDF"
                  >
                    <FaDownload aria-hidden />
                    Resume
                  </NeoLink>
                </li>
              </ul>
            </nav>

            <Dialog.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <Dialog.Trigger
                className="block cursor-pointer text-2xl leading-none text-brand min-[980px]:hidden"
                aria-label="Open menu"
              >
                <FaBars aria-hidden />
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-1100 bg-black/25" />
                <Dialog.Content
                  aria-describedby={undefined}
                  className="fixed inset-y-0 left-0 z-1200 w-[min(50%,320px)] bg-white pt-7.5 shadow-2xl"
                >
                  <Dialog.Title className="sr-only">Site navigation</Dialog.Title>
                  <Dialog.Close asChild>
                    <NeoButton
                      shape="circleLg"
                      className="mx-auto flex text-brand hover:translate-y-0"
                      aria-label="Close menu"
                    >
                      <FaXmark aria-hidden />
                    </NeoButton>
                  </Dialog.Close>

                  <nav aria-label="Mobile">
                    <ul className="uppercase">
                      {navLinks.map((link) => (
                        <li key={link.href} className="w-full px-5 leading-15">
                          <a href={link.href} onClick={() => setIsMenuOpen(false)}>
                            {link.label}
                          </a>
                        </li>
                      ))}
                      <li className="w-full px-5 leading-15">
                        <a href={site.resumeUrl} download onClick={() => setIsMenuOpen(false)}>
                          resume (pdf)
                        </a>
                      </li>
                    </ul>
                  </nav>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </Container>
      </header>

      <div className="fixed top-[35%] left-0 z-800 hidden flex-col 2xl:flex">
        <ul>
          {socials.map(({ label, href, icon: Icon, className }) => (
            <li
              key={label}
              className={cn(
                "-ml-25 flex h-15 w-40 items-center justify-between p-4 transition-[margin] duration-300 ease-out focus-within:-ml-1.25 hover:-ml-1.25",
                className,
              )}
            >
              <a
                className="flex w-full items-center justify-between text-white"
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
              >
                {label}
                <Icon size={30} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
