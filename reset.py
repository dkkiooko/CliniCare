import csv
import pandas as pd
with open('visits.csv', 'r') as infile, open('visits3.csv', 'a') as outfile:
	fieldnames = ['', 'created_at', 'updated_at', 'id', 'patient_id', 'doctor_id', 'doctor_name', 'name', 'email_address', 'patient_age', 'patient_gender', 'phone_number', 'price_charged', 'city', 'sub_city', 'county', 'location', 'pre_existing_conditions', 'history', 'heart_rate', 'blood_pressure', 'height', 'weight', 'respiratory_rate', 'temperature', 'heent', 'genitourinary', 'lymphoglandular', 'integumentary', 'chest', 'muscoskeletal', 'cardiovascular', 'abdomen', 'others', 'lab_investigations', 'current_medication', 'diagnosis']
	writer = csv.DictWriter(outfile, fieldnames=fieldnames)
	writer.writeheader()
	for row in csv.DictReader(infile):
		writer.writerow(row)

