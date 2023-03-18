-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS clinicare_dev_db;
CREATE USER IF NOT EXISTS 'care_dev'@'localhost' IDENTIFIED BY 'clinic_dev_pwd';
GRANT ALL PRIVILEGES ON `clinicare_dev_db`.* TO 'care_dev'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'care_dev'@'localhost';
FLUSH PRIVILEGES;
