/* Replace with your SQL commands */

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL, 
    summary TEXT NOT NULL,
    price DECIMAL NOT NULL,
    seller VARCHAR(100) ,
    category VARCHAR(100) NOT NULL
);

CREATE INDEX cat_lower_unique 
   ON products (lower(category)); 