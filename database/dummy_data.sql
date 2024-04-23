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



-- create two shipments 
INSERT INTO shipments (vendor, invoice_no, order_date, num_items, total, order_arrival_date) 
VALUES ('icebear', 'ice2024001', '2024-03-04', 10, 5000.00, '2024-04-01');

INSERT INTO shipments (vendor, invoice_no, order_date, num_items, total, order_arrival_date) 
VALUES ('genuine', 'gen2024002', '2024-03-08', 10, 5000.00, '2024-04-10');

-- inventory
INSERT INTO inventory (vin, make, model, year, color, order_id, status_id, purchase_price, retail_price, last_update)
VALUES
-- Icebear Maddog50
('VIN001', 'Icebear', 'Maddog50', 2024, 'Red', 1, 1, 500.00, 1500.00, NOW()),
('VIN002', 'Icebear', 'Maddog50', 2024, 'Blue', 1, 1, 500.00, 1500.00, NOW()),
('VIN003', 'Icebear', 'Maddog50', 2024, 'Yellow', 1, 1, 500.00, 1500.00, NOW()),
('VIN004', 'Icebear', 'Maddog50', 2024, 'Green', 1, 1, 500.00, 1500.00, NOW()),
('VIN005', 'Icebear', 'Maddog50', 2024, 'Black', 1, 1, 500.00, 1500.00, NOW()),
-- Icebear Rocket
('VIN006', 'Icebear', 'Rocket', 2024, 'Red', 1, 1, 500.00, 1500.00, NOW()),
('VIN007', 'Icebear', 'Rocket', 2024, 'Blue', 1, 1, 500.00, 1500.00, NOW()),
('VIN008', 'Icebear', 'Rocket', 2024, 'Yellow', 1, 1, 500.00, 1500.00, NOW()),
('VIN009', 'Icebear', 'Rocket', 2024, 'Green', 1, 1, 500.00, 1500.00, NOW()),
('VIN010', 'Icebear', 'Rocket', 2024, 'Black', 1, 1, 500.00, 1500.00, NOW()),
-- Genuine Buddy50
('VIN011', 'Genuine', 'Buddy50', 2024, 'Red', 1, 1, 500.00, 1500.00, NOW()),
('VIN012', 'Genuine', 'Buddy50', 2024, 'Blue', 1, 1, 500.00, 1500.00, NOW()),
('VIN013', 'Genuine', 'Buddy50', 2024, 'Yellow', 1, 1, 500.00, 1500.00, NOW()),
('VIN014', 'Genuine', 'Buddy50', 2024, 'Green', 1, 1, 500.00, 1500.00, NOW()),
('VIN015', 'Genuine', 'Buddy50', 2024, 'Black', 1, 1, 500.00, 1500.00, NOW()),
-- Genuine Grand Prix
('VIN016', 'Genuine', 'Grand Prix', 2024, 'Red', 1, 1, 500.00, 1500.00, NOW()),
('VIN017', 'Genuine', 'Grand Prix', 2024, 'Blue', 1, 1, 500.00, 1500.00, NOW()),
('VIN018', 'Genuine', 'Grand Prix', 2024, 'Yellow', 1, 1, 500.00, 1500.00, NOW()),
('VIN019', 'Genuine', 'Grand Prix', 2024, 'Green', 1, 1, 500.00, 1500.00, NOW()),
('VIN020', 'Genuine', 'Grand Prix', 2024, 'Black', 1, 1, 500.00, 1500.00, NOW());


UPDATE inventory
SET status_id = 2
WHERE make = 'Icebear';


-- Update 4 random Icebear scooters to status 3
UPDATE inventory
SET status_id = 3
WHERE make = 'Icebear'
ORDER BY RAND()
LIMIT 4;

-- Update another 4 random Icebear scooters to status 4
UPDATE inventory
SET status_id = 4
WHERE make = 'Icebear'
ORDER BY RAND()
LIMIT 4;


-- Create a sale for client ID 1 with inventory ID 2 and payment status ID 3
INSERT INTO sales (client_id, invt_id, sale_price, payment_status, down_payment_amount, date_initiated)
VALUES
(1, 'VIN002', 0.00, 3, 0.00, CURRENT_DATE());

-- Create a sale for client ID 2 with inventory ID 4 and payment status ID 3
INSERT INTO sales (client_id, invt_id, sale_price, payment_status, down_payment_amount, date_initiated)
VALUES
(2, 'VIN004', 0.00, 3, 0.00, CURRENT_DATE());
