import unittest
from models.visit import Visit
from models.base_model import BaseModel
from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, String, Integer, Float, ForeignKey
from unittest.mock import patch

Base = declarative_base()

class TestVisit(unittest.TestCase):

    def setUp(self):
        """Set up test environment"""
        self.visit = Visit()

    def test_visit_inherits_from_base_model(self):
        """Test that Visit inherits from BaseModel"""
        self.assertIsInstance(self.visit, BaseModel)

    def test_visit_has_correct_attributes(self):
        """Test that Visit has correct attributes"""
        self.assertTrue(hasattr(self.visit, 'id'))
        self.assertTrue(hasattr(self.visit, 'patient_id'))
        self.assertTrue(hasattr(self.visit, 'doctor_id'))
        self.assertTrue(hasattr(self.visit, 'doctor_name'))
        self.assertTrue(hasattr(self.visit, 'name'))
        self.assertTrue(hasattr(self.visit, 'email_address'))
        self.assertTrue(hasattr(self.visit, 'patient_age'))
        self.assertTrue(hasattr(self.visit, 'patient_gender'))
        self.assertTrue(hasattr(self.visit, 'phone_number'))
        self.assertTrue(hasattr(self.visit, 'price_charged'))
        self.assertTrue(hasattr(self.visit, 'city'))
        self.assertTrue(hasattr(self.visit, 'sub_city'))
        self.assertTrue(hasattr(self.visit, 'county'))
        self.assertTrue(hasattr(self.visit, 'location'))
        self.assertTrue(hasattr(self.visit, 'pre_existing_conditions'))
        self.assertTrue(hasattr(self.visit, 'history'))
        self.assertTrue(hasattr(self.visit, 'heart_rate'))
        self.assertTrue(hasattr(self.visit, 'blood_pressure'))
        self.assertTrue(hasattr(self.visit, 'height'))
        self.assertTrue(hasattr(self.visit, 'weight'))
        self.assertTrue(hasattr(self.visit, 'respiratory_rate'))
        self.assertTrue(hasattr(self.visit, 'temperature'))
        self.assertTrue(hasattr(self.visit, 'heent'))
        self.assertTrue(hasattr(self.visit, 'genitourinary'))
        self.assertTrue(hasattr(self.visit, 'lymphoglandular'))
        self.assertTrue(hasattr(self.visit, 'integumentary'))
        self.assertTrue(hasattr(self.visit, 'chest'))
        self.assertTrue(hasattr(self.visit, 'muscoskeletal'))
        self.assertTrue(hasattr(self.visit, 'cardiovascular'))
        self.assertTrue(hasattr(self.visit, 'abdomen'))
        self.assertTrue(hasattr(self.visit, 'others'))
        self.assertTrue(hasattr(self.visit, 'lab_investigations'))
        self.assertTrue(hasattr(self.visit, 'current_medication'))
        self.assertTrue(hasattr(self.visit, 'diagnosis'))
        self.assertTrue(hasattr(self.visit, 'doctor'))
        self.assertTrue(hasattr(self.visit, 'patient'))        

    def test_visit_has_correct_table_name(self):
        """Test that Visit has correct table name"""
        self.assertEqual(self.visit.__tablename__, 'visits')

    def test_visit_has_correct_columns(self):
        """Test that Visit has correct columns"""
        columns = [column.name for column in self.visit.__table__.columns]
        self.assertIn('id', columns)
        self.assertIn('patient_id', columns)
        self.assertIn('doctor_id', columns)
        self.assertIn('doctor_name', columns)
        self.assertIn('name', columns)
        self.assertIn('email_address', columns)
        self.assertIn('patient_age', columns)
        self.assertIn('patient_gender', columns)
        self.assertIn('phone_number', columns)
        self.assertIn('price_charged', columns)
        self.assertIn('city', columns)
        self.assertIn('sub_city', columns)
        self.assertIn('county', columns)
        self.assertIn('location', columns)
        self.assertIn('pre_existing_conditions', columns)
        self.assertIn('history', columns)
        self.assertIn('heart_rate', columns)
        self.assertIn('blood_pressure', columns)
        self.assertIn('height', columns)
        self.assertIn('weight', columns)
        self.assertIn('respiratory_rate', columns)
        self.assertIn('temperature', columns)
        self.assertIn('heent', columns)
        self.assertIn('genitourinary', columns)
        self.assertIn('lymphoglandular', columns)
        self.assertIn('integumentary', columns)
        self.assertIn('chest', columns)
        self.assertIn('muscoskeletal', columns)
        self.assertIn('cardiovascular', columns)
        self.assertIn('abdomen', columns)
        self.assertIn('others', columns)
        self.assertIn('lab_investigations', columns)
        self.assertIn('current_medication', columns)
        self.assertIn('diagnosis', columns)
        self.assertIn('doctor', columns)
        self.assertIn('patient', columns)

if __name__ == '__main__':
    unittest.main()
    