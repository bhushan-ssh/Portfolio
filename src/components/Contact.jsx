import { email, socials } from "../data/socials";
import Icon from "./Icon";
import SectionHeading from "./SectionHeading";
import "./Contact.css";

export default function Contact() {
  return (
    <section
      id="contact"
      className="section contact-section reveal"
      aria-label="Contact"
    >
      <div className="container contact-grid">
        <div>
          <SectionHeading
            number="06"
            label="WHAT’S NEXT?"
            title="Have an idea?"
            accent="Let’s connect."
          />
          <p className="contact-description">
            I&apos;m interested in connecting with developers, collaborating on
            projects, and exploring internship opportunities.
          </p>
          <a className="contact-email" href={`mailto:${email}`}>
            {email} <Icon name="arrow" size={20} />
          </a>
          <div className="contact-note">
            <span className="status-dot" /> Open to developer internships &
            opportunities
          </div>
        </div>
        <div className="social-directory" aria-label="Social accounts">
          <h3>Find me online</h3>
          <div className="social-directory-grid">
            {socials.map((social) => (
              <a
                className="social-card"
                key={social.name}
                href={social.href}
                {...(social.href.startsWith("https")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                <span className="social-card-icon">
                  <Icon name={social.icon} size={20} />
                </span>
                <span>{social.name}</span>
                <Icon name="arrow" size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
