const fs = require('fs');
const glob = require('glob');
const path = require('path');

// Fallback to simple recursive search if glob fails
function findAstroFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findAstroFiles(filePath, fileList);
    } else if (filePath.endsWith('.astro')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = findAstroFiles('./src');
let count = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let origContent = content;

  if (content.includes('import Button from')) {
    continue;
  }

  // Replace <a class="btn size-md secondary">...</a>
  const pattern = /<a([^>]*)class="btn size-md (secondary|primary|ghost)"([^>]*)>\s*<span class="btn-content">\s*([\s\S]*?)\s*<\/span>\s*<\/a>/g;
  content = content.replace(pattern, (match, attrs1, variant, attrs2, inner) => {
    // remove Alpine attributes
    attrs2 = attrs2.replace(/x-data="[^"]*"/g, '');
    attrs2 = attrs2.replace(/@mousemove="[^"]*"/g, '');
    attrs2 = attrs2.replace(/@mouseenter="[^"]*"/g, '');
    attrs2 = attrs2.replace(/@mouseleave="[^"]*"/g, '');
    
    // remove btn-bg span
    inner = inner.replace(/<span\s+class="btn-bg"[^>]*><\/span>\s*/g, '');
    
    // remove span wrapper inside inner if it exists
    inner = inner.replace(/<span[^>]*>\s*([\s\S]*?(?:Start a project|Contact us|Partner with us|Meet the makers|Our process|Explore|View Project|View all case studies)[\s\S]*?)\s*<\/span>/g, '$1');
    
    return `<Button${attrs1}variant="${variant}"${attrs2}>\n${inner}\n</Button>`;
  });

  // Replace spans <span class="btn size-md secondary">...</span>
  const patternSpan = /<span([^>]*)class="btn size-md (secondary|primary|ghost)"([^>]*)>\s*<span class="btn-content">\s*([\s\S]*?)\s*<\/span>\s*<\/span>/g;
  content = content.replace(patternSpan, (match, attrs1, variant, attrs2, inner) => {
    inner = inner.replace(/<span[^>]*>\s*([\s\S]*?(?:Start a project|Contact us|Partner with us|Meet the makers|Our process|Explore|View Project|View all case studies)[\s\S]*?)\s*<\/span>/g, '$1');
    return `<Button${attrs1}variant="${variant}"${attrs2}>\n${inner}\n</Button>`;
  });

  if (content !== origContent) {
    const importStmt = file.includes('components') ? "import Button from '../ui/Button.astro';" : "import Button from '../components/ui/Button.astro';";
    content = content.replace('---', `---\n${importStmt}`);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Refactored ${file}`);
    count++;
  }
}

console.log(`Done refactoring ${count} files.`);
