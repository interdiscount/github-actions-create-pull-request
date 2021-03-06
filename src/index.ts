import * as core from '@actions/core';
import { GitHubHelper } from './GithubHelper';

const headBranch: string = core.getInput('head-branch');
const baseBranch: string = core.getInput('base-branch');
const labelName: string = core.getInput('label-name');
const pullRequestTitle: string = core.getInput('pull-request-title');
const pullRequestBody: string = core.getInput('pull-request-body');

const githubHelper = new GitHubHelper();

githubHelper
  .createPullRequest(pullRequestTitle, pullRequestBody, headBranch, baseBranch)
  .then(res => {
    if (res) {
      core.info(
        `Successfully created Pull Request with number ${res.data.number}`
      );
      githubHelper
        .addLabelToPullRequest(res.data.number, labelName)
        .then(() =>
          core.setOutput(
            'message',
            `Successfully attached label (${labelName})`
          )
        )
        .catch(e => core.setFailed(e.message));
    } else {
      core.info(
        `Could not find any changes between ${headBranch} and ${baseBranch}`
      );
    }
  })
  .catch(e => core.setFailed(e.message));
