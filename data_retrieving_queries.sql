-- DASHBOARD


-- INVENTORY PAGE 
        -- card 1: # invenotry in trasnit 
        SELECT COUNT(*) AS count FROM `inventory` WHERE status_id = 1;
        -- card 2: days until next arrival 
        SELECT MIN(order_arrival_date) AS soonest_arrival_date, DATEDIFF(MIN(order_arrival_date), CURDATE()) AS days_until_arrival FROM shipments;
        -- this could be negative, need to deal with that (ie no shipments)

        -- card 2: number on site
        SELECT COUNT(*) AS count_inventory FROM inventory WHERE status_id IN (2, 3);
        -- remaining int: just subtract the above query value 

        -- card 3:
        -- total scooters available to be sold today/right now
        SELECT COUNT(*) AS inventory_status_2_3_4_not_in_sales_count
        FROM inventory i
        LEFT JOIN sales s ON i.sale_id = s.sale_id
        WHERE i.status_id IN (2, 3, 4) AND s.sale_id IS NULL;

        -- ready to go instantly 
        SELECT COUNT(*) AS inventory_status_4_not_in_sales_count
        FROM inventory i
        LEFT JOIN sales s ON i.sale_id = s.sale_id
        WHERE i.status_id = 4 AND s.sale_id IS NULL;

        -- main table 
        SELECT 
        inv.vin,
        inv.color,
        inv.year,
        inv.make,
        inv.model,
        CONCAT(cl.first, ' ', cl.last) AS full_name, -- Concatenate first and last name if client exists
        sc.status_name AS status
        FROM 
        inventory inv
        LEFT JOIN 
        sales s ON inv.sale_id = s.sale_id
        LEFT JOIN 
        clients cl ON s.client_id = cl.client_id
        LEFT JOIN 
        status_codes sc ON inv.status_id = sc.status_id;
                




-- client pages
SELECT * FROM `clients`;

-- specefic client / single view 
$sql = "SELECT * FROM clients WHERE client_id = $client_id";


-- sales page 
SELECT s.*, i.vin, i.year, i.make, i.model, sc.status_name
FROM sales s
JOIN inventory i ON s.invt_id = i.vin
JOIN status_codes sc ON i.status_id = sc.status_id
ORDER BY s.date_initiated;


-- main dashboard page SELECT 
SELECT i.vin, i.make, i.model, i.year, i.color, i.retail_price, sc.status_name, s.payment_status
FROM inventory i
LEFT JOIN sales s ON i.vin = s.invt_id
LEFT JOIN status_codes sc ON i.status_id = sc.status_id;



-- mechanic page 
SELECT make, model FROM models ORDER BY make ASC;


-- sales for client 
SELECT s.*, i.vin, i.year, i.make, i.model, sc.status_name
FROM sales s
JOIN inventory i ON s.invt_id = i.vin
JOIN status_codes sc ON i.status_id = sc.status_id
WHERE s.client_id = 1 -- change this to the client id variable 
ORDER BY s.date_initiated;


-- grabbing all inventory based off a make and model (for mechanic view page)
SELECT *
FROM inventory
WHERE model = 'Maddog' -- change this
AND make = 'Icebear'; -- change this 



-- get all the inventory from an order
SELECT *
FROM inventory
WHERE order_id = <variable>;


SELECT * FROM 
shipments;

--INSERTS 
-- inserting shipments
$sql = "INSERT INTO shipments (vendor, invoice_no, order_date, num_items, total, order_arrival_date) 
        VALUES ('$vendor', '$invoice_no', '$order_date', '$num_items', '$total', '$order_arrival_date')"

-- new client
$sql = "INSERT INTO clients (first, last, email, phone_number, street, city, state, zipcode, date_created, notes) 
        VALUES ('$first', '$last', '$email', '$phone_number', '$street', '$city', '$state', '$zipcode', '$date_created', '$notes')";


-- updating scooter status 
$sql = "UPDATE inventory SET status_id = :status WHERE inventory_id = :id";



-- updating cleint
$id = 123; 
$first = "John";
$last = "Doe";
$email = "john@example.com";
$phone_number = "123-456-7890";
$street = "123 Main St";
$city = "Anytown";
$state = "CA";
$zipcode = "12345";
$date_created = date("Y-m-d");
$notes = "Updated notes";

// Construct the SQL query with variables
$sql = "UPDATE clients 
        SET first = ?, last = ?, email = ?, phone_number = ?, street = ?, 
            city = ?, state = ?, zipcode = ?, date_created = ?, notes = ? 
        WHERE client_id = ?";

// Prepare the statement
$stmt = $pdo->prepare($sql);

// Bind parameters and execute the statement
$stmt->execute([$first, $last, $email, $phone_number, $street, $city, $state, $zipcode, $date_created, $notes, $id]);
