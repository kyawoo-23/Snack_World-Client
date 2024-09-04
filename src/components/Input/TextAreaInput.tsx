"use client";

import { useFormContext, RegisterOptions } from "react-hook-form";

type Props = {
  name: string;
  placeholder?: string;
  validation?: RegisterOptions;
  rows?: number;
};

export default function TextAreaInput({
  name,
  placeholder = "",
  validation,
  rows = 4,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className='mb-3'>
      <textarea
        id={name}
        className={`text-sm font-medium mb-1 flex items-center gap-2 w-full grow textarea textarea-bordered resize-none ${
          errorMessage ? "border-2 border-red-700" : ""
        }`}
        placeholder={placeholder}
        {...register(name, validation)}
        rows={rows}
      />
      {errorMessage && (
        <p className='mt-1 text-sm text-red-600'>{errorMessage}</p>
      )}
    </div>
  );
}
