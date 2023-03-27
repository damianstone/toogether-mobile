<p float="left" align="left">
  <img src="https://user-images.githubusercontent.com/63305840/150650911-a3aba1cc-c2dd-4ced-9d60-0bd5ea1cfc8e.png" width="300" />
</p>

# Toogether App

Mobile app build with React Native Expo, Redux and Axios

## Initialization

### Install the requirements
The following command allows you to install all the requirements using the exact same versions specified in the `package.json`

```bash
npm ci --legacy-peer-deps
```

### Create an .env file
In the root of the project create an `.env` file with the following variables

```
MODE = development
IOS_LOCAL_URL = http://127.0.0.1:8000
ANDROID_LOCAL_URL = http://10.0.2.2:8000
```

### Style standards

To keep the code in a standard style we use `Prettier + Eslint`

To format the code using Prettier, run the following command:
Make sure to run this command before any pull request

```bash
npm run format
```

To check errors in the code style, run the following command:

```bash
npm run lint:fix
```

## Pull Requests

Before any merge to develop or rocket, it will be necessary to make a Pull Request and a code review.

Basic PR structure:

`your-branch` -> `feature-branch` -> `develop` -> `rocket`

### Steps for a Pull Request
1. Push your branch to the remote repository: git push
2.  Navigate to the GitHub website
3.  Create the pull request (PR) manually by selecting the correct `feature-branch` you are working on and clicking on the "New pull request" button
4.  Notify the team about your PR through our communication channel: Discord

# Deployment

### Deploy to expo
```bash
expo publish --release-channel develop
expo publish --release-channel rocket
```

### Deploy to the App Store and Test Flight
Deployments can only be done once the new features or fixes are well tested.

Before make sure you have installed globally `EAS-CLI `
For this, you can run 

```bash
npm install -g eas-cli
```

To build the app we can use the following command specifying the channel (env variables) we want to use

```bash
eas build -p ios --profile rocket
```

Finally we can make the deployment to the App Store using the build url generated in expo
Here you can find the url: https://expo.dev/

```bash
eas submit --platform ios --url url-of-the-buil-in-expo
```

### Deploy to Google Play Store
Information and steps need to be added

# General project structure

### Conventions
The conventions or general rules for the structure of this project are the following:
- Folders or files that do not export objects or components, in lower case
- Folders or files that export objects or components in capital letters
- For all this project we use `arrow functions`, `functional components` and `react hooks`
- To save states or information coming from the backend we use redux and the `Flux Architecture`
- `State` and `props` must be destructured before used
- More conventions and patters can be found looking the code

### Folders
The project is organized into several folders, each serving a specific purpose. This section provides an overview of each folder and its contents.

#### assets
The assets folder stores all the non-code resources used in the project, such as fonts, icons, and images.

#### components
The components folder contains all the React Native components used in the project. The UI subfolder contains smaller components that make up the user interface, such as text elements, avatars, inputs, etc.

#### constants
The constants folder contains all the constant values used in the app, including color codes, constant names for reducers and actions, and values from the backend responses.

#### data
The data folder stores JavaScript and JSON objects that are used to make certain components or screens dynamic.

##### navigation
The navigation folder contains the navigation structure for the transitions between screens using React Navigation 4x.

##### screens
The screens folder stores all the components (screens) of each section of the app. These components contain most of the logic for each screen and should make use of other components as much as possible for code readability. The calls to the backend must also be made within the screens.

#### store
This folder contains the implementation of the state management using Redux.

#### utils
The utils folder contains utility functions used throughout the project. These functions perform common tasks and are designed to be reused.

