import mysql.connector

#search data from sql

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="chivi"
)

mycursor = mydb.cursor()

search_term = 'Ngô Chủ'

sql = "SELECT * FROM chivi_full WHERE novel_name LIKE '%"+search_term+"%'"

mycursor.execute(sql)

myresult = mycursor.fetchall()

for x in myresult:
    print(x)