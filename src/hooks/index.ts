import { useRef, useEffect, useState } from 'react';
import { WebviewRef } from '../env/components/Pages/Home';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

import * as Notifications from 'expo-notifications';
import { getBadgeCountAsync } from 'expo-notifications';

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

export const useGetToken = (webviewRef: WebviewRef) => {
  const tokenRef = useRef<string>();
  const [hasSent, setHasSent] = useState(false);

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

    if (webviewRef.current && tokenRef.current && !hasSent) {
      webviewRef.current.postMessage(
        JSON.stringify({
          devicePushToken: tokenRef.current,
        }),
      );
      setHasSent(true);
    }
  }, [webviewRef.current, tokenRef.current, hasSent]);
};

export const useGetBadgeCount = (webviewRef: WebviewRef) => {
  const badgeCountRef = useRef<number>();
  const [hasSent, setHasSent] = useState(false);

  useEffect(() => {
    getBadgeCountAsync().then((count) => {
      console.log('count!', count);
      if (typeof count === 'number') {
        badgeCountRef.current = count;
      }
    });

    if (
      webviewRef.current &&
      typeof badgeCountRef.current !== 'undefined' &&
      !hasSent
    ) {
      webviewRef.current.postMessage(
        JSON.stringify({
          deviceBadgeCount: badgeCountRef.current,
        }),
      );
      setHasSent(true);
    }
  }, [webviewRef.current, badgeCountRef.current, hasSent]);
};
