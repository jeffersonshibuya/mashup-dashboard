import { InputHTMLAttributes } from 'react';

type InputProsp = InputHTMLAttributes<HTMLInputElement>;

export function Input({ ...rest }: InputProsp) {
  return (
    <input
      {...rest}
      className="w-full bg-white py-2 px-4 flex-1 text-gray-900 rounded text-sm 
      placeholder:text-gray-400 border border-zinc-400 focus:outline-1 
      focus:outline-zinc-500 disabled:bg-gray-200 disabled:cursor-not-allowed 
      disabled:text-gray-800"
    />
  );
}
