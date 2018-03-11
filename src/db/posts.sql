CREATE TABLE posts (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    content TEXT,
    views INT NOT NULL,
    author_id INT NOT NULL,
    ip_address VARCHAR(16),
    reg_datetime INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (id)
)