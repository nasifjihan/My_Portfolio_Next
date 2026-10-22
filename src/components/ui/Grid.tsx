import { cn } from "@/lib/cn";

type GridProps = React.ComponentPropsWithoutRef<"div">;

export default function Grid({ className, ...props }: GridProps) {
  return (
    <div
      className={cn("grid grid-cols-1 gap-[35px] sm:grid-cols-2 lg:grid-cols-3", className)}
      {...props}
    />
  );
}
