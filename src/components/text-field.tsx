import React, { useId } from "react";
import { twMerge } from "tailwind-merge";

import { KeyValueFrom } from "@/types/common";

type Size = "small" | "medium" | "large";

const __DEFAULT_ELEMENT__ = "input";

interface TextFieldOwnProps<E extends React.ElementType = React.ElementType>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  size?: Size;
  multiline?: boolean;
  label?: string;
  classLabel?: string;
  classInput?: string;
  // as, Allows us to use other elements or components,
  // along with their properties
  as?: E;
  componentRef?: React.RefObject<HTMLInputElement>;
}

type TextFieldProps<E extends React.ElementType> = TextFieldOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof TextFieldOwnProps>;

const sizeMap: KeyValueFrom<Size, string> = {
  small: "h-8 text-sm",
  medium: "h-9 text-sm",
  large: "h-11 text-base",
};

export default function TextField<
  E extends React.ElementType = typeof __DEFAULT_ELEMENT__
>({
  className,
  classLabel,
  classInput,
  startIcon,
  endIcon,
  size = "medium",
  multiline,
  label,
  disabled,
  as,
  componentRef,
  ...props
}: TextFieldProps<E>) {
  const id = useId();
  const Component =
    as ||
    ((multiline ? "textarea" : "input") as React.ElementType) ||
    __DEFAULT_ELEMENT__;

  return (
    <div className="flex flex-col gap-y-2">
      {label !== undefined && (
        <label
          htmlFor={id}
          className={twMerge(
            "text-sm font-normal",
            disabled && "opacity-40",
            classLabel
          )}
        >
          {label}
        </label>
      )}
      <div
        className={twMerge(
          "flex items-center gap-2 rounded-md border border-[#E0E0E0] py-2 px-3",
          className,
          sizeMap[size],
          multiline && "h-auto",
          disabled && "opacity-40"
        )}
      >
        {startIcon}
        <Component
          id={id}
          disabled={disabled}
          className={twMerge(
            "w-full bg-transparent outline-none",
            multiline && "resize-y",
            classInput
          )}
          ref={componentRef}
          {...props}
        />
        {endIcon}
      </div>
    </div>
  );
}
