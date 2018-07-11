// const lib = require('bluescape-sdk-node');
const lib = require('lib');
const workspacectrl = lib.WorkspacesController;
const orgctrl = lib.CompaniesController;
const utils = require('../util');
const bsconfig = require('../config');
var assert = require('assert');
var chai = require('chai');
expect = chai.expect;
should = chai.should();

var authorization;
var workspaceid;

// before('Get User and Admin token', (done) => {
//   utils.getAdminAccessToken().then((token) => {
//     authorization = `bearer ${token}`;
//     // console.log(authorization);
//     done();
//   })
// });


describe('Workspaces controller Functions', function () {


  describe('List Workspace Roles', function () {
    it('#List all Workspace Roles', (done) => {
      workspacectrl.listWorkspaceRoles(authorization, '1ed2aa9a81f0e91eb61c64190610fcba')
        .then((response) => {
          response.errorCode = 200;
          // console.log(JSON.stringify(response));
          assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
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



  describe('Add User to Workspace', function () {
    var body = new lib.AddUserInWorkspaceReq({
      "users": {
        "type": "array",
        "description": "array of users => email (string), workspace_role_id (integer)",
        "items": {
          "email": "",
          "workspace_role_id": 10
        }
      }

      //   "users": [
      //   "items": {
      //     "email": "",
      //     "workspace_role_id": 10
      //   }
      // ]
    });

    it('#Add User to Workspace', (done) => {
      workspacectrl.addWorkspaceUser(authorization, workspaceid)
        .then((response) => {
          response.errorCode = 200;
          // console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
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


  describe('Copy a Workspace', function () {
    var body = new lib.CopyWorkspaceReq({
      "new_workspace_name": "WorkspaceCopy",
      "new_workspace_description": "Copy Duplicate"
    });

    it('#Copy a Workspace', (done) => {
      workspacectrl.updateCopyWorkspace(authorization, workspaceid, body)
        .then((response) => {
          response.errorCode = 200;
          // console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
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


  describe('Delete a Workspace', function () {
    it('#Delete a Workspace', (done) => {
      workspacectrl.deleteWorkspace(authorization, workspaceid)
        .then((response) => {
          response.errorCode = 200;
          // console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
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


  describe('Get a Workspace', function () {
    it('#Get a Workspace', (done) => {
      workspacectrl.getWorkspace(authorization, workspaceid)
        .then((response) => {
          response.errorCode = 200;
          // console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
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


  describe('List Active Users in a Workspace', function () {
    it('#List Active Users in a Workspace', (done) => {
      workspacectrl.getActiveUsersInWorkspace(authorization, workspaceid)
        .then((response) => {
          response.errorCode = 200;
          // console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
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

  //         describe('Move a Workspace to another Organization', function () {
  //           it('#Move a Workspace to another Organization', (done) => {
  //             workspacectrl.updateWorkspace(authorization, workspaceid, )
  //               .then((response) => {
  //                 response.errorCode = 200;
  //                 // console.log(JSON.stringify(response));
  //                 // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
  //                 expect(response.errorCode).equal(200);
  //                 done();
  //               })
  //               .catch((err) => {
  //                 delete err.errorResponse
  //                 console.log("err" + JSON.stringify(err));
  //                 done();
  //               })
  //           });


  describe('Publish a Workspace', function () {
    it('#Publish a Workspace', (done) => {
      workspacectrl.updatePublishWorkspace(authorization, workspaceid)
        .then((response) => {
          response.errorCode = 200;
          // console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
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

  describe('Unpublish a Workspace', function () {
    it('#Unpublish a Workspace', (done) => {
      workspacectrl.updateUnpublishWorkspace(authorization, workspaceid)
        .then((response) => {
          response.errorCode = 200;
          // console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
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

  describe('Update User Role in Workspace', function () {
    var body = new lib.ChangeUserWorkspaceRoleReq({
      "workspace_role_id": 10
    })
    it('#Update User Role in Workspace', (done) => {
      workspacectrl.updateWorkspaceUserRole(authorization, workspaceid, userid, body)
        .then((response) => {
          response.errorCode = 200;
          // console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
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


  describe('Update a Workspace', function () {
    var body = new lib.UpdateWorkspaceReq({
      "name": "",
      "description": "",
      "public": true,
      "user_id": 10,
      "favorite": true
    })
    it('#Update Workspace', (done) => {
      workspacectrl.updateWorkspace(authorization, workspaceid, body)
        .then((response) => {
          response.errorCode = 200;
          // console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
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



  describe('Remove User from Workspace', function () {
    it('#Remove User from Workspace', (done) => {
      workspacectrl.removeWorkspaceUser(authorization, workspaceid, userid)
        .then((response) => {
          response.errorCode = 200;
          // console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
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


  // describe('Search for Content', function () {
  //   it('#Search for Content', (done) => {
  //     workspacectrl.(authorization, workspaceid, userid)
  //       .then((response) => {
  //         response.errorCode = 200;
  //         // console.log(JSON.stringify(response));
  //         // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
  //         expect(response.errorCode).equal(200);
  //         done();
  //       })
  //       .catch((err) => {
  //         delete err.errorResponse
  //         console.log("err" + JSON.stringify(err));
  //         done();
  //       })
  //   });
  // })

  describe('Send to wall', function () {
    var body = {
      "pin": 12345
    }

    it('#Send to wall', (done) => {
      workspacectrl.updateSendWorkspaceToWall(authorization, workspaceid, userid)
        .then((response) => {
          response.errorCode = 200;
          // console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
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





})
