-- drop if database exists otc_tracker;
-- create database otc_tracker;
-- use otc_tracker;


  
/* note PASSWORDS not encryped here - for interim testing */

-- INSERT INTO USERS (email, password, createdAt, updatedAt) VALUES ("123", "ABC", "2018-03-02","2018-03-02");
-- INSERT INTO USERS (email, password, createdAt, updatedAt) VALUES ("234", "BCD", "2018-03-01","2018-03-01");
-- INSERT INTO USERS (email, password, createdAt, updatedAt) VALUES ("345", "CDE", "2018-03-01","2018-03-01");
-- INSERT INTO MEDS (userId, fdaMedId, createdAt, updatedAt) VALUES (1, "med1", "2018-03-02","2018-03-02");
-- INSERT INTO MEDS (userId, fdaMedId, createdAt, updatedAt) VALUES (1, "med2", "2018-03-01","2018-03-01");
-- INSERT INTO MEDS (userId, fdaMedId, createdAt, updatedAt) VALUES (2, "med3", "2018-03-01","2018-03-01");
-- INSERT INTO MEDS (userId, fdaMedId, createdAt, updatedAt) VALUES (2, "med4", "2018-03-01","2018-03-01");
-- INSERT INTO MEDS (userId, fdaMedId, createdAt, updatedAt) VALUES (2, "med5", "2018-03-01","2018-03-01");
-- INSERT INTO MEDS (userId, fdaMedId, createdAt, updatedAt) VALUES (3, "med6", "2018-03-01","2018-03-01");
-- INSERT INTO MEDS (userId, fdaMedId, createdAt, updatedAt) VALUES (3, "med7", "2018-03-01","2018-03-01");
-- INSERT INTO MEDS (userId, fdaMedId, createdAt, updatedAt) VALUES (3, "med8", "2018-03-01","2018-03-01");

INSERT INTO MEDS (userId, fdaMedId,isTaking,createdAt,updatedAt) VALUES (1, "0280-6010", TRUE,"2018-03-27","2018-03-27");
INSERT INTO MEDS (userId, fdaMedId,isTaking,createdAt,updatedAt) VALUES (2, "0031-8759", TRUE,"2018-03-27","2018-03-27");
INSERT INTO MEDS (userId, fdaMedId,isTaking,createdAt,updatedAt) VALUES (2, "50580-728", FALSE,"2018-03-27","2018-03-27");
INSERT INTO MEDS (userId, fdaMedId,isTaking,createdAt,updatedAt) VALUES (2, "0135-0589", FALSE,"2018-03-27","2018-03-27");
INSERT INTO MEDS (userId, fdaMedId,isTaking,createdAt,updatedAt) VALUES (3, "0597-0016", TRUE,"2018-03-27","2018-03-27");
INSERT INTO MEDS (userId, fdaMedId,isTaking,createdAt,updatedAt) VALUES (3, "0280-8030", TRUE,"2018-03-27","2018-03-27");
INSERT INTO MEDS (userId, fdaMedId,isTaking,createdAt,updatedAt) VALUES (3, "66715-9719", TRUE,"2018-03-27","2018-03-27");


