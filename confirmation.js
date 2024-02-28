// Import necessary modules from AWS SDK for Cognito Identity Provider
const {
    AdminConfirmSignUpCommand,
    CognitoIdentityProviderClient,
} = require('@aws-sdk/client-cognito-identity-provider');

// Import dotenv for loading environment variables from a .env file
const dotenv = require('dotenv');
dotenv.config();

// Retrieve the Client ID from environment variables
const clientId = process.env.ClientId;

// Define an asynchronous function for confirming user sign-up
const confirmSignUp = async function ({ clientId, username }) {
    // Create a Cognito Identity Provider Client with necessary configurations
    const client = new CognitoIdentityProviderClient({
        region: process.env.region, // Set the AWS region from environment variables
        credentials: {
            accessKeyId: process.env.accessKeyId,
            secretAccessKey: process.env.secretAccessKey,
        }
    });

    // Create a new AdminConfirmSignUpCommand to confirm user sign-up
    const command = new AdminConfirmSignUpCommand({
        ClientId: clientId, // Provide the Client ID
        Username: username, // Provide the username of the user to confirm
        UserPoolId: process.env.UserPoolId
    });

    // Send the confirmation command to the Cognito service and return the result
    return client.send(command);
}

try {
    // Call the confirmSignUp function with the provided Client ID and username
    confirmSignUp({ clientId: clientId, username: 'maldonado.paf@gmail.com' })
        .then(response => console.log(response)) // Log the response if confirmation is successful
        .catch(error => console.log(error)) // Log any errors that occur during confirmation
} catch (e) {
    console.error('Error: ', e); // Log any unhandled exceptions
}
