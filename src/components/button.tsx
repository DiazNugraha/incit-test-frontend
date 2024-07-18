import { KeyValueFrom } from "@/types/common";
import { twMerge } from "tailwind-merge";

type Size = "small" | "medium" | "large";
type Variant = "contained" | "outlined" | "text";

const __DEFAULT_ELEMENT__ = "button";

interface ButtonOwnProps<E extends React.ElementType = React.ElementType>
  extends React.HTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  size?: Size;
  variant?: Variant;
  disabled?: boolean;
  // as, Allows us to use other elements or components,
  // along with their properties
  as?: E;
}

type ButtonProps<E extends React.ElementType> = ButtonOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof ButtonOwnProps>;

const sizeMap: KeyValueFrom<Size, string> = {
  small: "h-8 text-sm",
  medium: "h-9 text-sm",
  large: "h-11 text-base",
};

const variantMap: KeyValueFrom<Variant, string> = {
  contained: "border border-gray-300 bg-[#EDEDED]",
  outlined: "border border-gray-300",
  text: "border-none bg-transparent p-0 text-base",
};

export default function Button<
  E extends React.ElementType = typeof __DEFAULT_ELEMENT__
>({
  children,
  className,
  fullWidth,
  startIcon,
  endIcon,
  variant = "contained",
  size = "medium",
  disabled,
  type = "button",
  as,
  ...props
}: ButtonProps<E>) {
  const Component = as || __DEFAULT_ELEMENT__;

  return (
    <Component
      type={type}
      className={twMerge(
        "flex w-fit items-center justify-center gap-2 whitespace-nowrap rounded-md py-3 px-4 font-medium",
        variantMap[variant],
        className,
        sizeMap[size],
        fullWidth && "w-full",
        disabled && "cursor-not-allowed opacity-40"
      )}
      disabled={disabled}
      {...props}
    >
      {startIcon}
      {children}
      {endIcon}
    </Component>
  );
}
