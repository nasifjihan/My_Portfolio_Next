import { cn } from "@/lib/cn";

type GridProps = React.ComponentPropsWithoutRef<"div">;

/** Responsive card grid: 1 / 2 / 3 columns with the design's 35px gutter. */
export default function Grid({ className, ...props }: GridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-[35px] min-[900px]:grid-cols-3 sm:grid-cols-2",
        className,
      )}
      {...props}
    />
  );
}
