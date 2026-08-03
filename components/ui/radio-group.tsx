"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface RadioGroupContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({});

interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

export function RadioGroup({ value, onValueChange, disabled, className, ...props }: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange, disabled }}>
      <div role="radiogroup" className={cn("grid gap-2", className)} {...props} />
    </RadioGroupContext.Provider>
  );
}

interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
  value: string;
}

export function RadioGroupItem({ value, ...props }: RadioGroupItemProps) {
  const ctx = React.useContext(RadioGroupContext);
  const id = React.useId();
  return (
    <input
      id={id}
      type="radio"
      name={ctx.name ?? id}
      value={value}
      checked={ctx.value === value}
      disabled={ctx.disabled ?? props.disabled}
      onChange={() => ctx.onValueChange?.(value)}
      className={cn(
        "h-4 w-4 shrink-0 rounded-full border border-input text-primary accent-primary",
        props.className,
      )}
      {...props}
    />
  );
}
