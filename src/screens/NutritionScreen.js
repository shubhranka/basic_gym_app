import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const NutritionScreen = ({ navigation }) => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [activityLevel, setActivityLevel] = useState('1.2');
    const [calories, setCalories] = useState(null);

    const calculateCalories = () => {
        if (weight && height && age) {
            let bmr;
            if (gender === 'male') {
                bmr = 10 * weight + 6.25 * height - 5 * age + 5;
            } else {
                bmr = 10 * weight + 6.25 * height - 5 * age - 161;
            }
            const tdee = Math.round(bmr * parseFloat(activityLevel));
            setCalories(tdee);
        }
    };

    const mealPlans = [
        {
            id: '1',
            title: 'Muscle Gain',
            calories: '3000 kcal',
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
            description: 'High protein, moderate carb plan for building muscle mass.',
        },
        {
            id: '2',
            title: 'Fat Loss',
            calories: '1800 kcal',
            image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
            description: 'Balanced macros with a calorie deficit for sustainable weight loss.',
        },
        {
            id: '3',
            title: 'Maintenance',
            calories: '2400 kcal',
            image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
            description: 'Healthy mix of nutrients to maintain current body weight.',
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-gray-900">
            <StatusBar style="light" />
            <ScrollView className="p-6">
                <View className="flex-row items-center mb-6">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-3xl font-bold text-white">Nutrition</Text>
                </View>

                <View className="bg-gray-800 p-4 rounded-xl mb-6 border border-gray-700">
                    <Text className="text-xl font-semibold text-white mb-4">Calorie Calculator</Text>

                    <View className="flex-row justify-between mb-3">
                        <TextInput
                            className="bg-gray-700 text-white p-3 rounded-lg w-[30%]"
                            placeholder="Wgt (kg)"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="numeric"
                            value={weight}
                            onChangeText={setWeight}
                        />
                        <TextInput
                            className="bg-gray-700 text-white p-3 rounded-lg w-[30%]"
                            placeholder="Hgt (cm)"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="numeric"
                            value={height}
                            onChangeText={setHeight}
                        />
                        <TextInput
                            className="bg-gray-700 text-white p-3 rounded-lg w-[30%]"
                            placeholder="Age"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="numeric"
                            value={age}
                            onChangeText={setAge}
                        />
                    </View>

                    <View className="flex-row mb-3 bg-gray-700 rounded-lg p-1">
                        <TouchableOpacity
                            className={`flex-1 p-2 rounded-md ${gender === 'male' ? 'bg-blue-600' : ''}`}
                            onPress={() => setGender('male')}
                        >
                            <Text className="text-white text-center font-bold">Male</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`flex-1 p-2 rounded-md ${gender === 'female' ? 'bg-pink-600' : ''}`}
                            onPress={() => setGender('female')}
                        >
                            <Text className="text-white text-center font-bold">Female</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        className="bg-green-600 p-3 rounded-lg items-center mb-4"
                        onPress={calculateCalories}
                    >
                        <Text className="text-white font-bold text-lg">Calculate</Text>
                    </TouchableOpacity>

                    {calories && (
                        <View className="items-center bg-gray-900 p-4 rounded-lg border border-green-500">
                            <Text className="text-gray-400 text-sm uppercase">Daily Target</Text>
                            <Text className="text-3xl font-bold text-green-400">{calories} kcal</Text>
                        </View>
                    )}
                </View>

                <Text className="text-2xl font-bold text-white mb-4">Suggested Meal Plans</Text>
                {mealPlans.map((plan) => (
                    <View key={plan.id} className="bg-gray-800 rounded-xl mb-4 overflow-hidden border border-gray-700">
                        <Image source={{ uri: plan.image }} className="w-full h-32" />
                        <View className="p-4">
                            <View className="flex-row justify-between items-center mb-2">
                                <Text className="text-white text-lg font-bold">{plan.title}</Text>
                                <Text className="text-green-400 font-bold">{plan.calories}</Text>
                            </View>
                            <Text className="text-gray-400 text-sm">{plan.description}</Text>
                        </View>
                    </View>
                ))}
                <View className="h-10" />
            </ScrollView>
        </SafeAreaView>
    );
};

export default NutritionScreen;
