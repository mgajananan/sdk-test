const lib = require('lib');
const workspacectrl = lib.WorkspacesController;
const orgctrl = lib.CompaniesController;
const utils = require('../util');

var assert = require('assert');
var chai = require('chai');
expect = chai.expect;
should = chai.should();

var authorization;

before('Get User and Admin token', (done) => {
  utils.getAdminAccessToken().then((token) => {
    authorization = `bearer ${token}`;
    // console.log(authorization);
    done();
  })
});


describe('Workspaces controller Functions', function () {

  it('#List Workspace Roles', (done) => {
    workspacectrl.listWorkspaceRoles(authorization)
      .then((response) => {
        response.errorCode = 200;
        // console.log(JSON.stringify(response));
        assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
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
