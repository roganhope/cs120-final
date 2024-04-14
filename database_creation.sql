CREATE TABLE status_codes (
    status_id INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(50) UNIQUE
);


CREATE TABLE inventory (
    vin VARCHAR(100) PRIMARY KEY,
    make VARCHAR(100),
    model VARCHAR(100),
    year INT,
    order_id INT,
    mechanic_notes TEXT,
    office_notes TEXT,
    build_time DECIMAL(10,2),
    status_id INT,
    unit_notes TEXT,
    buy_price DECIMAL(10, 2),
    sell_price DECIMAL(10, 2),
    last_update DATETIME,
);

CREATE TABLE models (
    model_id INT AUTO_INCREMENT PRIMARY KEY,
    make VARCHAR(100),
    model VARCHAR(100),
    notes TEXT
);

CREATE TABLE inventory_status_audit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vin VARCHAR(17),
    make VARCHAR(50),
    model VARCHAR(50),
    year INT,
    status_id INT,
    name VARCHAR(100),
    timestamp DATETIME,
    FOREIGN KEY (status_id) REFERENCES status_codes(status_id)
);

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

-- order is a keyword in sql so you can't use it as a table name
CREATE TABLE orders (
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
    payment_status VARCHAR(50),
    down_payment_amount DECIMAL(10, 2),
    date_initiated DATE,
    date_completed DATE
);


CREATE TABLE mechanics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100),
    name VARCHAR(100)
);


INSERT INTO status_codes (status_name) VALUES 
('ordered'),
('assembled'),
('ready to sell'),
('down payment'),
('sold'),
('other');


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
        INSERT INTO models (make, model, notes) VALUES (NEW.make, NEW.model, 'New model added automatically');
    END IF;
END$$

DELIMITER ;

-- TO DO figure out user logic
-- replace user with the actual user value we will be passing in
DELIMITER $$

CREATE TRIGGER status_change_audit
AFTER UPDATE ON inventory
FOR EACH ROW
BEGIN
    IF OLD.status != NEW.status THEN
        INSERT INTO inventory_status_audit (vin, make, model, year, status, name, datetime)
        VALUES (NEW.vin, NEW.make, NEW.model, NEW.year, NEW.status, USER(), NOW());
    END IF;
END$$

DELIMITER ;