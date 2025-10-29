CREATE TABLE food_item(
    id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quant INT NOT NULL,
    category food_category NOT NULL,
    expiration DATE NOT NULL
);