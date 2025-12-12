import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const WorkoutLogScreen = ({ navigation }) => {
    const [exercise, setExercise] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [workoutLog, setWorkoutLog] = useState([
        { id: '1', exercise: 'Bench Press', sets: '3', reps: '10', weight: '135 lbs', date: '2023-10-26' },
        { id: '2', exercise: 'Squat', sets: '4', reps: '8', weight: '185 lbs', date: '2023-10-25' },
    ]);

    const handleAddLog = () => {
        if (exercise && sets && reps && weight) {
            const newLog = {
                id: Date.now().toString(),
                exercise,
                sets,
                reps,
                weight: `${weight} lbs`,
                date: new Date().toISOString().split('T')[0],
            };
            setWorkoutLog([newLog, ...workoutLog]);
            setExercise('');
            setSets('');
            setReps('');
            setWeight('');
        }
    };

    const renderItem = ({ item }) => (
        <View className="bg-gray-800 p-4 rounded-lg mb-3 border border-gray-700">
            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-white text-lg font-bold">{item.exercise}</Text>
                <Text className="text-gray-400 text-sm">{item.date}</Text>
            </View>
            <View className="flex-row justify-between">
                <Text className="text-gray-300">Sets: {item.sets}</Text>
                <Text className="text-gray-300">Reps: {item.reps}</Text>
                <Text className="text-gray-300">Weight: {item.weight}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-900">
            <StatusBar style="light" />
            <View className="p-6">
                <View className="flex-row items-center mb-6">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-3xl font-bold text-white">Workout Log</Text>
                </View>

                <View className="bg-gray-800 p-4 rounded-xl mb-6 border border-gray-700">
                    <Text className="text-xl font-semibold text-white mb-4">Log New Set</Text>
                    <TextInput
                        className="bg-gray-700 text-white p-3 rounded-lg mb-3"
                        placeholder="Exercise Name"
                        placeholderTextColor="#9CA3AF"
                        value={exercise}
                        onChangeText={setExercise}
                    />
                    <View className="flex-row justify-between mb-3">
                        <TextInput
                            className="bg-gray-700 text-white p-3 rounded-lg w-[30%]"
                            placeholder="Sets"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="numeric"
                            value={sets}
                            onChangeText={setSets}
                        />
                        <TextInput
                            className="bg-gray-700 text-white p-3 rounded-lg w-[30%]"
                            placeholder="Reps"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="numeric"
                            value={reps}
                            onChangeText={setReps}
                        />
                        <TextInput
                            className="bg-gray-700 text-white p-3 rounded-lg w-[30%]"
                            placeholder="Lbs"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="numeric"
                            value={weight}
                            onChangeText={setWeight}
                        />
                    </View>
                    <TouchableOpacity
                        className="bg-blue-600 p-3 rounded-lg items-center"
                        onPress={handleAddLog}
                    >
                        <Text className="text-white font-bold text-lg">Add Log</Text>
                    </TouchableOpacity>
                </View>

                <Text className="text-2xl font-bold text-white mb-4">Recent Workouts</Text>
                <FlatList
                    data={workoutLog}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};

export default WorkoutLogScreen;
