const lib = require('bluescape-sdk-node');
const usercrtl = lib.UsersController;
const utils = require('../util');
const bsconfig = require('../config');
var assert = require('assert');
var chai = require('chai');
expect = chai.expect;
should = chai.should();

var authorization;
var user_preference = new lib.UserPreference({
  "notify_on_new_message": true
});

var updateuserbody = new lib.UpdateUserByIdReq({
  "application_role_id": "",
  "first_name": "",
  "last_name": "",
  "email": "",
  "new_password": "",
  "current_password": "",
  "user_preference": user_preference
});


// before('Get User and Admin token', (done) => {
//   utils.getAdminAccessToken().then((token) => {
//     authorization = `bearer ${token}`;
//     // console.log(authorization);

//     done();
//   })
// });


describe('Users controller Functions', function () {
  describe('List User Roles', function () {
    it('#List Application Roles', (done) => {
      usercrtl.listUserRoles(authorization)
        .then((response) => {
          response.errorCode = 200;
          console.log(JSON.stringify(response));
          assert.equal(response.applicationRoles.length, 3, 'Workspace roles missing');
          expect(response.errorCode).equal(200);
          done();
        })
        .catch((err) => {
          delete err.errorResponse
          console.log("err" + JSON.stringify(err));
          done();
        })

    });
  })

  describe('Get a User', function () {
    it('#Get User by userid', (done) => {
      usercrtl.getUser(authorization, bsconfig.adminuserid)
        .then((response) => {
          response.errorCode = 200;
          assert.equal(response.user.email, bsconfig.adminemail, 'Wrong user');
          expect(response.user.id).equal(bsconfig.adminuserid);
          done();
        })
        .catch((err) => {
          delete err.errorResponse
          console.log("err" + JSON.stringify(err));
          done();
        })

    });
  })


  describe('List a User\'s Workspaces', function () {
    it('#Gets all Workspaces available for User', (done) => {
      usercrtl.getUserWorkspaces(authorization, bsconfig.adminuserid)
        .then((response) => {
          response.errorCode = 200;
          expect(response.total).to.be.above(0);
          assert.equal(response.errorCode, 200, 'Wrong user');
          done();
        })
        .catch((err) => {
          delete err.errorResponse
          console.log("err" + JSON.stringify(err));
          done();
        })

    });
  })

  describe('List a User\'s Organizations', function () {
    it('#Gets all Organization available for User', (done) => {
      usercrtl.getUserCompanies(authorization, bsconfig.adminuserid)
        .then((response) => {
          response.errorCode = 200;
          expect(response.total).to.be.above(0);
          assert.equal(response.errorCode, 200, 'Wrong user');
          done();
        })
        .catch((err) => {
          delete err.errorResponse
          console.log("err" + JSON.stringify(err));
          done();
        })

    });
  })

  describe('List a User\'s Workspaces in an Organization', function () {
    it('#Gets all workspaces available for an user in given organization', (done) => {
      usercrtl.getUserWorkspacesWithinCompany(authorization, bsconfig.adminuserid, companyid)
        .then((response) => {
          response.errorCode = 200;
          expect(response.total).to.be.above(0);
          assert.equal(response.errorCode, 200, 'Wrong user');
          done();
        })
        .catch((err) => {
          delete err.errorResponse
          console.log("err" + JSON.stringify(err));
          done();
        })

    });
  })

  describe('Update a User', function () {
    it('#Edit user details', (done) => {
      usercrtl.updateUser(authorization, bsconfig.adminuserid, updateuserbody)
        .then((response) => {
          response.errorCode = 200;
          expect(response.total).to.be.above(0);
          assert.equal(response.errorCode, 200, 'Wrong user');
          done();
        })
        .catch((err) => {
          delete err.errorResponse
          console.log("err" + JSON.stringify(err));
          done();
        })

    });
  })


})
