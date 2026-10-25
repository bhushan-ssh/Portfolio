import { skills, exploring } from "../data/skills";
import SectionHeading from "./SectionHeading";
import Icon from "./Icon";
import "./Skills.css";
export default function Skills() {
  return (
    <section
      id="skills"
      className="section container reveal"
      aria-label="Skills"
    >
      <div className="heading-row">
        <SectionHeading
          number="03"
          label="THE TOOLKIT"
          title="The tools behind"
          accent="the ideas."
        />
        <p className="aside-copy">
          A practical foundation for building across the stack.
        </p>
      </div>
      <div className="skills-grid">
        {skills.map((group) => (
          <article className="skill-card" key={group.title}>
            <span className="skill-icon">
              <Icon name={group.icon} size={24} />
            </span>
            <h3>{group.title}</h3>
            <div className="tech-list">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="exploring">
        <span>
          <Icon name="sparkles" /> Currently exploring
        </span>
        <p>{exploring.join(" · ")}</p>
      </div>
    </section>
  );
}
