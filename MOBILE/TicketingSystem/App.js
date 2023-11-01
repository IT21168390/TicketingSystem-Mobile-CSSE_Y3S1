// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import TabNavigation from './App/Navigations/TabNavigation';
// import AuthNavigator from './App/Navigations/AuthNavigator';
// import { createStackNavigator } from '@react-navigation/stack';
// import LoginScreen from './App/Screens/Auth/LoginScreen';
// import RegistrationScreen from './App/Screens/Auth/RegisterScreen';

// const AuthStack = createStackNavigator();

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <NavigationContainer>
//         <TabNavigation />
//         {/* <AuthStack.Navigator initialRouteName="bottombNavigation" screenOptions={{ headerShown: false }}>
//           <AuthStack.Screen name="bottombNavigation" component={TabNavigation} />
//           <AuthStack.Screen name="Login" component={LoginScreen} />
//           <AuthStack.Screen name="Register" component={RegistrationScreen} />
//         </AuthStack.Navigator> */}
//       </NavigationContainer>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });


import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './App/Screens/Auth/LoginScreen';
import RegistrationScreen from './App/Screens/Auth/RegisterScreen';
import ConductorMain from './App/Screens/Conductor/ConductorMain';
import InspectorMain from './App/Screens/Inspector/InspectorMain';
import Home from './App/Screens/Home';

export default function App() {

  const TabNavs = createBottomTabNavigator();
  const AuthStack = createStackNavigator();

  const AuthNavigator = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegistrationScreen} />
    </AuthStack.Navigator>
  );

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <TabNavs.Navigator screenOptions={{ headerShown: false }}>
          <TabNavs.Screen name="Home" component={Home} options={{ tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => (<Ionicons name='ios-home' size={size} color={color} />) }} />
          <TabNavs.Screen name="Inspector" component={InspectorMain} options={{ tabBarLabel: 'Inspect', tabBarIcon: ({ color }) => (<Ionicons name="ios-shield-checkmark-sharp" size={30} color={color} />) }} />
          <TabNavs.Screen name="Conductor" component={ConductorMain} options={{ tabBarLabel: 'Mark', tabBarIcon: ({ color }) => (<Ionicons name="pencil" size={30} color={color} />) }} />
          {/* <TabNavs.Screen name="Login" component={LoginScreen} options={{ tabBarLabel: 'Account', tabBarIcon: ({ color }) => (<Ionicons name="log-in" size={24} color={color} />) }} /> */}
          <TabNavs.Screen
            name="AuthNavigator"
            component={AuthNavigator}
            options={{
              tabBarLabel: 'Account',
              tabBarIcon: ({ color }) => (
                <Ionicons name="log-in" size={30} color={color} />
              ),
            }}
          />
        </TabNavs.Navigator>
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});