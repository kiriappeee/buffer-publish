<p align="middle"><h1 align="center"> Buffer Publish </h1></p>

<p align="center" style="padding-top: -100px;">
  <a href="https://buffer.com/">
    <img src="https://rawgit.com/bufferapp/buffer-publish/master/logo.png" width="250" alt="Buffer Publish">
  </a>
</p>

[![Build Status](https://travis-ci.org/bufferapp/buffer-publish.svg?branch=master)](https://travis-ci.org/bufferapp/buffer-publish)
&nbsp; [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

Welcome to the [Lerna](https://github.com/lerna/lerna)-based monorepo™ for Buffer Publish.
<p>—<br><em>Formerly Project Donut</em>&nbsp; 🍩</p>

## Table of contents

- [What is Buffer Publish?](#what-is-buffer-publish)
- [Quick Start](#quick-start)
- [The Publish Server](#the-publish-server)
- [Lerna and Yarn Workspaces](#lerna-and-yarn-workspaces)
- [Publishing Packages](#publishing-packages)
- [Package Scripts](#package-scripts)
- [Adding New Dependencies](#adding-new-dependencies)
- [How Packages Communicate](#how-packages-communicate)

## What is Buffer Publish?

<img src="https://rawgit.com/bufferapp/buffer-publish/master/screenshot.png">

Buffer Publish is [Buffer](https://buffer.com)'s new dashboard with a focus on one thing; **managing and publishing content on your social accounts.** It's a redesign and refresh of the current Buffer dashboard, both in appearance and front-end architecture.

Buffer Publish is being actively developed right now! This code is open source for any and all to see and learn from — see our [copyright](#copyright) below for more details.

If you have any questions feel free to [create an issue](https://github.com/bufferapp/buffer-publish/issues/new) or Tweet us [@bufferdevs](https://twitter.com/bufferdevs). We'd love to chat!

⚠️  **Important Note**: While you can pull this code down freely, it won't work correctly without some key components (including our API) which are not open source.

## Quick Start

To get started on local development and testing:

1. **Get your `buffer-dev` environment setup**
  → https://github.com/bufferapp/buffer-dev

2. **Install the latest version of `yarn`**
  → [Installing Yarn](https://yarnpkg.com/en/docs/install)
  
3. **Make sure you have node with version <= 9 (Node v10 is not compatible)**
    ```
    $ node -v
    ```

4. **Install Packages and Bootstrap**
    ```bash
    $ cd ~/buffer-dev/buffer-publish  # Or wherever yours is located
    $ yarn
    $ yarn run bootstrap
   ```

5. **Start up the publish docker containers**
    ```bash
    $ cd ../buffer-dev
    $ ./dev up session-service core-authentication-service login publish
   ```

   Publish relies on both the **session** and **account** services, so it's important to include them in our _up_ command. The order is important, since this relates to the way docker-compose starts up containers.

6. **Start bundling the frontend with webpack**
    ```bash
    # in buffer-publish/
    $ yarn run watch
   ```
     While you're waiting for the bundle to finish, head on over to https://local.buffer.com to login. (We're not quite ready to view Publish yet.)

7. **Give yourself the correct feature flip**
  In order to view Buffer Publish your user (usually admin@bufferap.com for local dev)
 must have the _New Buffer Publish_ feature flip. Otherwise you'll just get redirected back to classic Buffer. To add the feature visit https://local.buffer.com/admin and browse to the _My Account_ page.

   If you don't have the feature flip available, then you should probably pull down all the feature flips from production first:
   ```bash
   # in ~/buffer-dev
   $ ./dev sync features
   ```
8. You should now be able to visit https://publish.local.buffer.com — party time! 🎉 🙌

### Troubleshooting Dev Environment Issues

Coming soon.

## The Publish Server

When you run the `./dev up` command from the [quick start](#quick-start) it spins up a number of containers on which Publish depends. It also spins up the `publish` container itself, which is [an Express server](/packages/server/index.js) with two purposes:

1. **Serve [`index.html`](/packages/server/index.html) for all requests to https://publish.local.buffer.com**
3. **Provide an `/rpc` endpoint/proxy** for making API calls in the front-end

In the past the publish container's Express server also ran webpack and bundled the front-end code, **we decoupled this however when we started seeing instability and broken file watching within the container**. Webpack bundling now happens **on the host system**; which is why you run `yarn run watch` as a final step.

## Lerna and Yarn Workspaces

Buffer Publish is a _monorepo_. That means it's composed of several separate parts, or _packages._ (You can take a look at these packages in the [`/packages` directory](/packages)) These are essentially the same as packages on npm. We use two very awesome tools to make this magic possible. 🎩.  (_And if you're confused by this at all, skimming their README files should help!_)

1. **Lerna** — https://lernajs.io/
2. **Yarn Workspaces** — https://yarnpkg.com/en/docs/workspaces

**Lerna** is the core of what makes it all work, while Yarn Workspaces is an addition used in place of Lerna's package mgmt. logic. You can read more about how we [use Yarn Workspaces with Lerna here](https://github.com/lerna/lerna#--use-workspaces). The reason for using Yarn Workspaces is for better speed, and support of our workflows.

## Publishing Packages

Since our app is made from a bunch of npm packages, we can publish them to the npm repository when we've made changes. All packages are namespaced under the `@bufferapp` organization.

|ℹ️  &nbsp;**When should you publish?**|
|--|
|In general, you should publish to npm when you've made significant changes to any local package, like fixing a bug, or finishing a feature. **Publishing your changes is usually* not a requirement for deploys to production (or staging servers) to work correctly.** This is because the process that bundles and deploys Publish does not fetch packages from npm if they are present in the repository (i.e., anything commited in `/packages`). Conversely, you would want to publish any changes to the Buffer Composer (`@bufferapp/buffer-composer`) since it doesn't live in this repo. (* The exception to this rule is any changes to the `@bufferapp/publish-utils` package that are consumed by the `server` package — since at this point the build process will grab the code from npm. See [this JIRA issue](https://buffer.atlassian.net/browse/ENG-163) for more context.) |


**Login**
Login to your NPM user who has access to the [`@bufferapp` npm organization](https://www.npmjs.com/org/bufferapp). If you're not part of the organization, ask someone on the team for help.

```sh
npm login
```
**Make Package Changes**
Make changes in a branch and get them reviewed in a PR, as usual.

**Bring Changes Into Master**
Merge or rebase the reviewed PR into `master`.


**Pull Master**
Sanity check to make sure you've got the latest changes.
```
git pull
```

**Publish**
```
yarn run publish
```

After running this command you'll be prompted with a menu like this;

```sh
lerna info Comparing with tag v0.5.27
? Select a new version (currently 0.5.27) (Use arrow keys)
❯ Patch (0.5.28)
  Minor (0.6.0)
  Major (1.0.0)
  Prepatch (0.5.28-0)
  Preminor (0.6.0-0)
  Premajor (1.0.0-0)
  Prerelease
  Custom
```

In most cases you'll choose *Patch*. If you're unsure, this is a great question to ask the team in Slack. You can read more about [versioning with SemVer here](https://semver.org/).

The `publish` command picks up all changed packages and updates their `package.json`  versions *automatically* ✨. It also ensures that dependant local packages have the updated version. Finally, it also pushes the version tag to Git.

For more info on the `publish`  command see https://github.com/lerna/lerna#publish.

### Common Issues with Publishing

#### `vundefined`

If you run `git tags` you'll see `vundefined` listed as a tag. This happened when trying to do a publish on a branch that had git hashes changed due to a rebase. This also blocks publishing complaining about a git hash missing. To fix this one just delete the `vundefined` and undoing the related version update commits. This is a great one to ask for help!

## Package Scripts

We have a few helpful commands defined in this project's `package.json`.

| Command | Description |
|--|--|
| `yarn run bootstrap`  | This runs `yarn` (to install) on each package and links local packages together! ✨ |
| `yarn run clean`  | Deletes all `node_modules` from all packages. Use this first if you see any odd dependency errors and then follow with a `yarn run bootstrap`. |
| `yarn run test`  | Runs `yarn test` on all packages. |
| `yarn run test-update`  | Runs `yarn run test-update` on all packages to update all snapshot tests. |
| `yarn run init`  | Runs `yarn` on the top level package and then runs `yarn run bootstrap` to setup all packages. Generally you won't need to run this more than once to set things up. |
| `yarn run start`  | Starts up the Publish Express server, [as explained above](#the-publish-server), and is run automatically when you start Publish with `./dev up`. (So in most cases you won't be running this command.) |
| `yarn run publish`  | This publishes the changed packages to npm. |

## Adding New Dependencies

Adding packages to a `lerna` projects is slightly different than adding to a standard node package. Common `devDependencies` can be added to the top level `package.json` file. For more details on that: https://github.com/lerna/lerna#common-devdependencies

### Adding A Common Dependencies

This is the most likely scenario you'll face.

in the root directory (`buffer-publish/`) run the follwing commands:

```bash
$ yarn add -DE some-cool-package
$ yarn run bootstrap
```

Now `some-cool-package` is available to all packages.

### Creating A Dependency To Another Local Package

To create a dependency to the login package from the example package:

In the `example` package add the following entry in the `packages/example/package.json` file under the dependencies key:

```js
{
  //...other stuff...
  dependencies:{
    //...other dependencies...
    "@bufferapp/login": "0.0.1", // this version must be exact otherwise it fetches from npm!
  }
}
```
|⚠️  &nbsp;**Important**|
|--|
|The version number must be **exact** to link local packages, otherwise it will (try to) fetch the package from npm.|


### Add A Dependency That Runs A Binary

An example of this would be `eslint` or `jest`. These should be added to the individual package:

```sh
cd packages/example/
yarn add -DE jest
```

## How Packages Communicate

At a high level each package communicates using the [Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern) through the Redux store. This means that each package receives all events and decides whether to modify their own state or ignore the event. An event (or action) flows from the originator to all other packages (including itself):


```
Package-A ---action--->Redux Store--->Package-B
  ^                             |
  |-----------------------------|---->Package-C
```

If you need to listen to another packages events, import the actionTypes into the package you're building:


```js
// handle app initialized
export default (state, action) => {
  switch (action.type) {
    case 'APP_INIT':
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};
```

## Copyright

© 2018 Buffer Inc.

This project is open source as a way to transparently share our work with the
community for the purpose of creating opportunities for learning. Buffer
retains all rights to the code in this repository and no one may reproduce,
distribute, or create derivative works from this.
