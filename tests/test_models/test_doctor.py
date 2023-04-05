import unittest
from unittest.mock import patch
from models.doctor import Doctor
from models.base_model import BaseModel


class TestDoctor(unittest.TestCase):

    def setUp(self):
        """Set up test objects"""
        self.doctor = Doctor()
        self.doctor_id = "doc123"
        self.fname = "John"
        self.lname = "Doe"
        self.office_number = 123
        self.specialty = "Cardiology"

    def test_instance(self):
        """Test Doctor instance creation"""
        self.assertIsInstance(self.doctor, Doctor)
        self.assertIsInstance(self.doctor, BaseModel)

    def test_attributes(self):
        """Test Doctor attributes"""
        self.assertEqual(self.doctor.doctor_id, "")
        self.assertEqual(self.doctor.fname, "")
        self.assertEqual(self.doctor.lname, "")
        self.assertEqual(self.doctor.office_number, 0)
        self.assertEqual(self.doctor.specialty, "")

    def test_init(self):
        """Test Doctor __init__() method"""
        doctor = Doctor(
            doctor_id=self.doctor_id,
            fname=self.fname,
            lname=self.lname,
            office_number=self.office_number,
            specialty=self.specialty
        )
        self.assertEqual(doctor.doctor_id, self.doctor_id)
        self.assertEqual(doctor.fname, self.fname)
        self.assertEqual(doctor.lname, self.lname)
        self.assertEqual(doctor.office_number, self.office_number)
        self.assertEqual(doctor.specialty, self.specialty)

if __name__ == '__main__':
    unittest.main()
