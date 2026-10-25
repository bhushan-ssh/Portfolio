import { useEffect, useState } from "react";
import Icon from "./Icon";
import { asset } from "../data/assets";
import "./Hero.css";
export default function Hero() {
  const [role, setRole] = useState(0);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer;
    const configure = () => {
      clearInterval(timer);
      if (!query.matches)
        timer = setInterval(() => setRole((value) => 1 - value), 4000);
    };
    configure();
    query.addEventListener("change", configure);
    return () => {
      clearInterval(timer);
      query.removeEventListener("change", configure);
    };
  }, []);
  return (
    <section className="hero container" id="home" aria-labelledby="hero-title">
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
          <span className="sr-only">
            Full-Stack Developer and Data Science Student
          </span>
          <span aria-hidden="true" key={role} className="role-text">
            {["Full-Stack Developer", "Data Science Student"][role]}
          </span>
        </div>
        <p className="hero-description">
          Developer who enjoys building useful web applications, solving
          problems, and exploring the intersection of software engineering and
          data science.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            Explore my work <Icon name="downRight" />
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
        <div className="portrait-grid" aria-hidden="true" />
        <div className="photo-frame">
          <img
            src={asset("profile-800.webp")}
            srcSet={`${asset("profile-400.webp")} 400w, ${asset("profile-600.webp")} 600w, ${asset("profile-800.webp")} 800w`}
            sizes="(max-width: 420px) 280px, (max-width: 1100px) 310px, 365px"
            width="800"
            height="1000"
            alt="Bhushan Sonawane outdoors"
            fetchPriority="high"
            loading="eager"
            className="profile-photo"
          />
          <div className="photo-caption">
            <span className="status-dot" />
            <span>Developer. Problem solver. Always learning.</span>
          </div>
        </div>
        <div className="floating-note note-top">
          <Icon name="code" size={22} />
          <div>
            <strong>Built with curiosity.</strong>
            <span>Python · Flask · React</span>
          </div>
        </div>
        <div className="floating-note note-bottom">
          <span className="note-icon">
            <Icon name="trophy" size={22} />
          </span>
          <div>
            <strong>1st place</strong>
            <span>SVIT HackVerse 2K26</span>
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
