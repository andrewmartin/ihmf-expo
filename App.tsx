// https://reactnavigation.org/docs/stack-navigator/
import 'react-native-gesture-handler';

import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { WebviewPage } from './src/env/components/Pages/Home';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'rgb(241, 241, 241)',
        height: '9%',
        justifyContent: 'space-evenly',
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({
              name: route.name,
              // merge: true,
              params: {},
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconMap = {
          Home: 'home',
          Events: 'calendar',
          Events2: 'calendar',
        } as any;

        return (
          <View key={`${label}`} style={{ marginLeft: 5, marginRight: 5 }}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingTop: 15,
              }}
            >
              <MaterialCommunityIcons
                color={isFocused ? '#CB3163' : '#222'}
                size={20}
                name={iconMap[label as any]}
              />
              <Text
                style={{
                  display: 'flex',
                  fontSize: 15,
                  color: isFocused ? '#CB3163' : '#222',
                }}
              >
                {label as string}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}></SafeAreaView>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          tabBar={(props) => <TabBar {...props} />}
          screenOptions={{ headerShown: false }}
        >
          <Tab.Screen name="Home">{() => <WebviewPage />}</Tab.Screen>
          <Tab.Screen name="Events">
            {() => <WebviewPage path="/events" />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(241, 241, 241)',
  },
});
