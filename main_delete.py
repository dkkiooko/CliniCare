#!/usr/bin/python3
""" Test delete feature
"""
from models.engine.file_storage import FileStorage
from models.doctor import Doctor

fs = FileStorage()

# All States
all_doctors = fs.all(Doctor)
print("All Doctors: {}".format(len(all_doctors.keys())))
#for doctor_key in all_doctors.keys():
#    print(all_doctors[doctor_key])

# Create a new State
new_doctor = Doctor()
new_doctor.fname = "Monica"
fs.new(new_doctor)
fs.save()
print("New Doctor: {}".format(new_doctor))

# All States
all_doctors = fs.all(Doctor)
print("All Doctors: {}".format(len(all_doctors.keys())))
#for state_key in all_doctors.keys():
#    print(all_doctors[state_key])

# Create another State
another_doctor = Doctor()
another_doctor.fname = "Nevada"
fs.new(another_doctor)
fs.save()
print("Another Doctor: {}".format(another_doctor))

# All States
all_states = fs.all(Doctor)
print("All Doctors: {}".format(len(all_states.keys())))
#for state_key in all_doctors.keys():
#    print(all_doctors[state_key])        

# Delete the new State
fs.delete(another_doctor)

# All States
all_doctors = fs.all(Doctor)
print("All Doctors: {}".format(len(all_doctors.keys())))
#for state_key in all_doctors.keys():
#    print(all_doctors[state_key])