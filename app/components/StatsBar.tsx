import ScrollReveal from "./ScrollReveal";

type Stat = { value: string; label: string };
type StatsBarProps = { stats: Stat[] };

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="bg-terracotta py-16 lg:py-20">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <p className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
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
