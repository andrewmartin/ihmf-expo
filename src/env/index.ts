import * as Updates from 'expo-updates';

export const getEnvironment = () => {
    console.log('Updates.releaseChannel', Updates.releaseChannel)

    console.log('process.env', process.env)

  if (Updates.releaseChannel.startsWith('prod')) {
    return { envName: 'PRODUCTION', dbUrl: 'ccc', apiKey: 'ddd' }; // prod env
  } else if (Updates.releaseChannel.startsWith('staging')) {
    // matches staging-v1, staging-v2
    return { envName: 'STAGING', dbUrl: 'eee', apiKey: 'fff' }; // stage env settings
  } else {
    // assume any other release channel is development
    return { envName: 'DEVELOPMENT', dbUrl: 'aaa', apiKey: 'bbb' }; // dev env settings
  }
}
