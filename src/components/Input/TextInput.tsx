"use client";

import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { useFormContext, RegisterOptions } from "react-hook-form";

type Props = {
  name: string;
  type?: "text" | "password" | "email" | "tel";
  placeholder?: string;
  validation?: RegisterOptions;
  children?: React.ReactNode;
  className?: string;
};

export default function TextInput({
  name,
  type = "text",
  placeholder = "",
  validation,
  children,
  className,
}: Props) {
  const [inputType, setInputType] = useState(type);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className={className + " mb-3"}>
      <label
        htmlFor={name}
        className={`text-sm font-medium mb-1 flex items-center gap-2 input input-bordered w-full ${
          errorMessage ? "border-2 border-red-700" : ""
        }`}
      >
        {children && <span className='mr-2'>{children}</span>}
        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          {...register(name, validation)}
          className='grow'
        />
        {type === "password" && (
          <button
            className='btn btn-circle btn-sm btn-ghost'
            type='button'
            onClick={() => {
              setShowPassword((prev) => !prev);
              setInputType((prev) =>
                prev === "password" ? "text" : "password"
              );
            }}
          >
            {showPassword ? <EyeIcon size={20} /> : <EyeOff size={20} />}
          </button>
        )}
      </label>
      {errorMessage && (
        <p className='mt-1 text-sm text-red-600'>{errorMessage}</p>
      )}
    </div>
  );
}
