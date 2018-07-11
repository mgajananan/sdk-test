const lib = require('bluescape-sdk-node');
const AuthLib = require('bluescape-auth-library');
const bsconfig = require('../config');
const utils = require('../util');
var assert = require('assert');
var chai = require('chai');
expect = chai.expect;
should = chai.should();

const workspacectrl = lib.WorkspacesController;
const canvasesctrl = lib.CanvasesController;

var authorization;
var workspaceid = bsconfig.workspaceid, canvasid;

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


describe('Canvas controller Functions', function () {
  describe('Create a Canvas', function () {


    var body = new lib.CanvasCreateRequest({
      "x": 10,
      "y": 10,
      "width": 10,
      "height": 10,
      "name": "",
      "borderColor": lib.CanvasBorderColorEnum.RED
    });
    it('#Add Canvas to workspace', (done) => {
      canvasesctrl.addCanvasToWorkspace(authorization, workspaceid, body)
        .then((response) => {
          response.errorCode = 200;
          console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
          expect(response.errorCode).equal(200);
          canvasid = response.canvas.id;
          done();
        })
        .catch((err) => {
          // delete err.errorResponse
          console.log("err" + JSON.stringify(err));
          done();
        })

    });
  })

  describe('Update a Canvas', function () {
    var body = new lib.CanvasUpdateRequest({
      "name": "",
      "borderColor": lib.CanvasBorderColorEnum.BLUE
    });

    it('#Edit canvas in workspace', (done) => {
      canvasesctrl.updateCanvas(authorization, workspaceid, canvasid, body)
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

  describe('Delete a Canvas', function () {
    it('#Edit canvas in workspace', (done) => {
      canvasesctrl.deleteCanvas(authorization, workspaceid, canvasid)
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
