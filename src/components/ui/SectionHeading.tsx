import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  /** Small brand-coloured line above the title. */
  eyebrow: string;
  title: string;
  centered?: boolean;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  centered = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("my-[50px]", centered && "text-center", className)}>
      <h4 className="text-base font-normal tracking-[2px] text-brand uppercase">{eyebrow}</h4>
      <h1 className="text-[clamp(2rem,5vw,60px)] leading-[1.15] text-ink">{title}</h1>
    </div>
  );
}
