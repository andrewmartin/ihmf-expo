// https://reactnavigation.org/docs/stack-navigator/
import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { getEnvironment } from './src/env';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './src/env/components/Pages/Home';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

console.log('getEnvironment()', getEnvironment());

export default function App() {
  console.log(
    'process.env.EXPO_PUBLIC_SITE_URI',
    process.env.EXPO_PUBLIC_SITE_URI,
  );
  console.log(
    'process.env.EXPO_PUBLIC_SITE_URL 2',
    process.env.EXPO_PUBLIC_EXPO_PUBLIC_SITE_URL,
  );

  console.log('process.env', process.env);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home">
          {() => (
            <Tab.Navigator
              initialRouteName="Analytics"
              tabBar={() => null}
              screenOptions={{ headerShown: false }}
            >
              <Tab.Screen name="Analytics" component={Home} />
              <Tab.Screen name="Profile" component={Home} />
            </Tab.Navigator>
          )}
        </Stack.Screen>

        <Stack.Screen name="Settings" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(241, 241, 241)',
  },
});
