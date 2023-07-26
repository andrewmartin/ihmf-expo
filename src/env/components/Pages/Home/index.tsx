import { MutableRefObject, useCallback, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { useGetBadgeCount, useGetToken } from '../../../../hooks';

type Props = {
  path?: string;
};

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(241, 241, 241)',
  },
});

export type WebviewRef =
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

export const WebviewPage = (props: Props) => {
  const webviewRef = useRef<WebviewRef>();

  const [path, setUrl] = useState<string | undefined>(undefined);

  useGetToken(webviewRef);
  useGetBadgeCount(webviewRef);

  useFocusEffect(
    useCallback(() => {
      setUrl(props.path || '/');

      return () => {
        setUrl(undefined);
      };
    }, [path]),
  );

  const uri = `${process.env.EXPO_PUBLIC_SITE_URL as string}${path}`;

  if (!path) {
    return null;
  }

  return (
    <WebView
      ref={webviewRef}
      cacheEnabled={true}
      originWhitelist={['*']}
      source={{
        uri,
      }}
    />
  );
};
