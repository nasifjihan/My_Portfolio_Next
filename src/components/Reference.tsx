"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaQuoteRight } from "react-icons/fa6";
import SectionHeading from "@/components/SectionHeading";
import { references } from "@/content/references";

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
    <section className="Reference" id="references">
      <div className="container">
        <SectionHeading eyebrow="REFERENCES" title="Reference" centered />

        <div
          className="slide"
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
            const position = isActive ? "activeSlide" : isPrevious ? "lastSlide" : "nextSlide";

            return (
              <article
                key={reference.id}
                className={`d_flex ${position}`}
                aria-hidden={!isActive}
                aria-roledescription="slide"
                aria-label={`${slideIndex + 1} of ${total}`}
              >
                <div className="left box_shadow">
                  <div className="img">
                    <Image
                      src={reference.image}
                      alt={reference.name}
                      fill
                      sizes="(max-width: 900px) 190px, 30vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="right">
                  <div className="quote" aria-hidden>
                    <FaQuoteRight />
                  </div>

                  <div className="content box_shadow">
                    <h1>{reference.name}</h1>
                    <h3>{reference.designation}</h3>
                    <h3>{reference.company}</h3>
                    <h3>{reference.address}</h3>
                    <p>{reference.desc}</p>
                  </div>
                </div>
              </article>
            );
          })}

          <div className="slide_button">
            <button
              type="button"
              className="btn_shadow"
              onClick={() => goTo(index - 1)}
              aria-label="Previous reference"
            >
              <FaArrowLeft aria-hidden />
            </button>
            <button
              type="button"
              className="btn_shadow"
              onClick={() => goTo(index + 1)}
              aria-label="Next reference"
            >
              <FaArrowRight aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
