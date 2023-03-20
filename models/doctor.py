#!/usr/bin/python
""" holds class Doctor"""
import models
from models.base_model import BaseModel, Base
from models.patient import Patient
from models.visit import Visit
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, Integer, Float, ForeignKey, Table
from sqlalchemy.orm import relationship


class Doctor(BaseModel, Base):
    """Representation of Place """
    if models.storage_t == 'db':
        __tablename__ = 'doctors'
        doctor_id = Column(String(60), nullable=False, primary_key=True)
        fname = Column(String(60), nullable=False)
        lname = Column(String(128), nullable=False)
        office_number = Column(Integer, nullable=False)
        specialty = Column(String(128), nullable=False)
    
    else:
        doctor_id = ''
        fname = ''
        lname = ''
        office_number = 0
        specialty = ''

    def __init__(self, *args, **kwargs):
        """initializes Doctor"""
        super().__init__(*args, **kwargs)
    
    if models.storage_t != "db":
        @property
        def visits(self):
            """ getter for list of patient instances related to doctor"""
            patient_list = []
            all_visits = models.storage.all(Visit)
            for visit in all_visits.values():
                if visit.doctor_id == self.id:
                    patient_list.append(visit)