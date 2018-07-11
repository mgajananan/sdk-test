/* eslint-env jest */

let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const url = require('url');
const bsconfig = require('../config');
const utils = require('../util');

const queryString = require('querystring');
const crypto = require('crypto');
const constants = require('constants');
expect = chai.expect;



// const getEncryptText = () => new Promise((resolve, reject) => {
//   return request(`${config.get('services.identity_api')}`)
//     .post('/api/wall/authenticate')
//     .set('content-type', 'application/json')
//     .send({ wall_uid: 'XqNmACo_9gHoVyW3CQz6' })
//     .expect(200, (error, response) => {
//       if (error) {
//         return reject(error);
//       }
//       return resolve(response.body.challenge);
//     });
// });

// const decryptStringWithRsaPrivateKey = (encryptText, privateKey) => new Promise((resolve, reject) => {
//   try {
//     const buffer = new Buffer(encryptText, 'base64');
//     const options = { key: privateKey, padding: constants.RSA_PKCS1_PADDING };
//     const decrypted = crypto.privateDecrypt(options, buffer).toString('utf8');
//     return resolve(decrypted);
//   } catch (ex) {
//     return reject(ex);
//   }
// });

const env = bsconfig.stg;

const endPointIdentity = env.endPointIdentity;
const redirectUriIdentity = env.redirectUriIdentity;
const redirectUriPortal = env.redirectUriPortal;
const endPointPortal = env.endPointPortal;
const endPointCollab = env.endPointCollab;
const identityClientId = env.identityClientId;
const portalClientId = env.portalClientId;



module.exports.getAdminAccessToken = () => new Promise((resolve, reject) => {
  return new Promise((resolve, reject) => {
    chai.request(endPointIdentity)
      .post('/api/authenticate')
      .set('content-type', 'application/json')
      .send(JSON.stringify({
        email: bsconfig.useremail,
        password: bsconfig.userpwd,
      }))
      .end(function (error, response) {
        if (error) {
          console.log('Auth Error::' + error);
          return reject(error);
          // done(error);
        } else {
          console.log('Auth::' + JSON.stringify(response));
          console.log('token::' + response.headers['set-cookie']);
          // var token = JSON.stringify(response.headers['set-cookie']).split(';')[0].split('=')[1];
          // console.log('token::' + token);
          return resolve(response.headers['set-cookie']);
        }
      });
    // .expect(200, (error, response) => {
    //   if (error) {
    //     console.log(error)
    //     return reject(error);
    //   }
    //   console.log(response)
    //   return resolve(response.headers['set-cookie']);
    // });
  })
    .then((cookies) => {
      return new Promise((resolve, reject) => {
        chai.request(endPointIdentity)
          .get('/oauth2/authorize')
          .query({
            response_type: 'id_token token',
            client_id: 'ab5ce3b6f0ab419a7390e5e548c51d0e691245da' , //portalClientId,
            redirect_uri: 'http://localhost:9400/oauth/callback', //redirectUriPortal,
            nonce: 'nonce',
          })
          .redirects(0)
          .set('Cookie', cookies)
          .end(function (error, response) {
            if (error) {
              console.log('Auth Error::' + error);
              return reject(error);
            } else if (response.headers.location) {
              const queryData = queryString.parse(url.parse(response.headers.location).hash);
              console.log('Auth----' + JSON.stringify(response));
              console.log('token----' + queryData['#access_token']);
              return resolve(queryData['#access_token']);
            }
            // .expect(302, (error, response) => {
            //   if (error) {
            //     console.log('Auth Error::' + error);
            //     return reject(error);
            //   } else if (response.headers.location) {
            //     const queryData = queryString.parse(url.parse(response.headers.location).hash);
            //     console.log('Auth::' + JSON.stringify(response));
            //     console.log('token::' + queryData['#access_token']);
            //     return resolve(queryData['#access_token']);
            //   }
           console.log(response);
            return 'Invalid Header location';
          });
      });
    })
    .then(token => resolve(token))
    .catch(error => reject(error));
});

