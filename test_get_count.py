#!/usr/bin/python3
""" test .get() and .count() methods """

from models import storage
from models.patient import Patient


print("All objects: {}".format(storage.count()))
print("Patient objects: {}".format(storage.count(Patient)))

first_patient_id = list(storage.all(Patient).values())[0].id
print("first patient: {}".format(storage.get(Patient, first_patient_id)))