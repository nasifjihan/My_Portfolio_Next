import { cn } from "@/lib/cn";

const neoButton =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[linear-gradient(145deg,#e2e8ec,#ffffff)] font-medium text-ink shadow-neu transition-[background,color,translate] duration-300 hover:bg-none hover:bg-brand hover:text-white hover:-translate-y-2.5";

const shapes = {
  /** Text button — hero resume, form submit, dialog actions. */
  rounded: "px-[25px] py-[18px]",
  /** Circular icon button — drawer/dialog close, carousel arrows. */
  circle: "size-[50px] rounded-full",
  /** Compact circle for the 60px drawer close control. */
  circleLg: "size-[60px] rounded-full",
} as const;

export type NeoButtonShape = keyof typeof shapes;

type NeoButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  shape?: NeoButtonShape;
  className?: string;
};

export function NeoButton({ shape = "rounded", className, ...props }: NeoButtonProps) {
  return <button type="button" className={cn(neoButton, shapes[shape], className)} {...props} />;
}

type NeoLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  shape?: NeoButtonShape;
  className?: string;
};

export function NeoLink({ shape = "rounded", className, ...props }: NeoLinkProps) {
  return <a className={cn(neoButton, shapes[shape], className)} {...props} />;
}
