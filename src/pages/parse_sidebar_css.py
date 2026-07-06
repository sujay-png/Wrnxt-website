import re

file_path = r"C:\Users\SHALOME\.gemini\antigravity\brain\bfe3712e-c706-494e-a640-e8e592e1c9bb\.system_generated\steps\10\content.md"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Find any <style> blocks and search for sidebar or data-side inside them.
styles = re.findall(r'<style[^>]*>(.*?)</style>', content, re.DOTALL)
for i, style in enumerate(styles):
    if "sidebar" in style or "side=" in style:
        print(f"--- Style block {i+1} matches ---")
        # Print matching rules
        rules = re.findall(r'([^}]+{[^}]+})', style)
        for rule in rules:
            if "sidebar" in rule or "side" in rule:
                print(rule.strip())
