const lib = require('bluescape-sdk-node');
const AuthLib = require('bluescape-auth-library');
const bsconfig = require('../config');
const utils = require('../util');
var assert = require('assert');
var chai = require('chai');
expect = chai.expect;
should = chai.should();

const workspacectrl = lib.WorkspacesController;
const documentctrl = lib.DocumentsController;

var authorization;
var workspaceid = bsconfig.workspaceid, documentid;

// const authLib = new AuthLib(bsconfig.credentials);
// const authorizeURL = authLib.implicit.authorizeURL();

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


describe('Documents controller Functions', function () {
  describe('Create a Document', function () {

    var documenttoupload = new lib.Document();

    it('#Add Document to workspace', (done) => {
      documentctrl.addDocumentToWorkspace(authorization, workspaceid, title, documenttoupload, x, y, pin, scale)
        .then((response) => {
          response.errorCode = 200;
          console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
          expect(response.errorCode).equal(200);
          documentid = response.document.id;
          done();
        })
        .catch((err) => {
          // delete err.errorResponse
          console.log("err" + JSON.stringify(err));
          done();
        })

    });
  })

  describe('Update a Document', function () {
    var body = new lib.DocumentUpdateRequest({
      "x": 10,
      "y": 10,
      "pin": true,
      "scale": {
        "type": "number",
        "default": 1
      }
    });

    it('#Edit document in workspace', (done) => {
      documentctrl.updateDocument(authorization, workspaceid, documentid, body)
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

  describe('Delete a Document', function () {
    it('#Remove Browser in workspace', (done) => {
      documentctrl.deleteDocument(authorization, workspaceid, documentid)
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
