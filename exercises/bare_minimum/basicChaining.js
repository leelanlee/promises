/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promisification = require('./promisification.js');
var constructor = require('./promiseConstructor.js');


var gitHubProfile = promisification.getGitHubProfileAsync;
var firstLine = constructor.pluckFirstLineFromFileAsync;


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return firstLine(readFilePath)
    .then( (user) => {
      return gitHubProfile(user);
    })
    .then( (body) => {
      fs.writeFileSync(writeFilePath, JSON.stringify(body), (err) => {
        if (err) {
          throw new Error('Cannot write to file.');
        }
      });
    });

};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
