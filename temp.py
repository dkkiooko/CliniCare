from models import storage
from models.patient import Patient
from datetime import datetime
from json import dump, dumps, load, loads

patients = storage.all(Patient)
"""for patient in patients:
    time = "%Y-%m-%dT%H:%M:%S.%f"
    date = "%Y%m%d"
    print(patient.updated_at.date())
    if patient.updated_at.date() == datetime.strptime('20230315',date).date():
        patient = patient.to_dict()
        print(type(patient))
        print(patient)"""

print(patients.to_dict())