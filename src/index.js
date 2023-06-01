import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Register,
  Login,
  Home,
  Profile,
  EditProfile,
  History,
  TodoList,
} from './screens';
import color from './themes';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthenticationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: color.brown,
        drawerActiveTintColor: color.white,
        drawerInactiveTintColor: color.grey,
        drawerStyle: {
          backgroundColor: color.white,
          width: '70%',
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="home"
              size={size}
              color={focused ? color.white : color.brown}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="History"
        component={History}
        options={{
          title: 'Attendance History',
          headerShown: true,
          drawerIcon: ({focused, size}) => (
            <Icon
              name="calendar-clock"
              size={size}
              color={focused ? color.white : color.brown}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="TodoList"
        component={TodoList}
        options={{
          title: 'To-Do List',
          headerShown: true,
          drawerIcon: ({focused, size}) => (
            <Icon
              name="pencil-outline"
              size={size}
              color={focused ? color.white : color.brown}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'My Profile',
          headerShown: true,
          drawerIcon: ({focused, size}) => (
            <Icon
              name="account"
              size={size}
              color={focused ? color.white : color.brown}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
      }}>
      <Stack.Screen name="Drawer" component={MyDrawer} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};
const App = () => {
  const [loading, setLoading] = useState(true); //loading flag to return loading page
  const [user, setUser] = useState();

  // Handle user state changes
  async function onAuthStateChanged(firebaseUser) {
    console.log('user', firebaseUser.email);
    if (firebaseUser) {
      let response = await fetch('http://10.3.0.197/signIn.php', {
        method: 'POST',
        body: JSON.stringify({
          email: firebaseUser.email,
        }),
      });
      if (response.status === 200) {
        setUser(firebaseUser);
      }
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged); //subscriber to listen to user changes
    return subscriber; // unsubscribe on unmount
  }, []);

  return <>{!user ? <AuthenticationStack /> : <AppStack />}</>; //!user === null user(means user either not signed in or signed out)
};

export default App;
