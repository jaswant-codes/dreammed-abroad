import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
  light?: boolean;
  children?: ReactNode;
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {badge && (
        <span
          className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 ${
            light
              ? "bg-white/10 text-white/80"
              : "bg-sky-50 text-sky"
          }`}
        >
          {badge}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl font-bold tracking-tight ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg max-w-2xl ${
            centered ? "mx-auto" : ""
          } ${light ? "text-white/70" : "text-text-secondary"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
