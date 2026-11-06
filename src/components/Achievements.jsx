import { useEffect, useRef, useState } from "react";
import { achievements } from "../data/content";
import Icon from "./Icon";
import SectionHeading from "./SectionHeading";
import "./Achievements.css";
function Counter({ item }) {
  const ref = useRef(null);
  const [count, setCount] = useState(item.count);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!item.count || motion.matches || !("IntersectionObserver" in window)) return;
    let frame;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / 1000, 1);
        setCount(Math.round(item.count * (1 - (1 - progress) ** 3)));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
      observer.disconnect();
    });
    observer.observe(ref.current);
    const stop = () => {
      if (!motion.matches) return;
      cancelAnimationFrame(frame);
      observer.disconnect();
      setCount(item.count);
    };
    motion.addEventListener("change", stop);
    return () => {
      motion.removeEventListener("change", stop);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [item.count]);
  return (
    <strong ref={ref}>
      {item.count ? (
        <>
          <span className="sr-only">{item.value}</span>
          <span className="animated-count" aria-hidden="true" data-value={`${count}+`} />
        </>
      ) : item.value}
    </strong>
  );
}
export default function Achievements() {
  return (
    <section
      id="achievements"
      className="section section-band achievements-section"
      aria-label="Achievements"
    >
      <div className="container">
        <SectionHeading
          number="05"
          label="MILESTONES"
          title="Small steps."
          accent="Meaningful progress."
        />
        <div className="achievement-strip reveal">
          {achievements.map((item) => (
            <div key={item.label}>
              <Icon name={item.icon} size={24} />
              <Counter item={item} />
              <h3>{item.label}</h3>
              {item.detail && <p>{item.detail}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
