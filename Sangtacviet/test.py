import re

new_line = "chương 1 Phàm nhân lô đỉnh"
n_line = re.sub(r"chương\s+(\d+)", r"Chương \1", new_line)
print(n_line)
    