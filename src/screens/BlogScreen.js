import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const BlogScreen = ({ navigation }) => {
    const articles = [
        {
            id: '1',
            title: '5 Tips for Better Sleep',
            summary: 'Sleep is crucial for recovery. Here are 5 tips to improve your sleep quality.',
            image: 'https://images.unsplash.com/photo-1541781777621-af11875e4041?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
            date: 'Oct 25, 2023',
        },
        {
            id: '2',
            title: 'The Benefits of HIIT',
            summary: 'High-Intensity Interval Training can burn more calories in less time.',
            image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
            date: 'Oct 20, 2023',
        },
        {
            id: '3',
            title: 'Nutrition 101: Macros',
            summary: 'Understanding protein, carbs, and fats is key to reaching your goals.',
            image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
            date: 'Oct 15, 2023',
        },
    ];

    const renderItem = ({ item }) => (
        <View className="bg-gray-800 rounded-xl mb-6 overflow-hidden border border-gray-700">
            <Image source={{ uri: item.image }} className="w-full h-48" resizeMode="cover" />
            <View className="p-4">
                <Text className="text-gray-400 text-xs mb-1">{item.date}</Text>
                <Text className="text-white text-xl font-bold mb-2">{item.title}</Text>
                <Text className="text-gray-300 text-sm mb-3">{item.summary}</Text>
                <TouchableOpacity>
                    <Text className="text-green-400 font-bold">Read More</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-900">
            <StatusBar style="light" />
            <View className="flex-1 p-6">
                <View className="flex-row items-center mb-6">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-3xl font-bold text-white">Fitness Blog</Text>
                </View>

                <FlatList
                    data={articles}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};

export default BlogScreen;
