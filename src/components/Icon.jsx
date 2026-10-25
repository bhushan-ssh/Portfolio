import {
  ArrowUpRight,
  ArrowDownRight,
  ArrowUp,
  ArrowDown,
  Download,
  Mail,
  Code2,
  Terminal,
  Server,
  Database,
  Trophy,
  Award,
  GraduationCap,
  Menu,
  X,
  Copy,
  Check,
  Send,
  LoaderCircle,
  Expand,
  Sparkles,
  FileText,
  ChevronDown,
} from "lucide-react";
const icons = {
  arrow: ArrowUpRight,
  downRight: ArrowDownRight,
  up: ArrowUp,
  down: ArrowDown,
  download: Download,
  mail: Mail,
  code: Code2,
  terminal: Terminal,
  server: Server,
  database: Database,
  trophy: Trophy,
  award: Award,
  education: GraduationCap,
  menu: Menu,
  close: X,
  copy: Copy,
  check: Check,
  send: Send,
  loading: LoaderCircle,
  expand: Expand,
  sparkles: Sparkles,
  file: FileText,
  chevron: ChevronDown,
};
export default function Icon({ name, size = 18, ...props }) {
  if (name === "github")
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        {...props}
      >
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.82c.85 0 1.71.12 2.51.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    );
  if (name === "linkedin")
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        {...props}
      >
        <path d="M5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3.5 9h3v12h-3V9Zm6 0h3v1.6c.7-1.2 1.8-1.9 3.4-1.9 3.3 0 4.6 2 4.6 5V21h-3v-6.4c0-1.8-.4-3.1-2.3-3.1-2 0-2.7 1.4-2.7 3.3V21h-3V9Z" />
      </svg>
    );
  const Component = icons[name] || Code2;
  return (
    <Component size={size} strokeWidth={1.65} aria-hidden="true" {...props} />
  );
}
