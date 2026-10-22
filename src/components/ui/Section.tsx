import { cn } from "@/lib/cn";

type SectionProps = React.ComponentPropsWithoutRef<"section">;

/**
 * Page section with the shared 80px rhythm and an anchor offset that clears the
 * fixed header. Pass `mt-0` to opt out of the rhythm (used by the hero).
 */
export default function Section({ className, ...props }: SectionProps) {
  return (
    <section className={cn("mt-10 scroll-mt-[12vh] min-[900px]:mt-10", className)} {...props} />
  );
}


