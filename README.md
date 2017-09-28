# Buffer Publish

Previously Project Donut 🍩

[![Build Status](https://travis-ci.org/bufferapp/buffer-publish.svg?branch=master)](https://travis-ci.org/bufferapp/buffer-publish)

## Table of contents

- [Quick Start](#quick-start)
- [Publishing Packages](#publishing-packages)
- [NPM Commands](#npm-commands)
- [Adding New Dependencies](#adding-new-dependencies)
- [How Packages Communicate](#how-packages-communicate)

## Quick Start

To get started on development:

Checkout the `publish` branch in [`buffer-dev`](https://github.com/bufferapp/buffer-dev) repo and then run `./dev setup && ./dev up`

If you need to start the server by itself:

```sh
npm run init
npm start
```

### Login/Logout

Currently the login service does not exist yet, however there are two methods exposed that trigger a login and logout

#### Login

Type this in the Javascript Console (with your credentials):

`clientId` and `clientSecret` are credentials from creating a Buffer app: https://local.buffer.com/developers/apps

You'll likely need to grab `clientSecret` directly from Mongo using `./dev mongo`.

```js
login({
  email: 'admin@bufferapp.com',
  password: 'password',
  clientId: 'clientId',
  clientSecret: 'clientSecret',
});
```

#### Logout

Type this in the Javascript Console:

```js
logout();
```

## Publishing Packages

**Login**
- Login to your NPM user who has access to a Buffer NPM Organization. If you're not sure if you're part of the Buffer NPM Organization check this list: https://www.npmjs.com/org/bufferapp/members

```sh
npm login
```
**Make Package Changes**

Make changes in a branch and get them reviewed in PR (our current flow)

**Bring Changes Into Master**

Rebase (or merge if you're more comfortable with that flow) the reviewed branch into master (our current flow)

**Pull Master**

Sanity check to make sure you've got the latest changes

```
git pull
```

**Publish**

*Important* - this command *must* be run with `npm run publish` - otherwise it doesn't pick up the logged in NPM user

```
npm run publish
```

After running this command you'll be prompted with the following menu

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

Under most cases you'll likely use a Patch. If you're unsure, this is a great question to ask the team.

This picks up all changed packages and updates versions *automatically*. It also pushes the version tag to Git. For more info on the publish command: https://github.com/lerna/lerna#publish

### Issues Seen

#### vundefined

If you run `git tags` you'll see `vundefined` listed as a tag. This happened when trying to do a publish on a branch that had git hashes changed due to a rebase. This also blocks publishing complaining about a git hash missing. To fix this one just delete the `vundefined` and undoing the related version update commits. This is a great one to ask for help!

## NPM Commands

### bootstrap

This runs `yarn` (to install) on each package and symlinks local packages.

### clean

Deletes all `node_modules` from all packages. Use this first if you see any odd dependency errors and then follow with `npm run bootstrap`;

### test

Runs `yarn test` on all packages

### test-update

Runs `yarn run test-update` on all packages to update all snapshot tests

### init

Runs `yarn` on the top level package and then runs `yarn run bootstrap` to setup all packages.

### start

Start up the publish service (dev mode starts up webpack with hot module reloading).

### publish

This publishes the changed packages on NPM - **Important** this command *must* be run with `npm run publish` - otherwise it doesn't pick up the logged in NPM user

## Adding New Dependencies

Adding packages to a `lerna` projects is slightly different than adding to a standard node package. Common `devDependencies` can be added to the top level `package.json` file. For more details on that: https://github.com/lerna/lerna#common-devdependencies

### Adding A Common Dependencies

This is the most likely scenario you'll face.

in the root directory (`buffer-publish/`) run the follwing commands:

```sh
npm run -SDE some-cool-package
npm run bootstrap
```

This makes `some-cool-package` available to all packages

### Creating A Dependency To Another Local Package

To create a dependency to the login package from the example package:

In the `example` package add the following entry in the `packages/example/package.json` file under the dependencies key:

```js
{
  //...other stuff...
  dependencies:{
    //...other dependencies...
    "@bufferapp/login": "0.0.1", // this version must be exact otherwise it fetches from npm
  }
}
```

**Important**

The version number must be exact to link local packages, otherwise it will (try to) fetch the package from NPM.


### Add A Dependency That Runs A Binary

An example of this would be `eslint` or `jest`. These should be added to the individual package:

```sh
cd packages/example/
npm run -SDE jest
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

© 2017 Buffer Inc.

This project is open source as a way to transparently share our work with the
community for the purpose of creating opportunities for learning. Buffer
retains all rights to the code in this repository and no one may reproduce,
distribute, or create derivative works from this.
