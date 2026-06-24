const fs = require('fs');
const path = require('path');

const blogMd = fs.readFileSync(path.join(process.cwd(), 'src/data/blog_neet.md'), 'utf8');

const newBlogObj = `  {
    id: 109,
    title: "MBBS Abroad After NEET 2026 – Complete Guide",
    slug: "mbbs-abroad-after-neet-2026",
    excerpt: "Discover the best countries, minimum scores, NMC guidelines, and budgets for studying MBBS abroad after qualifying NEET in 2026.",
    content: \`${blogMd.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`,
    category: "MBBS Abroad",
    author: "DreamMed Abroad Expert",
    date: "2026-06-24",
    readTime: "20 min read",
    metaTitle: "MBBS Abroad After NEET 2026 – Complete Guide | DreamMed Abroad",
    metaDescription: "Comprehensive 2026 guide to studying MBBS abroad after NEET. Check minimum scores required, top NMC approved countries, fees, and admission timeline.",
  },`;

let blogsContent = fs.readFileSync(path.join(process.cwd(), 'src/data/blogs.ts'), 'utf8');

// Insert the new blog object right after "export const blogPosts: BlogPost[] = ["
blogsContent = blogsContent.replace('export const blogPosts: BlogPost[] = [', 'export const blogPosts: BlogPost[] = [\n' + newBlogObj);

fs.writeFileSync(path.join(process.cwd(), 'src/data/blogs.ts'), blogsContent);
console.log('Injected NEET blog into blogs.ts');
