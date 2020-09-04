'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var core = _interopDefault(require('@actions/core'));
var core$1 = require('@octokit/core');

var githubToken = /*#__PURE__*/core.getInput('github-token');
var headBranch = /*#__PURE__*/core.getInput('head-branch');
var baseBranch = /*#__PURE__*/core.getInput('base-branch');
var labelName = /*#__PURE__*/core.getInput('label-name');
var octokit = /*#__PURE__*/new core$1.Octokit({
  auth: githubToken
});

var createPullRequest = function createPullRequest() {
  octokit.request("POST /repos/" + process.env.GITHUB_REPOSITORY + "/pulls", {
    title: 'Automated',
    head: headBranch,
    base: baseBranch
  }).then(function (res) {
    addLabelToPullRequest(res.data.number);
  })["catch"](function (e) {
    core.setFailed(e.name);
  });
};

var addLabelToPullRequest = function addLabelToPullRequest(pullRequestNumber) {
  octokit.request("POST /repos/" + process.env.GITHUB_REPOSITORY + "/issues/{issue_number}/labels", {
    issue_number: pullRequestNumber,
    labels: [labelName]
  }).then(function () {
    return core.setOutput('message', "PR Created");
  })["catch"](function () {
    return core.setFailed('Could not attach Label to PR');
  });
};

createPullRequest();
//# sourceMappingURL=create-pull-request.cjs.development.js.map