// module.exports.getCollabApiAccessToken = () => new Promise((resolve, reject) => {
//   request(`${config.get('services.identity_api')}`)
//   .post('/oauth2/token')
//   .set('content-type', 'application/json')
//   .auth(config.get('oauth2.clients.collabApi.id'), 'eaa349b81466009f0b9cf3013c001e487f3387a9')
//   .send({ grant_type: 'client_credentials' })
//   .expect(200, (error, response) => {
//     if (error) {
//       return reject(error);
//     }
//     return resolve(response.body.access_token);
//   });
// });

// module.exports.getIdentityApiAccessToken = () => new Promise((resolve, reject) => {
//   request(`${config.get('services.identity_api')}`)
//   .post('/oauth2/token')
//   .set('content-type', 'application/json')
//   .auth(config.get('oauth2.clients.identityApi.id'), '3ed04573a538c4f87cf4ec25ca673002323e2527')
//   .send({ grant_type: 'client_credentials' })
//   .expect(200, (error, response) => {
//     if (error) {
//       return reject(error);
//     }
//     return resolve(response.body.access_token);
//   });
// });

// module.exports.authenticateWallAccessToken = () => new Promise((resolve, reject) => {
//   const privateKeyForWall = `-----BEGIN RSA PRIVATE KEY-----
// MIIEogIBAAKCAQEAq9k7Ijv1vDI7v7L2m2AY17o/QoHyDRk/zCVzY2kAM+KS2nCK+fDqBq1H7d0lUCBD4dRFjDyWGxFbmWMYbERkTBXFaP2EfsTFf39bzRJh0qURXvQ6sEU6Ou0dfT9BdNolmSCX6wq6oj7JBFQxK5tDYuCGA+4/+FmGPUNXPN+5BbDTGZPKvWrPqf1DSQppNky+uKszUOvKWBP1dGy1NAY4qhrJ46AGH8fP+ohfZYddaZY5V110LVBZ1k/xQyzg0xQmOsyI0OkrxFA9pFjTlkMIhDwpZ76SqfnTqXJ7er+v60EH93Lb5ivKfcOle3EVvaYEEf+MYc3fSNmuQjSrQKVRnQIDAQABAoIBAAxI6jZHTQjYGndYxtJSq1P4p38MpQ4UqP/iCX6oye/rmY3uD7FQbJpvlr3FWl6A//lL4HDm/+ANfJvZfqx2syjRQZyAyxD45hl4NErTrpSNYlGEahGh0UjXHI2QkRBWa+unbdTKno7sqBgcIKu6XLXb0RjE1mPdmoAUqU7bu3FRla5wl0KA57/OQBwRAVF90am/8ls5W/37V5d6xiP5qu+wSA6fDKA0RSjtWjS9l07acrAWPFk0AygmnFqJ8olj0bNyBfxl/BLcOBpsI4V+sb5WPLECLos/dZcjvvVQuxR5zFQZTKBXUtBph4eZvjYJ7C6BppItkukTKtAHcsDEsoECgYEA3N5OiJnb1FcPTvsJkYOWip4peExdrURivniFo0dJsxYWuqgq2J13AtiDvRHCW2FpG2aTTHHGOdsyC25PSRkRc4065xSNTEYlnKHLEzim+TIV91Mpd74Bg2Pzic9XL3JK/MWz6r0EKSUVOSrxhTVt8gyU6YqD8Dq+gjO4F9bUDuECgYEAxy7aEPSckur/4bV9aAlQA37MCduIvy641Vj+UFcUxjNlZELiHxHP/TUdbzs/BZ0zGRpSduKy0FugyyhlwfJh01b5wbu0bDSoCRGfL3lNMp5EaU9+c/cr56ctoXN4p4fUnPxvZcmWfcnhvE3OUI7E0T8S0keuMqrDCjjf+37Uhj0CgYAXxQD0qIJE9t2Z5WBhPaUc4+qYnLdUJ1DtKLFRIiHnWRA3JFQAHeop7z02QswE45XZMg/WIURxA4r+Oe/kcQM0yVU2ezq9o6r2kV72gZlOpjpA9L04usUU69PQ1/SNEaLKU0iKka758pi3H00AxgBAFWSNQa/zUY8hGgnM3vzRYQKBgDPKsfcws7ncEzcMaxRvP3f5M3Lou7ECpBsNresUCZnT6Wxdm9B6YDu14PZ4UFXUX2IKnyC8p8RX3wKUeYkpzlgWyJCgjzSHqJ3bECpW/0THNICxo+7heXAd31aY4Omm/xjm5sxv04rXwLOnA5uc0/6YyPsWmmwgTODOkycg/n/9AoGADZE7hnLS7Fy5An8ZPnqeSBCSANm3OtahrCwQLcBr15Ua2P5sK/HS9fQ3FDs+MuC5Kct07ZHRZJJaAIb0daFFguE5JgC2gR7GY8UsYUm3Fpdp7Tb/dvSYdNRX2JmyKwJXzM8vv5C2qYjBz1rV7dVeN3A7VRfswJgIq9P2otblA2A=
// -----END RSA PRIVATE KEY-----`;
//   return getEncryptText()
//     .then((challenge) => {
//       return decryptStringWithRsaPrivateKey(challenge, privateKeyForWall);
//     })
//     .then((decrypted) => {
//       request(`${config.get('services.identity_api')}`)
//         .post('/api/wall/authorize')
//         .set('content-type', 'application/json')
//         .send({ wall_uid: 'XqNmACo_9gHoVyW3CQz6', answer: decrypted })
//         .expect(200, (error, response) => {
//           if (error) {
//             return reject(error);
//           }
//           return resolve(response.body.access_token);
//         });
//     })
//     .catch((error) => {
//       return reject(error);
//     });
// });

