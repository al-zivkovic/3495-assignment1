import mysql.connector
import pymongo

db = mysql.connector.connect(
    host='mysql_db',
    user='root',
    password='password',
    database='data',
)

cursor = db.cursor()

cursor.execute("SELECT grade FROM data.student_grades")

data_list = cursor.fetchall()
data = []

for number in data_list:
    data.append(number[0])

max_value = max(data)
print(max_value)

min_value = min(data)
print(min_value)

avg_value = sum(data) / len(data)
print(avg_value)

result = {
    "max": max_value,
    "min": min_value,
    "avg": "{:.2f}".format(avg_value)
}

client = pymongo.MongoClient('mongodb://mongodb:27017/')
db = client['data']
collection = db['analytics']

collection.delete_many({})
print("Deleted old stats...")

collection.insert_one(result)
print("Statistics created...")

