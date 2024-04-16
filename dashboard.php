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
=======
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
                    <a class="nav-link"  href="/dashboard.php">Dashboard</a>
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
            <!-- SECTION: PAGE TITLE  -->
            <div class="page-title">
                <h1>Dashboard</h1>
            </div>

            <!-- SECTION: HIGHLIGHTS -->
            <div class="highlights temp">
                <div class="highlight-card temp">
                    <p class="highlight-number">10</p>
                    <p>TO BE ASSEMBLED</p>
                </div>
                <div class="highlight-card temp">
                    <p class="highlight-number">10</p>
                    <p>TO BE ASSEMBLED</p>
                </div>
                <div class="highlight-card temp">
                    <p class="highlight-number">10</p>
                    <p>TO BE ASSEMBLED</p>
                </div>
                <div class="highlight-card temp">
                    <p class="highlight-number">10</p>
                    <p>TO BE ASSEMBLED</p>
                </div>
               
            </div>

            <!-- SECTION: FILLABLE FIELDS -->
            <div class="temp fields">
                <h1>Fields Title</h1>
                <form id="profileForm">
                    <div class="field-wrap">
                        <label for="firstName">LABEL</label>
                        <input type="text" id="firstName" name="firstName" class="editable-field field" placeholder="First Name">
                    </div>
                    <div class="field-wrap">
                        <label for="lastName">LABEL</label>
                        <input type="text" id="lastName" name="lastName" class="editable-field field" placeholder="Last Name">
                    </div>
                    <div class="field-wrap">
                        <label for="email">LABEL</label>
                        <input type="email" id="email" name="email" class="editable-field field" placeholder="Email">
                    </div>
                    <div class="field-wrap">
                        <label for="phoneNumber">LABEL</label>
                        <input type="tel" id="phoneNumber" name="phoneNumber" class="editable-field field" placeholder="Phone Number">
                    </div>
                    <div class="field-wrap">
                        <label for="street">Street:</label>
                        <input type="text" id="street" name="street" class="editable-field field" placeholder="Street">
                    </div>
                    <div class="field-wrap">
                        <label for="city">City:</label>
                        <input type="text" id="city" name="city" class="editable-field field" placeholder="City">
                    </div>
                    <div class="field-wrap">
                        <label for="state">State:</label>
                        <input type="text" id="state" name="state" class="editable-field field" placeholder="State">
                    </div>
                    <div class="field-wrap">
                        <label for="zipcode">Zipcode:</label>
                        <input type="text" id="zipcode" name="zipcode" class="editable-field field" placeholder="Zipcode">
                    </div>
                    <div class="field-wrap">
                        <label for="notes">Notes:</label>
                        <textarea id="notes" name="notes" class="editable-field field" placeholder="Notes"></textarea>
                    </div>
                    <button type="button" id="editButton">Edit</button>
                    <button type="submit" id="saveButton" style="display: none;">Save</button>
                </form>
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

            <!-- SECTION: UPLOAD CSV  -->

            
        
        </div>
    </div>
    
</body>


</html>