#!/usr/bin/python
""" holds class Place"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, Integer, Float, ForeignKey, Table, Date
from sqlalchemy.orm import relationship


class Patient(BaseModel, Base):
    """Representation of Patient """
    if models.storage_t == 'db':
        __tablename__ = 'patients'
        patient_id = Column(String(60), nullable=False, primary_key=True)  # make sure unique per entry
        fname = Column(String(60), nullable=False)
        lname = Column(String(60), nullable=False)
        birthyear = Column(Date, nullable=False)
        sex = Column(String(1), nullable=False)
        post_address = Column(String(60), nullable=False)
        phone_number = Column(Integer, nullable=False)
        insurance_number = Column(Integer, nullable=True)
        city = Column(String(40), nullable=True)
        county = Column(String(50), nullable=True)
        subcity = Column(String(50), nullable=True)
        insurance_company = Column(String(60), nullable=True)
        emergency_number = Column(Integer, nullable=False)
        email = Column(String(50), nullable=True)
        emergency_email = Column(String(60), nullable=True)
        emergency_fname = Column(String(50), nullable=False)
        emergency_lname = Column(String(60), nullable=False)
        location = Column(String(50), nullable=True)

    else:
        patient_id = 0
        fname = ''
        lname = ''
        birthyear = 0
        sex = ''
        post_address = ''
        phone_number = 0
        insurance_number = 0
        city = ''
        county = ''
        subcity = ''
        insurance_company = ''
        emergency_number = 0
        email = ''
        emergency_email = ''
        emergency_fname = ''
        emergency_lname = ''
        location = ''

    def __init__(self, *args, **kwargs):
        """initializes Place"""
        super().__init__(*args, **kwargs)
