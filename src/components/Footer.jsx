import { socials } from "../data/socials";
import Icon from "./Icon";
import "./Footer.css";
const year = new Date().getFullYear();
export default function Footer() {
  return (
    <footer className="footer container">
      <div className="footer-top">
        <a href="#top" className="brand">
          bhushan<span>.</span>
        </a>
        <p>Building useful things. Always learning.</p>
        <div className="social-links">
          {socials.map((social) => (
            <a
              className="icon-button"
              key={social.name}
              href={social.href}
              aria-label={social.name}
              title={social.name}
              {...(social.href.startsWith("https")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              <Icon name={social.icon} />
            </a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {year} Bhushan Sonawane. All rights reserved.</p>
        <p>Designed & built with React.</p>
        <a href="#top" className="text-link">
          Back to top <Icon name="up" size={15} />
        </a>
      </div>
    </footer>
  );
}
