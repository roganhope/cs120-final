let auth2; // The Google Auth object.
function initGoogleAuth() {
    gapi.load('auth2', function() {
        auth2 = gapi.auth2.init({
            client_id: '232301126322-5db2irp4hgmjov1cg251ep06gpchj2vt.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            scope: 'profile email'
        });

        // Attach the login handler to the login button
        auth2.attachClickHandler('login-btn', {},
            function(googleUser) {
                console.log("Logged in as: " + googleUser.getBasicProfile().getName());
                document.querySelector('.logout').style.display = 'block'; // Show logout button
                document.getElementById('login-btn').style.display = 'none'; // Hide login button
            }, function(error) {
                console.log(JSON.stringify(error, undefined, 2));
            }
        );

        // Setup logout button
        document.getElementById('logout-btn').onclick = function() {
            auth2.signOut().then(function () {
                console.log('User signed out.');
                document.querySelector('.logout').style.display = 'none'; // Hide logout button
                document.getElementById('login-btn').style.display = 'block'; // Show login button
            });
        };
    });
}

// Call this function when the page loads
window.onload = initGoogleAuth;
