const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const publicImgDir = path.join(process.cwd(), 'public', 'images', 'blog');
if (!fs.existsSync(publicImgDir)) {
  fs.mkdirSync(publicImgDir, { recursive: true });
}

const blogs = [
  'src/data/blog_vs_india.md',
  'src/data/blog_admission.md',
  'src/data/blog_cheapest.md',
  'src/data/blog_neet.md',
  'src/data/blog_next.md'
];

blogs.forEach(blogPath => {
  const fullPath = path.join(process.cwd(), blogPath);
  let content = fs.readFileSync(fullPath, 'utf8');

  // Match all markdown images: ![alt](url)
  const imgRegex = /!\[(.*?)\]\((.*?)\)/g;
  
  content = content.replace(imgRegex, (match, alt, srcUrl) => {
    // If it's a local absolute path (starts with C: or file://)
    if (srcUrl.startsWith('C:') || srcUrl.startsWith('c:') || srcUrl.startsWith('file://')) {
      // Remove file:/// if present
      let filePath = srcUrl.replace(/^file:\/\/\//, '');
      
      const fileName = path.basename(filePath);
      const destPath = path.join(publicImgDir, fileName);
      
      try {
        if (fs.existsSync(filePath)) {
          fs.copyFileSync(filePath, destPath);
        } else {
          // Sometimes Windows paths have forward slashes, normalize it
          const normPath = path.normalize(filePath);
          if (fs.existsSync(normPath)) {
            fs.copyFileSync(normPath, destPath);
          } else {
             console.log("Could not find file:", filePath);
          }
        }
      } catch(e) {
        console.error("Error copying", filePath, e);
      }

      // Replace with public path
      const newSrc = `/images/blog/${fileName}`;
      return `![${alt}](${newSrc})`;
    }
    
    return match;
  });

  fs.writeFileSync(fullPath, content);
});

console.log('Fixed local image paths and copied to public folder.');
