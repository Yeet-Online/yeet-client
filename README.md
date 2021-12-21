# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It also uses [Ant Design](https://ant.design/docs/react/introduce) for all the UI components.

Here's a quick guide to get the app running locally

## Step 1: Cloning the Repositories

You're going to want to clone this repository (this is the client/front end for yeet-online). I also suggest cloning [yeet-platform](https://github.com/Yeet-Online/yeet-platform) is the same directory in which you cloned this repo (you'll see why later).

## Step 2: Downloading dependencies

You will need `yarn` to run the client ([here's a quick guide](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-the-yarn-package-manager-for-node-js) to getting that setup). You'll also need `node.js` ([another guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)).

## Step 3: Running everything

Now, if you want to be a cool cat, _and_ you cloned both the client and platform repos at the same directory level, you can just run

```
yarn run-everything
```

And the app will start up with the front and and backend working. The first time you run it it might take some time because the platform dependicies need to be downloaded but it should start up fairly quickly the following times.

If you only want to run the client, use this command:

```
yarn start
```

## Get yeeting!

That's all it takes. Super simple, just how it should be.

Just in case you wanted to know more I left the default react READ.ME below.

# Getting Started with Create React App (Generic Read.me)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
