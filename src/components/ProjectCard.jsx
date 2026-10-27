import { useState } from "react";
import { asset } from "../data/assets";
import Icon from "./Icon";
import "./ProjectCard.css";
export default function ProjectCard({ project, onPreview }) {
  const [failed, setFailed] = useState(false);
  return (
    <article className={`project-card ${project.featured ? "featured" : ""}`}>
      {project.image ? (
        <button
          className={`project-image ${project.id}`}
          aria-label={`View ${project.title} screenshot`}
          disabled={failed}
          onClick={() => onPreview(project)}
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
      ) : (
        <div
          className={`project-image project-placeholder ${project.id}`}
          aria-hidden="true"
        >
          <span className="placeholder-icon">
            <Icon name={project.visualIcon} size={40} />
          </span>
          <strong>{project.visualTitle}</strong>
          <small>{project.visualDetail}</small>
        </div>
      )}
      <div className="project-body">
        <div className="project-meta">
          <span className="small-label">{project.category}</span>
          {project.featured && (
            <span className="award-badge">
              <Icon name="trophy" size={14} /> HACKATHON WINNER
            </span>
          )}
        </div>
        <h3>
          {project.title}
          <span aria-hidden="true">↗</span>
        </h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="project-description">{project.description}</p>
        <div className="tech-list">
          {project.tech.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="project-result">
          <Icon name={project.featured ? "trophy" : "check"} size={17} />
          <span>{project.result}</span>
        </div>
        {project.detail && <p className="project-detail">{project.detail}</p>}
        <div className="project-links">
          <a
            className="text-link"
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} source on GitHub`}
          >
            <Icon name="github" size={17} /> View source{" "}
            <Icon name="arrow" size={16} />
          </a>
          {project.demo && (
            <a
              className="text-link"
              href={project.demo}
              target="_blank"
              rel="noreferrer"
            >
              Live demo <Icon name="arrow" size={16} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
