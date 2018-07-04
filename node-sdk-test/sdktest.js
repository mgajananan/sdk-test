var Mocha = require('mocha'),
fs = require('fs'),
    path = require('path');

// Instantiate a Mocha instance.

var testDir = './test'
var mocha = new Mocha({
    ui: "bdd",
    timeout:100000,
    reporter: "mochawesome",
    reporterOptions: {
        reportFilename: 'NodeSdkTestReport',
        reportDir: 'SdkTestReports',
        overwrite: true
      }
});

// Add each .js file to the mocha instance
fs.readdirSync(testDir).filter(function(file){
    // Only keep the .js files
    return file.substr(-3) === '.js';

}).forEach(function(file){
    mocha.addFile(
        path.join(testDir, file)
    );
});
mocha.run(function(failures){
    process.exitCode = failures ? -1 : 0;  // exit with non-zero status if there were failures
  });
