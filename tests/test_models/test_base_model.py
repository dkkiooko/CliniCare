import unittest
from datetime import datetime
from unittest.mock import patch
from models.base_model import BaseModel

class TestBaseModel(unittest.TestCase):
    def setUp(self):
        """Setup method for the test"""
        self.base_model = BaseModel()

    def test_base_model_attributes(self):
        """Test if BaseModel has the required attributes"""
        self.assertTrue(hasattr(self.base_model, 'id'))
        self.assertTrue(hasattr(self.base_model, 'created_at'))
        self.assertTrue(hasattr(self.base_model, 'updated_at'))

    def test_base_model_initialization(self):
        """Test if BaseModel is initialized correctly"""
        self.assertIsInstance(self.base_model.id, str)
        self.assertIsInstance(self.base_model.created_at, datetime)
        self.assertIsInstance(self.base_model.updated_at, datetime)

    def test_base_model_string_representation(self):
        """Test if BaseModel has correct string representation"""
        expected_str = "[BaseModel] ({}) {}".format(self.base_model.id, self.base_model.__dict__)
        self.assertEqual(str(self.base_model), expected_str)

    def test_base_model_save_method(self):
        """Test if BaseModel save method updates 'updated_at' and calls storage methods"""
        initial_updated_at = self.base_model.updated_at
        self.base_model.save()
        self.assertNotEqual(initial_updated_at, self.base_model.updated_at)

    def test_base_model_to_dict_method(self):
        """Test if BaseModel to_dict method returns a dictionary with correct values"""
        base_model_dict = self.base_model.to_dict()
        self.assertIsInstance(base_model_dict, dict)
        self.assertTrue('id' in base_model_dict)
        self.assertTrue('created_at' in base_model_dict)
        self.assertTrue('updated_at' in base_model_dict)
        self.assertEqual(base_model_dict['__class__'], 'BaseModel')

    def test_delete_method_calls_storage_delete(self):
            """Test if delete method calls storage.delete"""
            with patch('models.storage.delete') as mock_storage_delete:
                self.base_model.delete()
                mock_storage_delete.assert_called_once_with(self.base_model)

if __name__ == '__main__':
    unittest.main()
