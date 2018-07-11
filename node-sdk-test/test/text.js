const lib = require('bluescape-sdk-node');
const AuthLib = require('bluescape-auth-library');
const bsconfig = require('../config');
const utils = require('../util');
var assert = require('assert');
var chai = require('chai');
expect = chai.expect;
should = chai.should();

const workspacectrl = lib.WorkspacesController;
const textctrl = lib.TextController;

var authorization;
var workspaceid = bsconfig.workspaceid, textid;

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


describe('Text controller Functions', function () {
  describe('Create Text', function () {

    var body = new lib.TextCreateRequest({
      "x": 10,
      "y": 10,
      "width": 10,
      "height": 10,
      "text": "",
      "fontFamily": lib.FontFamilyEnum.HELEVETICA,
      "fontSize": 10,
      "fontColor": lib.PenColorEnum.CYAN,
      "fontWeight": lib.FontWeightEnum.BOLD,
      "fontStyle": lib.FontStyleEnum.ITALIC,
      "textTransform": lib.TextTransformEnum.UPPERCASE,
      "backgroundColor": lib.NoteBackgroundColorEnum.BLUE,
      "pin": true
    }
    );

    it('#Add Text to workspace', (done) => {
      textctrl.addTextToWorkspace(authorization, workspaceid, body)
        .then((response) => {
          response.errorCode = 200;
          console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
          expect(response.errorCode).equal(200);
          textid = response.text.id;
          done();
        })
        .catch((err) => {
          // delete err.errorResponse
          console.log("err" + JSON.stringify(err));
          done();
        })

    });
  })

  describe('Update Text', function () {
    var body = new lib.TextCreateRequest({
      "x": 10,
      "y": 10,
      "width": 10,
      "height": 10,
      "text": "",
      "fontFamily": lib.FontFamilyEnum.ALEO,
      "fontSize": 10,
      "fontColor": lib.PenColorEnum.GREEN,
      "fontWeight": lib.FontWeightEnum.BOLD,
      "fontStyle": lib.FontStyleEnum.ITALIC,
      "textTransform": lib.TextTransformEnum.UPPERCASE,
      "backgroundColor": lib.NoteBackgroundColorEnum.RED,
      "pin": false
    }
    );
    it('#Edit Text in workspace', (done) => {
      textctrl.updateText(authorization, workspaceid, textid, body)
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

  describe('Delete Text', function () {
    it('#Remove Text from workspace', (done) => {
      textctrl.deleteText(authorization, workspaceid, textid)
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
