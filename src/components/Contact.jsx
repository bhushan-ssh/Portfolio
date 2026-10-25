import { useEffect, useRef, useState } from "react";
import { email } from "../data/socials";
import Icon from "./Icon";
import SectionHeading from "./SectionHeading";
import "./Contact.css";
const endpoint = import.meta.env.VITE_FORM_ENDPOINT?.trim();
export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);
  const request = useRef(null);
  useEffect(
    () => () => {
      clearTimeout(toastTimer.current);
      request.current?.abort();
    },
    [],
  );
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setToast("Email address copied.");
    } catch {
      setToast(
        "Could not copy. Select the email address or use the email link.",
      );
    }
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 5000);
  }
  async function submit(event) {
    event.preventDefault();
    if (status === "loading") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return;
    if (!endpoint) {
      setStatus("error");
      setFeedback(
        "The form is not connected yet. Please use the email link to get in touch.",
      );
      return;
    }
    if (["name", "subject", "message"].some((key) => !data.get(key)?.trim())) {
      setStatus("error");
      setFeedback("Please fill in your name, subject, and message.");
      return;
    }
    setStatus("loading");
    setFeedback("Sending your message…");
    request.current = new AbortController();
    const timeout = setTimeout(() => request.current?.abort(), 15000);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
        signal: request.current.signal,
      });
      if (!response.ok) throw new Error("Submission failed");
      const result = await response.json();
      if (
        result.ok === false ||
        result.success === false ||
        result.errors?.length
      )
        throw new Error("Submission not confirmed");
      setStatus("success");
      setFeedback("Thanks for reaching out! Your message has been sent.");
      form.reset();
    } catch {
      setStatus("error");
      setFeedback(
        "Your message could not be sent. Please try again or email me directly. Your message is still in the form.",
      );
    } finally {
      clearTimeout(timeout);
      request.current = null;
    }
  }
  return (
    <section
      id="contact"
      className="section contact-section reveal"
      aria-label="Contact"
    >
      <div className="container contact-grid">
        <div>
          <SectionHeading
            number="06"
            label="WHAT’S NEXT?"
            title="Have an idea?"
            accent="Let’s build it."
          />
          <p className="contact-description">
            I&apos;m interested in connecting with developers, collaborating on
            projects, and exploring internship opportunities.
          </p>
          <div className="contact-email">
            <Icon name="mail" size={22} />
            <a href={`mailto:${email}`}>{email}</a>
            <button
              className="icon-button"
              aria-label="Copy email address"
              onClick={copyEmail}
            >
              <Icon
                name={toast.startsWith("Email") ? "check" : "copy"}
                size={17}
              />
            </button>
          </div>
          <a className="text-link" href={`mailto:${email}`}>
            Prefer email? Write to me directly <Icon name="arrow" size={16} />
          </a>
          <div className="contact-note">
            <span className="status-dot" /> Open to developer internships &
            opportunities
          </div>
        </div>
        <form
          className="contact-form"
          onSubmit={submit}
          aria-label="Send a message"
          aria-busy={status === "loading"}
        >
          <h3>Let&apos;s start a conversation.</h3>
          <div className="form-row">
            <label>
              Your name
              <input
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                placeholder="Your name"
              />
            </label>
            <label>
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label>
            Subject
            <input
              name="subject"
              required
              maxLength={200}
              placeholder="An opportunity, a project, a hello…"
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={5000}
              rows={5}
              placeholder="Tell me a little about what you have in mind."
            />
          </label>
          <div className="honeypot" aria-hidden="true">
            <label>
              Leave this empty
              <input name="_gotcha" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <button
            className="button button-primary"
            type="submit"
            disabled={status === "loading" || !endpoint}
          >
            {status === "loading" ? "Sending…" : "Send message"}
            <Icon
              name={status === "loading" ? "loading" : "send"}
              className={status === "loading" ? "spin" : ""}
              size={17}
            />
          </button>
          {!endpoint && (
            <p className="form-notice">
              The contact form is being connected. In the meantime,{" "}
              <a href={`mailto:${email}`}>email me directly</a>.
            </p>
          )}
          <p
            className={`form-feedback ${status}`}
            role="status"
            aria-live="polite"
          >
            {feedback}
          </p>
        </form>
      </div>
      <div className={`toast ${toast ? "toast-visible" : ""}`} role="status">
        {toast}
      </div>
    </section>
  );
}
