#!/usr/bin/pyhton3

from models import storage
from models.visit import Visit
from models.doctor import Doctor
from models.patient import Patient
from flask import Flask, render_template
import uuid

app = Flask(__name__)

@app.route('/patient/<patient_id>')
def patient(patient_id):
    patient = storage.get(Patient, patient_id).values()

    visits = storage.get_patient_provider(Patient, patient_id)
    
    return render_template('client.html',
                        patient=patient,
                        visits=visits)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)