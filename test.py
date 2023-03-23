from models import storage
from models.visit import Visit
from models.doctor import Doctor
from models.patient import Patient
from flask import jsonify

patient_id = '019ebdd0-3e98-415a-a240-cb606f57b023'
visits = storage.get_patient_provider(Patient, patient_id)
print(visits)
