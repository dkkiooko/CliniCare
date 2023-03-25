#!/usr/bin/pyhton3
"""render template for the client page"""
from models import storage
from models.visit import Visit
from models.doctor import Doctor
from models.patient import Patient
from flask import Flask, render_template, request, url_for
import uuid

app = Flask(__name__)

@app.route('/patient/<patient_id>', strict_slashes=False)
def patient(patient_id):
    """ retrieve patients by id """
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

@app.route('/login/', strict_slashes=False)
def login():
    """ render login page """
    return render_template('client_login.html')

@app.route('/doctors/', strict_slashes=False)
def doctor():
    """ render provider page """
    return render_template('doctor.html',
                            cache_id=uuid.uuid4())


'''@app.route('/doctors/detail/<patient_id>', strict_slashes=False)
def doctor_redirect(patient_id):
    Redirects the info from doctor.html to a new page to display the doctor info
    patient = storage.get(Patient, patient_id)

    visits = storage.get_patient_provider(Patient, patient_id)
    
    num = []
    for i in range(0, len(visits)):
        num.append(i)

    return render_template('doctor.html',
                        patient=patient,
                        visits=visits,
                        num=num,
                        cache_id=uuid.uuid4())
                        '''


@app.route('/', strict_slashes=False)
def landing():
    """ landing page """
    return render_template('landing_page.html')


@app.route('/reception/', strict_slashes=False, methods=['GET', 'POST'])
def create_patient():
    """ create new patient on reception page"""
    result = [False, uuid.uuid4()]
    if request.method == "POST":
        result[0] = True
        patient_data = {}
        patient_data['patient_id'] = result[1]
        patient_data['fname'] = request.form['fname']
        patient_data['lname'] = request.form['lname']
        patient_data['birthyear'] = request.form['birthyear']
        patient_data['sex'] = request.form['sex']
        patient_data['city'] = request.form['city']
        patient_data['subcity'] = request.form['subcity']
        patient_data['county'] = request.form['county']
        patient_data['location'] = request.form['location']
        patient_data['phone_number'] = request.form['phone_number']
        patient_data['post_address'] = request.form['post_address']
        patient_data['insurance_company'] = request.form['insurance_company']
        patient_data['insurance_number'] = request.form['insurance_number']
        patient_data['emergency_fname'] = request.form['emergency_fname']
        patient_data['emergency_lname'] = request.form['emergency_lname']
        patient_data['emergency_number'] = request.form['emergency_number']
        patient_data['emergency_email'] = request.form['emergency_email']
        new_patient = Patient(**patient_data)
        new_patient.save()
        print(new_patient)

    return render_template('reception.html',
                            result=result,
                            cache_id=uuid.uuid4())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
