import { cn } from "@/lib/utils";
import BottomGradient from "../ui/BottomGradient";

interface ButtonPropsType {
  btnType?: "button" | "submit";
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  ariaExpanded?: boolean | "true" | "false"; // Specify the type here
  name?: string;
  id?: string;
  disabled?: boolean;
}

export default function Button({
  btnType,
  className,
  onClick,
  children,
  ariaExpanded,
  name,
  id,
  disabled,
}: ButtonPropsType) {
  return (
    <button
      name={name}
      disabled={disabled || false}
      id={id}
      aria-expanded={ariaExpanded}
      onClick={onClick}
      className={cn(
        "bg-gradient-to-br py-2 border relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-auto text-white rounded-md font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]",
        className
      )}
      type={btnType || "button"}
    >
      {children}
      <BottomGradient />
    </button>
  );
}