// module.exports.getAdminAccessToken = () => new Promise((resolve, reject) => {
//   return new Promise((resolve, reject) => {
//     chai.request(endPointIdentity)
//       .post('/api/authenticate')
//       .set('content-type', 'application/json')
//       .send(JSON.stringify({
//         email: bsconfig.adminemail,
//         password: bsconfig.adminpwd,
//       }))
//       .end(function (error, response, body) {
//         if (error) {
//           console.log('Auth Error::' + error);
//         } else {
//           var token = JSON.stringify(response.headers['set-cookie']).split(';')[0].split('=')[1];
//           return resolve(token);
//         }
//       });
//   })
//     .then(token => resolve(token))
//     .catch(error => reject(error));
// });









// const AuthLib = require('bluescape-auth-library');
// // const bsconfig = require('../config');

// const credentials = {
//   client: {
//     id: bsconfig.portalClientId,
//     redirectUri : bsconfig.redirectUriPortal
//   }
// };

// const authLib = new AuthLib(credentials);
// const options = {
//     user: {
//         email: bsconfig.adminemail,
//         password: bsconfig.adminpwd
//     }
//     //   responseUrl: 'https://www.client.com/oauth/callback#?access_token=XXX'
// };

// const authorizeURL = authLib.implicit.authorizeURL();
// console.log(authorizeURL);

// module.exports.authLib.implicit.getToken(options, (error, accessToken) => {
//     if (error) {
//         return console.log('Implicit OAUTH Access Token Error', error.message);
//     }
//     console.log(accessToken);
//     return accessToken;
// });


// authLib.implicit
//     .getToken(options)
//     .then((accessToken) => {
//         console.log(accessToken);
//         return accessToken;
//     })
//     .catch((error) => {
//         console.log('Implicit OAUTH Access Token error', error.message);
//     });