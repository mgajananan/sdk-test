// const lib = require('bluescape-sdk-node');
const lib = require('lib');
const workspacectrl = lib.WorkspacesController;
const orgctrl = lib.CompaniesController;
const utils = require('../util');
const config = require('../config');
var assert = require('assert');
var chai = require('chai');
expect = chai.expect;
should = chai.should();

var authorization;
var workspaceid = 637395;

bsconfig = config.get();

before('Get Admin token', (done) => {
  utils.getAdminAccessToken().then((token) => {
    authorization = `Bearer ${token}`;
    done();
  })
});

describe('Workspaces controller Functions', function () {


  describe('List Workspace Roles', function () {
    it('#List all Workspace Roles', (done) => {
      workspacectrl.listWorkspaceRoles(authorization, bsconfig.appkey)
        .then((response) => {
          response.errorCode = 200;
          assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
          expect(response.errorCode).equal(200);
          done();
        })
        .catch((err) => {
          console.log("err" + JSON.stringify(err));
          assert.fail(this.title + "::" + err);
          done();
        })

    });
  })


  describe('Get a Workspace', function () {
    it('#Get a Workspace', (done) => {
      workspacectrl.getWorkspace(authorization, workspaceid, bsconfig.appkey)
        .then((response) => {
          response.errorCode = 200;
          console.log(JSON.stringify(response));
          assert.equal(response.workspace.workspace_role.id, 1, 'Workspace roles not matching');
          expect(response.errorCode).equal(200);
          done();
        })
        .catch((err) => {
          console.log("err" + JSON.stringify(err));
          assert.fail(this.title + "::" + err);
          done();
        })
    });
  })


  describe('Update a Workspace', function () {
    var body = new lib.UpdateWorkspaceReq({
      name: 'Updated Workspace',
      description: 'Description ofUpdated Workspace',
      public: true,
      user_id: 1,
      favorite: true
    })
    it('#Update Workspace', (done) => {
      workspacectrl.updateWorkspace(authorization, workspaceid, body, bsconfig.appkey)
        .then((response) => {
          response.errorCode = 200;
          // console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
          expect(response.errorCode).equal(200);
          done();
        })
        .catch((err) => {
          console.log("err" + JSON.stringify(err));
          assert.fail(this.title + "::" + err);
          done();
        })
    });
  })

  describe('Copy a Workspace', function () {
    var body = new lib.CopyWorkspaceReq({
      new_workspace_name: 'WorkspaceCopy',
      new_workspace_description: 'Copy Duplicate'
    });

    it('#Copy a Workspace', (done) => {
      workspacectrl.updateCopyWorkspace(authorization, workspaceid, bsconfig.appkey, body)
        .then((response) => {
          response.errorCode = 200;
          // console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
          expect(response.errorCode).equal(200);
          done();
        })
        .catch((err) => {
          console.log("err" + JSON.stringify(err));
          assert.fail(this.title + "::" + err);
          done();
        })
    });

  })




  describe('Add User to Workspace', function () {
    var body = new lib.AddUserInWorkspaceReq({
      users: [{
        email: bsconfig.nonadminuser.email,
        workspace_role_id: 3,
      }]
    });

    it('#Add User to Workspace', (done) => {
      workspacectrl.addWorkspaceUser(body, authorization, workspaceid, bsconfig.appkey)
        .then((response) => {
          response.errorCode = 200;
          // console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
          expect(response.errorCode).equal(200);
          done();
        })
        .catch((err) => {
          console.log("err" + JSON.stringify(err));
          assert.fail(this.title + "::" + err);
          done();
        })
    });
  })

  describe('List Active Users in a Workspace', function () {
    it('#List Active Users in a Workspace', (done) => {
      workspacectrl.getActiveUsersInWorkspace(authorization, workspaceid, bsconfig.appkey)
        .then((response) => {
          response.errorCode = 200;
          // console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
          expect(response.errorCode).equal(200);
          done();
        })
        .catch((err) => {
          console.log("err" + JSON.stringify(err));
          assert.fail(this.title + "::" + err);
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
  //                 console.log("err" + JSON.stringify(err));
  //                 done();
  //               })
  //           });


  describe('Publish a Workspace', function () {
    it('#Publish a Workspace', (done) => {
      workspacectrl.updatePublishWorkspace(authorization, workspaceid, bsconfig.appkey)
        .then((response) => {
          response.errorCode = 200;
          // console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
          expect(response.errorCode).equal(200);
          done();
        })
        .catch((err) => {
          console.log("err" + JSON.stringify(err));
          assert.fail(this.title + "::" + err);
          done();
        })
    });
  })

  describe('Unpublish a Workspace', function () {
    it('#Unpublish a Workspace', (done) => {
      workspacectrl.updateUnpublishWorkspace(authorization, workspaceid, bsconfig.appkey)
        .then((response) => {
          response.errorCode = 200;
          // console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
          expect(response.errorCode).equal(200);
          done();
        })
        .catch((err) => {
          console.log("err" + JSON.stringify(err));
          assert.fail(this.title + "::" + err);
          done();
        })
    });
  })

  describe('Update User Role in Workspace', function () {
    var body = new lib.ChangeUserWorkspaceRoleReq({
      workspace_role_id: 3
    })
    it('#Update User Role in Workspace', (done) => {
      workspacectrl.updateWorkspaceUserRole(authorization, workspaceid, userid, bsconfig.appkey, body)
        .then((response) => {
          response.errorCode = 200;
          // console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
          expect(response.errorCode).equal(200);
          done();
        })
        .catch((err) => {
          console.log("err" + JSON.stringify(err));
          assert.fail(this.title + "::" + err);
          done();
        })
    });
  })



  describe('Remove User from Workspace', function () {
    it('#Remove User from Workspace', (done) => {
      workspacectrl.removeWorkspaceUser(authorization, workspaceid, userid, bsconfig.appkey)
        .then((response) => {
          response.errorCode = 200;
          // console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
          expect(response.errorCode).equal(200);
          done();
        })
        .catch((err) => {
          console.log("err" + JSON.stringify(err));
          assert.fail(this.title + "::" + err);
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
  //         console.log("err" + JSON.stringify(err));
  //         done();
  //       })
  //   });
  // })

  describe('Send to wall', function () {
    var body = ({
      pin: 12345
    })

    it('#Send to wall', (done) => {
      workspacectrl.updateSendWorkspaceToWall(body, authorization, workspaceid, bsconfig.appkey)
        .then((response) => {
          response.errorCode = 200;
          // console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
          expect(response.errorCode).equal(200);
          done();
        })
        .catch((err) => {
          console.log("err" + JSON.stringify(err));
          assert.fail(this.title + "::" + err);
          done();
        })
    });
  })

  describe('Delete a Workspace', function () {
    it('#Delete a Workspace', (done) => {
      workspacectrl.deleteWorkspace(authorization, workspaceid, bsconfig.appkey)
        .then((response) => {
          response.errorCode = 200;
          // console.log(JSON.stringify(response));
          // assert.equal(response.workspaceRoles.length, 5, 'Workspace roles missing');
          expect(response.errorCode).equal(200);
          done();
        })
        .catch((err) => {
          console.log("err" + JSON.stringify(err));
          assert.fail(this.title + "::" + err);
          done();
        })
    });
  })



})
