import tkinter as tk
from tkinter import messagebox
from tkinter import ttk
import mysql.connector

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
    # Xóa tất cả các cột và dòng cũ trước khi cập nhật
    for i in result_tree.get_children():
        result_tree.delete(i)

    # Thêm dữ liệu mới
    for row in data:
        result_tree.insert("", tk.END, values=row)

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
def sort_treeview(tree, col, reverse):
    """Sort the data in the Treeview widget based on the column clicked by the user."""
    data = [(tree.set(child, col), child) for child in tree.get_children('')]
    data.sort(reverse=reverse)
    for index, (val, child) in enumerate(data):
        tree.move(child, '', index)
    tree.heading(col, command=lambda: sort_treeview(tree, col, not reverse))

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

def on_configure(event, tree):
    """Resize the columns of the Treeview widget based on the size of the window."""
    # update the column widths to fill the available space
    tree.update()
    for col in tree["columns"]:
        tree.column(col, width=100)
    window_width = event.width
    tree_width = sum(tree.column(col, width=None) for col in tree["columns"])
    if tree_width < window_width:
        # expand the last column to fill the remaining space
        last_col = tree["columns"][-1]
        tree.column(last_col, width=window_width - tree_width)

# Tạo cửa sổ
window = tk.Tk()
window.title("Quản lý dữ liệu")

# Tạo giao diện
window.columnconfigure(0, weight=1)  # Cột 0 có thể co giãn
window.columnconfigure(1, weight=1)  # Cột 1 có thể co giãn
window.columnconfigure(2, weight=1)  # Cột 2 có thể co giãn
window.columnconfigure(3, weight=1)  # Cột 3 có thể co giãn
window.columnconfigure(4, weight=1)  # Cột 4 có thể co giãn
window.columnconfigure(5, weight=1)  # Cột 5 có thể co giãn
window.columnconfigure(6, weight=1)  # Cột 6 có thể co giãn
window.columnconfigure(7, weight=1)  # Cột 7 có thể co giãn

search_label = tk.Label(window, text="Tìm kiếm:")
search_label.grid(row=0, column=0, padx=10, pady=5, sticky='w')
search_entry = tk.Entry(window, width=30)
search_entry.grid(row=0, column=1, padx=10, pady=5, sticky='ew')
search_button = tk.Button(window, text="Tìm kiếm", command=search_data)
search_button.grid(row=0, column=2, padx=10, pady=5, sticky='w')

add_label = tk.Label(window, text="Thêm dữ liệu:")
add_label.grid(row=1, column=0, padx=10, pady=5, sticky='w')
name_label = tk.Label(window, text="Tên:")
name_label.grid(row=1, column=1, padx=10, pady=5, sticky='w')
name_entry = tk.Entry(window, width=30)
name_entry.grid(row=1, column=2, padx=10, pady=5, sticky='ew')
author_label = tk.Label(window, text="Tác giả:")
author_label.grid(row=1, column=3, padx=10, pady=5, sticky='w')
author_entry = tk.Entry(window, width=30)
author_entry.grid(row=1, column=4, padx=10, pady=5, sticky='ew')
add_button = tk.Button(window, text="Thêm", command=add_data)
add_button.grid(row=1, column=5, padx=10, pady=5, sticky='w')

update_label = tk.Label(window, text="Cập nhật dữ liệu:")
update_label.grid(row=2, column=0, padx=10, pady=5, sticky='w')
id_label = tk.Label(window, text="ID:")
id_label.grid(row=2, column=1, padx=10, pady=5, sticky='w')
id_entry = tk.Entry(window, width=10)
id_entry.grid(row=2, column=2, padx=10, pady=5, sticky='ew')
update_name_label = tk.Label(window, text="Tên:")
update_name_label.grid(row=2, column=3, padx=10, pady=5, sticky='w')
update_name_entry = tk.Entry(window, width=30)
update_name_entry.grid(row=2, column=4, padx=10, pady=5, sticky='ew')
update_author_label = tk.Label(window, text="Tác giả:")
update_author_label.grid(row=2, column=5, padx=10, pady=5, sticky='w')
update_author_entry = tk.Entry(window, width=30)
update_author_entry.grid(row=2, column=6, padx=10, pady=5, sticky='ew')
update_button = tk.Button(window, text="Cập nhật", command=update_data)
update_button.grid(row=2, column=7, padx=10, pady=5, sticky='w')

# Tạo Treeview cho hiển thị dữ liệu
columns = ("ID", "Tên", "Tác giả")
result_tree = ttk.Treeview(window, columns=columns, show="headings", selectmode="browse")

# Thiết lập cột và binding cho việc sắp xếp
for col in columns:
    result_tree.heading(col, text=col, command=lambda c=col: sort_treeview(result_tree, c, False))
    result_tree.column(col, width=100, anchor="center")
    
result_tree.grid(row=3, column=0, columnspan=8, padx=10, pady=5, sticky='nsew')

# Thiết lập scrollbar cho Treeview
tree_scroll = ttk.Scrollbar(window, orient="vertical", command=result_tree.yview)
tree_scroll.grid(row=3, column=8, sticky="ns")
result_tree.configure(yscrollcommand=tree_scroll.set)

# Binding cho việc cập nhật kích thước cột khi thay đổi kích thước cửa sổ
window.bind("<Configure>", lambda event, tree=result_tree: on_configure(event, tree))

# Mở cửa sổ
window.mainloop()
