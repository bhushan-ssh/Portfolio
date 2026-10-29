import { useState } from "react";
import { certifications } from "../data/certifications";
import { asset } from "../data/assets";
import SectionHeading from "./SectionHeading";
import Icon from "./Icon";
import "./Certifications.css";

const selectedCount = 3;

function CertificateCard({ certificate }) {
  const [failed, setFailed] = useState(false);
  return (
    <article className="certificate-card">
      <div className="certificate-preview">
        {failed ? (
          <Icon name="award" size={44} />
        ) : (
          <img
            src={asset(certificate.thumbnail)}
            width="640"
            height="450"
            loading="lazy"
            alt={`Preview of ${certificate.title} certificate`}
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <div className="certificate-body">
        <span className="small-label">{certificate.kind}</span>
        <h3>{certificate.title}</h3>
        <p>{certificate.issuer}</p>
        {certificate.date && (
          <p className="certificate-date">{certificate.date}</p>
        )}
        <a
          className="text-link"
          href={asset(certificate.pdf)}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${certificate.title} certificate (PDF, opens in a new tab)`}
        >
          View certificate <Icon name="arrow" size={16} />
        </a>
      </div>
    </article>
  );
}
export default function Certifications() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section
      id="certifications"
      className="section certificates-section reveal"
      aria-label="Certifications"
    >
      <div className="container">
        <div className="heading-row">
          <SectionHeading
            number="04"
            label="LEARNING, VALIDATED"
            title="A habit of learning."
            accent="A record of growth."
          />
          <a
            className="text-link"
            href="https://www.hackerrank.com/profile/bhushan_ssh"
            target="_blank"
            rel="noreferrer"
          >
            HackerRank profile <Icon name="arrow" />
          </a>
        </div>
        <div className="certificate-grid" id="certificate-list">
          {(expanded ? certifications : certifications.slice(0, selectedCount)).map(
            (certificate) => (
              <CertificateCard certificate={certificate} key={certificate.id} />
            ),
          )}
        </div>
        <div className="certificate-more">
          <p>
            {expanded
              ? `All ${certifications.length} certificates, academic milestones & participation records.`
              : `A selection from ${certifications.length} certificates, academic milestones & participation records.`}
          </p>
          <button
            className="button button-secondary"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-controls="certificate-list"
          >
            {expanded
              ? "Show selected certificates"
              : `Explore all ${certifications.length} certificates`}
            <Icon name="chevron" className={expanded ? "rotate" : ""} />
          </button>
        </div>
      </div>
    </section>
  );
}
