import { cn } from "@/lib/cn";

type SectionProps = React.ComponentPropsWithoutRef<"section">;

export default function Section({ className, ...props }: SectionProps) {
  return <section className={cn("mt-20 scroll-mt-[12vh]", className)} {...props} />;
}
