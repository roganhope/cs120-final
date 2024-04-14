CREATE TABLE inventory (
    vin VARCHAR(17) PRIMARY KEY,
    make VARCHAR(50),
    model VARCHAR(50),
    year INT,
    order_id INT,
    mechanic_notes TEXT,
    office_notes TEXT,
    build_time DATETIME,
    status VARCHAR(50),
    unit_notes TEXT,
    buy_price DECIMAL(10, 2),
    sell_price DECIMAL(10, 2)
);

CREATE TABLE inventory_status_audit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vin VARCHAR(17),
    make VARCHAR(50),
    model VARCHAR(50),
    year INT,
    status VARCHAR(50),
    name VARCHAR(100),
    datetime DATETIME
);

CREATE TABLE clients (
    client_id INT AUTO_INCREMENT PRIMARY KEY,
    first VARCHAR(50),
    last VARCHAR(50),
    email VARCHAR(100),
    phone_number VARCHAR(15),
    street VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR(2),
    zipcode VARCHAR(10),
    date_created DATE,
    notes TEXT
);

CREATE TABLE order (
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
    invt_id VARCHAR(17),
    sale_price DECIMAL(10, 2),
    payment_status VARCHAR(50),
    date_completed DATE
);


CREATE TABLE mechanics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);


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
