export default function SectionHeading({
  number,
  label,
  title,
  accent,
  children,
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">
        {number} / {label}
      </p>
      <h2>
        {title} {accent && <span>{accent}</span>}
      </h2>
      {children && <p className="section-description">{children}</p>}
    </div>
  );
}
