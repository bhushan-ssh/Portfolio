import "./App.css";


const projects = [
  {
    title: "CareerLink",
    description:
      "A career platform connecting students with opportunities, featuring role-based access and REST APIs.",
    tech: ["Python", "Flask", "SQLAlchemy", "SQLite", "REST API"],
    result: "Designed to connect 500+ students",
    repo: "https://github.com/bhushan-ssh/CareerLink",
  },
  {
    title: "QuizMaster",
    description:
      "A quiz management application with CRUD functionality, session handling, and role-based access control.",
    tech: ["Python", "Flask", "SQLAlchemy", "SQLite"],
    result: "Built to support 100+ concurrent users",
    repo: "https://github.com/bhushan-ssh/Quizmaster",
  },
  {
    title: "Uptime",
    description:
      "A predictive maintenance solution using machine learning to estimate remaining useful life and predict failures.",
    tech: ["Python", "Machine Learning", "LSTM"],
    result: "85% accuracy · 1st place at SVIT HackVerse 2K26",
    repo: "https://github.com/bhushan-ssh/Uptime",
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
            <div className="project-card" key={project.title}>
              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <div className="project-tech">
                {project.tech.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <p className="project-result">{project.result}</p>

              <div className="project-links">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                >
                  View source ↗
                </a>
              </div>
            </div>
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
