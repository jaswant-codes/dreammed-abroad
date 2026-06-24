const fs = require('fs');
const path = require('path');

const blogsTsPath = path.join(__dirname, 'src/data/blogs.ts');
const article1Path = 'C:\\Users\\jaswa\\.gemini\\antigravity\\brain\\f86d8bc5-c9dc-459a-b7f8-01e4badb37b9\\scratch\\article1_mbbs_abroad_2026.md';
const article2Path = 'C:\\Users\\jaswa\\.gemini\\antigravity\\brain\\f86d8bc5-c9dc-459a-b7f8-01e4badb37b9\\scratch\\article2_nmc_universities.md';
const article3Path = 'C:\\Users\\jaswa\\.gemini\\antigravity\\brain\\f86d8bc5-c9dc-459a-b7f8-01e4badb37b9\\scratch\\article3_fees_comparison.md';

const content1 = fs.readFileSync(article1Path, 'utf8');
const content2 = fs.readFileSync(article2Path, 'utf8');
const content3 = fs.readFileSync(article3Path, 'utf8');

const newPosts = `
  {
    id: 9,
    title: "MBBS Abroad 2026 Complete Guide",
    slug: "mbbs-abroad-2026-complete-guide",
    excerpt: "The ultimate guide for Indian students planning to study MBBS abroad in 2026. Covering fees, admission process, top countries, and NMC guidelines.",
    content: \`${content1.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`,
    category: "MBBS Abroad",
    author: "DreamMed Abroad",
    date: "2026-06-24",
    readTime: "15 min read",
    metaTitle: "MBBS Abroad 2026 Complete Guide | DreamMed Abroad",
    metaDescription: "The ultimate guide for Indian students planning to study MBBS abroad in 2026. Covering fees, admission process, top countries, and NMC guidelines."
  },
  {
    id: 10,
    title: "Top NMC Approved Medical Universities 2026",
    slug: "top-nmc-approved-medical-universities-2026",
    excerpt: "Discover the top NMC approved medical universities abroad for Indian students in 2026. Compare fees, rankings, and facilities across Russia, Central Asia, and Georgia.",
    content: \`${content2.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`,
    category: "University Comparison",
    author: "DreamMed Abroad",
    date: "2026-06-24",
    readTime: "14 min read",
    metaTitle: "Top NMC Approved Medical Universities 2026 | DreamMed Abroad",
    metaDescription: "Discover the top NMC approved medical universities abroad for Indian students in 2026. Compare fees, rankings, and facilities."
  },
  {
    id: 11,
    title: "MBBS Abroad Fees Comparison 2026",
    slug: "mbbs-abroad-fees-comparison-2026",
    excerpt: "Detailed fee comparison of MBBS abroad in 2026. Compare tuition, hostel, and total costs across Russia, Uzbekistan, Kazakhstan, Kyrgyzstan, and Georgia.",
    content: \`${content3.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`,
    category: "University Comparison",
    author: "DreamMed Abroad",
    date: "2026-06-24",
    readTime: "12 min read",
    metaTitle: "MBBS Abroad Fees Comparison 2026 | DreamMed Abroad",
    metaDescription: "Detailed fee comparison of MBBS abroad in 2026. Compare tuition, hostel, and total costs across top countries."
  }
];`;

let blogsContent = fs.readFileSync(blogsTsPath, 'utf8');
blogsContent = blogsContent.replace(/  \},\n\];/g, `  },${newPosts}`);
fs.writeFileSync(blogsTsPath, blogsContent);
console.log('Successfully injected 3 new articles into blogs.ts');
