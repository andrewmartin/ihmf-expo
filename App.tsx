import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { ENVIRONMENT } from './src/env';

export default function App() {
  console.log(
    'process.env.EXPO_PUBLIC_SITE_URI',
    process.env.EXPO_PUBLIC_SITE_URI,
  );

  return (
    <WebView
      style={styles.container}
      originWhitelist={['*']}
      source={{
        uri: `${process.env.EXPO_PUBLIC_SITE_URI}`,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
