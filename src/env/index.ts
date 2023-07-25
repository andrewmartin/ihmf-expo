import * as Updates from 'expo-updates';
const SITE_URL = 'https://ihatemyfriends.app';

// .env seems buggy so we are using this method
export const getEnvironment = () => {
  console.log('process.env', process.env);
  console.log('Updates.releaseChannel', Updates.releaseChannel);

  if (Updates.releaseChannel.startsWith('prod')) {
    return {
      envName: 'PRODUCTION',
      siteUrl: SITE_URL,
    };
  } else if (Updates.releaseChannel.startsWith('staging')) {
    // matches staging-v1, staging-v2
    return {
      envName: 'STAGING',
      siteUrl: SITE_URL,
    };
  } else {
    return {
      envName: 'DEVELOPMENT',
      siteUrl: `http://Andrews-MBP.lan:3001`,
    };
  }
};
