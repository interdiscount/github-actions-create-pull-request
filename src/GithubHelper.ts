import { Octokit } from './OctoClient';
import { getGithubToken, getRepositoryInformation } from './utils';
import { Endpoints } from '@octokit/types';

type createPullRequestResponse = Endpoints['POST /repos/:owner/:repo/pulls']['response'];
type addLabelResponse = Endpoints['POST /repos/:owner/:repo/issues/:issue_number/labels']['response'];

export class GitHubHelper {
  private octokit: InstanceType<typeof Octokit>;

  constructor() {
    this.octokit = new Octokit({ auth: getGithubToken() });
  }

  createPullRequest = async (
    title: string,
    body: string,
    head: string,
    base: string
  ): Promise<createPullRequestResponse | void> => {
    const ALLOWED_STATUS = ['ahead', 'diverged'];

    const compareCommitsResponse = await this.octokit.repos.compareCommits({
      ...getRepositoryInformation(),
      head,
      base,
    });

    if (ALLOWED_STATUS.includes(compareCommitsResponse.data.status)) {
      return this.octokit.pulls.create({
        ...getRepositoryInformation(),
        title,
        body,
        head,
        base,
      });
    }

    return Promise.resolve();
  };

  addLabelToPullRequest = async (
    issueNumber: number,
    label: string
  ): Promise<addLabelResponse> =>
    this.octokit.issues.addLabels({
      ...getRepositoryInformation(),
      issue_number: issueNumber,
      labels: [label],
    });
}
