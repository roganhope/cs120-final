<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Main Page</title>
    <link rel="icon" href="images/favicon.ico" type="image/x-icon">

</head>
<body>
    <div class="page-container">
        <div class="nav-container">
            <div>
                <a  href="dashboard.php"><img class="logo" src="images/temp-logo.png" alt=""></a>
            </div>
            <div class="nav-buttons">
                <div class="nav-button active">
                    <img  class="nav-img" src="/images/nav-icons/dashboard.png" alt="">
                    <a class="nav-link"  href="dashboard.php">Dashboard</a>
                </div>
                <div class="nav-button">
                    <img  class="nav-img" src="/images/nav-icons/upload.png" alt="">
                    <a class="nav-link"  href="upload_inventory.php">Upload Inventory</a>
                </div>
                <div class="nav-button">
                    <img  class="nav-img" src="/images/nav-icons/customers.png" alt="">
                    <a class="nav-link"  href="clients.php">Clients</a>
                </div>
                <div class="nav-button">
                    <img  class="nav-img" src="/images/nav-icons/confetti.png" alt="">
                    <a class="nav-link"  href="new_client.php">New Client</a>
                </div>
                <div class="nav-button">
                    <img  class="nav-img" src="/images/nav-icons/wrench-alt.png" alt="">
                    <a class="nav-link"  href="mechanic_hub.php">Mechanic Hub</a>
                </div>
                <div class="nav-button">
                    <img  class="nav-img" src="/images/nav-icons/dollar.png" alt="">
                    <a class="nav-link"  href="sales.php">Sales</a>
                </div>
                <div class="nav-button">
                    <img  class="nav-img" src="/images/nav-icons/user.png" alt="">
                    <a class="nav-link"  href="account.php">Account</a>
                </div>
                <div class="nav-button">
                    <img  class="nav-img" src="/images/nav-icons/truck-side.png" alt="">
                    <a class="nav-link"  href="shipments.php">Shipments</a>
                </div>
            </div>

            <div class="nav-button logout">
                <img  class="nav-img" src="/images/nav-icons/exit.png" alt="">
                <a class="nav-link"  href="">Log Out</a>
            </div>
            
        </div>
        <div class="page-content-container temp">

        <div class="page-title">
                <h1>clients</h1>
            </div>
            
            <!--  SECTION: FULL WIDTH TABLE  -->
            <table class="full-width-table temp">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>123-456-7890</td>
                        <td>john.doe@example.com</td>
                        <td class="ordered">Ordered</td>
                    </tr>
                    <tr>
                        <td>Jane</td>
                        <td>Smith</td>
                        <td>987-654-3210</td>
                        <td>jane.smith@example.com</td>
                        <td class="arrived">Arrived</td>
                    </tr>
                    <tr>
                        <td>Michael</td>
                        <td>Jackson</td>
                        <td>555-123-4567</td>
                        <td>michael.jackson@example.com</td>
                        <td class="assembled">Assembled</td>
                    </tr>
                    <tr>
                        <td>Emily</td>
                        <td>Thompson</td>
                        <td>789-456-1230</td>
                        <td>emily.thompson@example.com</td>
                        <td class="ready-to-sell">Ready to Sell</td>
                    </tr>
                    <tr>
                        <td>David</td>
                        <td>Bowie</td>
                        <td>222-333-4444</td>
                        <td>david.bowie@example.com</td>
                        <td class="sold">Sold</td>
                    </tr>
                    <tr>
                        <td>Amy</td>
                        <td>Lee</td>
                        <td>111-222-3333</td>
                        <td>amy.lee@example.com</td>
                        <td class="other-special">Other/Special</td>
                    </tr>
                </tbody>
            </table>


            
        
        </div>
    </div>
    
</body>

</html>