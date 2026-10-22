"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaBars, FaDownload, FaXmark } from "react-icons/fa6";
import { navLinks, sectionIds, site, socials } from "@/content/site";

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
      <header className={isScrolled ? "header active" : "header"}>
        <div className="d_flex container">
          <a className="logo" href="#home" aria-label={`${site.name} — home`}>
            <Image src="/image/nasif-profile.jpg" alt="" width={50} height={50} priority />
          </a>

          <div className="f_flex items-center">
            <nav aria-label="Primary">
              <ul className="link f_flex uppercase">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} data-active={activeId === link.href.slice(1)}>
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    className="home-btn"
                    href={site.resumeUrl}
                    download
                    aria-label="Download resume as PDF"
                  >
                    <FaDownload aria-hidden />
                    Resume
                  </a>
                </li>
              </ul>
            </nav>

            <Dialog.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <Dialog.Trigger className="nav-toggle" aria-label="Open menu">
                <FaBars aria-hidden />
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="drawer-overlay" />
                <Dialog.Content className="drawer" aria-describedby={undefined}>
                  <Dialog.Title className="sr-only">Site navigation</Dialog.Title>
                  <Dialog.Close className="drawer-close" aria-label="Close menu">
                    <FaXmark aria-hidden />
                  </Dialog.Close>

                  <nav aria-label="Mobile">
                    <ul className="uppercase">
                      {navLinks.map((link) => (
                        <li key={link.href}>
                          <a href={link.href} onClick={() => setIsMenuOpen(false)}>
                            {link.label}
                          </a>
                        </li>
                      ))}
                      <li>
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
        </div>
      </header>

      <div className="fixed top-[35%] left-0 z-[800] hidden flex-col lg:flex">
        <ul>
          {socials.map(({ label, href, icon: Icon, className }) => (
            <li
              key={label}
              className={`ml-[-100px] flex h-[60px] w-[160px] items-center justify-between p-4 transition-[margin] duration-300 ease-out hover:ml-[-5px] ${className}`}
            >
              <a
                className="flex w-full items-center justify-between text-gray-300"
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
