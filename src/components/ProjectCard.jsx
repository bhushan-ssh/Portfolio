import { useState } from "react";
import { asset } from "../data/assets";
import Icon from "./Icon";
import "./ProjectCard.css";
export default function ProjectCard({ project, onPreview, onCaseStudy }) {
  const [failed, setFailed] = useState(false);
  const compact = !project.featured;
  return (
    <article className={`project-card reveal${compact ? " compact" : ""}`}>
      {project.image && (
        <button
          className={`project-image ${project.id}`}
          aria-label={`View screenshot of ${project.title}`}
          disabled={failed}
          onClick={onPreview}
        >
          {failed ? (
            <span className="image-fallback">
              <Icon name="code" size={40} />
              {project.title}
              <small>Screenshot unavailable · explore the source below</small>
            </span>
          ) : (
            <img
              src={asset(project.image)}
              srcSet={
                project.image.endsWith(".webp")
                  ? `${asset(project.image.replace(".webp", "-640.webp"))} 640w, ${asset(project.image)} ${project.width}w`
                  : undefined
              }
              sizes="(max-width: 650px) calc(100vw - 72px), (max-width: 900px) 75vw, 520px"
              alt={project.alt}
              width={project.width}
              height={project.height}
              loading="lazy"
              onError={() => setFailed(true)}
            />
          )}
          <span className="expand-hint">
            <Icon name="expand" size={16} />
            <span>View screenshot</span>
          </span>
        </button>
      )}
      <div className="project-body">
        <div className="project-meta">
          <span className="small-label">{project.category}</span>
          {project.award && (
            <span className="award-badge">
              <Icon name="trophy" size={14} /> {project.award}
            </span>
          )}
        </div>
        <h4>
          {project.title}
          <span aria-hidden="true">↗</span>
        </h4>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="project-description">
          <strong>Problem</strong> {project.problem}
        </p>
        <p className="project-description">
          <strong>Built</strong> {project.description}
        </p>
        <div className="project-result">
          <Icon name={project.award ? "trophy" : "check"} size={17} />
          <span>{project.result}</span>
        </div>
        {project.detail && (
          <p className="project-detail">{project.detail}</p>
        )}
        <div className="tech-list" aria-label="Technology stack">
          {project.tech.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="project-links">
          {project.caseStudy && (
            <button
              className="text-link case-study-trigger"
              type="button"
              onClick={onCaseStudy}
              aria-label={`Case study: ${project.title}`}
            >
              Case study <Icon name="arrow" size={16} />
            </button>
          )}
          <a
            className="text-link"
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Code for ${project.title} on GitHub`}
          >
            <Icon name="github" size={17} /> Code{" "}
            <Icon name="arrow" size={16} />
          </a>
          {project.demo && (
            <a
              className="text-link"
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live demo <Icon name="arrow" size={16} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
