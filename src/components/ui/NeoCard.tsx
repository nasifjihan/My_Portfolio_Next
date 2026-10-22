import { cn } from "@/lib/cn";

export const neoSurface = "rounded-[10px] bg-[linear-gradient(145deg,#e2e8ec,#ffffff)] shadow-neu";

type NeoCardProps = React.ComponentPropsWithoutRef<"div">;

export default function NeoCard({ className, ...props }: NeoCardProps) {
  return <div className={cn(neoSurface, className)} {...props} />;
}
