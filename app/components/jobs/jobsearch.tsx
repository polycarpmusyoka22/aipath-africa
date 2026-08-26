"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function JobSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="mb-10">

      <input
        type="text"
        placeholder="Search AI jobs..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          rounded-2xl
          border
          border-zinc-700
          bg-zinc-900
          px-6
          py-4
          text-lg
          outline-none
          focus:border-green-500
        "
      />

    </div>
  );
}