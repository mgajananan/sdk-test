
const AuthLib = require('bluescape-auth-library');
const bsconfig = require('../config');

const credentials = {
    client: {
        id: bsconfig.portalClientId,
        redirectUri: bsconfig.redirectUriPortal
    }
};

const authLib = new AuthLib(credentials);
const options = {
    user: {
        email: bsconfig.adminemail,
        password: bsconfig.adminpwd
    }
    //   responseUrl: 'https://www.client.com/oauth/callback#?access_token=XXX'
};

const authorizeURL = authLib.implicit.authorizeURL();
console.log(authorizeURL);

authLib.implicit.getToken(options, (error, accessToken) => {
    if (error) {
        return console.log('Implicit OAUTH Access Token Error', error.message);
    }
    console.log(accessToken);
    return accessToken;
});


authLib.implicit
    .getToken(options)
    .then((accessToken) => {
        console.log(accessToken);
        return accessToken;
    })
    .catch((error) => {
        console.log('Implicit OAUTH Access Token error', error.message);
    });
