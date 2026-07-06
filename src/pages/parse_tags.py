import re

file_path = r"C:\Users\SHALOME\.gemini\antigravity\brain\bfe3712e-c706-494e-a640-e8e592e1c9bb\.system_generated\steps\10\content.md"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

articles = re.findall(r'<article[^>]*>.*?</article>', content, re.DOTALL)
for i, art in enumerate(articles):
    title_m = re.search(r'<h[234][^>]*>(.*?)</h[234]>', art)
    title = re.sub(r'<[^>]+>', '', title_m.group(1)).strip() if title_m else "No title"
    
    # Let's find tags
    tags = re.findall(r'<span[^>]*class="Tag[^"]*"[^>]*>(.*?)</span>', art)
    # Strip HTML tags inside tags
    tags = [re.sub(r'<[^>]+>', '', t).strip() for t in tags]
    
    print(f"Article {i+1}: {title}")
    print(f"Tags: {tags}")
