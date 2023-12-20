<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$firstName = isset($_POST['firstName']) ? $_POST['firstName'] : '';
$userPhone = isset($_POST['userPhone']) ? $_POST['userPhone'] : '';
$userEmail = isset($_POST['userEmail']) ? $_POST['userEmail'] : '';
$userMessage = isset($_POST['userMessage']) ? $_POST['userMessage'] : '';

if (empty($firstName) || empty($userEmail) || empty($userMessage)) {
    echo json_encode(array('type' => 'error', 'text' => 'Please provide all the required fields.'));
    exit;
}

error_log("Received data: " . print_r($_POST, true), 3, "error.log");

$file = 'C:\Users\Dr Poonam Pandey\Desktop\personal_portfolio\js\form_data.csv';
$data = "$firstName,$userPhone,$userEmail,$userMessage\n";

error_log("Data to append: $data", 3, "error.log");
error_log("File path: C:\Users\Dr Poonam Pandey\Desktop\personal_portfolio\js\form_data.csv " . realpath($file), 3, "error.log");

if (file_put_contents($file, $data, FILE_APPEND | LOCK_EX)) {
    echo json_encode(array('type' => 'success', 'text' => 'Your message has been successfully submitted.'));
} else {
    $errorMessage = 'Failed to store the form data.';
    error_log($errorMessage, 3, "error.log");
    echo json_encode(array('type' => 'error', 'text' => $errorMessage));
}
?>
