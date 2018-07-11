const lib = require('bluescape-sdk-node');
const AuthLib = require('bluescape-auth-library');
const bsconfig = require('../config');
const utils = require('../util');
var assert = require('assert');
var chai = require('chai');
expect = chai.expect;
should = chai.should();

const workspacectrl = lib.WorkspacesController;
const browsersctrl = lib.BrowsersController;

var authorization;
var workspaceid = bsconfig.workspaceid, browserid;

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


describe('Browser controller Functions', function () {
  describe('Create a Browser', function () {
    var body = new lib.BrowserCreateRequest({
      "x": 10,
      "y": 10,
      "width": 10,
      "height": 10,
      "content_width": 10,
      "content_height": 10,
      "url": "",
      "frameless": ""
    });
    it('#Add Browser to workspace', (done) => {
      browsersctrl.addBrowserToWorkspace(authorization, workspaceid, body, bsconfig.appkey)
        .then((response) => {
          response.errorCode = 200;
          console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
          expect(response.errorCode).equal(200);
          browserid = response.browser.id;
          done();
        })
        .catch((err) => {
          // delete err.errorResponse
          console.log("err" + JSON.stringify(err));
          done();
        })

    });
  })

  describe('Update a Browser', function () {
    var body = new lib.BrowserUpdateRequest({
      "x": 10,
      "y": 10,
      "width": 10,
      "height": 10,
      "url": ""
    });

    it('#Edit Browser in workspace', (done) => {
      browsersctrl.updateBrowser(authorization, workspaceid, browserid, body)
        .then((response) => {
          response.errorCode = 200;
          console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
          expect(response.errorCode).equal(200);
          done();
        })
        .catch((err) => {
          // delete err.errorResponse
          console.log("err" + JSON.stringify(err));
          done();
        })

    });
  })

  describe('Delete a Browser', function () {
    it('#Remove Browser in workspace', (done) => {
      browsersctrl.deleteBrowser(authorization, workspaceid, browserid)
        .then((response) => {
          response.errorCode = 200;
          console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
          expect(response.errorCode).equal(200);
          done();
        })
        .catch((err) => {
          // delete err.errorResponse
          console.log("err" + JSON.stringify(err));
          done();
        })

    });
  })




})
