/* Replace with your SQL commands */

CREATE TYPE order_status AS ENUM ('active', 'complete');

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    placing_date DATE NOT NULL,
    status order_status NOT NULL,
    total DECIMAL
);