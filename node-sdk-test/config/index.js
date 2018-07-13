var convict = require('convict');


var config = convict({

    env: {
        doc: 'Application Environment',
        format: ['production', 'development', 'acceptance', 'staging', 'testing'],
        default: 'development',
        env: 'NODE_ENV',
    },

    appkey: {
        default: '2c22e8de82e9ae83b1cbabe881e7e42e'
    }
});


config.loadFile(`${__dirname}/env/${config.get('env')}.json`);
module.exports = config;







//     stg: {
//     redirectUriIdentity: 'https://identity.apps.stg.bluescape.com',
//         redirectUriPortal: 'http://localhost:9400/oauth/callback',
//             endPointPortal: 'https://portal-api.apps.stg.bluescape.com/api',
//                 endPointCollab: 'https://collab.apps.stg.bluescape.com/api/workspaces',
//                     endPointIdentity: 'https://identity-api.apps.stg.bluescape.com',
//                         identityClientId: 'a177d900920ce8f9ee8e03126c36645cbcf2b79d',
//                             portalClientId: 'ab5ce3b6f0ab419a7390e5e548c51d0e691245da'
// },

// uat: {
//     endPointIdentity: 'https://identity-api.uat.bluescape.com',
//         redirectUriIdentity: 'https://identity.uat.bluescape.com',
//             redirectUriPortal: 'https://portal.uat.bluescape.com',
//                 endPointPortal: 'https://portal-api.uat.bluescape.com/api',
//                     endPointCollab: 'https://collab.uat.bluescape.com/api/workspaces',
//                         identityClientId: 'a177d900920ce8f9ee8e03126c36645cbcf2b79d',
//                             portalClientId: '97a3fd88f3fe833197b0dcd2b71f5e0451a06ecc',
//     },

// dev: {
//     redirectUriIdentity: 'https://identity.apps.dev2.bluescape.com',
//         redirectUriPortal: 'https://portal.apps.dev2.bluescape.com',
//             endPointPortal: 'https://portal-api.apps.dev2.bluescape.com/api',
//                 endPointCollab: 'https://collab.apps.dev2.bluescape.com/api/workspaces',
//                     endPointIdentity: 'https://identity-api.apps.dev2.bluescape.com',
//                         identityClientId: 'a177d900920ce8f9ee8e03126c36645cbcf2b79d',
//                             portalClientId: '97a3fd88f3fe833197b0dcd2b71f5e0451a06ecc',
//     },

// prod: {
//     redirectUriIdentity: 'https://identity.apps.us.bluescape.com',
//         redirectUriPortal: 'https://portal.apps.us.bluescape.com',
//             endPointPortal: 'https://portal-api.apps.us.bluescape.com/api',
//                 endPointCollab: 'https://collab.apps.us.bluescape.com/api/workspaces',
//                     endPointIdentity: 'https://identity-api.apps.us.bluescape.com',
//                         identityClientId: 'a177d900920ce8f9ee8e03126c36645cbcf2b79d',
//                             portalClientId: '97a3fd88f3fe833197b0dcd2b71f5e0451a06ecc',
//     },
// adminemail: 'stagbstest@gmail.com',
//     adminpwd: 'Blue_1234',
//         adminuserid: 6581,
//             workspaceid: 850066,

//                 useremail: 'stagbsuser@gmail.com',
//                     userpwd: 'Blue_1234',

//                         credentials: {
//     client: {
//         id: '97a3fd88f3fe833197b0dcd2b71f5e0451a06ecc',
//             redirectUri: 'https://portal.apps.stg.bluescape.com'
//     },
//     oauth: {
//         host: 'https://identity-api.apps.stg.bluescape.com',
//             clientHost: 'https://identity.apps.stg.bluescape.com'
//     }
// },

// adminoptions: {
//     user: {
//         email: 'stagbstest@gmail.com',
//             password: 'Blue_1234'
//     },
//     responseUrl: 'https://portal.apps.stg.bluescape.com/oauth/callback'
// }


// });
