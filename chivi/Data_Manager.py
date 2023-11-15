import tkinter as tk
from tkinter import messagebox
import mysql.connector
from tkinter import ttk

def connect_to_database():
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="chivi"
        )
        return connection
    except mysql.connector.Error as e:
        messagebox.showerror("Lỗi", f"Lỗi kết nối đến cơ sở dữ liệu: {str(e)}")
        return None

def search_data():
    connection = connect_to_database()
    if connection is not None:
        cursor = connection.cursor()
        search_query = search_entry.get()
        query = f"SELECT * FROM chivi_full WHERE novel_name LIKE '%{search_query}%' OR novel_author LIKE '%{search_query}%'"
        cursor.execute(query)
        result = cursor.fetchall()
        display_data(result)
        connection.close()

def display_data(data):
    result_text.config(state=tk.NORMAL)
    result_text.delete(1.0, tk.END)
    for row in data:
        result_text.insert(tk.END, f"ID: {row[0]}, Name: {row[1]}, Author: {row[2]}\n")
    result_text.config(state=tk.DISABLED)

def add_data():
    connection = connect_to_database()
    if connection is not None:
        cursor = connection.cursor()
        name = name_entry.get()
        author = author_entry.get()
        query = "INSERT INTO chivi_full (novel_name, novel_author) VALUES (%s, %s)"
        val = (name, author)
        try:
            cursor.execute(query, val)
            connection.commit()
            search_data()
            messagebox.showinfo("Thông báo", "Dữ liệu đã được thêm thành công.")
        except mysql.connector.Error as e:
            messagebox.showerror("Lỗi", f"Lỗi thêm dữ liệu: {str(e)}")
        connection.close()

def update_data():
    connection = connect_to_database()
    if connection is not None:
        cursor = connection.cursor()
        id = id_entry.get()
        name = name_entry.get()
        author = author_entry.get()
        query = "UPDATE chivi_full SET novel_name = %s, novel_author = %s WHERE id = %s"
        val = (name, author, id)
        try:
            cursor.execute(query, val)
            connection.commit()
            search_data()
            messagebox.showinfo("Thông báo", "Dữ liệu đã được cập nhật thành công.")
        except mysql.connector.Error as e:
            messagebox.showerror("Lỗi", f"Lỗi cập nhật dữ liệu: {str(e)}")
        connection.close()

# Tạo cửa sổ
window = tk.Tk()
window.title("Quản lý dữ liệu")

# Tạo giao diện
search_label = tk.Label(window, text="Tìm kiếm:")
search_label.grid(row=0, column=0, padx=10, pady=5)
search_entry = tk.Entry(window, width=30)
search_entry.grid(row=0, column=1, padx=10, pady=5)
search_button = tk.Button(window, text="Tìm kiếm", command=search_data)
search_button.grid(row=0, column=2, padx=10, pady=5)

add_label = tk.Label(window, text="Thêm dữ liệu:")
add_label.grid(row=1, column=0, padx=10, pady=5)
name_label = tk.Label(window, text="Tên:")
name_label.grid(row=1, column=1, padx=10, pady=5)
name_entry = tk.Entry(window, width=30)
name_entry.grid(row=1, column=2, padx=10, pady=5)
author_label = tk.Label(window, text="Tác giả:")
author_label.grid(row=1, column=3, padx=10, pady=5)
author_entry = tk.Entry(window, width=30)
author_entry.grid(row=1, column=4, padx=10, pady=5)
add_button = tk.Button(window, text="Thêm", command=add_data)
add_button.grid(row=1, column=5, padx=10, pady=5)

update_label = tk.Label(window, text="Cập nhật dữ liệu:")
update_label.grid(row=2, column=0, padx=10, pady=5)
id_label = tk.Label(window, text="ID:")
id_label.grid(row=2, column=1, padx=10, pady=5)
id_entry = tk.Entry(window, width=10)
id_entry.grid(row=2, column=2, padx=10, pady=5)
update_name_label = tk.Label(window, text="Tên:")
update_name_label.grid(row=2, column=3, padx=10, pady=5)
update_name_entry = tk.Entry(window, width=30)
update_name_entry.grid(row=2, column=4, padx=10, pady=5)
update_author_label = tk.Label(window, text="Tác giả:")
update_author_label.grid(row=2, column=5, padx=10, pady=5)
update_author_entry = tk.Entry(window, width=30)
update_author_entry.grid(row=2, column=6, padx=10, pady=5)
update_button = tk.Button(window, text="Cập nhật", command=update_data)
update_button.grid(row=2, column=7, padx=10, pady=5)

result_text = tk.Text(window, width=140, height=10, state=tk.DISABLED)
result_text.grid(row=3, column=0, columnspan=8, padx=10, pady=5)

# Mở cửa sổ
window.mainloop()
