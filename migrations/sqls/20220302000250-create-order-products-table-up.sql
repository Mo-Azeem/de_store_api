/* Replace with your SQL commands */

CREATE TABLE order_products(
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    PRIMARY KEY(order_id, product_id)
);