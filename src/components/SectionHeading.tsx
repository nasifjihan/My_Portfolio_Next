type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  centered?: boolean;
};

export default function SectionHeading({ eyebrow, title, centered = false }: SectionHeadingProps) {
  return (
    <div className={`heading${centered ? "text-center" : ""}`}>
      <h4>{eyebrow}</h4>
      <h1>{title}</h1>
    </div>
  );
}
