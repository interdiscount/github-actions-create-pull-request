import core from '@actions/core';
import { Octokit } from '@octokit/core';
import { Endpoints, RequestError } from '@octokit/types';

type createPullRequestResponse = Endpoints['POST /repos/:owner/:repo/pulls']['response'];

const githubToken = core.getInput('github-token');
const headBranch = core.getInput('head-branch');
const baseBranch = core.getInput('base-branch');
const labelName = core.getInput('label-name');
const octokit = new Octokit({ auth: githubToken });

const createPullRequest = () => {
  octokit
    .request(`POST /repos/${process.env.GITHUB_REPOSITORY}/pulls`, {
      title: 'Automated',
      head: headBranch,
      base: baseBranch,
    })
    .then((res: createPullRequestResponse) => {
      addLabelToPullRequest(res.data.number);
    })
    .catch((e: RequestError) => {
      core.setFailed(e.name);
    });
};

const addLabelToPullRequest = (pullRequestNumber: number) => {
  octokit
    .request(
      `POST /repos/${process.env.GITHUB_REPOSITORY}/issues/{issue_number}/labels`,
      {
        issue_number: pullRequestNumber,
        labels: [labelName],
      }
    )
    .then(() => core.setOutput('message', `PR Created`))
    .catch(() => core.setFailed('Could not attach Label to PR'));
};

createPullRequest();
