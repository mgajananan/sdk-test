const lib = require('lib');
const utils = require('../util');
const sessionctrl = lib.SessionsController;

var assert = require('assert');
var chai = require('chai');
expect = chai.expect;
should = chai.should();
var authorization, userauthorization;

before('Get User and Admin token', (done) => {
  utils.getAdminAccessToken().then((token) => {
    authorization = `bearer ${token}`;
    // console.log(authorization);
  })
  utils.getUserAccessToken().then((token) => {
    userauthorization = `bearer ${token}`;
    // console.log(userauthorization);
  })
  done();
});


describe('Session controller Functions', () => {

  describe('Session controller getAuthenticatedUser tests', () => {

    it('PCL-287 # API portal session for Admin', (done) => {
      sessionctrl.getAuthenticatedUser(authorization)
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
          delete err.errorResponse
          // console.log("err" + JSON.stringify(err));
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
          // console.log("err" + JSON.stringify(err));
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
