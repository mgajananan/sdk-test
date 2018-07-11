const lib = require('bluescape-sdk-node');
const AuthLib = require('bluescape-auth-library');
const bsconfig = require('../config');
const utils = require('../util');
var assert = require('assert');
var chai = require('chai');
expect = chai.expect;
should = chai.should();

// const workspacectrl = lib.WorkspacesController;
// const notesctrl = lib.NotesController;

// var authorization;
// var workspaceid = bsconfig.workspaceid, noteid;

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


describe('Notes controller Functions', function () {
  describe('Create a Note', function () {

    var body = new lib.NoteCreateRequest({
      "x": 10,
      "y": 10,
      "text": "",
      "fontWeight": lib.FontWeightEnum.BOLD,
      "textTransform": lib.TextTransformEnum.UPPERCASE,
      "backgroundColor": lib.NoteBackgroundColorEnum.RED,
      "pin": "",
      "scale": {
        "type": "number",
        "default": 1
      }
    });

    it('#Add Note to workspace', (done) => {
      notesctrl.addNoteToWorkspace(authorization, workspaceid, body)
        .then((response) => {
          response.errorCode = 200;
          console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
          expect(response.errorCode).equal(200);
          noteid = response.note.id;
          done();
        })
        .catch((err) => {
          // delete err.errorResponse
          console.log("err" + JSON.stringify(err));
          done();
        })

    });
  })

  describe('Update a Note', function () {
    var body = new lib.NoteUpdateRequest({
      "x": 10,
      "y": 10,
      "text": "",
      "fontWeight": lib.FontWeightEnum.NORMAL,
      "textTransform": lib.TextTransformEnum.INHERIT,
      "backgroundColor": lib.NoteBackgroundColorEnum.TEAL,
      "pin": true,
      "scale": {
        "type": "number",
        "default": 1
      }
    });

    it('#Edit Note in workspace', (done) => {
      notesctrl.updateNote(authorization, workspaceid, noteid, body)
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

  describe('Delete a Note', function () {
    it('#Remove Note in workspace', (done) => {
      notesctrl.deleteNote(authorization, workspaceid, noteid)
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
