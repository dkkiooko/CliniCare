from models import storage
from models.visit import Visit
from models.doctor import Doctor
from models.patient import Patient
from flask import jsonify

all_visits = storage.all(Visit)
list_visits = []
for value in all_visits.values():
		list_visits.append(value)
num = []
for i in range(0, len(list_visits)):
	num.append(list_visits[i].to_dict())
print(num)

