use tracker_db;

INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES ("Will", "Riker", 2,3);
INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES ("Geordi", "La Forge", 1,3);
INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES ("Jean-Luc", "Picard", 2);
INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES ("Sarah", "Lewis", 3,9);
INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES ("Deanna", "Troi", 2,9);
INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES ("Wesley", "Crusher", 1,9);
INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES ("Tasha", "Yar", 3,10);
INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES ("Ro", "Laren", 3,10);
INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES ("Miles", "O Brien", 1);
INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES ("Guinan", "N/A", 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 90000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales",62000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ("Lawer", 130000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Human Resource", 50000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Finance Assistant",100000, 1);

INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Human Resources");
INSERT INTO department (name)
VALUES ("Legal");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Sales");