// Import necessary modules from AWS SDK for Cognito Identity Provider
const { AuthFlowType, CognitoIdentityProviderClient, InitiateAuthCommand } = require('@aws-sdk/client-cognito-identity-provider');

// Import dotenv for loading environment variables from a .env file
const dotenv = require('dotenv');
dotenv.config();

// Retrieve values from environment variables
const username = process.env.userIdentifier; // Get the username from environment variables
const password = process.env.PASSWORD; // Get the password from environment variables

console.log(`${username} e ${password}`)

// Define an asynchronous function for initiating authentication
const initiateAuth = async function ({username, password}) {
    // Create a Cognito Identity Provider Client with necessary configurations
    const client = new CognitoIdentityProviderClient({
        region: process.env.region, // Set the AWS region from environment variables
        userPoolId: process.env.userPoolId // Set the User Pool ID from environment variables
    });

    // Create a new InitiateAuthCommand to initiate authentication
    const command = new InitiateAuthCommand({
        AuthFlow: AuthFlowType.USER_PASSWORD_AUTH, // Specify the authentication flow type
        AuthParameters: {
            USERNAME: 'admin@example.com', // Provide the username
            PASSWORD: '@Pass123.' // Provide the password
        },
       ClientId: process.env.ClientId // Set the Client ID from environment variables
    });

    // Send the authentication command to the Cognito service and return the result
    return client.send(command);
}

try {
    // Call the initiateAuth function with the provided username and password
    initiateAuth({ username, password })
        .then((response) => {
            console.log(response); // Log the response if authentication is successful
        })
        .catch((error) => {
            console.error('Error:', error); // Log any errors that occur during authentication
        });
} catch (e) {
    console.error('Error:', e); // Log any unhandled exceptions
}
