#!/usr/bin/python3
"""
Contains the class DBStorage
"""

import models
from models.doctor import Doctor
from models.base_model import BaseModel, Base
from models.patient import Patient
from models.visit import Visit
from os import getenv
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

classes = {"Doctor": Doctor, "Patient": Patient, "Visit": Visit}


class DBStorage:
    """interaacts with the MySQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        CLINICARE_MYSQL_USER = getenv('CLINICARE_MYSQL_USER')
        CLINICARE_MYSQL_PWD = getenv('CLINICARE_MYSQL_PWD')
        CLINICARE_MYSQL_HOST = getenv('CLINICARE_MYSQL_HOST')
        CLINICARE_MYSQL_DB = getenv('CLINICARE_MYSQL_DB')
        CLINICARE_ENV = getenv('CLINICARE_ENV')
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.
                                      format(CLINICARE_MYSQL_USER,
                                             CLINICARE_MYSQL_PWD,
                                             CLINICARE_MYSQL_HOST,
                                             CLINICARE_MYSQL_DB))
        if CLINICARE_ENV == "test":
            Base.metadata.drop_all(self.__engine)

    def all(self, cls=None):
        """query on the current database session"""
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return (new_dict)

    def new(self, obj):
        """add the object to the current database session"""
        self.__session.add(obj)

    def save(self):
        """commit all changes of the current database session"""
        self.__session.commit()

    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        """call remove() method on the private session attribute"""
        self.__session.remove()

    def get(self, cls, id):
        """
        Returns the object based on the class name and its ID, or
        None if not found
        """
        if cls not in classes.values():
            return None

        all_cls = models.storage.all(cls)
        for value in all_cls.values():
            if (cls == Patient):
                if (value.patient_id == id):
                    return value
            else:
                if (value.id == id):
                    return value
        return None

    def get_patient_provider(self, cls, id):
        """ 
        Returns all patients visit history
        """
        if cls not in (Patient, Doctor):
            return None
        
        all_visits = models.storage.all(Visit)
        list_visits = []
        for value in all_visits.values():
            if (id == value.doctor_id) or (id == value.patient_id):
                list_visits.append(value)
        if len(list_visits) != 0:
            return list_visits
        return None

    def count(self, cls=None):
        """
        count the number of objects in storage
        """
        all_class = classes.values()

        if not cls:
            count = 0
            for clas in all_class:
                count += len(models.storage.all(clas).values())
        else:
            count = len(models.storage.all(cls).values())

        return count
