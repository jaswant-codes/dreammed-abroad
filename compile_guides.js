import fs from 'fs';
import path from 'path';

const guide1 = fs.readFileSync(path.join(process.cwd(), 'src/data/guide1.md'), 'utf8');
const guide2 = fs.readFileSync(path.join(process.cwd(), 'src/data/guide2.md'), 'utf8');
const guide3 = fs.readFileSync(path.join(process.cwd(), 'src/data/guide3.md'), 'utf8');
const guideRussia = fs.readFileSync(path.join(process.cwd(), 'src/data/guide_russia.md'), 'utf8');

const content = `import { BlogPost } from "@/types";

export const guidesData: BlogPost[] = [
  {
    id: 104,
    title: "MBBS in Russia 2026 Complete Guide for Indian Students",
    slug: "mbbs-in-russia-2026",
    excerpt: "The most comprehensive 2026 guide for Indian students planning to study MBBS in Russia. Covering fees, NMC approved universities, admission processes, and student life.",
    content: \`${guideRussia.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`,
    category: "MBBS Guide",
    author: "DreamMed Abroad Russia Expert",
    date: "2026-06-24",
    readTime: "25 min read",
    metaTitle: "MBBS in Russia 2026 Complete Guide for Indian Students | DreamMed Abroad",
    metaDescription: "Comprehensive 2026 guide to studying MBBS in Russia. Compare fees, top NMC approved universities, admission process, and eligibility for Indian students.",
  },
  {
    id: 101,
    title: "MBBS Abroad 2026 Complete Guide for Indian Students",
    slug: "mbbs-abroad-2026-guide",
    excerpt: "The ultimate 2026 guide for Indian students planning to study MBBS abroad. Covering fees, admission processes, top countries, and NMC guidelines.",
    content: \`${guide1.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`,
    category: "MBBS Guide",
    author: "DreamMed Abroad",
    date: "2026-06-24",
    readTime: "20 min read",
    metaTitle: "MBBS Abroad 2026 Complete Guide for Indian Students | DreamMed",
    metaDescription: "Comprehensive 2026 guide to studying MBBS abroad. Details on fees, admission process, top NMC approved universities, and student life.",
  },
  {
    id: 102,
    title: "Top NMC Approved Medical Universities 2026",
    slug: "nmc-approved-medical-universities-2026",
    excerpt: "Discover the top NMC approved medical universities abroad for Indian students in 2026. Compare fees, rankings, and facilities across Russia, Central Asia, and Georgia.",
    content: \`${guide2.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`,
    category: "MBBS Guide",
    author: "DreamMed Abroad",
    date: "2026-06-24",
    readTime: "18 min read",
    metaTitle: "Top NMC Approved Medical Universities 2026 | DreamMed",
    metaDescription: "Explore the best NMC approved medical universities abroad for Indian students in 2026. Detailed profiles, fee structures, and admission requirements.",
  },
  {
    id: 103,
    title: "MBBS Abroad Fees Comparison 2026",
    slug: "mbbs-abroad-fees-comparison-2026",
    excerpt: "Detailed fee comparison of MBBS abroad in 2026. Compare tuition, hostel, and total costs across Russia, Uzbekistan, Kazakhstan, Kyrgyzstan, and Georgia.",
    content: \`${guide3.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`,
    category: "MBBS Guide",
    author: "DreamMed Abroad",
    date: "2026-06-24",
    readTime: "15 min read",
    metaTitle: "MBBS Abroad Fees Comparison 2026 | DreamMed",
    metaDescription: "Complete cost breakdown and fees comparison for MBBS abroad in 2026. Find the most affordable NMC approved universities.",
  }
];

export function getGuideBySlug(slug: string): BlogPost | undefined {
  return guidesData.find((g) => g.slug === slug);
}
`;

fs.writeFileSync(path.join(process.cwd(), 'src/data/guides.ts'), content);
console.log('src/data/guides.ts generated successfully.');
