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
        <p className={`cse-eyebrow mb-4 text-signal-600 ${align === "center" ? "mx-auto w-fit" : ""}`}>{eyebrow}</p>
      ) : null}
      <Heading className={`${headingLevel === "h1" ? "cse-title" : "cse-heading"} text-graphite-900`}>{title}</Heading>
      {description ? (
        <p className="cse-description mt-4">{description}</p>
      ) : null}
    </div>
  );
}
