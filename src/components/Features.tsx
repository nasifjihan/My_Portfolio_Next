import { FaArrowRight } from "react-icons/fa6";
import SectionHeading from "@/components/SectionHeading";
import { features } from "@/content/features";

export default function Features() {
  return (
    <section className="features top" id="features">
      <div className="container">
        <SectionHeading eyebrow="Features" title="What I Do" />

        <div className="content grid">
          {features.map(({ id, icon: Icon, title, desc }) => (
            <div key={id} className="box btn_shadow reveal">
              <Icon className="feature-icon" aria-hidden />
              <h2>{title}</h2>
              <p>{desc}</p>
              <span className="feature-arrow block" aria-hidden>
                <FaArrowRight />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
