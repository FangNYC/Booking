-- this schema loads mySQL with csv data

USE booking

LOAD DATA LOCAL INFILE  
'./apartment.csv'
INTO TABLE apartment  
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(price, minStay, stars, numRatings, max);

LOAD DATA LOCAL INFILE  
'./dates.csv'
INTO TABLE dates  
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(date, apartment_id);
