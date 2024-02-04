// Import necessary modules from AWS SDK for Cognito Identity Provider
const { AdminAddUserToGroupCommand, CognitoIdentityProviderClient } = require('@aws-sdk/client-cognito-identity-provider');

// Import dotenv for loading environment variables from a .env file
const dotenv = require('dotenv');
dotenv.config();


// Define an asynchronous function for user registration (sign-up)
const addUserToAGroup = async function ({username}) {
    // Create a Cognito Identity Provider Client with necessary configurations
    const client = new CognitoIdentityProviderClient({
        region: process.env.region, // Set the AWS region from environment variables
        credentials: {
            accessKeyId: process.env.accessKeyId,
            secretAccessKey: process.env.secretAccessKey,
        }
    });

    // Create a new SignUpCommand to register a new user
    const command = new AdminAddUserToGroupCommand({
        UserPoolId: process.env.UserPoolId, // Set the User Pool ID from environment variables
        Username: username, // Provide the username for the new user
        GroupName: 'user'
    });

    // Send the sign-up command to the Cognito service and return the result
    return client.send(command);
}

try {
    // Call the signUp function with the provided username and password
    addUserToAGroup({ username: 'maldonado.pe@hotmail.com'})
        .then(response => console.log(response)) // Log the response if registration is successful
        .catch(error => console.log(error)) // Log any errors that occur during registration
} catch (e) {
    console.error('Error ', e); //
}