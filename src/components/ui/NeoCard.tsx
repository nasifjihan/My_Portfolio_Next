import { cn } from "@/lib/cn";

/**
 * Shared neumorphic surface. The gradient + shadow pair used to be duplicated
 * by `.btn_shadow`, `.box_shadow`, `.home-btn` and both dialog close buttons.
 */
export const neoSurface = "rounded-[10px] bg-[linear-gradient(145deg,#e2e8ec,#ffffff)] shadow-neu";

type NeoCardProps = React.ComponentPropsWithoutRef<"div">;

export default function NeoCard({ className, ...props }: NeoCardProps) {
  return <div className={cn(neoSurface, className)} {...props} />;
}
