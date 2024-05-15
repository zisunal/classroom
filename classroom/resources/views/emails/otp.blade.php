<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Email</title>
</head>
<body>
    <h1>OTP Email</h1>
    <p>Dear User,</p>
    <p>Your One-Time Password (OTP) is: {{ $otp }}</p>
    <p>OTP will be expire at {{ date("d M,Y - h:i A", strtotime($expires)) }}</p>
    <p>Please use this OTP to complete your verification process.</p>
    <p>If you did not request this OTP, please ignore this email.</p>
    <p>Thank you,</p>
    <p>{{ $app_info->name }}</p>
</body>
</html>