import { useState } from "react";
import { projects } from "../data/projects";
import { asset } from "../data/assets";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import Modal from "./Modal";
import Icon from "./Icon";
import "./Projects.css";

const filters = ["All", "Web", "Machine Learning"];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [activeModal, setActiveModal] = useState(null);
  const selected = activeModal?.project;
  const visible = projects.filter(
    (project) => filter === "All" || project.category === filter,
  );
  const featuredProjects = visible.filter((project) => project.featured);
  const moreProjects = visible.filter((project) => !project.featured);
  return (
    <section
      id="projects"
      className="section projects-section reveal"
      aria-label="Selected projects"
    >
      <div className="container">
        <div className="heading-row">
          <SectionHeading
            number="02"
            label="SELECTED WORK"
            title="Ideas turned into"
            accent="something useful."
          >
            A selection of applications and ideas that reflect my interest in
            backend development and machine learning.
          </SectionHeading>
          <a
            className="text-link"
            href="https://github.com/bhushan-ssh"
            target="_blank"
            rel="noreferrer"
          >
            More on GitHub <Icon name="arrow" />
          </a>
        </div>
        <div className="filter-bar" role="group" aria-label="Filter projects">
          {filters.map((item) => (
            <button
              key={item}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
              {item === "All" && <span>{projects.length}</span>}
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">
          Showing {visible.length} {filter === "All" ? "" : filter} projects
        </p>
        {featuredProjects.length > 0 && (
          <div className="project-group">
            <h3 className="project-group-title">Featured projects</h3>
            <div className="project-grid featured-project-grid">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onPreview={() => setActiveModal({ type: "preview", project })}
                  onCaseStudy={() => setActiveModal({ type: "caseStudy", project })}
                />
              ))}
            </div>
          </div>
        )}
        {moreProjects.length > 0 && (
          <div className="project-group more-projects-group">
            <div className="project-group-heading">
              <h3 className="project-group-title">More projects</h3>
              <span>
                {moreProjects.length} {moreProjects.length === 1 ? "project" : "projects"}
              </span>
            </div>
            <div className="project-grid more-projects-grid">
              {moreProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onCaseStudy={() => setActiveModal({ type: "caseStudy", project })}
                />
              ))}
            </div>
          </div>
        )}
        {activeModal?.type === "preview" && (
          <Modal
            label={`${selected.title} screenshot`}
            onClose={() => setActiveModal(null)}
            className="lightbox"
          >
            <h3>{selected.title}</h3>
            <p>{selected.subtitle}</p>
            <img
              src={asset(selected.image)}
              alt={selected.alt}
              width={selected.width}
              height={selected.height}
            />
            <a
              className="text-link"
              href={selected.repo}
              target="_blank"
              rel="noreferrer"
            >
              Explore the source <Icon name="arrow" />
            </a>
          </Modal>
        )}
        {activeModal?.type === "caseStudy" && (
          <Modal
            label={`${selected.title} case study`}
            onClose={() => setActiveModal(null)}
            className="case-study-modal"
          >
            <article className="case-study-content">
              <p className="eyebrow">PROJECT CASE STUDY</p>
              <h2>{selected.title}</h2>
              <p className="case-study-subtitle">{selected.subtitle}</p>
              <div className="case-study-visual">
                <img
                  src={asset(selected.image)}
                  alt={selected.alt}
                  width={selected.width}
                  height={selected.height}
                />
              </div>
              <div className="case-study-result">
                <span className="small-label">RESULT</span>
                <p>{selected.result}</p>
                <small>{selected.caseStudy.outcome}</small>
              </div>
              <div className="case-study-grid">
                <section>
                  <h3>The problem</h3>
                  <p>{selected.caseStudy.problem}</p>
                </section>
                <section>
                  <h3>My contribution</h3>
                  <p>{selected.caseStudy.contribution}</p>
                </section>
                <section className="case-study-decisions">
                  <h3>Technical decisions</h3>
                  <ul>
                    {selected.caseStudy.decisions.map((decision) => (
                      <li key={decision}>{decision}</li>
                    ))}
                  </ul>
                </section>
              </div>
              <div className="case-study-footer">
                <div className="tech-list">
                  {selected.tech.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <a
                  className="button button-primary"
                  href={selected.repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  View source on GitHub <Icon name="arrow" size={16} />
                </a>
              </div>
            </article>
          </Modal>
        )}
      </div>
    </section>
  );
}
