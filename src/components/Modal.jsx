import { useEffect, useRef } from "react";
import Icon from "./Icon";
import "./Modal.css";
export default function Modal({ label, onClose, children, className = "" }) {
  const ref = useRef(null);
  function dismiss() {
    const dialog = ref.current;
    if (dialog.dataset.closing) return;
    dialog.dataset.closing = "true";
    const exit = dialog.getAnimations().find((animation) => animation.animationName === "dialog-out");
    if (exit) {
      // A change to reduced motion can cancel the exit while it is playing.
      exit.finished.catch(() => {}).then(() => {
        if (dialog.open) onClose();
      });
    } else {
      onClose();
    }
  }
  useEffect(() => {
    const dialog = ref.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-label={label}
      className={`modal ${className}`}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const items = [
          ...ref.current.querySelectorAll(
            'a[href], button:not(:disabled), input:not(:disabled), textarea:not(:disabled), [tabindex="0"]',
          ),
        ];
        const first = items[0];
        const last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
    >
      <div className="modal-panel">
        <button
          className="icon-button modal-close"
          aria-label={`Close ${label}`}
          onClick={dismiss}
          autoFocus
        >
          <Icon name="close" />
        </button>
        {children}
      </div>
    </dialog>
  );
}
