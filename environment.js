import Constants from 'expo-constants';
import { ROCKET_URL, LOCAL_URL } from '@env';
const ENV = {
  develop: {
    API_URL: String(LOCAL_URL),
    DEVELOP: true,
  },
  rocket: {
    API_URL: String(ROCKET_URL),
    DEVELOP: false,
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.develop;
  } else if (env === 'rocket') {
    return ENV.rocket;
  }
};

export default getEnvVars;
