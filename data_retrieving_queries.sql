
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
