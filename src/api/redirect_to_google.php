<?php

$clientID = '232301126322-5db2irp4hgmjov1cg251ep06gpchj2vt.apps.googleusercontent.com';
$clientSecret = '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';
$redirectUri = 'http://HaventdDoneYet';


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