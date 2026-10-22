import { cn } from "@/lib/cn";

type ContainerProps = React.ComponentPropsWithoutRef<"div">;

/** Centered page gutter — 92% of the viewport on phones, 85% from `sm` up. */
export default function Container({ className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-[92%] max-w-350 sm:w-[85%]", className)} {...props} />;
}
