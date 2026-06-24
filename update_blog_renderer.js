const fs = require('fs');
let content = fs.readFileSync('src/app/blog/[slug]/page.tsx', 'utf8');

const imageHandler = `
    // Image
    if (trimmed.startsWith('![')) {
      const imgMatch = trimmed.match(/^!\\[(.*?)\\]\\((.*?)\\)/);
      if (imgMatch) {
        elements.push(
          <figure key={i} className="my-8">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <Image 
                src={imgMatch[2]} 
                alt={imgMatch[1] || 'DreamMed Abroad'} 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            {imgMatch[1] && (
              <figcaption className="text-center text-sm text-text-secondary mt-3 italic">
                {imgMatch[1]}
              </figcaption>
            )}
          </figure>
        );
      }
      i++;
      continue;
    }
`;

const ctaHandler = `
    // MID_CTA
    if (trimmed === '[MID_CTA]') {
      elements.push(
        <div key={\`mid-cta-\${i}\`} className="my-10 p-8 rounded-2xl bg-surface border border-sky-200 shadow-md flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h4 className="text-2xl font-bold text-navy mb-2">Get Free MBBS Abroad Counselling</h4>
            <p className="text-text-secondary">Speak with our experts to find the perfect NMC approved university within your budget.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/apply">
              <Button className="bg-sky text-white hover:bg-sky-600 px-6 py-6 rounded-full font-bold w-full sm:w-auto shadow-md">
                Apply Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-2 border-sky text-sky hover:bg-sky-50 px-6 py-6 rounded-full font-bold w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      );
      i++;
      continue;
    }
`;

content = content.replace('// Empty lines', imageHandler + '\n' + ctaHandler + '\n    // Empty lines');

// End CTA requires updating in page.tsx
content = content.replace(
  /<div className="max-w-2xl mx-auto text-center">[\s\S]*?<\/div>\s*<\/div>\s*<\/article>/,
  `<div className="max-w-2xl mx-auto text-center relative z-10">
              <h3 className="text-3xl font-bold text-white mb-6">Talk To DreamMed Abroad Experts</h3>
              <p className="text-white/80 mb-8">
                Get free, transparent, and expert counselling to find the perfect NMC-approved university for your MBBS journey.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
                <Link href="/apply" className="w-full sm:w-auto">
                  <Button className="w-full bg-white text-navy hover:bg-sky-50 rounded-full px-8 py-6 h-auto text-lg font-bold shadow-lg transition-all hover:scale-105">
                    Apply Now <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full border-2 border-white text-white hover:bg-white/10 rounded-full px-8 py-6 h-auto text-lg font-bold bg-transparent transition-all hover:scale-105">
                    <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </article>`
);

// We also need to import Image if not imported
if (!content.includes('import Image')) {
  content = content.replace('import Link', 'import Link from "next/link";\nimport Image from "next/image";\n// import Link');
}

fs.writeFileSync('src/app/blog/[slug]/page.tsx', content);
console.log('Updated renderer successfully');
