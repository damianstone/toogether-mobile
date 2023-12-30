<p float="left" align="left">
  <img src="https://user-images.githubusercontent.com/63305840/150650911-a3aba1cc-c2dd-4ced-9d60-0bd5ea1cfc8e.png" width="300" />
</p>

## What's Toogether app?
An app where users can create a group with their friends, match with other groups and hang out
<br>
<br>
**This is just the frontend of the app, if you're looking for the backend: https://github.com/damianstone/toogether-backend**

## Technologies
- ⚛️  React Native bare workflow https://docs.expo.dev/bare/overview/
- 🔥 Redux & Redux thunk
- 📍 Geolocation
- 🧭 React Navigation V7
- 🧹 ESlint + Prettier
- ⚡ Fast Image https://github.com/DylanVann/react-native-fast-image
- 👉 Picker Native Select https://github.com/lawnstarter/react-native-picker-select
- ↪️ React Native Deck Swiper https://github.com/alexbrillant/react-native-deck-swiper
- 🎈+ Many other expo integrations!

<img src="https://github.com/damianstone/toogether-mobile/assets/63305840/4085a6f7-9ffc-469d-88ef-11c54e82149a" width="3000" />

# Features
### 👀 Basic
- Login and registration with auth token
- Create profile
- Report profiles
- Block / unblock profiles
- Password recovery with email verification

### 👤 Your profile
- Update your personal information
- Add photos

### 💃 Swipe single and group profiles
- Support single and group profiles
- Like
- Unlike
- Undo

### 🕺🏼 Create a group profile with your friends
- Create a groups
- Invite friends using unique link
- If admin (creator of the group): remove and add members
- If not admin, join to group using the link and leave 

### 💬 Group chat
- Group chat generated automatically when joining or creating a group
- For now the chat just support text messages

### 💬 Matches and chats
- Chat with your matches
- Delete matches
- Report and block profiles

### 🔗 Matchmaking algorithm
List based on
- Your location
- Age
- Gender
- Preferences
- Group sizes
- More of the algorithm in the backend!

mailto: damianstonedev@gmail.com

# Initialization

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

### Export your ANDROID_HOME SDK path
To find the path to your Android SDK installation, you can follow these steps:

1. Open Android Studio.
2. Click on "Configure" in the welcome screen or the main window.
3. Click on "SDK Manager" from the dropdown menu.
4. In the SDK Manager window, you should see the path to your SDK installation at the top of the window.

```bash
export ANDROID_HOME=/path/to/your/sdk
```

### Run locally
For iOS
```bash
npm run ios
```

For Android
```bash
npm run android
```

# Deployment
For both you can use the github action pipeline! 🚀

# Style standards

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

# Pull Requests

Before any merge to develop or rocket, it will be necessary to make a Pull Request and a code review.

Basic PR structure:

`your-branch` -> `feature-branch` -> `develop` -> `rocket`

### Steps for a Pull Request
1. Push your branch to the remote repository: git push
2.  Navigate to the GitHub website
3.  Create the pull request (PR) manually by selecting the correct `feature-branch` you are working on and clicking on the "New pull request" button
4.  Notify the team about your PR through our communication channel: Discord


# Conventions
The conventions or general rules for the structure of this project are the following:
- Folders or files that do not export objects or components, in lower case
- Folders or files that export objects or components in capital letters
- For all this project we use `arrow functions`, `functional components` and `react hooks`
- To save states or information coming from the backend we use redux and the `Flux Architecture`
- `State` and `props` must be destructured before used
- More conventions and patters can be found looking the code

