const forgotPasswordEmailTemplate = (url) => {
  return `<!DOCTYPE html>
     <html lang="en">
     <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <style>
         body {
           font-family: Arial, sans-serif;
           background-color: #f0f0f0;
           margin: 0;
           padding: 0;
         }
         .container {
           max-width: 600px;
           margin: 0 auto;
           padding: 20px;
           background-color: #ffffff;
           border-radius: 5px;
           box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
         }
         .header {
           background-color: #007BFF;
           padding: 20px;
           text-align: center;
           border-top-left-radius: 5px;
           border-top-right-radius: 5px;
         }
         .header h1 {
           color: #ffffff;
         }
         .content {
           padding: 20px;
         }
         .message {
           font-size: 18px;
           margin: 20px 0;
           color: #333;
         }
         .button {
           text-align: center;
           margin: 20px 0;
         }
         .button a {
           display: inline-block;
           padding: 10px 20px;
           background-color: #007BFF;
           color: #ffffff;
           text-decoration: none;
           border-radius: 5px;
         }
       </style>
     </head>
     <body>
       <div class="container">
         <div class="header">
           <h1>Password Reset</h1>
         </div>
         <div class="content">
           <p class="message">Hello there,</p>
           <p class="message">You've requested a password reset for your account. Click the button below to create a new password:</p>
           <div class="button">
             <a href="${url}">Reset Password</a>
           </div>
           <p class="message">If you didn't request this password reset, please ignore this email. Your account is secure.</p>
         </div>
       </div>
     </body>
     </html>
     `;
}

const changePasswordOTPEmailTemplate = (otp, message = 'We received a request to change your password', subject = 'Change Password') => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verification OTP</title>
      <style>
          body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
              text-align: center;
          }
  
          .container {
              max-width: 600px;
              margin: 30px auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
  
          .content {
              color: #333333;
              line-height: 1.6;
          }
  
          .otp-container {
              margin: 30px 0;
              padding: 20px;
              background-color: #f0f0f0;
              border-radius: 8px;
          }
  
          .otp {
              font-size: 24px;
              font-weight: bold;
              color: #333333;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="content">
              <h2>${subject} OTP</h2>
              <p>Dear User,</p>
              <p>${message}. Please use the following OTP to proceed:</p>
          </div>
          <div class="otp-container">
              <p class="otp">${otp}</p>
          </div>
          <div class="content">
              <p>If you didn't request this change, please ignore this email.</p>
              <p>Thank you!</p>
          </div>
      </div>
  </body>
  </html>
  `
}

module.exports = { forgotPasswordEmailTemplate, changePasswordOTPEmailTemplate };