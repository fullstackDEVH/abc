# Pull request

## Description
Why is this change necessary? Give the reviewer a brief description about what this PR is for.

## JIRA Ticket URLs
- [SCRUM-](https://magic-eyes.atlassian.net/browse/SCRUM-)

## Key changes
- How does the code change address the issue? Describe, at a high level, what was done to affect change.
- What side effects does this change have? This is the most important question to answer, as it can point out problems where you are making too many changes iin one commit or branch. One or two bullet points for related changes may be okay, but five or six are likely indicators of a commit that is doing too many things.

## Checklist
#### Pre-create Pull request
- [ ] Provided the business context or add description for the PR
- [ ] Added JIRA ticket if possible
- [ ] Added prefix for pull requests title (Add/Update/Remove/Refactor/...)
- [ ] Added or modified all unit tests
- [ ] Rebased from master branch
- [ ] No conflics
- [ ] Added reviewer

####  Post-created Pull request
- [ ] CI is green
- [ ] Ready to merge
- [ ] Migration and configuration changes has performed successfully

#### Post-merged Pull request
- [ ] The branch is removed if merged successfully