import os, re
import glob

def refactor_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if Button is already imported
    if 'import Button from' in content:
        return False

    orig_content = content

    # Replace <a class="btn size-md (secondary|primary)">
    pattern = r'<a([^>]*)class="btn size-md (secondary|primary)"([^>]*)>\s*<span class="btn-content">\s*(.*?)\s*</span>\s*</a>'
    
    def replacer(match):
        attrs1 = match.group(1)
        variant = match.group(2)
        attrs2 = match.group(3)
        inner = match.group(4)
        
        # remove Alpine attributes
        attrs2 = re.sub(r'x-data="[^"]*"', '', attrs2)
        attrs2 = re.sub(r'@mousemove="[^"]*"', '', attrs2)
        attrs2 = re.sub(r'@mouseenter="[^"]*"', '', attrs2)
        attrs2 = re.sub(r'@mouseleave="[^"]*"', '', attrs2)
        
        # remove btn-bg span
        inner = re.sub(r'<span\s+class="btn-bg"[^>]*></span>\s*', '', inner)
        
        # remove any span wrapper inside inner if it was just a span
        inner = re.sub(r'<span[^>]*>\s*(.*?(?:Start a project|Contact us|Partner with us).*?)\s*</span>', r'\1', inner, flags=re.DOTALL)
        
        return f'<Button{attrs1}variant="{variant}"{attrs2}>\n{inner}\n</Button>'
    
    # Replace links
    content = re.sub(pattern, replacer, content, flags=re.DOTALL)
    
    # Replace spans <span class="btn size-md secondary">
    pattern_span = r'<span([^>]*)class="btn size-md (secondary|primary)"([^>]*)>\s*<span class="btn-content">\s*(.*?)\s*</span>\s*</span>'
    def replacer_span(match):
        attrs1 = match.group(1)
        variant = match.group(2)
        attrs2 = match.group(3)
        inner = match.group(4)
        return f'<Button{attrs1}variant="{variant}"{attrs2}>\n{inner}\n</Button>'
    content = re.sub(pattern_span, replacer_span, content, flags=re.DOTALL)

    if content != orig_content:
        # add import
        import_stmt = "import Button from '../ui/Button.astro';" if 'components' in filepath else "import Button from '../components/ui/Button.astro';"
        content = content.replace('---', f'---\n{import_stmt}', 1)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Refactored {filepath}')
        return True
    return False

files = glob.glob('src/**/*.astro', recursive=True)
count = 0
for f in files:
    if refactor_file(f):
        count += 1
print(f'Done refactoring {count} files.')
