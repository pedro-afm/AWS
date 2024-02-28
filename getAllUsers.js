// Import necessary modules from AWS SDK for Cognito Identity Provider
const { ListUsersCommand, CognitoIdentityProviderClient } = require('@aws-sdk/client-cognito-identity-provider');

// Import dotenv for loading environment variables from a .env file
const dotenv = require('dotenv');
dotenv.config();


// Define an asynchronous function for user registration (sign-up)
const listAllUsers = async function () {
    // Create a Cognito Identity Provider Client with necessary configurations
    const client = new CognitoIdentityProviderClient({
        region: process.env.region, // Set the AWS region from environment variables
        credentials: {
            accessKeyId: process.env.accessKeyId,
            secretAccessKey: process.env.secretAccessKey,
        }
    });

    // Create a new SignUpCommand to register a new user
    const command = new ListUsersCommand({
        UserPoolId: process.env.UserPoolId, // Set the User Pool ID from environment variables
    });

    // Send the sign-up command to the Cognito service and return the result
    const response = await client.send(command);
    const users = response.Users.map((user) => {
        const created = user.UserCreateDate;
        const emailAttribute = user.Attributes.find((Attribute) => Attribute.Name === 'email');
        const emailValue = emailAttribute ? emailAttribute.Value : null;
        const roleAttribute = user.Attributes.find((Attribute) => Attribute.Name === 'custom:role');
        const roleValue = roleAttribute ? roleAttribute.Value : null;
        
        return {
            email: emailValue,
            role: roleValue,
            created,
        };
    });

    return users;
}

try {
    // Call the signUp function with the provided username and password
    listAllUsers()
        .then((response) => {
            const users = response
            console.log(users);
        }) // Log the response if registration is successful
        .catch(error => console.log(error)) // Log any errors that occur during registration
} catch (e) {
    console.error('Error ', e); //
}