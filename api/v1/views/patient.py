#!/usr/bin/python3
"""
A new view for patient object that handles all RESTful API actions
"""
from api.v1.views import app_views
from datetime import datetime
from flask import jsonify, abort, make_response, request
from models import storage
from models.visit import Visit
from models.doctor import Doctor
from models.patient import Patient



@app_views.route('/patients/', methods=['GET'], strict_slashes=False)
def get_patients():
    """ Gets all the patients in hospital """
    patients = storage.all(Patient).values()
    patient_list = [patient.to_dict() for patient in patients]
    return jsonify(patient_list)

@app_views.route('create_patient', methods=['POST'], strict_slashes=False)
def create_patient():
    if not request.get_json():
        abort(400, description="Not a JSON")

    
    counter = storage.count(Patient)
    
    data = request.get_json()

    patient_id = 'pt-' + str(counter).zfill(6)
    data['patient_id'] = patient_id

    patient = Patient(**data)
    patient.save()
    return make_response(jsonify(patient.to_dict(), 201))

@app_views.route('/patients/on/<date>/', methods=['GET'], strict_slashes=False)
def get_patients_date(date):
    """ get all the patients on specific date
    format of date is string yyyymmdd """
    patients_of_day = []
    date_format = "%Y%m%d"
    patients = storage.all(Patient).values()
    for patient in patients:
        updated_at = patient.updated_at.date()
        date_requested = datetime.strptime(date, date_format).date()
        if updated_at == date_requested:
            patients_of_day.append(patient.to_dict())
    
    return jsonify(patients_of_day)

@app_views.route('/patient/<patient_id>', methods=['GET'], strict_slashes=False)
def get_patients_id(patient_id):
    """ Gets a patient using patient id """
    patient = storage.get(Patient, patient_id)
    return jsonify(patient.to_dict())
