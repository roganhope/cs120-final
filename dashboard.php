<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>dashboard</title>
    <link rel="stylesheet" href="../../style.css">
    <link rel="icon" href="../../public/images/favicon.ico" type="image/x-icon">
    <script src="/src/scripts/login.js"></script>
    <script src="https://apis.google.com/js/api.js"></script>
</head>
<body>
    
<div class="page-container">
        <div class="nav-container">
            <div>
                <a  href="dashboard.php"><img class="logo" src="../../public/images/temp-logo.png" alt=""></a>
            </div>
            <div class="nav-buttons">
                <div class="nav-button active">
                    <img class="nav-img" src="../../public/images/nav-icons/dashboard.png" alt="">
                    <a class="nav-link"  href="dashboard.php">Dashboard</a>
                </div>
                <div class="nav-button">
                    <img class="nav-img" src="../../public/images/nav-icons/upload.png" alt="">
                    <a class="nav-link"  href="upload_inventory">Upload Inventory</a>
                </div>
                <div class="nav-button">
                    <img class="nav-img" src="../../public/images/nav-icons/customers.png" alt="">
                    <a class="nav-link"  href="clients">Clients</a>
                </div>
                <div class="nav-button">
                    <img class="nav-img" src="../../public/images/nav-icons/wrench-alt.png" alt="">
                    <a class="nav-link"  href="mechanic_hub">Mechanic Hub</a>
                </div>
                <div class="nav-button">
                    <img class="nav-img" src="../../public/images/nav-icons/dollar.png" alt="">
                    <a class="nav-link"  href="sales">Sales</a>
                </div>

                <div class="nav-button">
                    <img class="nav-img" src="../../public/images/nav-icons/truck-side.png" alt="">
                    <a class="nav-link"  href="shipments">Shipments</a>
                </div>

            </div>

            <div class="nav-button logout">
            <div class="nav-button">
                    <img class="nav-img" src="../../public/images/nav-icons/user.png" alt="">
                    <a class="nav-link"  href="account">Account</a>
                </div>
                <div class="nav-button">
                    <img class="nav-img" src="../../public/images/nav-icons/exit.png" alt="logout icon">
                    <a class="nav-link" id="logout-btn" href="login.php">Log Out</a>
                </div>
            </div>
            </div> 
</div>
</body>
</html>