import Icon from "./Icon";
import "./Footer.css";
const year = new Date().getFullYear();
export default function Footer() {
  return (
    <footer className="footer container">
      <div className="footer-top">
        <a href="#top" className="brand">
          bhushan<span>.ssh</span>
        </a>
        <p>Building useful things. Always learning.</p>
      </div>
      <div className="footer-bottom">
        <p>© {year} Bhushan Sonawane. All rights reserved.</p>
        <a href="#top" className="text-link">
          Back to top <Icon name="up" size={15} />
        </a>
      </div>
    </footer>
  );
}
