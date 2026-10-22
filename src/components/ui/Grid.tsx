import { cn } from "@/lib/cn";

type GridProps = React.ComponentPropsWithoutRef<"div">;

/**
 * Responsive card grid: 1 / 2 / 3 columns with the design's 35px gutter.
 *
 * Uses named breakpoints only. Arbitrary `min-[...]` variants are emitted in a
 * different order than the named `sm:`/`md:`/`lg:` blocks, so pairing the two on
 * the same property lets the smaller breakpoint win at every width.
 */
export default function Grid({ className, ...props }: GridProps) {
  return (
    <div
      className={cn("grid grid-cols-1 gap-[35px] sm:grid-cols-2 lg:grid-cols-3", className)}
      {...props}
    />
  );
}
