#!/usr/bin/python
""" holds class Place"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, Integer, Float, ForeignKey, Table
from sqlalchemy.orm import relationship

#### add relationship with doctor and patient for every visit


class Visit(BaseModel, Base):
    """Representation of a visit """
    if models.storage_t == 'db':
        __tablename__ = 'visits'
        id = Column(String(60), primary_key=True)
        patient_id = Column(String(60), ForeignKey('patients.patient_id'), nullable=False)
        doctor_id = Column(String(60), ForeignKey('doctors.doctor_id'), nullable=False)
        doctor_name = Column(String(60), nullable=False)
        name = Column(String(128), nullable=False)
        email_address = Column(String(1024), nullable=True)
        patient_age = Column(Integer, nullable=False, default=0)
        patient_gender = Column(String(5), nullable=False, default=0)
        phone_number = Column(Integer, nullable=False, default=0)
        price_charged = Column(Float, nullable=False, default=0)
        city = Column(String(20), nullable=False)
        sub_city = Column(String(20), nullable=False)
        county = Column(String(20), nullable=False)
        location = Column(String(20), nullable=False)
        pre_existing_conditions = Column(String(1024), nullable=False)
        history = Column(String(1024), nullable=False)
        heart_rate = Column(Float, nullable=False)
        blood_pressure = Column(String(10), nullable=False)
        height = Column(Float, nullable=False)
        weight = Column(Float, nullable=False)
        respiratory_rate = Column(Float, nullable=False)
        temperature = Column(Float, nullable=False)
        heent = Column(String(1024), nullable=False)
        genitourinary = Column(String(1024), nullable=False)
        lymphoglandular = Column(String(1024), nullable=False)
        integumentary = Column(String(1024), nullable=False)
        chest = Column(String(1024), nullable=False)
        muscoskeletal = Column(String(1024), nullable=False)
        cardiovascular = Column(String(1024), nullable=False)
        abdomen = Column(String(1024), nullable=False)
        others = Column(String(1024), nullable=False)
        lab_investigations = Column(String(1024), nullable=False)
        current_medication = Column(String(1024), nullable=False)
        diagnosis = Column(String(1024), nullable=False)

    else:
        patient_id = ''
        doctor_id = ''
        doctor_name = ''
        name = ''
        email_address = ''
        patient_age = 0
        patient_gender = 0
        phone_number = 0
        price_charged = 0.0
        city = ''
        sub_city = ''
        county = ''
        location = ''
        pre_existing_conditions = ''
        history = ''
        heart_rate = 0.0
        blood_pressure = ''
        height = 0.0
        weight = 0.0
        sex = ''
        respiratory_rate = 0.0
        temperature = 0.0
        heent = 0.0
        genitourinary = ''
        lymphoglandular = ''
        integumentary = ''
        chest = ''
        muscoskeletal = ''
        cardiovascular = ''
        abdomen = ''
        others = ''
        lab_investigations = ''
        current_medication = ''
        diagnosis = ''
        doctor = ''
        patient = ''
    def __init__(self, *args, **kwargs):
        """initializes Visit instance"""
        super().__init__(*args, **kwargs)
