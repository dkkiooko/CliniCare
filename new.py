from models import storage
from models.visit import Visit
from models.doctor import Doctor
from models.patient import Patient

visits = storage.get_patient_provider(Patient, patient_id)
print(visits)