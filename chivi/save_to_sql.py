# save data from yousuu_new.txt to sql 
import json
import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="chivi"
)

mycursor = mydb.cursor()
# tạo table với 2 có 3 cột là id, novel_name, novel_author
mycursor.execute("CREATE TABLE chivi_full (id INT AUTO_INCREMENT PRIMARY KEY, novel_name VARCHAR(255), novel_author VARCHAR(255))")

# lưu dữ liệu của chivi_full.json vào table
with open('chivi_full.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    for i in data:
        sql = "INSERT INTO chivi_full (novel_name, novel_author) VALUES (%s, %s)"
        val = (i['novel_name'], i['novel_author'])
        mycursor.execute(sql, val)
        mydb.commit()
        print(mycursor.rowcount, "record inserted.")
