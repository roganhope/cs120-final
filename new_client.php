<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Main Page</title>
    <link rel="icon" href="/images/favicon.ico" type="image/x-icon">

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
                <h1>new client</h1>
        </div>
        
        <div class="temp fields">
    <h1>Create Client</h1>
    <form id="newClientForm">
        <div class="field-wrap">
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" class="editable-field field" placeholder="First Name" >
        </div>
        <div class="field-wrap">
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" class="editable-field field" placeholder="Last Name">
        </div>
        <div class="field-wrap">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" class="editable-field field" placeholder="Email" >
        </div>
        <div class="field-wrap">
            <label for="phoneNumber">Phone Number:</label>
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
        <button type="button" id="submitButton">Submit</button>
        
</div>
       

            
        
        </div>
    </div>
    <script>
    document.addEventListener("DOMContentLoaded", function() {
        document.getElementById("submitButton").addEventListener("click", function(event) {
            event.preventDefault(); // Prevent the default form submission

            // get data
            var firstName = document.getElementById("firstName").value;
            var lastName = document.getElementById("lastName").value;
            var email = document.getElementById("email").value;
            var phoneNumber = document.getElementById("phoneNumber").value;
            var street = document.getElementById("street").value;
            var city = document.getElementById("city").value;
            var state = document.getElementById("state").value;
            var zipcode = document.getElementById("zipcode").value;
            var notes = document.getElementById("notes").value;

            // Prepare form data
            var formData = new FormData();
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("email", email);
            formData.append("phoneNumber", phoneNumber);
            formData.append("street", street);
            formData.append("city", city);
            formData.append("state", state);
            formData.append("zipcode", zipcode);
            formData.append("notes", notes);

            // Send data to new_client_script.php using AJAX
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "new_client_script.php", true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        // Request was successful
                        console.log(xhr.responseText);
                        window.location.href = 'client.php';
                    } else {
                        // Error occurred
                        console.error("Error:", xhr.status);
                    }
                }
            };
            xhr.send(formData);
        });
    });
</script>


</body>

</html>