import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Activity, Calendar, DollarSign, Home } from 'lucide-react-native';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import BenefitsScreen from '../screens/BenefitsScreen';
import PricingScreen from '../screens/PricingScreen';
import MemberDashboard from '../screens/MemberDashboard';
import AdminDashboard from '../screens/AdminDashboard';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#09090b', // zinc-950
                    borderTopColor: '#27272a', // zinc-800
                },
                tabBarActiveTintColor: '#a3e635', // lime-400
                tabBarInactiveTintColor: '#71717a', // zinc-500
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />
                }}
            />
            <Tab.Screen
                name="Benefits"
                component={BenefitsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Activity color={color} size={size} />
                }}
            />
            <Tab.Screen
                name="Pricing"
                component={PricingScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <DollarSign color={color} size={size} />
                }}
            />
        </Tab.Navigator>
    );
};

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main" component={MainTabNavigator} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="MemberApp" component={MemberDashboard} />
                <Stack.Screen name="Admin" component={AdminDashboard} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
