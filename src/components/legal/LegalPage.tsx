interface LegalSection {
  title: string;
  body?: string;
  items?: string[];
}

interface LegalPageProps {
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
}

export function LegalPage({ title, description, updated, sections }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-surface pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sky-50 text-sky text-xs font-semibold uppercase tracking-wider mb-4">
            Legal Information
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            {title}
          </h1>
          <p className="mt-4 text-text-secondary leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-wider text-text-muted">
            Last updated: {updated}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 card-shadow space-y-8">
          {sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-xl font-bold text-navy">{section.title}</h2>
              {section.body && (
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  {section.body}
                </p>
              )}
              {section.items && (
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
