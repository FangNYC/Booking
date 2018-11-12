USE booking

LOAD DATA LOCAL INFILE  
'./sample.csv'
INTO TABLE apartment  
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(price, minStay, stars, numRatings, max);