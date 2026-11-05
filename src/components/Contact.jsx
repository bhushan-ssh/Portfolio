import { useState } from "react";
import { email, socials } from "../data/socials";
import Icon from "./Icon";
import SectionHeading from "./SectionHeading";
import "./Contact.css";

export default function Contact() {
  const [copyStatus, setCopyStatus] = useState("");
  const [copying, setCopying] = useState(false);
  async function copyEmail() {
    if (copying) return;
    setCopying(true);
    setCopyStatus("");
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("Email copied.");
    } catch {
      setCopyStatus("Couldn’t copy automatically. Select the email address to copy it.");
    } finally {
      setCopying(false);
    }
  }
  return (
    <section
      id="contact"
      className="section contact-section"
      aria-label="Contact"
    >
      <div className="container contact-grid">
        <div className="reveal">
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
          <div className="contact-actions">
            <a className="contact-email" href={`mailto:${email}`}>
              <span>{email}</span> <Icon name="arrow" size={20} />
            </a>
            <button className="button button-secondary copy-email" type="button" onClick={copyEmail} disabled={copying}>
              <Icon name="copy" size={17} /> Copy email
            </button>
          </div>
          <p className="copy-feedback" role="status" aria-live="polite">{copyStatus}</p>
          <div className="contact-note">
            <span className="status-dot" /> Open to developer internships &
            opportunities
          </div>
        </div>
        <div className="social-directory reveal" aria-label="Social accounts">
          <h3>Find me online</h3>
          <div className="social-directory-grid">
            {socials.map((social) => (
              <a
                className="social-card"
                key={social.name}
                href={social.href}
                {...(social.href.startsWith("https")
                  ? { target: "_blank", rel: "noopener noreferrer" }
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
