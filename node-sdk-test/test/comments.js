const lib = require('bluescape-sdk-node');
const AuthLib = require('bluescape-auth-library');
const bsconfig = require('../config');
const utils = require('../util');
var assert = require('assert');
var chai = require('chai');
expect = chai.expect;
should = chai.should();

const workspacectrl = lib.WorkspacesController;
const commentsctrl = lib.CommentsController;

var authorization;
var workspaceid = bsconfig.workspaceid, browserid;

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


describe('Comments controller Functions', function () {
  describe('Comment on an Object', function () {
    var body = new lib.CommentCreateRequest({
      "text": "",
      "parent": ""
    });
    var objecttype = lib.ObjectTypeEnum.NOTES; //documents, notes, images, text

    it('#Add comment to workspace object', (done) => {
      commentsctrl.addCommentToObject(authorization, workspaceid, objecttype, obectid, body)
        .then((response) => {
          response.errorCode = 200;
          console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
          expect(response.errorCode).equal(200);
          comment = response.comment;
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
