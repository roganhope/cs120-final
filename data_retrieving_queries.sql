
-- client pages
SELECT * FROM `clients`;


-- sales page 
SELECT s.*, i.vin, i.year, i.make, i.model, sc.status_name
FROM sales s
JOIN inventory i ON s.invt_id = i.vin
JOIN status_codes sc ON i.status_id = sc.status_id
ORDER BY s.date_initiated;


-- main dashboard page SELECT 
    i.vin, 
    i.make, 
    i.model, 
    i.year, 
    i.color,
    i.sell_price, 
    sc.status_name
FROM 
    inventory i
JOIN 
    status_codes sc ON i.status_id = sc.status_id;



-- mechanic page 
SELECT make, model FROM models ORDER BY make ASC;


-- sales for client 
SELECT s.*, i.vin, i.year, i.make, i.model, sc.status_name
FROM sales s
JOIN inventory i ON s.invt_id = i.vin
JOIN status_codes sc ON i.status_id = sc.status_id
WHERE s.client_id = 1 -- change this to the client id variable 
ORDER BY s.date_initiated;


-- grabbing all inventory based off a make and model 
SELECT *
FROM inventory
WHERE model = 'Maddog' -- change this
AND make = 'Icebear'; -- change this 



-- get all the inventory from an order
SELECT *
FROM inventory
WHERE order_id = <variable>;
