import ScrollReveal from "./ScrollReveal";

type Stat = { value: string; label: string };
type StatsBarProps = { stats: Stat[] };

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="bg-offwhite py-16 lg:py-20 border-y border-dark/5">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <p className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
