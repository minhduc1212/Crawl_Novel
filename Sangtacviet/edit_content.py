import re

with open("content.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()
content = ""
for line in lines:

    new_line = line.strip()
    if new_line == "":
        continue
    elif new_line.startswith("Chương"):
        n_line = re.sub(r"chương\s+(\d+)", r"Chương \1", new_line)
        content += "\n\n\n" + n_line + "\n\n\n"
        print(n_line)
    else:
        content += "\t" + new_line + "\n"
with open("content.txt", "w", encoding="utf-8") as f:
    f.write(content)