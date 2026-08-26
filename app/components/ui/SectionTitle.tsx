type Props = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
}: Props) {
  return (
    <div className="mb-16 text-center">

      <p className="uppercase tracking-[6px] text-green-500 font-semibold">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-5xl font-bold">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-400">
          {description}
        </p>
      )}

    </div>
  );
}