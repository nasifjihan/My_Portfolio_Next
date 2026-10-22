"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { FaDownload } from "react-icons/fa6";
import Container from "@/components/ui/Container";
import { NeoLink } from "@/components/ui/NeoButton";
import Section from "@/components/ui/Section";
import { heroCopy, heroSocials, site } from "@/content/site";

const TYPE_SPEED = 70;
const DELETE_SPEED = 50;
const HOLD_MS = 1200;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

/**
 * Minimal typewriter — replaces the `react-simple-typewriter` dependency.
 * Every state update happens inside a timeout callback so the effect only
 * ever schedules work (no cascading renders).
 */
function useTypewriter(words: readonly string[], enabled: boolean) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const word = words[wordIndex % words.length];
    const isHolding = !isDeleting && text === word;
    const isReset = isDeleting && text === "";

    const timer = window.setTimeout(
      () => {
        if (isHolding) {
          setIsDeleting(true);
        } else if (isReset) {
          setIsDeleting(false);
          setWordIndex((index) => (index + 1) % words.length);
        } else {
          setText(isDeleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
        }
      },
      isHolding ? HOLD_MS : isDeleting ? DELETE_SPEED : TYPE_SPEED,
    );

    return () => window.clearTimeout(timer);
  }, [enabled, isDeleting, text, wordIndex, words]);

  return enabled ? text : "";
}

const label = "mt-[25px] mb-5 text-[15px] font-normal tracking-[2px] text-[#43474b]";

export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animated = useTypewriter(site.rotatingTaglines, !prefersReducedMotion);
  const tagline = prefersReducedMotion ? site.rotatingTaglines[0] : animated;

  return (
    <Section id="home" className="mt-0">
      <Container className="grid items-center gap-y-10 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(320px,510px)] min-[900px]:gap-x-[8%]">
        <div className="mt-16 min-[900px]:mt-20 min-[900px]:max-w-[36rem]">
          <h3 className="text-base font-light tracking-[2px] uppercase">{heroCopy.eyebrow}</h3>

          <h1 className="text-[clamp(2.25rem,6vw,60px)] leading-[1.15] font-bold">
            {heroCopy.greeting} <span className="text-brand">{site.name}</span>{" "}
            <span className="inline-block align-middle text-[clamp(1.5rem,4vw,45px)]" aria-hidden>
              🖐️
            </span>
          </h1>

          <h2 className="min-h-[1.3em] text-[clamp(1.75rem,5vw,50px)] font-bold text-brand">
            a
            <span className="text-black" aria-hidden>
              {tagline}
              {!prefersReducedMotion && <span className="animate-caret">|</span>}
            </span>
            <span className="sr-only">MERN Developer and Frontend Developer</span>
          </h2>

          <p className="mt-[25px] max-w-[34rem] text-[17px] leading-[30px] text-ink-muted">
            {heroCopy.intro}
          </p>

          <div className="mt-2 flex flex-wrap items-start gap-x-10 gap-y-6">
            <div>
              <h4 className={label}>{heroCopy.resumeLabel}</h4>
              <NeoLink
                href={site.resumeUrl}
                download
                aria-label="Download resume as PDF"
                className="text-brand"
              >
                <FaDownload aria-hidden />
                Resume
              </NeoLink>
            </div>

            <div>
              <h4 className={label}>{heroCopy.socialLabel}</h4>
              <div className="flex gap-5">
                {heroSocials.map(({ label: name, href, icon: Icon }) => (
                  <NeoLink
                    key={name}
                    shape="circle"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} on ${name}`}
                    className="text-brand"
                  >
                    <Icon aria-hidden />
                  </NeoLink>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative order-first mx-auto w-full max-w-[510px] min-[900px]:order-none min-[900px]:mx-0">
          <div className="mt-[6%] h-[54vh] w-full rounded-[10px] min-[900px]:mt-[12%] min-[900px]:h-[510px] min-[900px]:px-[50px] min-[900px]:py-5">
            <div className="relative size-full animate-blob overflow-hidden after:absolute after:inset-0 after:shadow-[inset_0_0_0_9px_rgba(0,0,0,0.3)]">
              <Image
                src="/image/nasif-hero.jpeg"
                alt={`${site.name}, ${site.role}`}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
