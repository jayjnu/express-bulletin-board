CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password VARCHAR(40) NOT NULL,
    email VARCHAR(100) NOT NULL,
    status VARCHAR(10) NOT NULL
    PRIMARY KEY (id,user_id)
)