import { useState } from "react";
import { projects } from "../data/projects";
import { asset } from "../data/assets";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import Modal from "./Modal";
import Icon from "./Icon";
import "./Projects.css";
export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const visible = projects.filter(
    (project) => filter === "All" || project.category === filter,
  );
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
          {["All", "Web", "Machine Learning"].map((item) => (
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
        <div className="project-grid">
          {visible.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onPreview={setSelected}
            />
          ))}
        </div>
        {selected && (
          <Modal
            label={`${selected.title} screenshot`}
            onClose={() => setSelected(null)}
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
      </div>
    </section>
  );
}
