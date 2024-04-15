CREATE TABLE clients (
    client_id INT AUTO_INCREMENT PRIMARY KEY,
    first VARCHAR(100),
    last VARCHAR(100),
    email VARCHAR(100),
    phone_number VARCHAR(30),
    street VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR(30),
    zipcode VARCHAR(10),
    date_created DATE,
    notes TEXT
);

CREATE TABLE status_codes (
    status_id INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(50) UNIQUE
);

CREATE TABLE payment_status_codes (
    sale_code INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(50) UNIQUE
);


-- INSERTING STATUS CODES
INSERT INTO status_codes (status_name) 
VALUES 
    ('ordered'),
    ('arrived'),
    ('assembled'),
    ('ready to sell'),
    ('sold'),
    ('other');

INSERT INTO payment_status_codes (status_name) VALUES 
('custom order'),
('down payment'),
('full payment collected');


CREATE TABLE mechanics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100),
    mechanic_name VARCHAR(100)
);

CREATE TABLE models (
    model_id INT AUTO_INCREMENT PRIMARY KEY,
    make VARCHAR(100),
    model VARCHAR(100),
    notes TEXT
);


CREATE TABLE inventory (
    inventory_id INT AUTO_INCREMENT PRIMARY KEY,
    vin VARCHAR(100) UNIQUE,  -- Unique constraint added to VIN
    make VARCHAR(100),
    model VARCHAR(100),
    year INT,
    color VARCHAR(100),
    order_id INT, -- connects to shipment 
    status_id INT,
    mechanic VARCHAR(100), -- the mechanic who completed it 
    admin_notes TEXT,
    mechanic_notes TEXT,
    build_time DECIMAL(10,2),
    sale_id INT,
    purchase_price DECIMAL(10, 2),
    retail_price DECIMAL(10, 2),
    last_update DATETIME,
    FOREIGN KEY (sale_id) REFERENCES sales(sale_id),
    FOREIGN KEY (status_id) REFERENCES status_codes(status_id)
    -- FOREIGN KEY (mechanic) REFERENCES mechanics(mechanic_name) -- Assuming "name" is the mechanic's name in the mechanics table
    -- it waasn't allowing hte foregin key reference idk why
);



-- order is a keyword in sql so you can't use it as a table name
-- orders are orders that the dealership makes from the scooter company 
CREATE TABLE shipments (
    internal_order_id INT AUTO_INCREMENT PRIMARY KEY,
    vendor VARCHAR(100),
    invoice_no VARCHAR(50),
    order_date DATE,
    num_items INT,
    total DECIMAL(10, 2),
    order_arrival_date DATE
);


CREATE TABLE sales (
    sale_id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    invt_id VARCHAR(17),
    sale_price DECIMAL(10, 2),
    payment_status INT,
    down_payment_amount DECIMAL(10, 2),
    date_initiated DATE, -- this field is helpful for tracking how long sales take or holds / custom, orders 
    date_completed DATE,
    FOREIGN KEY (client_id) REFERENCES clients(client_id),
    -- FOREIGN KEY (inventory_id) REFERENCES inventory(inventory_id),
    FOREIGN KEY (payment_status) REFERENCES payment_status_codes(sale_code)
);




-- trigger to add to models on inventory insetoin
DELIMITER $$

CREATE TRIGGER create_model_row AFTER INSERT ON inventory
FOR EACH ROW
BEGIN
    DECLARE model_count INT;

    -- Check if the combination of make and model already exists in the models table
    SELECT COUNT(*) INTO model_count
    FROM models
    WHERE make = NEW.make AND model = NEW.model;
    
    -- If the combination doesn't exist, insert a new row into the models table
    IF model_count = 0 THEN
        INSERT INTO models (make, model) VALUES (NEW.make, NEW.model);
    END IF;
END$$

DELIMITER ;




