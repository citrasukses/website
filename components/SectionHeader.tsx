type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  headingLevel?: "h1" | "h2";
};

export function SectionHeader({ eyebrow, title, description, align = "left", headingLevel = "h2" }: SectionHeaderProps) {
  const Heading = headingLevel;

  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-3 border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.2em] text-signal-600">{eyebrow}</p>
      ) : null}
      <Heading className="text-balance text-2xl font-bold tracking-normal text-graphite-900 md:text-4xl">{title}</Heading>
      {description ? (
        <p className="mt-4 text-base leading-7 text-graphite-500 md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
