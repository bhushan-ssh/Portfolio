import { useEffect, useRef, useState } from "react";
import { achievements } from "../data/achievements";
import Icon from "./Icon";
import SectionHeading from "./SectionHeading";
import "./Achievements.css";
function Counter({ item }) {
  const ref = useRef(null);
  const [count, setCount] = useState(item.count);
  useEffect(() => {
    if (
      !item.count ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
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
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [item.count]);
  return (
    <strong ref={ref} aria-label={item.value}>
      <span aria-hidden="true">{item.count ? `${count}+` : item.value}</span>
    </strong>
  );
}
export default function Achievements() {
  return (
    <section
      id="achievements"
      className="section container reveal"
      aria-label="Achievements"
    >
      <SectionHeading
        number="05"
        label="MILESTONES"
        title="Small steps."
        accent="Meaningful progress."
      />
      <div className="achievement-strip">
        {achievements.map((item) => (
          <div key={item.label}>
            <Icon name={item.icon} size={24} />
            <Counter item={item} />
            <h3>{item.label}</h3>
            <p>{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
