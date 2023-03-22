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


@app.route('/visits', strict_slashes=False)
def visit():
    """ Provider page on loading. Is empty """
    cache_id = uuid.uuid4()
    return render_template('doctor.html',
                           cache_id=cache_id)


if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)
