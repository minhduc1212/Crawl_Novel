with open('new_novel.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    # Remove newline characters
    line = line.strip()
    # Skip if the line is just "。"
    if line == "。":
        continue
    # Add "。" if it's not at the end of the line
    if line and line[-1] != "。":
        line += "。"
    new_lines.append(line)

with open('new_novel.txt', 'w', encoding='utf-8') as f:
    for line in new_lines:
        f.write(line + '\n')