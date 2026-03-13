import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "~/lib/cn";

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  name?: string;
  className?: string;
}

export function Checkbox({ label, checked, onChange, name, className }: CheckboxProps) {
  const id = `checkbox-${name ?? label}`;
  return (
    <div
      className={cn(
        "flex cursor-pointer items-center gap-1 text-base-900 text-style-body-bold",
        className,
      )}
    >
      <CheckboxPrimitive.Root
        checked={checked}
        className={cn(
          "flex size-6 items-center justify-center rounded border",
          "spring-bounce-20 spring-duration-200 transition",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-brown/50 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          checked
            ? "border-primary-brown bg-primary-brown"
            : "border-base-400 bg-white hover:border-base-700",
        )}
        id={id}
        name={name}
        onCheckedChange={(value) => onChange?.(value === true)}
      >
        <CheckboxPrimitive.Indicator className="animate-check-in">
          <Check className="size-4 text-white" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <label className="cursor-pointer select-none" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
