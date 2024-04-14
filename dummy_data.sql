-- clients 

INSERT INTO clients (first, last, email, phone_number, street, city, state, zipcode, date_created, notes) VALUES
('John', 'Doe', 'john.doe@example.com', '555-1234', '123 Main St', 'Boston', 'MA', '02101', '2024-04-14', 'Client since 2020'),
('Jane', 'Smith', 'jane.smith@example.com', '555-5678', '456 Elm St', 'Worcester', 'MA', '01601', '2024-04-14', 'New client'),
('Michael', 'Johnson', 'michael.johnson@example.com', '555-9012', '789 Maple Ave', 'Lowell', 'MA', '01850', '2024-04-14', 'Frequent buyer'),
('Emily', 'Brown', 'emily.brown@example.com', '555-3456', '321 Oak St', 'Manchester', 'NH', '03101', '2024-04-14', 'VIP customer'),
('William', 'Martinez', 'william.martinez@example.com', '555-7890', '987 Pine St', 'Nashua', 'NH', '03060', '2024-04-14', 'Preferred client'),
('Jessica', 'Garcia', 'jessica.garcia@example.com', '555-2345', '654 Cedar St', 'Providence', 'RI', '02901', '2024-04-14', 'Satisfied customer'),
('David', 'Rodriguez', 'david.rodriguez@example.com', '555-6789', '210 Birch St', 'Warwick', 'RI', '02886', '2024-04-14', 'Long-time client'),
('Jennifer', 'Lopez', 'jennifer.lopez@example.com', '555-0123', '753 Walnut St', 'Cranston', 'RI', '02910', '2024-04-14', 'Valued customer'),
('Daniel', 'Perez', 'daniel.perez@example.com', '555-4567', '852 Chestnut St', 'Pawtucket', 'RI', '02860', '2024-04-14', 'Regular client'),
('Sophia', 'Sanchez', 'sophia.sanchez@example.com', '555-8901', '369 Spruce St', 'Woonsocket', 'RI', '02895', '2024-04-14', 'Frequent shopper');




--  some mechanics 
INSERT INTO mechanics (name) VALUES
('John'),
('Jefferey'),
('Sarah');

-- genuine shipment
INSERT INTO orders (vendor, invoice_no, order_date, num_items, total, order_arrival_date) VALUES
('Genuine', 'INV2024001', '2024-04-14', 10, 6400, '2024-04-21');

INSERT INTO inventory (vin, make, model, year, order_id, buy_price, sell_price, status_id)
VALUES
('VIN001', 'Genuine', 'Buddy50', 2024, 1, 640, 1240, 1),
('VIN002', 'Genuine', 'Buddy50', 2024, 1, 640, 1240, 1),
('VIN003', 'Genuine', 'Buddy50', 2024, 1, 640, 1240, 1),
('VIN004', 'Genuine', 'Buddy50', 2024, 1, 640, 1240, 1),
('VIN005', 'Genuine', 'Buddy50', 2024, 1, 640, 1240, 1),
('VIN006', 'Genuine', 'Buddy Kick', 2024, 1, 640, 1240, 1),
('VIN007', 'Genuine', 'Buddy Kick', 2024, 1, 640, 1240, 1),
('VIN008', 'Genuine', 'Hooligan', 2024, 1, 640, 1240, 1),
('VIN009', 'Genuine', 'Hooligan', 2024, 1, 640, 1240, 1),
('VIN010', 'Genuine', 'Hooligan', 2024, 1, 640, 1240, 1);
-- this will automatically populate in the models column because of the trigger



-- Icebear shipment
INSERT INTO orders (vendor, invoice_no, order_date, num_items, total, order_arrival_date) VALUES
('Icebear', 'INV2023001', '2023-03-12', 16, 9600, '2023-04-01');

-- Scooters from Icebear shipment
INSERT INTO inventory (vin, make, model, year, order_id, buy_price, sell_price, status_id)
VALUES
('VIN011', 'Icebear', 'Maddog', 2023, 2, 600, 1400, 1),
('VIN012', 'Icebear', 'Maddog', 2023, 2, 600, 1400, 1),
('VIN013', 'Icebear', 'Maddog', 2023, 2, 600, 1400, 1),
('VIN014', 'Icebear', 'Maddog', 2023, 2, 600, 1400, 1),
('VIN015', 'Icebear', 'Maddog', 2023, 2, 600, 1400, 1),
('VIN016', 'Icebear', 'Maddog', 2023, 2, 600, 1400, 1),
('VIN017', 'Icebear', 'Maddog', 2023, 2, 600, 1400, 1),
('VIN018', 'Icebear', 'Maddog', 2023, 2, 600, 1400, 1),
('VIN019', 'Icebear', 'Mini Max', 2023, 2, 600, 1400, 1),
('VIN020', 'Icebear', 'Mini Max', 2023, 2, 600, 1400, 1),
('VIN021', 'Icebear', 'Mini Max', 2023, 2, 600, 1400, 1),
('VIN022', 'Icebear', 'Mini Max', 2023, 2, 600, 1400, 1),
('VIN023', 'Icebear', 'Mini Max', 2023, 2, 600, 1400, 1),
('VIN024', 'Icebear', 'Mini Max', 2023, 2, 600, 1400, 1),
('VIN025', 'Icebear', 'Mini Max', 2023, 2, 600, 1400, 1),
('VIN026', 'Icebear', 'Mini Max', 2023, 2, 600, 1400, 1);

-- Update status for random scooters
UPDATE inventory SET status_id = 2 WHERE vin IN ('VIN011', 'VIN012', 'VIN013', 'VIN014');
UPDATE inventory SET status_id = 3 WHERE vin IN ('VIN015', 'VIN016', 'VIN017', 'VIN018');


-- create some sales 
INSERT INTO sales (client_id, invt_id, sale_price, payment_status, down_payment_amount, date_completed)
VALUES
(1, 'VIN015', 1400.00, 'down payment', 200.00, '2024-04-14'),
(2, 'VIN016', 1400.00, 'down payment', 200.00, '2024-04-14'),
(3, 'VIN017', 1400.00, 'sold', NULL, '2024-04-14'),
(4, 'VIN018', 1400.00, 'down payment', 200.00, '2024-04-14');

-- Update inventory status for the provided scooters
UPDATE inventory SET status_id = 4 WHERE vin IN ('VIN015', 'VIN016');
UPDATE inventory SET status_id = 5 WHERE vin = 'VIN017';

-- realized i should add a date initiated column
-- Update date_initiated for each sale with a random date within the past week
UPDATE sales 
SET date_initiated = DATE_SUB(CURDATE(), INTERVAL FLOOR(RAND() * 7) DAY) 
WHERE invt_id IN ('VIN015', 'VIN016', 'VIN017', 'VIN018');



-- added last edited for queries 
UPDATE inventory 
SET last_update = DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY);
