const { AuthenticationDetails, CognitoUser, CognitoUserPool } = require('amazon-cognito-identity-js');
const dotenv = require('dotenv');
dotenv.config();

// Setting up user pool information
const poolData = {
    UserPoolId: process.env.UserPoolId,
    ClientId: process.env.ClientId,
}

// Creating user pool instance with user pool setup
const userPool = new CognitoUserPool(poolData);

// Setting up user information to auth
const authenticationData = {
    Username: '6b0fb780-59ae-4c81-a102-981843fcc9c2',
    Password: '@User1234'
}

// Creating user instance with user information
const authenticationDetails = new AuthenticationDetails(authenticationData);
 
// Setting the user inside the user pool instance
const userData = {
    Username: '6b0fb780-59ae-4c81-a102-981843fcc9c2',
    Pool: userPool,
}

// Creating an user instance with user settings
const cognitoUser = new CognitoUser(userData);

// User authentication
cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (session) => {
        console.log('auth succeded');
        console.log('Id Token', session.getIdToken().getJwtToken())
        console.log('Token for access', session.getAccessToken().getJwtToken())
        console.log('Token de Atualização:', session.getRefreshToken().getToken());
    },
    onFailure: (err) => {
        console.error('error', err)
    },
    newPasswordRequired: (userAttributes, requiredAttributes) => {
        console.log('nova senha necessaria')
    }
})