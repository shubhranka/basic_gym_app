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
import WorkoutLogScreen from '../screens/WorkoutLogScreen';
import BookingScreen from '../screens/BookingScreen';
import NutritionScreen from '../screens/NutritionScreen';
import ChatScreen from '../screens/ChatScreen';
import StoreScreen from '../screens/StoreScreen';
import BlogScreen from '../screens/BlogScreen';
import SuccessStoriesScreen from '../screens/SuccessStoriesScreen';

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
                <Stack.Screen name="WorkoutLog" component={WorkoutLogScreen} />
                <Stack.Screen name="Booking" component={BookingScreen} />
                <Stack.Screen name="Nutrition" component={NutritionScreen} />
                <Stack.Screen name="Chat" component={ChatScreen} />
                <Stack.Screen name="Store" component={StoreScreen} />
                <Stack.Screen name="Blog" component={BlogScreen} />
                <Stack.Screen name="SuccessStories" component={SuccessStoriesScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
