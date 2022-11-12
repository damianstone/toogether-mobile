<p float="left" align="left">
  <img src="https://user-images.githubusercontent.com/63305840/150650911-a3aba1cc-c2dd-4ced-9d60-0bd5ea1cfc8e.png" width="300" />
</p>

# Toogether App

Mobile app build with React Native Expo, Redux and Axios

## Initialization

### Install the requirements

```bash
npm install
```

### Style standards

To keep the code in a standard style we use Prettier + Eslint

To format the code using Prettier, run the following command:

```bash
yarn format
```

To check errors in the code style, run the following command:

```bash
yarn lint:fix
```

### Testing

At the moment we are using Jest to perform unit tests.

To run the tests, use the following command:

```bash
yarn test
```

### Pull Requests

Basic PR structure:

`your-branch` -> `develop` -> `staging` -> `production`

When a PR is made to either `staging` or `production`, a github action will be triggered in which code formatting and unittests are run.
If the workflow fails, it will not be possible to merge neither with staging nor master.


# Deployment

## Deploy to expo
```bash
expo publish --release-channel develop
expo publish --release-channel rocket
```

## Deploy to Test Flight

### Build

`Dev`
```bash
expo build:ios --release-channel develop
```

`Production`
```bash
expo build:ios --release-channel rocket
```