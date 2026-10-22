import SectionHeading from "@/components/SectionHeading";
import { skillGroups } from "@/content/skills";

export default function Skills() {
  return (
    <section className="features top" id="skills">
      <div className="container">
        <SectionHeading eyebrow="My Technical Level" title="Skills" centered />

        <div className="skills-container">
          {skillGroups.map((group) => (
            <div key={group.title} className="skill-card box btn_shadow">
              <h3>{group.title}</h3>
              <ul>
                {group.skills.map(({ name, level, icon: Icon }) => (
                  <li key={name}>
                    <Icon aria-hidden />
                    {name} <span>{level}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
