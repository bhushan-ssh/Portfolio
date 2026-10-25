import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            target.classList.add("is-visible");
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((element) => {
      if (element.getBoundingClientRect().top > window.innerHeight)
        element.classList.add("will-reveal");
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
