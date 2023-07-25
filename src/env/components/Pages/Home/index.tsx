import { MutableRefObject, useEffect, useRef } from 'react';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { getEnvironment } from '../../..';

type Props = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(241, 241, 241)',
  },
});

type Ref =
  | React.LegacyRef<
      WebView<{
        ref: MutableRefObject<any>;
        cacheEnabled: false;
        originWhitelist: string[];
        source: {
          uri: string;
        };
      }>
    >
  | any; // TODO fix

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

const getDevicePushToken = async (): Promise<string | void> => {
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const tokenData = await Notifications.getDevicePushTokenAsync();
    console.log('tokenData:', JSON.stringify(tokenData, null, 2));
    return tokenData.data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
};

export const Home = (props: Props) => {
  const webviewRef = useRef<Ref>();
  const tokenRef = useRef<string>();

  console.log(
    'process.env.EXPO_PUBLIC_SITE_URL',
    process.env.EXPO_PUBLIC_SITE_URL,
  );

  useEffect(() => {
    if (!tokenRef.current) {
      getDevicePushToken().then((result) => {
        if (typeof result === 'string') {
          tokenRef.current = result;
        }
      });
    }

    if (webviewRef.current && tokenRef.current) {
      webviewRef.current.postMessage(
        JSON.stringify({
          devicePushToken: tokenRef.current,
        }),
      );
    }
  }, [webviewRef.current, tokenRef.current]);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webviewRef}
        cacheEnabled={false}
        originWhitelist={['*']}
        source={{
          uri: process.env.EXPO_PUBLIC_SITE_URL as string,
        }}
      />
    </SafeAreaView>
  );
};
