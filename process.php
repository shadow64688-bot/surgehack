<?php
// process.php - Handle contact form submissions

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get form data and sanitize it
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $message = strip_tags(trim($_POST["message"]));
    
    // Check required fields
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo "Please fill in all required fields.";
        exit;
    }
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Invalid email address.";
        exit;
    }
    
    // Set your email address where you want to receive inquiries
    $recipient = "surgehackrecovery@gmail.com"; // REPLACE THIS
    
    // Set email subject
    $subject = "New Recovery Inquiry from $name";
    
    // Build email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n\n";
    $email_content .= "Message:\n$message\n";
    
    // Build email headers
    $email_headers = "From: $name <$email>";
    
    // Send the email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Success - redirect to thank you page or show success message
        http_response_code(200);
        echo "Thank you! Your message has been sent. A recovery specialist will contact you within 24 hours.";
    } else {
        // Error
        http_response_code(500);
        echo "Oops! Something went wrong. Please try again later.";
    }
    
} else {
    // Not a POST request
    http_response_code(403);
    echo "There was a problem with your submission. Please try again.";
}
?>