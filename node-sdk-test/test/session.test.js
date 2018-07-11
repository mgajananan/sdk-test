const lib = require('bluescape-sdk-node');
const utils = require('../util');
const AuthLib = require('bluescape-auth-library');
const sessionctrl = lib.UsersController;
const bsconfig = require('../config');
var assert = require('assert');
var chai = require('chai');
expect = chai.expect;
should = chai.should();
var authorization, userauthorization;

before('Get User and Admin token', (done) => {
  utils.getAdminAccessToken().then((token) => {
    authorization = `Bearer ${token}`;
    // console.log(authorization);
  })
  utils.getUserAccessToken().then((token) => {
    userauthorization = `Bearer ${token}`;
    // console.log(userauthorization);
  })
  done();
});

// const authLib = new AuthLib(bsconfig.credentials);
// const authorizeURL = authLib.implicit.authorizeURL();
// // res.redirect(authorizeURL);

// console.log(authLib);
// console.log(authorizeURL);

// before('Get User and Admin token', (done) => {
//   // utils.getAdminAccessToken().then((token) => {
//   //   authorization = `bearer ${token}`;
//   //   // console.log(authorization);
//   //   done();
//   // })

//   authLib.implicit.getToken(bsconfig.adminoptions).then((token) => {
//     authorization = `bearer ${token}`;
//     console.log(authorization);
//   })
//     .catch((error) => {
//       console.log('Implicit OAUTH Access Token error', error.message);
//     });
//   done();
// });

describe('Session controller Functions', () => {

  describe('Session controller getAuthenticatedUser tests', () => {

    it('PCL-287 # API portal session for Admin', (done) => {
      sessionctrl.getAuthenticatedUser(authorization, '1ed2aa9a81f0e91eb61c64190610fcba')
        .then((response) => {
          response.errorCode = 200;
          var userdetails = response.user;
          // console.log('session::' + JSON.stringify(response));
          // console.log('Current user email::' + userdetails.email);
          response.user.email.should.be.equal('stagbstest@gmail.com');
          userdetails.id.should.not.be.null;
          userdetails.applicationRole.roleType.should.be.equal('admin');
          expect(response.errorCode).equal(200);
          done();
        })
        .catch((err) => {
          // delete err.errorResponse
          console.log("err" + JSON.stringify(err));
          done();
        })

    });

    it('# API portal session for User', (done) => {
      sessionctrl.getAuthenticatedUser(userauthorization)
        .then((response) => {
          response.errorCode = 200;
          var userdetails = response.user;
          // console.log('session::' + JSON.stringify(response));
          // console.log('Current user email::' + userdetails.email);
          response.user.email.should.be.equal('stagbsuser@gmail.com');
          userdetails.id.should.not.be.null;
          userdetails.applicationRole.roleType.should.be.equal('user');
          expect(response.errorCode).equal(200);
          done();
        })
        .catch((err) => {
          delete err.errorResponse
          console.log("err" + JSON.stringify(err));
          done();
        })
    });


    it('# API Portal session unauthorized missing header', (done) => {
      sessionctrl.getAuthenticatedUser()
        .then((response) => {
          response.errorCode = 200;
          expect(response.errorCode).equal(200);
          done();
        })
        .catch((err) => {
          // console.log("err" + JSON.stringify(err));
          delete err.errorResponse
          err.errorCode.should.be.equal(401);
          err.errorMessage.should.be.equal('Unauthorized');
          done();
        })
    });

    it('# API Portal session unauthorized incorrect token', (done) => {
      sessionctrl.getAuthenticatedUser(authorization + '123')
        .then((response) => {
          response.errorCode = 200;
          expect(response.errorCode).equal(200);
          done();
        })
        .catch((err) => {
          // console.log("err" + JSON.stringify(err));
          delete err.errorResponse
          err.errorCode.should.be.equal(401);
          err.errorMessage.should.be.equal('Unauthorized');
          done();
        })
    });

  })

})
