# Contributing

## Check coding style
Before opening a pull request, your new code should pass style check. This check can be found by running npm run and looking for a task that runs the linter. Example of such task might look like:

```
npm run lint
```

## Fork the repo
If you don't have push access to the repo you should create a fork of this project in your account and work from there. You can create a fork by clicking the fork button in **GitHub**.

## One feature, one branch, one pull request
Work for each new **feature/issue** should occur in its own branch. To create a new branch from the command line:

```
git checkout -b <branch-name>
```

where <branch-name> is a branch, that you should name according to functionality you do.

## Update README file
Before opening a pull request, please, make sure, that README file was updated. It's required, if you want to add new functionallity to the application. 

## Submit PR and describe the change
Push your changes to your branch and open a pull request against the parent repo on GitHub.

Please describe your changes and provide any context.

For pull requests that bump a dependency, include a link to the CHANGELOGS for the dependency. Dependencies without up to date CHANGELOGS will not be approved. We may code review the dependency and reject a PR that degrades stability or performance.

Complete the PR template and all checklists;

Request a review. Reviewer should verify that all requirements are met, that your testing steps are clear and complete, and that overall functionality behaves as expected;

### PR Review
App maintainers will review all PRs with and assign them to code reviewers. Code reviewer will review the PR and update the label to **Status: In Review**. Ideally, a reviewer should be able to pick up a review and approve/merge in one touch.

If PR requires significant changes (ie. changes that will take more than a few days), the reviewer will:
- Leave thorough feedback about what needs to be changed;
- The author should respond to comments and update the PR as needed;
- When ready for re-review, the author should leave a comment and @ mention the reviewer.

Once approved, the reviewer will:
- Update the label to **Status: Approved**;
- "Approve" the PR in github;
- Apply the **MERGE READY** label;
- Merge the PR.

## Additional information
If there are any questions on your planned contribution, please reach out to me to discuss.

Skype - live:vyshyvanv.official
Gmail - vyshyvanv.official@gmail.com
