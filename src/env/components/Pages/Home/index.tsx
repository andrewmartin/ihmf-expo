import { MutableRefObject, useRef } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { useGetBadgeCount, useGetToken } from '../../../../hooks';

type Props = {};

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

export const Home = (props: Props) => {
  const webviewRef = useRef<WebviewRef>();

  useGetToken(webviewRef);
  useGetBadgeCount(webviewRef);

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
