import { useEffect, useState } from "react";
import Icon from "./Icon";
import "./ScrollToTop.css";
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 700);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    visible && (
      <a
        href="#top"
        className="scroll-top icon-button"
        aria-label="Back to top"
      >
        <Icon name="up" />
      </a>
    )
  );
}
