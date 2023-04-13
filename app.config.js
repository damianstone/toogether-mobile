import dotenv from 'dotenv';
dotenv.config();

export default () => ({
  expo: {
    name: 'Toogether',
    description: 'Making university life more fun',
    slug: 'toogether-app',
    owner: 'damian_stone',
    privacy: 'public',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/toogether-icon.png',
    platforms: ['ios', 'android'],
    splash: {
      image: './assets/images/logo-2.png',
      resizeMode: 'contain',
      backgroundColor: '#1A1936',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    packagerOpts: {
      assetExts: ['png', 'js', 'jpg', 'tts'],
    },
    ios: {
      supportsTablet: false,
      bundleIdentifier: 'toogether.app', // just a placeholder, this can be changed in Xcode
      buildNumber: '1.0.5', // just a placeholder, this value needs to be changed in the ios native code (info.plist)
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/toogether-icon.png',
        backgroundColor: '#FFFFFF',
      },
      permissions: ['ACCESS_FINE_LOCATION', 'CAMERA', 'WRITE_EXTERNAL_STORAGE'],
      package: 'toogether.app',
      versionCode: 202303270, // Using the date + T (try number) format YYYYMMDDT as version code.
    },
    web: {
      favicon: './assets/images/toogether-icon.png',
    },
    extra: {
      MODE: process.env.MODE || null,
      ROCKET_API_URL: process.env.ROCKET_API_URL || null,
      IOS_LOCAL_URL: process.env.IOS_LOCAL_URL || null,
      ANDROID_LOCAL_URL: process.env.ANDROID_LOCAL_URL || null,
      eas: {
        projectId: '1bbdaff3-3c02-445d-97e6-bc150d65197e',
      },
    },
  },
});
