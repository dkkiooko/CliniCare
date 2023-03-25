from models import storage
from models.visit import Visit
from models.doctor import Doctor
from models.patient import Patient
from flask import jsonify

patient_id = 'fc36e1ef-7312-497e-9472-4b6ba01a13e5'
visits = storage.get_patient_provider(Patient, patient_id)
visit = []
for i in range(0, len(visits)):
	visit.append(visits[i].to_dict())
return(jsonify(visit))
