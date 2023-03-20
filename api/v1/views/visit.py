#!/usr/bin/python3
"""
A new view for visit object that handles all RESTful API actions
"""
from api.v1.views import app_views
from datetime import datetime
from flask import jsonify, abort, make_response, request
from models import storage
from models.visit import Visit
from models.doctor import Doctor
from models.patient import Patient


@app_views.route('/visits/', methods=['GET'], strict_slashes=False)
def get_visits():
    """ Gets all the visits in hospital """
    visits = storage.all(Visit)
    visit_list = [visit.to_dict() for visit in visits]
    return jsonify(visit_list)

@app_views.route('/visits/<date>/', methods=['GET'], strict_slashes=False)
def get_visits_date(date):
    """ get all the visits on specific date
    format of date is string yyyymmdd """
    visits_of_day = []
    date_format = "%Y%m%d"
    visits = storage.all(Visit).values()
    for visit in visits:
        updated_at = visit.updated_at.date()
        date_requested = datetime.strptime(date, date_format).date()
        if updated_at == date_requested:
            visits_of_day.append(visit.to_dict())
    
    return jsonify(visits_of_day)

@app_views.route('/visits/<visit_id>/', methods=['GET'], strict_slashes=False)
def get_visit(visit_id):
    """ get particular visit by visit id """
    visit = storage.get(Visit, visit_id)
    if not visit:
        abort(404)
    return jsonify(visit.to_dict())

@app_views.route('/visits/<doctor_id>/', methods=['GET'], strict_slashes=False)
def get_doctor_visit(doctor_id):
    """ get all visits to a particular doctor"""
    list_visits = []
    visits = storage.all(Visit).values()
    for visit in visits:
        if visit.doctor_id == doctor_id:
            list_visits.append(visit.to_dict())
    return jsonify(list_visits)

@app_views.route('/visits/<doctor_id>/<date>/', methods=['GET'], strict_slashes=False)
def get_doctor_date(doctor_id, date):
    """ get all visits to a doctor by date
    format of date is yyyymmdd"""
    list_visits = []
    visits = storage.all(Visit).values()
    date_format = "%Y%m%d"
    for visit in visits:
        updated_at = visit.updated_at.date()
        date_requested = datetime.strptime(date, date_format).date()
        if (visit.doctor_id == doctor_id) and (updated_at == date_requested):
            list_visits.append(visit.to_dict())
    return jsonify(list_visits)

@app_views.route('/visits/<doctor_id>/<patient_id>/', methods=['GET'], strict_slashes=False)
def get_doctor_visit_patient(doctor_id, patient_id):
    """ get all visits to a particular doctor"""
    list_visits = []
    visits = storage.all(Visit).values()
    for visit in visits:
        if (visit.doctor_id == doctor_id) and (visit.patient_id == patient_id):
            list_visits.append(visit.to_dict())
    return jsonify(list_visits)

@app_views.route('/visits/<doctor_id>/<patient_id>/<date>/', methods=['GET'], strict_slashes=False)
def get_doctor_patient_date(doctor_id, patient_id, date):
    """ get all visits to a doctor by date and patient_id
    format of date is yyyymmdd"""
    list_visits = []
    visits = storage.all(Visit).values()
    date_format = "%Y%m%d"
    for visit in visits:
        updated_at = visit.updated_at.date()
        date_requested = datetime.strptime(date, date_format).date()
        if (visit.doctor_id == doctor_id) and (updated_at == date_requested) and (visit.patient_id == patient_id):
            list_visits.append(visit.to_dict())
    return jsonify(list_visits)