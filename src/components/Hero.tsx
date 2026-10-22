"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { FaDownload } from "react-icons/fa6";
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

export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animated = useTypewriter(site.rotatingTaglines, !prefersReducedMotion);
  const tagline = prefersReducedMotion ? site.rotatingTaglines[0] : animated;

  return (
    <section className="hero" id="home">
      <div className="f_flex container">
        <div className="left top">
          <h3 className="uppercase">{heroCopy.eyebrow}</h3>

          <h1>
            {heroCopy.greeting} <span>{site.name}</span>{" "}
            <span className="wave-icon" aria-hidden>
              🖐️
            </span>
          </h1>

          <h2>
            a
            <span aria-hidden>
              {tagline}
              {!prefersReducedMotion && <span className="typed-cursor">|</span>}
            </span>
            <span className="sr-only">MERN Developer and Frontend Developer</span>
          </h2>

          <p>{heroCopy.intro}</p>

          <div className="hero_btn d_flex">
            <div className="col_1">
              <h4>{heroCopy.resumeLabel}</h4>
              <a
                className="btn_shadow inline-flex items-center gap-2"
                href={site.resumeUrl}
                download
                aria-label="Download resume as PDF"
              >
                <FaDownload aria-hidden />
                Resume
              </a>
            </div>

            <div className="col_1">
              <h4>{heroCopy.socialLabel}</h4>
              <div className="button">
                {heroSocials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    className="btn_shadow"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} on ${label}`}
                  >
                    <Icon aria-hidden />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="right_img">
            <div className="myimg">
              <Image
                src="/image/nasif-hero.jpeg"
                alt={`${site.name}, ${site.role}`}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
