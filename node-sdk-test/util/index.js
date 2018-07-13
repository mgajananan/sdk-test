/* eslint-env jest */

let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const url = require('url');
const config = require('../config');
const utils = require('../util');

const queryString = require('querystring');
const crypto = require('crypto');
const constants = require('constants');
expect = chai.expect;

bsconfig = config.get();


module.exports.getAdminAccessToken = () => new Promise((resolve, reject) => {
  return new Promise((resolve, reject) => {
    chai.request(bsconfig.endPointIdentity)
      .post('/api/authenticate')
      .set('content-type', 'application/json')
      .send(JSON.stringify({
        email: bsconfig.adminuser.email,
        password: bsconfig.adminuser.password,
      }))
      .end(function (error, response) {
        if (error) {
          console.log('Auth Error::' + error);
          return reject(error);
          // done(error);
        } else {
          // console.log('Auth::' + JSON.stringify(response));
          // console.log('token::' + response.headers['set-cookie']);
          // var token = JSON.stringify(response.headers['set-cookie']).split(';')[0].split('=')[1];
          // console.log('token::' + token);
          return resolve(response.headers['set-cookie']);
        }
      });
  })
    .then((cookies) => {
      return new Promise((resolve, reject) => {
        chai.request(bsconfig.endPointIdentity)
          .get('/oauth2/authorize')
          .query({
            response_type: 'id_token token',
            client_id: bsconfig.portalClientId,//'ab5ce3b6f0ab419a7390e5e548c51d0e691245da' , //portalClientId,
            redirect_uri: bsconfig.redirectUriPortal,//'http://localhost:9400/oauth/callback', //redirectUriPortal,
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
              // console.log('Auth----' + JSON.stringify(response));
              // console.log('token----' + queryData['#access_token']);
              return resolve(queryData['#access_token']);
            }
            //  console.log(response);
            return 'Invalid Header location';
          });
      });
    })
    .then(token => resolve(token))
    .catch(error => reject(error));
});


module.exports.getUserAccessToken = () => new Promise((resolve, reject) => {
  return new Promise((resolve, reject) => {
    chai.request(bsconfig.endPointIdentity)
      .post('/api/authenticate')
      .set('content-type', 'application/json')
      .send(JSON.stringify({
        email: bsconfig.nonadminuser.email,
        password: bsconfig.nonadminuser.password,
      }))
      .end(function (error, response) {
        if (error) {
          console.log('Auth Error::' + error);
          return reject(error);
          // done(error);
        } else {
          // console.log('Auth::' + JSON.stringify(response));
          // console.log('token::' + response.headers['set-cookie']);
          // var token = JSON.stringify(response.headers['set-cookie']).split(';')[0].split('=')[1];
          // console.log('token::' + token);
          return resolve(response.headers['set-cookie']);
        }
      });
  })
    .then((cookies) => {
      return new Promise((resolve, reject) => {
        chai.request(bsconfig.endPointIdentity)
          .get('/oauth2/authorize')
          .query({
            response_type: 'id_token token',
            client_id: bsconfig.portalClientId,//'ab5ce3b6f0ab419a7390e5e548c51d0e691245da' , //portalClientId,
            redirect_uri: bsconfig.redirectUriPortal,//'http://localhost:9400/oauth/callback', //redirectUriPortal,
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
              // console.log('Auth----' + JSON.stringify(response));
              // console.log('token----' + queryData['#access_token']);
              return resolve(queryData['#access_token']);
            }
            //  console.log(response);
            return 'Invalid Header location';
          });
      });
    })
    .then(token => resolve(token))
    .catch(error => reject(error));
});
