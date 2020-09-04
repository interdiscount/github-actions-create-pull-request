import * as core from '@actions/core';

type RepositoryInformation = {
  owner: string;
  repo: string;
};

export const getRepositoryInformation = (): RepositoryInformation => {
  const repositoryInformation = process.env.GITHUB_REPOSITORY?.split('/');

  return {
    owner: repositoryInformation?.[0] || '',
    repo: repositoryInformation?.[1] || '',
  };
};

export const getGithubToken = () => core.getInput('github-token');
