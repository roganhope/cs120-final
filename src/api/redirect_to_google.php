<?php

$clientID = '';
$clientSecret = '';
$redirectUri = '';


$authUrl = "https://accounts.google.com/o/oauth2/v2/auth";

$scope = "email";


$params = array(
    'response_type' => 'code',
    'client_id' => $clientID,
    'redirect_uri' => $redirectUri,
    'scope' => $scope,
    'access_type' => 'offline',
    'include_granted_scopes' => 'true'
);


header('Location: ' . $authUrl . '?' . http_build_query($params));
exit;
?>