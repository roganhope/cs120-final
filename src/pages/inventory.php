<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../public/css/style.css">
    <title>Main Page</title>
    <link rel="icon" href="images/favicon.ico" type="image/x-icon">

</head>

<body>
    <?php
    require_once ("database-credentials.php");
    $conn = new mysqli($server, $userid, $pw, $db);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // 1a Inventory in Transit
    $sql1 = "SELECT COUNT(*) AS count FROM inventory WHERE status_id = 1;";
    $result1 = $conn->query($sql1);
    $row1 = $result1->fetch_assoc();
    $count_inventory_in_transit = $row1['count'];

    // 1b
    $sql2 = "SELECT MIN(order_arrival_date) AS soonest_arrival_date, DATEDIFF(MIN(order_arrival_date), CURDATE()) AS days_until_arrival FROM shipments;";
    $result2 = $conn->query($sql2);
    $row2 = $result2->fetch_assoc();
    $days_until_arrival = $row2['days_until_arrival'];

    // 2a
    $sql3 = "SELECT COUNT(*) AS count_inventory FROM inventory WHERE status_id IN (2, 3);";
    $result3 = $conn->query($sql3);
    $row3 = $result3->fetch_assoc();
    $count_inventory_on_site = $row3['count_inventory'];
    //2b
    $count_remaining_spaces = 100 - $count_inventory_on_site;

    //3a
    $sql4 = "SELECT COUNT(*) AS available_to_sell
        FROM inventory i
        LEFT JOIN sales s ON i.sale_id = s.sale_id
        WHERE i.status_id IN (2, 3, 4) AND s.sale_id IS NULL;";
    $result4 = $conn->query($sql4);
    $row4 = $result4->fetch_assoc();
    $available_to_sell = $row4['available_to_sell'];

    //3b
    $sql5 = "SELECT COUNT(*) AS ready_now
        FROM inventory i
        LEFT JOIN sales s ON i.sale_id = s.sale_id
        WHERE i.status_id = 4 AND s.sale_id IS NULL;";
    $result5 = $conn->query($sql5);
    $row5 = $result5->fetch_assoc();
    $ready_now = $row5['ready_now'];


    $conn->close();
    ?>
    <div class="page-container">
        <?php include '../components/navbar.php'; ?> <!-- Include the navbar -->
        <div class="page-content-container temp">
            <div class="highlights-and-buttons temp">
                <div class="highlights  temp">
                    <div class="highlight-card">
                        <div class="card-title">Inventory in Transit</div>
                        <div class="card-value"><?php echo $count_inventory_in_transit; ?></div>
                        <div class="card-subtitle">Next arrival is in <?php echo $count_inventory_in_transit; ?> days
                            until arrival days.</div>
                    </div>
                    <div class="highlight-card">
                        <div class="card-title">Inventory on Site</div>
                        <div class="card-value"><?php echo $count_inventory_on_site; ?></div>
                        <div class="card-subtitle"><?php echo $count_remaining_spaces; ?> remaining spaces.</div>
                    </div>
                    <div class="highlight-card">
                        <div class="card-title">Available to Sell</div>
                        <div class="card-value"><?php echo $available_to_sell; ?></div>
                        <div class="card-subtitle"><?php echo $ready_now; ?> Scooters available to leave today.</div>
                    </div>
                </div>
                <div class="button-holder temp">
                    <button>Upload Inventory</button>
                </div>
            </div>

            <div class="full-width-table">
                <?php
                require_once ("database-credentials.php");
                $conn = new mysqli($server, $userid, $pw, $db);

                if ($conn->connect_error) {
                    die("Connection failed: " . $conn->connect_error);
                }
                // SQL query
                $sql = "SELECT 
                    inv.vin,
                    inv.color,
                    inv.year,
                    inv.make,
                    inv.model,
                    CONCAT(cl.first, ' ', cl.last) AS full_name,
                    sc.status_name AS status
                FROM 
                    inventory inv
                LEFT JOIN 
                    sales s ON inv.sale_id = s.sale_id
                LEFT JOIN 
                    clients cl ON s.client_id = cl.client_id
                LEFT JOIN 
                    status_codes sc ON inv.status_id = sc.status_id";

                $result = $conn->query($sql);

                if ($result->num_rows > 0) {
                    // Output data of each row
                    echo "<table>
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>Color</th>
                            <th>Year</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Client</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>";
                            while ($row = $result->fetch_assoc()) {
                            
                                echo "<tr>
                        <td>" . $row["vin"] . "</td>
                        <td>" . $row["color"] . "</td>
                        <td>" . $row["year"] . "</td>
                        <td>" . $row["make"] . "</td>
                        <td>" . $row["model"] . "</td>
                        <td>" . ($row["full_name"] ? $row["full_name"] : "") . "</td>
                        <td" . getStatusClass($row["status"]) . ">" . $row["status"] . "</td>
                    </tr>";
                            }
                            echo "</tbody></table>";
                        } else {
                            echo "0 results";
                        }

                        function getStatusClass($status) {
                            return " class='" . strtolower(str_replace(' ', '-', $status)) . "'";
                        }
                        // Close connection
                        $conn->close();
                        ?>



            </div>



        </div>
    </div>

</body>

</html>