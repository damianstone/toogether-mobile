export const SETTINGS_ACCOUNT_DATA = [
  {
    id: 'blocked-users',
    action: {
      type: 'NAVIGATE_TO_SCREEN',
      screen: 'blocked_users',
    },
    icon: 'users-slash',
    fontawesome: true,
    title: 'Blocked users',
  },
  {
    id: 'delete-account',
    action: {
      type: 'DELETE_ACCOUNT',
      action_type: 'delete',
      alert_data: {
        title: 'Are you sure you want to delete your account?',
        text: 'All your data will be deleted forever',
        cancelButtonText: 'Keep my account',
        okButtonText: 'Delete',
      },
    },
    icon: 'deleteuser',
    antdesign: true,
    title: 'Delete account',
  },
  {
    id: 'privacy-policy',
    action: {
      type: 'REDIRECT_TO_URL',
      url: 'https://toogether.app/',
    },
    icon: 'Safety',
    antdesign: true,
    title: 'How we secure your data',
  },
];

export const SETTINGS_APP_DATA = [
  {
    id: 'share-app',
    action: {
      type: 'SHARE_APP',
    },
    icon: 'share-outline',
    ionicons: true,
    title: 'Share app',
  },
  {
    id: 'FAQ',
    action: {
      type: 'REDIRECT_TO_URL',
      url: 'https://toogether.app/',
    },
    icon: 'chat-question-outline',
    materialcommunityicons: true,
    title: 'Frequently asked questions',
  },
  {
    id: 'terms-of-use',
    action: {
      type: 'REDIRECT_TO_URL',
      url: 'https://toogether.app/',
    },
    icon: 'users-slash',
    title: 'Terms of use',
  },
  {
    id: 'community-guidelines',
    action: {
      type: 'REDIRECT_TO_URL',
      url: 'https://toogether.app/',
    },
    icon: 'users-slash',
    title: 'Community guidelines',
  },
  {
    id: 'safety-tips',
    action: {
      type: 'REDIRECT_TO_URL',
      url: 'https://toogether.app/',
    },
    icon: 'users-slash',
    title: 'Safety tips',
  },
  {
    id: 'about-us',
    action: {
      type: 'REDIRECT_TO_URL',
      url: 'https://toogether.app/',
    },
    icon: 'users-slash',
    title: 'About us',
  },
  {
    id: 'contact-us',
    action: {
      type: 'REDIRECT_TO_URL',
      url: 'https://toogether.app/',
    },
    icon: 'users-slash',
    title: 'Contact us',
  },
  {
    id: 'version',
    action: {
      type: null,
    },
    icon: 'users-slash',
    title: 'Version: 1.0.0',
  },
];
