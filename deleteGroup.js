// Import necessary modules from AWS SDK for Cognito Identity Provider
const { DeleteGroupCommand, CognitoIdentityProviderClient } = require('@aws-sdk/client-cognito-identity-provider');

// Import dotenv for loading environment variables from a .env file
const dotenv = require('dotenv');
dotenv.config();

// Define an asynchronous function for user registration (sign-up)
const getUser = async function () {
    // Create a Cognito Identity Provider Client with necessary configurations
    const client = new CognitoIdentityProviderClient({
        region: process.env.region, // Set the AWS region from environment variables
        credentials: {
            accessKeyId: process.env.accessKeyId,
            secretAccessKey: process.env.secretAccessKey,
        }
    });

    // Create a new SignUpCommand to register a new user
    const command = new DeleteGroupCommand({
        UserPoolId: process.env.UserPoolId, // Set the User Pool ID from environment variables
        GroupName: 'algum'
    });

    // Send the sign-up command to the Cognito service and return the result
    const loggedUser = client.send(command);
    return loggedUser;
}

try {
    // Call the signUp function with the provided username and password
    getUser()
        .then((response) => {
            console.log(response)
        }) // Log the response if registration is successful
        .catch(error => console.log(error)) // Log any errors that occur during registration
} catch (e) {
    console.error('Error ', e); //
}