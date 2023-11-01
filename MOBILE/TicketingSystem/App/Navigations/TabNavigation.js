import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from '../Screens/Home';
import ConductorMain from '../Screens/Conductor/ConductorMain';
import InspectorMain from '../Screens/Inspector/InspectorMain';
import LoginScreen from '../Screens/Auth/LoginScreen';
import RegistrationScreen from '../Screens/Auth/RegisterScreen';

const TabNavigation = () => {
    const [userRole, setUserRole] = useState('');

    const TabNavs = createBottomTabNavigator();
    const AuthStack = createStackNavigator();

    useEffect(() => {
        // Fetch the user's role from storage or app state
        const fetchUserRole = async () => {
            const role = await AsyncStorage.getItem('userRole');
            setUserRole(role);
        };

        fetchUserRole();
    }, []);

    const AuthNavigator = () => (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegistrationScreen} />
        </AuthStack.Navigator>
    );

    return (
        <TabNavs.Navigator screenOptions={{ headerShown: false }}>
            <TabNavs.Screen name="Home" component={Home} options={{ tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => (<Ionicons name='ios-home' size={size} color={color} />) }} />
            {userRole === 'INSPECTOR' && (<TabNavs.Screen name="Inspector" component={InspectorMain} options={{ tabBarLabel: 'Check', tabBarIcon: ({ color }) => (<Ionicons name="ios-shield-checkmark-sharp" size={24} color={color} />) }} />)}
            {userRole === 'CONDUCTOR' && (<TabNavs.Screen name="Conductor" component={ConductorMain} options={{ tabBarLabel: 'Mark', tabBarIcon: ({ color }) => (<Ionicons name="pencil" size={24} color={color} />) }} />)}
            {/* <TabNavs.Screen name="Login" component={LoginScreen} options={{ tabBarLabel: 'Account', tabBarIcon: ({ color }) => (<Ionicons name="log-in" size={24} color={color} />) }} /> */}
            <TabNavs.Screen
                name="AuthNavigator"
                component={AuthNavigator}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="log-in" size={24} color={color} />
                    ),
                }}
            />
        </TabNavs.Navigator>
    )
}

export default TabNavigation