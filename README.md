# CliniCare - The Console
The console is the first segment of CliniCare project. 
The goal of CliniCare is to enable. A command interpreter is created in this segment to manage objects for the CliniCare website.

## AUTHORS
Daniel Kioko - kithekadankioko@gmail.com
Bereket Tezera - bereketb20@hotmail.com

#### Functionalities of this command interpreter:
* Create a new object (ex: a new User or a new Place)
* Retrieve an object from a file, a database etc...
* Do operations on objects (count, compute stats, etc...)
* Update attributes of an object
* Destroy an object

## Table of Content
* [Environment](#environment)
* [Installation](#installation)
* [File Descriptions](#file-descriptions)
* [Usage](#usage)

## Environment
This project is interpreted/tested on Ubuntu 20.04 LTS using python3 (version 3.4.3)

## Installation
* Clone this repository: `git clone "https://github.com/dkkiooko/CliniCare.git"`
* Access AirBnb directory: `cd AirBnB_clone`
* Run hbnb(interactively): `./console` and enter command
* Run hbnb(non-interactively): `echo "<command>" | ./console.py`

## File Descriptions
<center><h3>Repository Contents by Project Task</h3> </center>

| Tasks | Files | Description |
| ----- | ----- | ------ |
| 0: README File | [AUTHORS](https://github.com/dkkiooko/CliniCare/blob/master/README.md) | Initial Project authors |
| 1: Pep8 | N/A | All code is pep8 compliant|
| 2: Unit Testing | [/tests](https://github.com/dkkiooko/CliniCare/tree/master/tests) | unittests for the class modules |
| 3. Make BaseModel and inherited models| [/models/base_model.py](https://github.com/dkkiooko/CliniCare/blob/master/models/base_model.py) [/models/doctor.py](https://github.com/dkkiooko/CliniCare/blob/master/models/doctor.py) [/models/visit.py](https://github.com/dkkiooko/CliniCare/blob/master/models/visit.py) [/models/patient.py](https://github.com/dkkiooko/CliniCare/blob/master/models/patient.py)| Defines a parent class to be inherited by all model classes|
| 5. Create Storage classes | [/models/engine/file_storage.py](https://github.com/dkkiooko/CliniCare/blob/master/models/engine/file_storage.py) [/models/engine/db_storage.py](https://github.com/dkkiooko/CliniCare/blob/master/models/engine/db_storage.py) | Defines a class to manage persistent file and database storage system|
| 6. Console  | [console.py](https://github.com/dkkiooko/CliniCare/blob/master/console.py) | Add basic functionality to console program, allowing it to quit, handle empty lines and ^D |
| 8. static for web page | [/static/client.html](https://github.com/dkkiooko/CliniCare/blob/master/static/client.html) [/static/client_login.html](https://github.com/dkkiooko/CliniCare/blob/master/static/client_login.html) [/static/doctor.html](https://github.com/dkkiooko/CliniCare/blob/master/static/doctor.html) [/static/login.html](https://github.com/dkkiooko/CliniCare/blob/master/static/login.html) [/static/landing_page.html](https://github.com/dkkiooko/CliniCare/blob/master/static/landing_page.html) [/static/reception.html](https://github.com/dkkiooko/CliniCare/blob/master/static/reception.html) | static for the front end of CliniCare |
| 9. Web dynamic | [/web_dynamic/clinicare.py](https://github.com/dkkiooko/CliniCare/blob/master/web_dynamic/clinicare.py)  | when run implements the web application |
| 10. API | [/api/v1/app.py](https://github.com/dkkiooko/CliniCare/blob/master/api/v1/app.py) [/api/v1/views/index.py](https://github.com/dkkiooko/CliniCare/blob/master/api/v1/views/index.py) [/api/v1/views/patient.py](https://github.com/dkkiooko/CliniCare/blob/master/api/v1/views/patient.py) [/api/v1/views/visit.py](https://github.com/dkkiooko/CliniCare/blob/master/api/v1/views/visit.py) | API that fetches and sends data back from various endpoints |
| 13. data_dump | [data_dump](https://github.com/dkkiooko/CliniCare/blob/master/data)  | populate database |
| 14. setup_mysql_dev.sql | [setup_mysql_dev.sql](https://github.com/dkkiooko/CliniCare/blob/master/setup_mysql_dev.sql)  | sets up database |
<br>
<br>
<center> <h2>General Use</h2> </center>

## Usage
create database and populate it
```
~CliniCare$ cat setup_mysql_dev.sql | mysql -u root -p
~CliniCare$ cat data_dump | mysql -u root -p
```
run the application
```
~CliniCare$ CLINICARE_MYSQL_USER=care_dev CLINICARE_MYSQL_PWD=clinic_dev_pwd CLINICARE_MYSQL_HOST=localhost CLINICARE_MYSQL_DB=clinicare_dev_db CLINICARE_TYPE_STORAGE=db python3 -m web_dynamic.clinicare
```
run the api in a different window
```
~CliniCare$ CLINICARE_MYSQL_USER=care_dev CLINICARE_MYSQL_PWD=clinic_dev_pwd CLINICARE_MYSQL_HOST=localhost CLINICARE_MYSQL_DB=clinicare_dev_db CLINICARE_TYPE_STORAGE=db python3 -m api.v1.app
```
go to your browser got to this url in 192.168.0.32.500
this will take you to the landing page which looks like this

<img src="/images/clinicare.png" alt="image of landing page" title="Landing page">




