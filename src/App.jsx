import "./App.css";

const projects = [
  {
    number: "01",
    name: "CareerLink",
    type: "FULL-STACK WEB APPLICATION",
    description:
      "A job and internship portal connecting students with opportunities, featuring authentication, recruiter workflows, and role-based access control.",
    tech: ["Python", "Flask", "SQLAlchemy", "SQLite", "REST APIs"],
    result: "Built for students, recruiters, and admins",
    repo: "",
  },
  {
    number: "02",
    name: "QuizMaster",
    type: "BACKEND APPLICATION",
    description:
      "A quiz management application with CRUD APIs, secure sessions, search functionality, and performance tracking backed by a relational database.",
    tech: ["Python", "Flask", "SQLAlchemy", "SQLite"],
    result: "Designed to support 100+ concurrent users",
    repo: "",
  },
  {
    number: "03",
    name: "Uptime",
    type: "MACHINE LEARNING · HACKATHON WINNER",
    description:
      "An AI-powered predictive maintenance system using an LSTM model to identify machine failure patterns and estimate remaining useful life.",
    tech: ["Python", "LSTM", "Machine Learning"],
    result: "85% prediction accuracy · 1st place at SVIT HackVerse 2K26",
    repo: "",
  },
];

const skills = [
  {
    title: "Languages",
    items: ["Python", "Java", "SQL", "JavaScript"],
  },
  {
    title: "Backend",
    items: ["Flask", "REST APIs", "Authentication", "RBAC"],
  },
  {
    title: "Databases",
    items: ["MySQL", "SQLite", "SQLAlchemy"],
  },
  {
    title: "Web & Tools",
    items: ["HTML", "CSS", "Git", "GitHub"],
  },
];

function App() {
  return (
    <main>
      <nav className="navbar">
        <a className="brand" href="#home">
          bhushan<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact" className="nav-cta">
            Let&apos;s connect <span>↗</span>
          </a>
        </div>
      </nav>

      <section className="hero section" id="home">
        <div className="hero-content">
          <div className="availability">
            <span className="status-dot" />
            OPEN TO DEVELOPER OPPORTUNITIES
          </div>

          <p className="eyebrow">HELLO, I&apos;M</p>

          <h1>
            Bhushan
            <br />
            <span>Sonawane.</span>
          </h1>

          <p className="hero-description">
            Developer who enjoys building useful web applications, solving
            problems, and exploring the intersection of software engineering and
            data science.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Explore my work <span>↘</span>
            </a>
            <a className="button button-secondary" href="#contact">
              Get in touch
            </a>
          </div>

          <div className="hero-meta">
            <span>FULL-STACK DEVELOPMENT</span>
            <span className="meta-divider">/</span>
            <span>DATA SCIENCE</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="photo-frame">
            <img
              src="/profile.jpg"
              alt="Bhushan Sonawane"
              className="profile-photo"
            />

            <div className="photo-caption">
              <span className="status-dot" />
              <span>Developer · Problem Solver</span>
            </div>
          </div>

          <span className="photo-decoration photo-decoration-top">
            Python · React
          </span>

          <span className="photo-decoration photo-decoration-bottom">
            Building useful things.
          </span>
        </div>

        <a href="#about" className="scroll-indicator">
          <span /> SCROLL TO EXPLORE
        </a>
      </section>

      <section className="about section" id="about">
        <div className="section-heading">
          <p className="eyebrow">01 / ABOUT ME</p>
          <h2>
            Curious mind.
            <br />
            <span>Practical solutions.</span>
          </h2>
        </div>

        <div className="about-content">
          <p>
            I&apos;m a developer and a Data Science student at IIT Madras,
            interested in building reliable applications from the database to
            the user interface.
          </p>

          <p>
            My experience includes Python, Flask, REST API development,
            authentication, database design, and applied machine learning. I
            enjoy learning by building projects and working with a team to solve
            real problems.
          </p>

          <div className="education-card">
            <span className="education-icon">✳</span>
            <div>
              <strong>Indian Institute of Technology Madras</strong>
              <p>Bachelor of Science · Data Science · Expected 2027</p>
            </div>
          </div>

          <div className="education-card">
            <span className="education-icon">✳</span>
            <div>
              <strong>SND College of Engineering &amp; Research Centre</strong>
              <p>
                Bachelor of Engineering · Information Technology · Expected 2028
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="projects section" id="projects">
        <div className="section-heading">
          <p className="eyebrow">02 / SELECTED WORK</p>
          <h2>
            Projects I&apos;ve
            <br />
            <span>built &amp; explored.</span>
          </h2>
          <p className="section-description">
            A selection of applications and ideas that reflect my interest in
            backend development and machine learning.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.number}>
              <div className="project-top">
                <span className="project-number">{project.number}</span>
                <span className="project-arrow">↗</span>
              </div>

              <p className="project-type">{project.type}</p>
              <h3>{project.name}</h3>
              <p className="project-description">{project.description}</p>

              <div className="tech-list">
                {project.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>

              <div className="project-result">{project.result}</div>

              <div className="project-links">
                {project.repo ? (
                  <a
                    className="project-link"
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View source <span>↗</span>
                  </a>
                ) : (
                  <span className="project-link-placeholder">
                    Repository link to be added
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="project-note">
          Explore more on{" "}
          <a
            href="https://github.com/bhushan-ssh"
            target="_blank"
            rel="noreferrer"
          >
            my GitHub profile ↗
          </a>
        </p>
      </section>

      <section className="skills section" id="skills">
        <div className="section-heading">
          <p className="eyebrow">03 / TOOLKIT</p>
          <h2>
            Technologies I
            <br />
            <span>work with.</span>
          </h2>
        </div>

        <div className="skills-grid">
          {skills.map((group) => (
            <div className="skill-card" key={group.title}>
              <h3>{group.title}</h3>
              <div className="tech-list">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="achievement-strip">
          <div>
            <strong>110+</strong>
            <span>DSA problems solved</span>
          </div>
          <div>
            <strong>1st Place</strong>
            <span>SVIT HackVerse 2K26</span>
          </div>
          <div>
            <strong>SQL &amp; Java</strong>
            <span>HackerRank certifications</span>
          </div>
        </div>
      </section>

      <section className="contact section" id="contact">
        <p className="eyebrow">04 / WHAT&apos;S NEXT?</p>
        <h2>
          Have an idea?
          <br />
          <span>Let&apos;s build it.</span>
        </h2>

        <p className="contact-description">
          I&apos;m interested in connecting with developers, collaborating on
          projects, and exploring internship opportunities.
        </p>

        <a
          className="button button-primary"
          href="mailto:bhushan.sonawane.tech@gmail.com"
        >
          Email me <span>↗</span>
        </a>

        <div className="social-links">
          <a
            href="https://github.com/bhushan-ssh"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/bhushan-ssh"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
          <a href="mailto:bhushan.sonawane.tech@gmail.com">Email ↗</a>
        </div>
      </section>

      <footer className="footer">
        <a className="brand" href="#home">
          bhushan<span>.</span>
        </a>
        <p>Designed &amp; built with React.</p>
        <a href="#home">Back to top ↑</a>
      </footer>
    </main>
  );
}

export default App;
