import mysql.connector
import pymongo

db = mysql.connector.connect(
    host='172.24.0.1',
    user='root',
    password='password',
    database='data',
    port=3306
)

cursor = db.cursor()
cursor.execute("SELECT grades FROM student_grades")

data = cursor.fetchall()

max_value = max(data)
min_value = min(data)
avg_value = sum(data) / len(data)

max_grade = {"max": max_value}
min_grade = {'min': min_value}
avg_grade = {'avg': avg_value}

client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['analytics']
collection = db['results']

collection.insert_one(max_grade)
collection.insert_one(min_grade)
collection.insert_one(avg_grade)
