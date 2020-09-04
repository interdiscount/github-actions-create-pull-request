# Create Pull Request
Create a pull request and add a label in your workflow.

## Inputs

### `github-token`

**Required** The Token to interact with the Github API.

### `head-branch`

**Required** Branch to merge into base branch.

### `base-branch`

**Required** Base Branch to merge into.

### `pull-request-title`

**Required** Title of the Pull Request. Default `"Generated Pull Request"`.

### `pull-request-body`

**Required** Body of the Pull Request. Default `":crown:"`.

### `label-name`

**Required** Label to filter. Default `"automerge"`.

## Example usage

```
uses: interdiscount/github-actions-create-pull-request@master
with:
  github-token: ${{ secrets.GITHUB_TOKEN }}
  head-branch: "acceptance"
  base-branch: "development"
  pull-request-title: "Generated Pull Request"
  pull-request-body: ":crown:"
  label-name: "automerge"
```
