/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ActivityIndicator, ColorSchemeName, Pressable, StyleSheet, View,StatusBar } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import Bus from '../screens/BusScreen';
import Infos from '../screens/Infos';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      {/* <Stack.Screen name="Root" component={Infos} options={{ title: 'Oops!' }} /> */}

      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#9C27B0',
        tabBarInactiveTintColor: '#777',
        tabBarShowLabel: false,
        headerStyle:{
          backgroundColor: "#9C27B0",
        },
        headerTitleStyle:{
          color: "#fff"
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'user';
              break;
            case 'Bus':
              iconName = 'mapPin';
              break;
            case 'Infos':
              iconName = 'info';
              break;
            case 'Map':
              iconName = 'map-pin';
              break;

            default:
              iconName = 'circle';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Minhas Informações',
          headerBackground: (()=>(
            <View>
            <LinearGradient
              style={styles.tabBarHeader}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              colors={['#D500F9', '#4A148C']}
            >
            </LinearGradient>

          </View>
          ))
        })}
      />
    
      <BottomTab.Screen
        name="Bus"
        component={Bus}
        options={() => ({
          title: 'Viajar',
          tabBarIcon: ({ color, focused }) => (
            <View>
              <LinearGradient
                style={styles.iconTabRound}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                colors={['#D500F9', '#4A148C']}
              >
                <FontAwesome name="bus" size={26} color="#fff" />
              </LinearGradient>

              <Icon name="plus" size={26} color={Colors[colorScheme].text} />
            </View>
          ),
          headerBackground: (()=>(
            <View>
            <LinearGradient
              style={styles.tabBarHeader}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              colors={['#D500F9', '#4A148C']}
            >
            </LinearGradient>

          </View>
          ))
        })}
      />

      <BottomTab.Screen
        name="Map"
        component={MapScreen}
        options={({ navigation }: RootTabScreenProps<'Map'>) => ({
          title: 'Rotas e paradas',
          headerBackground: (()=>(
            <View>
            <LinearGradient
              style={styles.tabBarHeader}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              colors={['#D500F9', '#4A148C']}
            >
            </LinearGradient>

          </View>
          ))
        })}
      />

      {/* <BottomTab.Screen
        name="Infos"
        component={Infos}
        options={({ navigation }: RootTabScreenProps<'Infos'>) => ({
          title: 'Informações',
          // tabBarIcon: ({ color }) => <Icon name="info" size={} color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                paddingRight: 10,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].white}
                // style={{ marginRight: 15, }}
              />
            </Pressable>
          ),
          headerBackground: (()=>(
            <View>
            <LinearGradient
              style={styles.tabBarHeader}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              colors={['#D500F9', '#4A148C']}
            >
            </LinearGradient>

          </View>
          ))
        })}
      /> */}
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {},
  tabBarHeader:{
    color: "#9C27B0",
    width: "100%",
    height: "100%"
  },
  iconTabRound: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#9C27B0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});
