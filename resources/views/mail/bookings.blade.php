<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 20px;
            padding: 20px;
            background-color: #f4f4f4;
        }

        h1 {
            color: #333;
        }

        p {
            color: #555;
            line-height: 1.6;
        }

        p.signature {
            margin-top: 20px;
        }

        a {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <h1>Booking Confirmation</h1>
    <p>Dear {{ $booking['customer_name'] }},</p>

    <p>We have received your order!  Here's a quick confirmation:</p>
       <p>Name: {{ $booking['customer_name'] }}</p>
         <p>Email: {{ $booking['email'] }}</p>
            <p>Phone: {{ $booking['phone_number'] }}</p>

    <p>We're on it. Thank you for choosing us!</p>
    <p>Reach us at <a href="mailto:infp@brotherstech.co.sa">infp@brotherstech.co.sa</a> or <a href="tel:1-888-123-45678">1-888-123-45678</a>.</p>

    <p class="signature">Best regards,<br>
       BrothersTech</p>
</body>
</html>
