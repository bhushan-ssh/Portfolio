import Icon from "./Icon";
import { asset } from "../data/assets";
import { projects } from "../data/projects";
import { achievements } from "../data/achievements";
import "./Hero.css";
export default function Hero() {
  return (
    <section
      className="hero section-band hero-section container"
      id="home"
      aria-labelledby="hero-title"
    >
      <div className="hero-content">
        <div className="availability">
          <span className="status-dot" /> OPEN TO DEVELOPER OPPORTUNITIES
        </div>
        <p className="eyebrow hero-hello">HELLO, I&apos;M</p>
        <h1 id="hero-title">
          Bhushan
          <br />
          <span>Sonawane.</span>
        </h1>
        <div className="role-line">
          <span aria-hidden="true" className="role-dash" />
          <span>Full-Stack Developer · Data Science Student</span>
        </div>
        <p className="hero-description">
          I turn complex ideas into useful products with thoughtful code and data.
        </p>
        <p className="hero-proof">
          <Icon name="trophy" size={16} />
          <span>Hackathon winner · {projects.length} shipped projects · {achievements.find((item) => item.count)?.value} DSA problems</span>
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            View projects <Icon name="downRight" />
          </a>
          <a
            className="button button-secondary"
            href={asset("resume.pdf")}
            download="Bhushan_Sonawane_Resume.pdf"
          >
            Download resume <Icon name="download" size={17} />
          </a>
        </div>
        <a className="hero-contact text-link" href="#contact">
          Have something in mind? Get in touch <Icon name="arrow" size={15} />
        </a>
      </div>
      <div className="hero-visual">
        <div className="portrait-label">
          <span>DEVELOPER &amp; PROBLEM SOLVER</span>
          <Icon name="sparkles" size={16} />
        </div>
        <div className="photo-frame">
          <img
            src={asset("profile-800.webp")}
            srcSet={`${asset("profile-400.webp")} 400w, ${asset("profile-600.webp")} 600w, ${asset("profile-800.webp")} 800w`}
            sizes="(max-width: 550px) calc(100vw - 72px), (max-width: 799px) 400px, 430px"
            width="800"
            height="1000"
            alt="Bhushan Sonawane outdoors"
            fetchPriority="high"
            loading="eager"
            className="profile-photo"
          />
          <div className="portrait-award">
            <span className="note-icon">
              <Icon name="trophy" size={22} />
            </span>
            <div>
              <strong>Hackathon winner</strong>
              <span>1st place · SVIT HackVerse 2K26</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <p>
          <Icon name="education" /> Data Science at IIT Madras{" "}
          <span className="hero-divider">/</span> B.E. in Information Technology
        </p>
        <a href="#about">
          SCROLL TO EXPLORE <Icon name="down" size={14} />
        </a>
      </div>
    </section>
  );
}
