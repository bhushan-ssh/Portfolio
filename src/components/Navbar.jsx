import { useEffect, useState } from "react";
import Icon from "./Icon";
import Modal from "./Modal";
import "./Navbar.css";
const links = [
  ["about", "About"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["certifications", "Certifications"],
  ["achievements", "Achievements"],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(1, window.scrollY / height) : 0);
      let current = "home";
      document.querySelectorAll("main > section[id]").forEach((section) => {
        if (section.getBoundingClientRect().top <= 160) current = section.id;
      });
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 800px)");
    const close = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", close);
    return () => query.removeEventListener("change", close);
  }, []);
  const navLinks = (
    <>
      {links.map(([id, title]) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={active === id ? "location" : undefined}
          onClick={() => setOpen(false)}
        >
          {title}
        </a>
      ))}
      <a
        href="#contact"
        className="nav-cta"
        aria-current={active === "contact" ? "location" : undefined}
        onClick={() => setOpen(false)}
      >
        Let&apos;s connect <Icon name="arrow" size={16} />
      </a>
    </>
  );
  return (
    <header className="site-header">
      <div className="navbar container">
        <a className="brand" href="#home" aria-label="Bhushan — home">
          bhushan<span>.ssh</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks}
        </nav>
        <button
          className="icon-button menu-toggle"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          aria-expanded={open}
          aria-haspopup="dialog"
        >
          <Icon name="menu" />
        </button>
      </div>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
      {open && (
        <Modal
          label="Navigation"
          onClose={() => setOpen(false)}
          className="mobile-menu"
        >
          <p className="eyebrow">EXPLORE</p>
          <nav aria-label="Mobile navigation">{navLinks}</nav>
        </Modal>
      )}
    </header>
  );
}
