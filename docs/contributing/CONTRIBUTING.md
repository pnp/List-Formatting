# Contribution guidelines

We welcome contributions and love to see community helping with moving this project forward. This guide shall help you contributing. Please read it before contributing whether you are a first time contributor or a seasoned pro.

## Every contribution counts

In this repository, everything is about list formatting samples, which means that you can

- add a new sample
- improve an existing sample
- improve documentation for a sample
- resolve an issue from the [issue list](https://github.com/pnp/List-Formatting/issues)
- last, but not least, fix typos

If you are unsure if your contribution would fit into this project, raise an issue and we will get things moving with you together.

Every contribution counts and everyone's voice matters!

## How to contribute

As you already found your way to this repository, we assume that you understood, that all samples and docs live on GitHub.

### small changes

If you want to fix a minor issue, like a typo:

- select **edit**, GitHub will automatically create a fork for you
- change the files you want to change
- go ahead and [submit a pull request](contributing.md/#pull-request)

### bigger changes

If you want to submit a new sample or have other big changes to make, its better to develop locally. In case you are unfamiliar with the process, here is a step-by-step instruction:

#### assumptions

- You have VS Code or another code editor installed
- You have git installed

This how-to is written for Windows/PowerShell. If you use a different OS or shell, commands can be a different, but the process stays the same.

#### Fork the repository

Fork our repository to create a copy in your account:

- open [pnp/List-Formatting/](https://github.com/pnp/List-Formatting/) (this repository)
- select **Fork**

![fork repository](/docs/img/fork-repository.png)

The URL of your fork is now `https://github.com/<YOUR GITHUB ACCOUNT>/List-Formatting/`

#### Clone the repository

Now you want to clone the repository so you have it locally available:

(1) Select **Code**
(2) Copy the URL (it is `https://github.com/<YOUR GITHUB ACCOUNT>/List-Formatting.git`)

![clone repository](/docs/img/clone-repository.png)

- Open the terminal in VS Code
- navigate to a directory where you want to clone the repository
- type `git clone <COPIED URL HERE>`

#### Add Upstream

You will now want to make sure, that all your contributions point to the original repository, which is why you want to add an upstream to it:

- navigate to the folder where your cloned repository is located with `cd sp-dev-list-formatting`
- type `git remote add upstream https://github.com/pnp/List-Formatting` (this needs to be the original repository URL)
- to check if everything works correctly, type `git remote -v`, you should see this output:

```powershell
origin  https://github.com/<YOUR ACCOUNT HERE>/List-Formatting.git (fetch)
origin  https://github.com/<YOUR ACCOUNT HERE>/List-Formatting.git (push)
upstream https://github.com/pnp/List-Formatting (fetch)
upstream https://github.com/pnp/List-Formatting (push)
```

#### Branch out

We will now want to create a new branch and diverge from the main line of development. This way, you can work on something without messing with that main line, which is represented by the **master** branch in this repository. To create a new branch and switch to it:

- type `git checkout -b <YOUR BRANCH NAME>`

#### Add your changes

Now it's time to make some changes:

- type `code .` in VSCode terminal (yes, there is a space (` `) between `code` and the `.`) to open your project in a new VS Code instance
- develop your sample, for help here are some resources:
  - [Use view formatting to customize SharePoint](https://docs.microsoft.com/sharepoint/dev/declarative-customization/view-formatting)
  - [Use column formatting to customize SharePoint](https://docs.microsoft.com/sharepoint/dev/declarative-customization/column-formatting)
  - [Getting started with SharePoint’s custom column formatting](https://techcommunity.microsoft.com/t5/microsoft-365-pnp-blog/getting-started-with-sharepoint-s-custom-column-formatting/ba-p/2207937)
  - [Getting started with SharePoint's custom view formatting](https://techcommunity.microsoft.com/t5/microsoft-365-pnp-blog/getting-started-with-sharepoint-s-custom-view-formatting/ba-p/2222740)
  - [LIST FORMATTING by Chris Kent](https://thechriskent.com/tag/list-formatting/)
  - also, join our [Microsoft 365 PnP](https://aka.ms/m365pnp) community calls, where we regularly feature demos on list formatting
  - a new sample should contain:
    - a folder where the sample lives in
    - a README.md file, please use [README.md template](https://github.com/LuiseFreese/List-Formatting/blob/master/column-samples/README-template.md)
    - a screenshot that shows how the sample look like
    - the sample itself, provided as JSON file and as AST (Abstract Syntax Tree) version

### commit and push your changes to your fork

Whenever you want to upload your changes to your remote fork:

- type `git add .` (yes, there is a space (` `) between `add` and the `.`) - this adds all changes to staging area
- type `git commit -m "YOUR COMMIT MESSAGE"` (please don't be the person that is not giving context to their changes) - this will commit your changes with the messages
- type `git push` to push the changes to your remote fork

### Pull request

You will now want to (kindly) ask the repository maintainer to pull in your changes. You do that by doing a pull request:

- Open [pnp/List-Formatting](https://github.com/pnp/List-Formatting) (this repository)
- Select **Pull requests**
- Select **New pull request**

![create pull request](/docs/img/create-pr.png)

- Select **compare across forks**
- Select your fork from the **head repository**

![compare changes](/docs/img/create-pr.png)

- Select **Compare & pull request**

![compare and pull request](/docs/img/compare-and-pr.png)

- Fill out the form (please read carefully, this way we don't need to go back and forth too often)
  - give your PR a descriptive title
  - fill out the markdown table in the body of the PR
  - describe what's in the PR
- You can always switch to **Preview** to see how it looks like
- Select **Create pull request**
- If needed, you can commit more files and changes

### working together

A maintainer will review your pull request, this repository is maintained by volunteers in their free time, please be kind. Everyone is doing their best to keep things moving forward.

## What if you need help?

We are here and happy to support you and provide you with resources, guidance and an entire community to help you contributing. Our friends at [Sharing is Caring](https://aka.ms/sharing-is-caring) run sessions on how you get started and will help you along the way. If you have any questions, please reach out to any [Microsoft 365 PnP member](https://aka.ms/m365pnp), they will point you into the right direction.

_Sharing is Caring!_
