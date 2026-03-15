type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-sand/70">{eyebrow}</p>
      <div className="space-y-2">
        <h1 className="max-w-xl text-4xl font-semibold leading-tight md:text-6xl">{title}</h1>
        <p className="max-w-2xl text-base text-sand/75 md:text-lg">{description}</p>
      </div>
    </div>
  );
}
