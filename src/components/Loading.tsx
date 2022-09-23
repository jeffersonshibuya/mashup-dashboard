import { ComputerTower, Key, Pencil } from 'phosphor-react';

export default function Loading() {
  return (
    <div className="border shadow rounded-md p-4 w-full mx-auto min-h-[300px]">
      <div role="status" className="animate-pulse">
        <div className="flex justify-between items-center mb-4 gap-3">
          <div className="w-10/12 h-8 bg-gray-400 rounded-sm" />
          <Pencil className="mr-2 h-5 w-5" />
        </div>

        <div className="w-full h-12 bg-gray-400 rounded-sm" />

        <div className="flex justify-between items-center my-4 gap-2 mt-8">
          <Key size={24} className="text-gray-900" />
          <div className="w-10/12 h-6 bg-gray-400 rounded" />
        </div>

        <div className="flex justify-between items-center my-4 gap-2">
          <ComputerTower size={24} className="text-zinc-900" />
          <div className="w-10/12 h-6 bg-gray-400 rounded" />
        </div>

        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
