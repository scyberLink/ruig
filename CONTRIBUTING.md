# Contributing to RUIG

Welcome, and thank you for your interest in contributing to RUIG!

There are several ways in which you can contribute, beyond writing code. The goal of this document is to provide a high-level overview of how you can get involved.

## Asking Questions

Have a question? Instead of opening an issue, please ask on [Stack Overflow](https://stackoverflow.com/questions/tagged/ruig) using the tag `ruig`.

The active community will be eager to assist you. Your well-worded question will serve as a resource to others searching for help.

## Providing Feedback

Your comments and feedback are welcome, and the development team is available via a handful of different channels.

See the [Feedback Channels](https://github.com/scyberLink/ruig/wiki/Feedback-Channels) wiki page for details on how to share your thoughts.

## Reporting Issues

Have you identified a reproducible problem in RUIG? Do you have a feature request? We want to hear about it! Here's how you can report your issue as effectively as possible.

### Identify Where to Report

The RUIG project is distributed across multiple repositories. Try to file the issue against the correct repository. Check the list of [Related Projects](https://github.com/scyberLink/ruig/wiki/Related-Projects) if you aren't sure which repo is correct.

Can you recreate the issue even after [disabling all extensions](https://github.com/scyberLink/docs/editor/extension-gallery#_disable-an-extension)? If you find the issue is caused by an extension you have installed, please file an issue on the extension's repo directly.

### Look For an Existing Issue

Before you create a new issue, please do a search in [open issues](https://github.com/scyberLink/ruig/issues) to see if the issue or feature request has already been filed.

Be sure to scan through the [most popular](https://github.com/scyberLink/ruig/issues?q=is%3Aopen+is%3Aissue+label%3Afeature-request+sort%3Areactions-%2B1-desc) feature requests.

If you find your issue already exists, make relevant comments and add your [reaction](https://github.com/blog/2119-add-reactions-to-pull-requests-issues-and-comments). Use a reaction in place of a "+1" comment:

- 👍 - upvote
- 👎 - downvote

If you cannot find an existing issue that describes your bug or feature, create a new issue using the guidelines below.

### Writing Good Bug Reports and Feature Requests

File a single issue per problem and feature request. Do not enumerate multiple bugs or feature requests in the same issue.

Do not add your issue as a comment to an existing issue unless it's for the identical input. Many issues look similar but have different causes.

The more information you can provide, the more likely someone will be successful at reproducing the issue and finding a fix.

The built-in tool for reporting an issue, which you can access by using `Report Issue` in RUIG's Help menu, can help streamline this process by automatically providing the version of RUIG, all your installed extensions, and your system info. Additionally, the tool will search among existing issues to see if a similar issue already exists.

Please include the following with each issue:

- Version of RUIG
- Your operating system
- List of extensions that you have installed
- Reproducible steps (1... 2... 3...) that cause the issue
- What you expected to see, versus what you actually saw
- Images, animations, or a link to a video showing the issue occurring
- A code snippet that demonstrates the issue or a link to a code repository the developers can easily pull down to recreate the issue locally
  - **Note:** Because the developers need to copy and paste the code snippet, including a code snippet as a media file (i.e. .gif) is not sufficient.
- Errors from the Dev Tools Console (open from the menu: Help > Toggle Developer Tools)

## Pull Request Formatting

To maintain consistency and readability in PR submissions, please follow these guidelines:  

- Use clear commit messages
- Ensure PR titles follow the `<type>: <subject>` convention (e.g., `docs: Update CONTRIBUTING.md`). Refer to the [Conventional Commits](https://www.conventionalcommits.org/) specification for more details.
- Provide a detailed description in the PR body, outlining the changes and their impact
- Link related issues using GitHub's syntax (Fixes #<issue_number> or Related to #<issue_number>).
- If applicable, include screenshots or examples for UI-related changes
- Use bullet points for clarity if making multiple changes.

### Final Checklist

Please remember to do the following:

- [ ] Search the issue repository to ensure your report is a new issue
- [ ] Recreate the issue after disabling all extensions
- [ ] Simplify your code around the issue to better isolate the problem

Don't feel bad if the developers can't reproduce the issue right away. They will simply ask for more information!

### Follow Your Issue

Once submitted, your report will go into the [issue tracking](https://github.com/scyberLink/ruig/wiki/Issue-Tracking) workflow. Be sure to understand what will happen next, so you know what to expect and how to continue to assist throughout the process.

## Automated Issue Management

We use GitHub Actions to help us manage issues. These Actions and their descriptions can be [viewed here](https://github.com/scyberLink/ruig-github-triage-actions). Some examples of what these Actions do are:

- Automatically close any issue marked `info-needed` if there has been no response in the past 7 days.
- Automatically lock issues 45 days after they are closed.
- Automatically implement the RUIG [feature request pipeline](https://github.com/scyberLink/ruig/wiki/Issues-Triaging#managing-feature-requests).

If you believe the bot got something wrong, please open a new issue and let us know.

## Contributing Fixes

If you are interested in writing code to fix issues, please see [How to Contribute](https://github.com/scyberLink/ruig/wiki/How-to-Contribute) in the wiki.

## Thank You

Your contributions to open source, large or small, make great projects like this possible. Thank you for taking the time to contribute.
