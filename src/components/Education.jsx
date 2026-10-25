import { education } from "../data/education";
import "./Education.css";
export default function Education() {
  return (
    <div className="education" id="education">
      <h3 className="small-label">THE LEARNING JOURNEY</h3>
      <ol className="education-timeline">
        {education.map((item) => (
          <li key={item.initials}>
            <div className="education-top">
              <span className="education-monogram">{item.initials}</span>
              <span className="education-date">Expected {item.expected}</span>
            </div>
            <h4>{item.institution}</h4>
            <p>
              {item.degree} · {item.subject}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
