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
    <div class="page-container">
        <?php include '../components/navbar.php'; ?> <!-- Include the navbar -->
        <div class="page-content-container temp">

        <div class="page-title">
                <h1>clients</h1>
            </div>
            
            <!--  SECTION: FULL WIDTH TABLE  -->
            <?php

                require_once("database-credentials.php");
                $conn = new mysqli($server, $userid, $pw, $db);

                if ($conn->connect_error) {
                    die("Connection failed: " . $conn->connect_error);
                }
                $sql = "select first, last, email, phone_number, city from clients order by date_created desc";
                $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                    echo '<table class="full-width-table temp">';
                    echo '<thead>';
                    echo '<tr>';
                    echo '<th>First Name</th>';
                    echo '<th>Last Name</th>';
                    echo '<th>Email</th>';
                    echo '<th>Phone Number</th>';
                    echo '<th>City</th>';
                    echo '</tr>';
                    echo '</thead>';
                    echo '<tbody>';

                    while ($row = $result->fetch_assoc()) {
                        echo '<tr>';
                        echo '<td>' . $row["first"] . '</td>';
                        echo '<td>' . $row["last"] . '</td>';
                        echo '<td>' . $row["email"] . '</td>';
                        echo '<td>' . $row["phone_number"] . '</td>';
                        echo '<td>' . $row["city"] . '</td>';
                        echo '</tr>';
                    }
                    echo '</tbody>';
                    echo '</table>';
                }
                else {
                    echo "No clients in database or error occured.";
                }
              
            ?>

        
        
        </div>
    </div>
    
</body>

</html>