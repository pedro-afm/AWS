// Import necessary modules from AWS SDK for Cognito Identity Provider
const { AdminRespondToAuthChallengeCommand, CognitoIdentityProviderClient } = require('@aws-sdk/client-cognito-identity-provider');

// Import dotenv for loading environment variables from a .env file
const dotenv = require('dotenv');
dotenv.config();


// Define an asynchronous function for user registration (sign-up)
const adminRespondAuthChallenge = async function ({username}) {
    // Create a Cognito Identity Provider Client with necessary configurations
    const client = new CognitoIdentityProviderClient({
        region: process.env.region, // Set the AWS region from environment variables
        credentials: {
            accessKeyId: process.env.accessKeyId,
            secretAccessKey: process.env.secretAccessKey,
        }
    });

    // Create a new SignUpCommand to register a new user
    const command = new AdminRespondToAuthChallengeCommand({
        UserPoolId: process.env.UserPoolId, // Set the User Pool ID from environment variables
        ChallengeName: 'NEW_PASSWORD_REQUIRED',
        ChallengeResponses: {
            NEW_PASSWORD: '@Pass123.',
            USERNAME: 'admin@example.com'
        },
        ClientId: process.env.ClientId,
        Session: 'AYABeN32yNCee1skQI_dx_mR4jIAHQABAAdTZXJ2aWNlABBDb2duaXRvVXNlclBvb2xzAAEAB2F3cy1rbXMATGFybjphd3M6a21zOmV1LW5vcnRoLTE6MDMwNTAxNjE1ODI4OmtleS84OGZmZjA2Yy1lZTczLTQxMWUtODEyMi0xNmViYTQxODgzYzIAuAECAQB4a7Jv4zDlBiEvZCRlR9c6unSJ8rPRW5d1TcxKd9WP66kBelSYxsx3qU0crSj4fsYNMgAAAH4wfAYJKoZIhvcNAQcGoG8wbQIBADBoBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDMiGs1UIcwr6GZZQFgIBEIA7U27Czne7gg7pq14wcvjCK-kA9Q_HlY4gq93QJczk9lXUcMPe8OaNZLe82kEKF08DaTBZfoFpA5wcyV8CAAAAAAwAABAAAAAAAAAAAAAAAAAAA2yCyU94UP968lQk4zgjS_____8AAAABAAAAAAAAAAAAAAABAAAA1T3TF8gMSy-Xj4o6e0NtytpGM6CAMCmbT-EVwxt2RsE0_jfsAvx5T7fNGxGx85HAGTK3VqrPoKzKPViIIhoUSGTKsIGjlNZlWt-SN6FsPbFluqvVUsaP5-aVAhQ6YIPY2qV7DVbpitHD6Emekwro4WVwzMOGqYZaVf5ZjIU6myTakf5ca0n4QX1g_IQmbGW_oUXiELixl6EV5On6H1iJGKYKSp1x_Tz6UQ_-T_zCG3WQcpulZICbxrF8zWf37IRH6Z_wdHL8AZGgn5sricINUsShOBBKw4Xd9oK1I1120n4NG55_RUM'
    });

    // Send the sign-up command to the Cognito service and return the result
    return client.send(command);
}

try {
    // Call the signUp function with the provided username and password
    adminRespondAuthChallenge({ username: 'maldonado.pe@hotmail.com'})
        .then(response => console.log(response)) // Log the response if registration is successful
        .catch(error => console.log(error)) // Log any errors that occur during registration
} catch (e) {
    console.error('Error ', e); //
}