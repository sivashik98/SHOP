const config = {
  expo: {
    name: 'shop',
    slug: 'shop',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'cover',
      backgroundColor: '#9C73F8FF',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bitcode: false,
      bundleIdentifier: 'com.sivashik98.shop',
      config: {
        usesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#9C73F8FF',
      },
      package: 'com.sivashik98.shop',
      permissions: ['android.permission.ACCESS_NETWORK_STATE', 'android.permission.INTERNET', 'android.permission.SYSTEM_ALERT_WINDOW'],
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      'expo-secure-store',
      [
        'expo-build-properties',
        {
          android: {
            networkInspector: true,
            usesCleartextTraffic: true,
          },
          ios: {
            useFrameworks: 'static',
          },
        },
      ],
    ],
    extra: {
      eas: {
        projectId: '299544e3-52cf-4ba7-bebc-2a2cf3e0e857',
      },
    },
  },
};

export default config;
