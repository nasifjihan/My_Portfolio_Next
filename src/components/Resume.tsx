import SectionHeading from "@/components/SectionHeading";
import { resume, resumeHeadings, type ResumeEntry } from "@/content/resume";

function ResumeCard({ entry }: { entry: ResumeEntry }) {
  return (
    <div className="box btn_shadow">
      <div className="title_content d_flex">
        <div className="title">
          <h2>{entry.title}</h2>
          <span>{entry.year}</span>
        </div>
        <div className="rate">
          <span className="btn_shadow inline-block">{entry.rate}</span>
        </div>
      </div>
      <hr />
      <p>{entry.desc}</p>
    </div>
  );
}

export default function Resume() {
  return (
    <section className="Resume" id="resume">
      <div className="top container">
        <SectionHeading eyebrow="4+ YEARS OF EXPERIENCE" title="My Resume" centered />

        <div className="content-section d_flex">
          {(["education", "experience"] as const).map((category) => (
            <div className="left" key={category}>
              <div className="heading">
                <h4>{resumeHeadings[category].range}</h4>
                <h1>{resumeHeadings[category].title}</h1>
              </div>

              <div className="content">
                {resume
                  .filter((entry) => entry.category === category)
                  .map((entry) => (
                    <ResumeCard key={entry.id} entry={entry} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
