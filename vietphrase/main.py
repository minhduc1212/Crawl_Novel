with open("new_file.txt", "r", encoding="utf-8") as file:
    with open("Chinaphrase.txt", "w", encoding="utf-8") as new_file:
        for line in file:
            line = line.strip()
            if "=" in line:
                key, value = line.split("=")
                key = key.strip()
                value = value.strip()
                # Đảo chỗ hai phần tử
                key, value = value, key
                # Ghi dữ liệu vào tệp mới
                new_file.write(f"{key}={value}\n")