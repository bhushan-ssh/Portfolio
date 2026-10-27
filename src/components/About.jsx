import SectionHeading from "./SectionHeading";
import Education from "./Education";
import Icon from "./Icon";
import "./About.css";
export default function About() {
  return (
    <section
      id="about"
      className="section section-band about-section reveal"
      aria-label="About me"
    >
      <div className="container about-grid">
        <div>
          <SectionHeading
            number="01"
            label="ABOUT ME"
            title="Curious mind."
            accent="Practical solutions."
          />
          <div className="quick-facts">
            <p>
              <Icon name="code" /> From database to interface
            </p>
            <p>
              <Icon name="education" /> Learning across two disciplines
            </p>
            <p>
              <Icon name="sparkles" /> Open to internships & collaboration
            </p>
          </div>
        </div>
        <div className="about-copy">
          <p className="lead">
            I&apos;m a developer and a Data Science student at IIT Madras,
            interested in building reliable applications from the database to
            the user interface.
          </p>
          <p>
            My experience includes Python, Flask, REST API development,
            authentication, database design, and applied machine learning. I
            enjoy learning by building projects and working with a team to solve
            real problems.
          </p>
          <Education />
        </div>
      </div>
    </section>
  );
}
