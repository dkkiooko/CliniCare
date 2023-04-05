import unittest
import models
from models.patient import Patient

class TestPatient(unittest.TestCase):
    """Test cases for Patient class"""

    def test_patient_instance(self):
        """Test that a Patient instance is created correctly"""
        patient = Patient()
        self.assertIsInstance(patient, Patient)
        self.assertIsInstance(patient, models.base_model.BaseModel)
        self.assertIsInstance(patient, models.base_model.Base)

    def test_patient_attributes(self):
        """Test that Patient attributes are set correctly"""
        patient = Patient(
            patient_id="12345",
            fname="John",
            lname="Doe",
            birthyear="1990-01-01",
            sex="M",
            post_address="1234 Elm St",
            phone_number=1234567890,
            insurance_number=987654321,
            city="New York",
            county="Manhattan",
            subcity="Upper East Side",
            insurance_company="ABC Insurance",
            emergency_number=9876543210,
            email="john.doe@example.com",
            emergency_email="emergency@example.com",
            emergency_fname="Jane",
            emergency_lname="Doe",
            location="Hospital XYZ"
        )
        self.assertEqual(patient.patient_id, "12345")
        self.assertEqual(patient.fname, "John")
        self.assertEqual(patient.lname, "Doe")
        self.assertEqual(patient.birthyear, "1990-01-01")
        self.assertEqual(patient.sex, "M")
        self.assertEqual(patient.post_address, "1234 Elm St")
        self.assertEqual(patient.phone_number, 1234567890)
        self.assertEqual(patient.insurance_number, 987654321)
        self.assertEqual(patient.city, "New York")
        self.assertEqual(patient.county, "Manhattan")
        self.assertEqual(patient.subcity, "Upper East Side")
        self.assertEqual(patient.insurance_company, "ABC Insurance")
        self.assertEqual(patient.emergency_number, 9876543210)
        self.assertEqual(patient.email, "john.doe@example.com")
        self.assertEqual(patient.emergency_email, "emergency@example.com")
        self.assertEqual(patient.emergency_fname, "Jane")
        self.assertEqual(patient.emergency_lname, "Doe")
        self.assertEqual(patient.location, "Hospital XYZ")

    def test_patient_defaults(self):
        """Test that Patient attributes have default values when not provided"""
        patient = Patient()
        self.assertEqual(patient.patient_id, 0)
        self.assertEqual(patient.fname, '')
        self.assertEqual(patient.lname, '')
        self.assertEqual(patient.birthyear, 0)
        self.assertEqual(patient.sex, '')
        self.assertEqual(patient.post_address, '')
        self.assertEqual(patient.phone_number, 0)
        self.assertEqual(patient.insurance_number, 0)
        self.assertEqual(patient.city, '')
        self.assertEqual(patient.county, '')
        self.assertEqual(patient.subcity, '')
        self.assertEqual(patient.insurance_company, '')
        self.assertEqual(patient.emergency_number, 0)
        self.assertEqual(patient.email, '')
        self.assertEqual(patient.emergency_email, '')
        self.assertEqual(patient.emergency_fname, '')
        self.assertEqual(patient.emergency_lname, '')
        self.assertEqual(patient.location, '')

if __name__ == '__main__':
    unittest.main()
