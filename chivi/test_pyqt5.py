import sys
from PyQt5.QtWidgets import (
    QApplication,
    QWidget,
    QLabel,
    QLineEdit,
    QPushButton,
    QGridLayout,
    QVBoxLayout,
    QHBoxLayout,
    QTableWidget,
    QTableWidgetItem,
    QHeaderView,
    QMessageBox,
)
import mysql.connector

class DataManagementApp(QWidget):
    def __init__(self):
        super().__init__()

        self.init_ui()

    def init_ui(self):
        self.setWindowTitle("Quản lý dữ liệu")
        self.setGeometry(100, 100, 800, 600)

        self.search_label = QLabel("Tìm kiếm:")
        self.search_entry = QLineEdit()
        self.search_button = QPushButton("Tìm kiếm")
        self.search_button.clicked.connect(self.search_data)

        self.add_label = QLabel("Thêm dữ liệu:")
        self.name_label = QLabel("Tên:")
        self.name_entry = QLineEdit()
        self.author_label = QLabel("Tác giả:")
        self.author_entry = QLineEdit()
        self.add_button = QPushButton("Thêm")
        self.add_button.clicked.connect(self.add_data)

        self.copy_button = QPushButton("Copy")
        self.copy_button.clicked.connect(self.copy_selected_text)

        self.update_label = QLabel("Cập nhật dữ liệu:")
        self.id_label = QLabel("ID:")
        self.id_entry = QLineEdit()
        self.update_name_label = QLabel("Tên:")
        self.update_name_entry = QLineEdit()
        self.update_author_label = QLabel("Tác giả:")
        self.update_author_entry = QLineEdit()
        self.update_button = QPushButton("Cập nhật")
        self.update_button.clicked.connect(self.update_data)

        self.result_tree = QTableWidget()
        self.result_tree.setColumnCount(3)
        self.result_tree.setHorizontalHeaderLabels(["ID", "Tên", "Tác giả"])
        self.result_tree.verticalHeader().setVisible(False)
        self.result_tree.setSelectionMode(QTableWidget.SingleSelection)
        self.result_tree.setSelectionBehavior(QTableWidget.SelectRows)
        self.result_tree.setSortingEnabled(True)

        self.init_layout()

    def init_layout(self):
        layout = QGridLayout()
        layout.addWidget(self.search_label, 0, 0)
        layout.addWidget(self.search_entry, 0, 1)
        layout.addWidget(self.search_button, 0, 2)

        layout.addWidget(self.add_label, 1, 0)
        layout.addWidget(self.name_label, 1, 1)
        layout.addWidget(self.name_entry, 1, 2)
        layout.addWidget(self.author_label, 1, 3)
        layout.addWidget(self.author_entry, 1, 4)
        layout.addWidget(self.add_button, 1, 5)
        layout.addWidget(self.copy_button, 4, 0)

        layout.addWidget(self.update_label, 2, 0)
        layout.addWidget(self.id_label, 2, 1)
        layout.addWidget(self.id_entry, 2, 2)
        layout.addWidget(self.update_name_label, 2, 3)
        layout.addWidget(self.update_name_entry, 2, 4)
        layout.addWidget(self.update_author_label, 2, 5)
        layout.addWidget(self.update_author_entry, 2, 6)
        layout.addWidget(self.update_button, 2, 7)

        layout.addWidget(self.result_tree, 3, 0, 1, 8)

        self.setLayout(layout)

    def connect_to_database(self):
        try:
            connection = mysql.connector.connect(
                host="localhost", user="root", password="", database="chivi"
            )
            return connection
        except mysql.connector.Error as e:
            self.show_error_message(f"Lỗi kết nối đến cơ sở dữ liệu: {str(e)}")
            return None

    def show_error_message(self, message):
        QMessageBox.critical(self, "Lỗi", message)

    def search_data(self):
        connection = self.connect_to_database()
        if connection is not None:
            cursor = connection.cursor()
            search_query = self.search_entry.text()
            query = f"SELECT * FROM chivi_full WHERE novel_name LIKE '%{search_query}%' OR novel_author LIKE '%{search_query}%'"
            cursor.execute(query)
            result = cursor.fetchall()
            self.display_data(result)
            connection.close()

    def display_data(self, data):
        self.result_tree.setRowCount(0)
        for row in data:
            self.result_tree.insertRow(self.result_tree.rowCount())
            for col, value in enumerate(row):
                item = QTableWidgetItem(str(value))
                self.result_tree.setItem(self.result_tree.rowCount() - 1, col, item)

    def add_data(self):
        connection = self.connect_to_database()
        if connection is not None:
            cursor = connection.cursor()
            name = self.name_entry.text()
            author = self.author_entry.text()
            query = "INSERT INTO chivi_full (novel_name, novel_author) VALUES (%s, %s)"
            val = (name, author)
            try:
                cursor.execute(query, val)
                connection.commit()
                self.search_data()
                QMessageBox.information(
                    self, "Thông báo", "Dữ liệu đã được thêm thành công."
                )
            except mysql.connector.Error as e:
                self.show_error_message(f"Lỗi thêm dữ liệu: {str(e)}")
            connection.close()

    def update_data(self):
        connection = self.connect_to_database()
        if connection is not None:
            cursor = connection.cursor()
            id = self.id_entry.text()
            name = self.update_name_entry.text()
            author = self.update_author_entry.text()
            query = "UPDATE chivi_full SET novel_name = %s, novel_author = %s WHERE id = %s"
            val = (name, author, id)
            try:
                cursor.execute(query, val)
                connection.commit()
                self.search_data()
                QMessageBox.information(
                    self, "Thông báo", "Dữ liệu đã được cập nhật thành công."
                )
            except mysql.connector.Error as e:
                self.show_error_message(f"Lỗi cập nhật dữ liệu: {str(e)}")
            connection.close()

    def copy_selected_text(self):
        selected_items = self.result_tree.selectedItems()
        if selected_items:
            copied_text = ""
            for i in range(0, len(selected_items), 3):  # Iterate by rows
                row_text = "\t".join(
                    [item.text() for item in selected_items[i : i + 3]]
                )
                copied_text += row_text + "\n"
            QApplication.clipboard().setText(copied_text)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = DataManagementApp()
    window.show()
    sys.exit(app.exec_())
