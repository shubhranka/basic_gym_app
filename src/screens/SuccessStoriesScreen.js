import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const SuccessStoriesScreen = ({ navigation }) => {
    const stories = [
        {
            id: '1',
            name: 'John Doe',
            achievement: 'Lost 30lbs in 3 months',
            beforeImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
            afterImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
            quote: "The trainers here pushed me beyond my limits. I couldn't have done it without them!",
        },
        {
            id: '2',
            name: 'Jane Smith',
            achievement: 'Ran her first marathon',
            beforeImage: 'https://images.unsplash.com/photo-1552674605-5d226f5afd7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
            afterImage: 'https://images.unsplash.com/photo-1552674605-5d226f5afd7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', // Placeholder for demo
            quote: "The running club community is amazing. They kept me motivated every single mile.",
        },
    ];

    const renderItem = ({ item }) => (
        <View className="bg-gray-800 rounded-xl mb-6 overflow-hidden border border-gray-700 p-4">
            <View className="flex-row justify-between mb-4">
                <View className="w-[48%]">
                    <Text className="text-gray-400 text-center mb-1">Before</Text>
                    <Image source={{ uri: item.beforeImage }} className="w-full h-40 rounded-lg" resizeMode="cover" />
                </View>
                <View className="w-[48%]">
                    <Text className="text-green-400 text-center mb-1">After</Text>
                    <Image source={{ uri: item.afterImage }} className="w-full h-40 rounded-lg" resizeMode="cover" />
                </View>
            </View>
            <Text className="text-white text-xl font-bold text-center mb-1">{item.name}</Text>
            <Text className="text-green-400 text-center font-bold mb-3">{item.achievement}</Text>
            <Text className="text-gray-300 text-center italic">"{item.quote}"</Text>
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
                    <Text className="text-3xl font-bold text-white">Success Stories</Text>
                </View>

                <FlatList
                    data={stories}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};

export default SuccessStoriesScreen;
