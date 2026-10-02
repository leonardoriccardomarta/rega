export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  const alignClass = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={`mb-8 max-w-2xl md:mb-10 ${alignClass}`}>
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-2 text-sm leading-relaxed text-slate-600 md:text-base ${
            align === "center" ? "mx-auto max-w-xl" : "max-w-xl"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
