import Constants from 'expo-constants';
import { ROCKET_URL, LOCAL_URL } from '@env';

const ENV = {
  develop: {
    API_URL: String(LOCAL_URL),
    BUCKET_URL: 'https://toogether-images.s3.eu-west-2.amazonaws.com',
  },
  rocket: {
    API_URL: String(ROCKET_URL),
    BUCKET_URL: 'https://toogether-images.s3.eu-west-2.amazonaws.com',
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.develop;
  } else if (env === 'rocket') {
    return ENV.rocket;
  }
};

export default getEnvVars;
