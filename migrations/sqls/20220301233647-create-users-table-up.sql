/* Replace with your SQL commands */

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(50) UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50)
);

CREATE UNIQUE INDEX idx_lower_unique 
   ON users (lower(username));