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
                <h1>view client</h1>
        </div>
        
       
    <h1>Fields Title</h1>
    <form id="newClientForm">
        <div class="field-wrap">
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" class="editable-field field" placeholder="First Name">
        </div>
        <div class="field-wrap">
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" class="editable-field field" placeholder="Last Name">
        </div>
        <div class="field-wrap">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" class="editable-field field" placeholder="Email">
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
   


</body>
