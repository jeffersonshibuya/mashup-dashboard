import { InputHTMLAttributes } from 'react';

type InputProsp = InputHTMLAttributes<HTMLInputElement>;

export function Input({ ...rest }: InputProsp) {
  return (
    <input
      {...rest}
      className="w-full bg-zinc-600 py-2 px-4 flex-1 text-gray-100 rounded text-sm 
      placeholder:text-gray-200 
      disabled:bg-zinc-400 disabled:cursor-not-allowed disabled:text-gray-200"
    />
  );
}
