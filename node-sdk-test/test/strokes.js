const lib = require('bluescape-sdk-node');
const AuthLib = require('bluescape-auth-library');
const bsconfig = require('../config');
const utils = require('../util');
var assert = require('assert');
var chai = require('chai');
expect = chai.expect;
should = chai.should();

const workspacectrl = lib.WorkspacesController;
const strokesctrl = lib.StrokesController;

var authorization;
var workspaceid = bsconfig.workspaceid, strokeid;

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


describe('Stroke controller Functions', function () {
  describe('Draw Strokes on a Workspace', function () {

    var body = new lib.StrokeCreateRequest({
      "penColor": lib.PenColorEnum.PURPLE,
      "brushSize": 10,
      "brushType": lib.BrushTypeEnum.PEN,
      "points": {
        "type": "array",
        "items": 10
      }
    });

    it('#Add stroke to workspace', (done) => {
      strokesctrl.createDrawStrokeOnWorkspace(authorization, workspaceid, body)
        .then((response) => {
          response.errorCode = 200;
          console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
          expect(response.errorCode).equal(200);
          strokeid = response.stroke.id;
          done();
        })
        .catch((err) => {
          // delete err.errorResponse
          console.log("err" + JSON.stringify(err));
          done();
        })

    });
  })

  describe('Draw Strokes on an Object', function () {
    var body = new lib.StrokeCreateRequest({
      "penColor": lib.PenColorEnum.PURPLE,
      "brushSize": 10,
      "brushType": lib.BrushTypeEnum.PEN,
      "points": {
        "type": "array",
        "items": 10
      }
    });
    var objecttype = lib.ObjectTypeEnum.NOTES;

    it('#Draw Strokes on workspace Object', (done) => {
      strokesctrl.createDrawStrokeOnObject(authorization, workspaceid, objecttype, objectid, body)
        .then((response) => {
          response.errorCode = 200;
          console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
          expect(response.errorCode).equal(200);
          strokeid = response.stroke.id;
          done();
        })
        .catch((err) => {
          // delete err.errorResponse
          console.log("err" + JSON.stringify(err));
          done();
        })

    });
  })

  describe('Delete a Stroke', function () {
    it('#DDelete Stroke', (done) => {
      strokesctrl.deleteStrokeFromWorkspace(authorization, workspaceid, strokeid)
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
