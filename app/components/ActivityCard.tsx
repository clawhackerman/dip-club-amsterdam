import Link from "next/link";
import Image from "next/image";

type ActivityCardProps = {
  title: string;
  frequency: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  accentColor?: string;
};

export default function ActivityCard({
  title,
  frequency,
  description,
  imageSrc,
  imageAlt,
  href,
  accentColor = "bg-terracotta",
}: ActivityCardProps) {
  return (
    <Link href={href} className="group block">
      <article className="overflow-hidden rounded-lg border-[6px] border-dark bg-white transition-all duration-300 group-hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="border-t-[6px] border-dark" />
        <div className="p-6 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h3 className="font-heading text-xl font-extrabold uppercase tracking-wide">
              {title}
            </h3>
            <span className={`rounded-sm px-3 py-0.5 text-xs font-semibold text-white ${accentColor}`}>
              {frequency}
            </span>
          </div>
          <p className="text-sm text-slate">{description}</p>
          <span className="text-sm font-semibold text-terracotta group-hover:text-terracotta-dark transition-colors mt-1">
            Learn more ↘
          </span>
        </div>
      </article>
    </Link>
  );
}
