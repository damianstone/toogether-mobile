export const SETTINGS_ACCOUNT_DATA = [
  {
    id: 'blocked-users',
    action: {
      type: 'NAVIGATE_TO_SCREEN',
      screen: 'Blocked',
    },
    icon: 'user-x',
    feather: true,
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
      url: 'https://toogether.app/privacy-policy',
    },
    icon: 'lock-closed-outline',
    ionicons: true,
    title: 'Privacy',
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
    title: 'FAQ',
  },
  {
    id: 'terms-of-conditions',
    action: {
      type: 'REDIRECT_TO_URL',
      url: 'https://toogether.app/terms-and-conditions',
    },
    icon: 'warning',
    antdesign: true,
    title: 'Terms and conditions',
  },
  {
    id: 'community-guidelines',
    action: {
      type: 'REDIRECT_TO_URL',
      url: 'https://toogether.app/community-guidelines',
    },
    icon: 'team',
    antdesign: true,
    title: 'Community guidelines',
  },
  {
    id: 'safety-tips',
    action: {
      type: 'REDIRECT_TO_URL',
      url: 'https://toogether.app/safety-tips',
    },
    icon: 'Safety',
    antdesign: true,
    title: 'Safety tips',
  },
  {
    id: 'about-us',
    action: {
      type: 'REDIRECT_TO_URL',
      url: 'https://toogether.app/',
    },
    icon: 'alert-circle',
    feather: true,
    title: 'About',
  },
  {
    id: 'contact-us',
    action: {
      type: 'REDIRECT_TO_URL',
      url: 'https://toogether.app/',
    },
    icon: 'grid',
    feather: true,
    title: 'Contact',
  },
];
