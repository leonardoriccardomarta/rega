export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-sky-700">
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg leading-relaxed text-slate-600 md:text-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
