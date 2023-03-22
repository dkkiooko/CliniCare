#!/usr/bin/python3
""" Starts a Flash Web Application """
import uuid
from models import storage
from models.doctor import Doctor
from models.patient import Patient
from models.visit import Visit
from os import environ
from flask import Flask, render_template
app = Flask(__name__)


@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()


@app.route('/patients/<patient_id>', strict_slashes=False)
def visit(patient_id):
    """ client page on loading is filled with their details """
    visits = storage.get_patient_provider(Patient, patient_id).values()
    latest_date = min([i.updated_at] for i in visits)
    date = None
    for i in visits:
        if i.updated_at == latest_date:
            date = i
    cache_id = uuid.uuid4()
    return render_template('client.html',
                           cache_id=cache_id)


if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)
