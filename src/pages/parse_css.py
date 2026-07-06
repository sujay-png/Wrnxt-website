import re

file_path = r"C:\Users\SHALOME\.gemini\antigravity\brain\bfe3712e-c706-494e-a640-e8e592e1c9bb\.system_generated\steps\10\content.md"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Let's search for "border-radius" in the styles and print all rules containing it.
styles = re.findall(r'<style[^>]*>(.*?)</style>', content, re.DOTALL)
for i, style in enumerate(styles):
    for m in re.finditer(r'([^{}]+)\s*{(.*?)}', style, re.DOTALL):
        selector = m.group(1).strip()
        body = m.group(2).strip()
        if "border-radius" in body:
            print(f"Selector: {selector}\nRules: {body}\n")
