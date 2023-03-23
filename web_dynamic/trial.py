#!/usr/bin/pyhton3

from models import storage
from models.visit import Visit
from models.doctor import Doctor
from models.patient import Patient
from flask import Flask, render_template, request
import uuid

app = Flask(__name__)

@app.route('/patient/<patient_id>', strict_slashes=False)
def patient(patient_id):
    """ retrieves patient by patient id """
    patient = storage.get(Patient, patient_id)

    visits = storage.get_patient_provider(Patient, patient_id)
    
    num = []
    for i in range(0, len(visits)):
        num.append(i)

    return render_template('client.html',
                        patient=patient,
                        visits=visits,
                        num=num,
                        cache_id=uuid.uuid4())

@app.route('/reception', methods=['POST'])
def create_patient():
    if request.method == "POST":
        patient_data = request.get_json()
        new_patient = Patient(patient_data)
        storage.new(new_patient)
        storage.save()
    return 

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)