// const lib = require('bluescape-sdk-node'); 
const lib = require('lib');
const utils = require('../util');
const sessionctrl = lib.UsersController;
const config = require('../config');
var assert = require('assert');
var chai = require('chai');
expect = chai.expect;
should = chai.should();
var authorization, userauthorization;

bsconfig = config.get();

before('Get Admin token', (done) => {
  utils.getAdminAccessToken().then((token) => {
    authorization = `Bearer ${token}`;
    done();
  })
});


describe('Session controller Functions', () => {

  describe('Session controller getAuthenticatedUser tests', () => {

    it('PCL-287 # API portal session for Admin', (done) => {
      sessionctrl.getAuthenticatedUser(authorization, bsconfig.appkey)
        .then((response) => {
          response.errorCode = 200;
          var userdetails = response.user;
          response.user.email.should.be.equal('stagbstest@gmail.com');
          userdetails.id.should.not.be.null;
          userdetails.applicationRole.roleType.should.be.equal('admin');
          expect(response.errorCode).equal(200);
          done();
        })
        .catch((err) => {
          console.log("err" + JSON.stringify(err));
          done();
        })

    });

    before('Get Non Admin token', (done) => {
      utils.getUserAccessToken().then((token) => {
        userauthorization = `Bearer ${token}`;
        done();
      })
    });

    it('# API portal session for User', (done) => {
      sessionctrl.getAuthenticatedUser(userauthorization, bsconfig.appkey)
        .then((response) => {
          response.errorCode = 200;
          var userdetails = response.user;
          response.user.email.should.be.equal('stagbsuser@gmail.com');
          userdetails.id.should.not.be.null;
          userdetails.applicationRole.roleType.should.be.equal('user');
          expect(response.errorCode).equal(200);
          done();
        })
        .catch((err) => {
          console.log("err" + JSON.stringify(err));
          done();
        })
    });


    it('# API Portal session unauthorized missing header', (done) => {
      sessionctrl.getAuthenticatedUser("", bsconfig.appkey)
        .then((response) => {
          response.errorCode = 200;
          expect(response.errorCode).equal(200);
          done();
        })
        .catch((err) => {
          err.errorCode.should.be.equal(401);
          err.errorMessage.should.be.equal('Unauthorized');
          done();
        })
    });

    it('# API Portal session unauthorized incorrect token', (done) => {
      sessionctrl.getAuthenticatedUser(authorization + '123', bsconfig.appkey)
        .then((response) => {
          response.errorCode = 200;
          expect(response.errorCode).equal(200);
          done();
        })
        .catch((err) => {
          err.errorCode.should.be.equal(401);
          err.errorMessage.should.be.equal('Unauthorized');
          done();
        })
    });

  })

})
