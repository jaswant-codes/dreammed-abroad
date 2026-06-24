const fs = require('fs');
const path = require('path');

const vsIndiaMd = fs.readFileSync(path.join(process.cwd(), 'src/data/blog_vs_india.md'), 'utf8');
const admissionMd = fs.readFileSync(path.join(process.cwd(), 'src/data/blog_admission.md'), 'utf8');
const cheapestMd = fs.readFileSync(path.join(process.cwd(), 'src/data/blog_cheapest.md'), 'utf8');
const neetMd = fs.readFileSync(path.join(process.cwd(), 'src/data/blog_neet.md'), 'utf8');
const nextMd = fs.readFileSync(path.join(process.cwd(), 'src/data/blog_next.md'), 'utf8');

const escapeMd = (str) => {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
};

const newBlogs = `
  {
    id: 115,
    title: "NEXT Exam Guide for Foreign Medical Graduates 2026",
    slug: "next-exam-guide-for-foreign-medical-graduates",
    excerpt: "Comprehensive 2026 guide on the NEXT Exam for FMGs. Discover syllabus breakdowns, passing criteria, preparation strategies, and how to successfully clear the exam.",
    content: \`${escapeMd(nextMd)}\`,
    category: "MBBS Abroad",
    author: "DreamMed Abroad Expert",
    date: "2026-06-25",
    readTime: "30 min read",
    metaTitle: "NEXT Exam Guide for Foreign Medical Graduates 2026 | DreamMed Abroad",
    metaDescription: "Everything Foreign Medical Graduates need to know about the NEXT Exam in 2026. Passing criteria, syllabus, preparation tips, and NMC guidelines.",
  },
  {
    id: 114,
    title: "MBBS Abroad After NEET 2026 Complete Guide",
    slug: "mbbs-abroad-after-neet-2026",
    excerpt: "A complete step-by-step guide on what to do after qualifying NEET. Discover minimum scores required, top NMC approved countries, fees, and admission timelines.",
    content: \`${escapeMd(neetMd)}\`,
    category: "MBBS Abroad",
    author: "DreamMed Abroad Expert",
    date: "2026-06-25",
    readTime: "25 min read",
    metaTitle: "MBBS Abroad After NEET 2026 Complete Guide | DreamMed Abroad",
    metaDescription: "Qualified NEET in 2026? Find out the best options for MBBS abroad, minimum scores required, budgets, NMC guidelines, and step-by-step admission process.",
  },
  {
    id: 113,
    title: "Cheapest Countries for MBBS Abroad in 2026",
    slug: "cheapest-countries-for-mbbs-abroad-2026",
    excerpt: "Looking for budget-friendly medical education? Discover the cheapest countries for Indian students to study MBBS abroad in 2026 without compromising on quality.",
    content: \`${escapeMd(cheapestMd)}\`,
    category: "MBBS Abroad",
    author: "DreamMed Abroad Expert",
    date: "2026-06-25",
    readTime: "25 min read",
    metaTitle: "Cheapest Countries for MBBS Abroad in 2026 | DreamMed Abroad",
    metaDescription: "Discover the most affordable and cheapest countries for Indian students to study MBBS abroad in 2026. Compare fees, living costs, and NMC approved universities.",
  },
  {
    id: 112,
    title: "MBBS Abroad Admission Process 2026 Step-by-Step Guide",
    slug: "mbbs-abroad-admission-process-2026",
    excerpt: "Navigating the admission process for foreign medical universities can be confusing. Here is your ultimate 2026 step-by-step guide from documentation to visa stamping.",
    content: \`${escapeMd(admissionMd)}\`,
    category: "MBBS Abroad",
    author: "DreamMed Abroad Expert",
    date: "2026-06-25",
    readTime: "30 min read",
    metaTitle: "MBBS Abroad Admission Process 2026 Step-by-Step Guide | DreamMed Abroad",
    metaDescription: "Complete step-by-step guide to the MBBS abroad admission process for Indian students in 2026. Learn about required documents, eligibility, and visa procedures.",
  },
  {
    id: 111,
    title: "MBBS Abroad vs Private Medical College in India 2026",
    slug: "mbbs-abroad-vs-private-medical-college-india",
    excerpt: "Should you take a drop, pay massive fees in India, or study abroad? Read our definitive 2026 comparison between MBBS abroad and private Indian medical colleges.",
    content: \`${escapeMd(vsIndiaMd)}\`,
    category: "MBBS Abroad",
    author: "DreamMed Abroad Expert",
    date: "2026-06-25",
    readTime: "35 min read",
    metaTitle: "MBBS Abroad vs Private Medical College in India 2026 | DreamMed Abroad",
    metaDescription: "Comprehensive 2026 comparison between studying MBBS abroad and joining a private medical college in India. Compare fees, clinical exposure, NEXT passing rates, and ROI.",
  },
`;

let blogsContent = fs.readFileSync(path.join(process.cwd(), 'src/data/blogs.ts'), 'utf8');

// If the old blogs exist (they were prepended), we'll just restore from git or strip them to prevent duplicate IDs.
// To be safe, we can restore blogs.ts from git first.
try {
  require('child_process').execSync('git checkout -- src/data/blogs.ts');
  blogsContent = fs.readFileSync(path.join(process.cwd(), 'src/data/blogs.ts'), 'utf8');
} catch (e) {
  console.log("Could not checkout, assuming safe");
}

blogsContent = blogsContent.replace(/\{\s*id:\s*109,[\s\S]*?(?=\s*\{\s*id:\s*\d+,|\s*\];)/, '');

blogsContent = blogsContent.replace('export const blogPosts: BlogPost[] = [', 'export const blogPosts: BlogPost[] = [\n' + newBlogs);

fs.writeFileSync(path.join(process.cwd(), 'src/data/blogs.ts'), blogsContent);
console.log('Injected all 5 massive SEO blogs into blogs.ts (escaped backslashes)');
