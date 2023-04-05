import mysql.connector
import pymongo

db = mysql.connector.connect(
    host='34.121.83.101',
    user='root',
    password='password',
    database='data'
)

cursor = db.cursor()

cursor.execute("SELECT grade FROM data.student_grades")

data_list = cursor.fetchall()
data = []


def post_grades():
    cursor.execute("SELECT grade FROM data.student_grades")
    data_list = cursor.fetchall()

    for number in data_list:
        data.append(number[0])

    if len(data) > 0:
        max_value = max(data)
        print(max_value)

        min_value = min(data)
        print(min_value)

        avg = sum(data) / len(data)
        avg_value = "{:.2f}".format(avg)
        print(avg_value)

    client = pymongo.MongoClient('mongodb://mongodb:27017/')
    db = client['data']
    collection = db['analytics']

    collection.update_one({}, {
        "$set": {
            "max": max_value,
            "min": min_value,
            "avg": avg_value
        }
    }, upsert=True)

    print("Statistics created...")

    return


while True:
    try:
        post_grades()
    except ZeroDivisionError:
        print("No values in table yet...")
