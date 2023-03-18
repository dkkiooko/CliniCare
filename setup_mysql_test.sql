-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS clinicare_test_db;
CREATE USER IF NOT EXISTS 'care_test'@'localhost' IDENTIFIED BY 'clinic_test_pwd';
GRANT ALL PRIVILEGES ON `clinic_test_db`.* TO 'care_test'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'care_test'@'localhost';
FLUSH PRIVILEGES;
