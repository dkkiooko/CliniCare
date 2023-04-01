#!/usr/bin/pyhton3
"""render template for the client page"""
from models import storage
from models.visit import Visit
from models.doctor import Doctor
from models.patient import Patient
from flask import Flask, render_template, request, url_for, session, redirect, flash
import uuid
from flask_mysqldb import MySQLdb, MySQL
import bcrypt

app = Flask(__name__)
app.config['MYSQL_USER'] = 'bek'
app.config['MYSQL_PASSWORD'] = '2518E11e&&'
app.config['MYSQL_DB'] = 'password_test'
app.config['MYSQL_HOST'] = 'localhost'

app.secret_key = 'trialsecretkey'
mysql = MySQL(app)

@app.route('/patient/<patient_id>', strict_slashes=False)
def patient(patient_id):
    """ retrieve patients by id """
    if 'username' in session:
        username = session['username']
        if username == patient_id:
            patient = storage.get(Patient, patient_id)
            visits = storage.get_patient_provider(Patient, patient_id)
        
            num = []
            if visits is None:
                length = 0
            else:
                length = len(visits)
                for i in range(0, len(visits)):
                    num.append(i)
            return render_template('client.html',
                            patient=patient,
                            visits=visits,
                            num=num,
                            length=length,
                            username=username,
                            cache_id=uuid.uuid4())
        else:
            session.pop('username', None)
            return redirect(url_for('client_login'))
    return redirect(url_for('client_login'))

@app.route('/register', methods=['POST'])
def register():
    if 'username' in session:
        if session['username'] == 'reception':
            username = request.form['username']
            password = request.form['password'].encode('utf-8')
            hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO clients (username, password_hash) VALUES (%s, %s)", (username, hashed_password))
            mysql.connection.commit()
            cur.close()
            flash('Patient successfully registered with ID ' + username)
            return redirect(url_for('create_patient'))
        else:
            return redirect(url_for('logout'))
    else:
        return redirect(url_for('logout'))
    
@app.route('/doc_register', methods=['GET', 'POST'])
def doc_register():
    '''Register doctors with their password'''
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password'].encode('utf-8')
        hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO users (username, password_hash) VALUES (%s, %s)", (username, hashed_password))
        mysql.connection.commit()
        cur.close()
        flash('successful')
        return redirect(url_for('doc_register'))
    else: 
        return render_template('insert.html')

@app.route('/login/', strict_slashes=False, methods=['GET', 'POST'])
def login():
    """ render login page """
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password'].encode('utf-8')
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM users WHERE username=%s", (username,))
        user = cur.fetchone()
        cur.close()
        if user:
            hashed_password = user[2].encode('utf-8')
            if bcrypt.checkpw(password, hashed_password):
                session['username'] = username
                if username == 'reception':
                    return redirect(url_for('create_patient'))
                else:
                    return redirect(url_for('doctor'))
            else:
                return render_template('login.html', error='Invalid username or password')
        else:
            return render_template('login.html', error='Invalid username or password')
    else:
        return render_template('login.html')


@app.route('/client_login/', methods=['GET', 'POST'], strict_slashes=False)
def client_login():
    """ render login page """
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password'].encode('utf-8')
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM clients WHERE username=%s", (username,))
        user = cur.fetchone()
        cur.close()
        if user:
            hashed_password = user[2].encode('utf-8')
            if bcrypt.checkpw(password, hashed_password):
                session['username'] = username
                return redirect(url_for('patient', patient_id=username))
            else:
                return render_template('client_login.html', error='Invalid username or password')
        else:
            return render_template('client_login.html', error='Invalid username or password')
    else:
        return render_template('client_login.html')

@app.route('/logout', strict_slashes=False)
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))

@app.route('/client_logout', strict_slashes=False)
def client_logout():
    session.pop('username', None)
    return redirect(url_for('client_login'))

@app.route('/doctors/', strict_slashes=False)
def doctor():
    """ render provider page """

    if 'username' in session:
        username = session['username']
        if username != 'reception':
            doctor = storage.get(Doctor, username)
            return render_template('doctor.html',
                                username=session['username'],
                                doctor=doctor,
                                cache_id=uuid.uuid4())
        else:
            return redirect(url_for('logout'))
    else:
        return redirect(url_for('login'))


@app.route('/', strict_slashes=False)
def landing():
    """ landing page """
    return render_template('landing_page.html',
                           cache_id=uuid.uuid4())

@app.route('/demo', strict_slashes=False)
def demo():
    ''' Demo page'''
    return render_template('demo.html',
                           cache_id=uuid.uuid4())


@app.route('/reception', strict_slashes=False)
def create_patient():
    """ create new patient on reception page"""
    if 'username' in session:
        username = session['username']
        if username == 'reception':
            return render_template('reception.html',
                                   username=username,
                                cache_id=uuid.uuid4())
        else:
            return redirect( url_for('logout'))
    else:
        return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
