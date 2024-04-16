<?php
session_start();

$accessToken = exchangeCodeForToken($_GET['code']);

$userInfo = fetchGoogleUserInfo($accessToken);

$_SESSION['user'] = $userInfo;

header('Location: main-layout.php');
exit;
?>
