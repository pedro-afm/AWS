// Import necessary modules from AWS SDK for Cognito Identity Provider
const { SignUpCommand, CognitoIdentityProviderClient } = require('@aws-sdk/client-cognito-identity-provider');

// Import dotenv for loading environment variables from a .env file
const dotenv = require('dotenv');
dotenv.config();


// Define an asynchronous function for user registration (sign-up)
const signUp = async function ({username, password}) {
    // Create a Cognito Identity Provider Client with necessary configurations
    const client = new CognitoIdentityProviderClient({
        region: process.env.region, // Set the AWS region from environment variables
        userPoolId: process.env.userPoolId // Set the User Pool ID from environment variables
    });

    const usersAttributes = [{
        Name: 'custom:role_id', Value: '1'
    }]
    // Create a new SignUpCommand to register a new user
    const command = new SignUpCommand({
        ClientId: process.env.ClientId, // Set the Client ID from environment variables
        Username: username, // Provide the username for the new user
        Password: password, // Provide the password for the new user
        UserAttributes: usersAttributes
    });

    // Send the sign-up command to the Cognito service and return the result
    return client.send(command);
}

try {
    // Call the signUp function with the provided username and password
    signUp({ username: 'willian@gmail.com', password: '@Usuario123' })
        .then(response => console.log(response)) // Log the response if registration is successful
        .catch(error => console.log(error)) // Log any errors that occur during registration
} catch (e) {
    console.error('Error ', e); //
}