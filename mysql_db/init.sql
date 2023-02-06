CREATE DATABASE data;
USE data;

CREATE TABLE student_grades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    grade INT NOT NULL
);

CREATE DATABASE authentication;
USE authentication;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(25) NOT NULL,
    password VARCHAR(25) NOT NULL
);

INSERT INTO users (username, password) VALUES ('admin', 'password');