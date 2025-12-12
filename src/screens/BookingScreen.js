import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const BookingScreen = ({ navigation }) => {
    const [classes, setClasses] = useState([
        { id: '1', name: 'Yoga Flow', time: '10:00 AM', instructor: 'Sarah', capacity: 20, booked: 15, isBooked: false },
        { id: '2', name: 'HIIT Blast', time: '12:00 PM', instructor: 'Mike', capacity: 15, booked: 15, isBooked: false },
        { id: '3', name: 'Spin Class', time: '5:00 PM', instructor: 'Jen', capacity: 25, booked: 10, isBooked: false },
        { id: '4', name: 'Zumba', time: '6:30 PM', instructor: 'Leo', capacity: 30, booked: 5, isBooked: false },
    ]);

    const handleBook = (id) => {
        setClasses(classes.map(cls => {
            if (cls.id === id) {
                if (cls.isBooked) {
                    Alert.alert("Booking Cancelled", `You have cancelled your spot in ${cls.name}.`);
                    return { ...cls, booked: cls.booked - 1, isBooked: false };
                } else {
                    if (cls.booked >= cls.capacity) {
                        Alert.alert("Class Full", "Sorry, this class is fully booked.");
                        return cls;
                    }
                    Alert.alert("Booking Confirmed", `You have booked a spot in ${cls.name}.`);
                    return { ...cls, booked: cls.booked + 1, isBooked: true };
                }
            }
            return cls;
        }));
    };

    const renderItem = ({ item }) => (
        <View className="bg-gray-800 p-4 rounded-lg mb-3 border border-gray-700">
            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-white text-lg font-bold">{item.name}</Text>
                <View className={`px-2 py-1 rounded ${item.booked >= item.capacity ? 'bg-red-500' : 'bg-green-500'}`}>
                    <Text className="text-white text-xs font-bold">
                        {item.booked >= item.capacity ? 'FULL' : 'OPEN'}
                    </Text>
                </View>
            </View>
            <Text className="text-gray-400 mb-1">Time: {item.time}</Text>
            <Text className="text-gray-400 mb-1">Instructor: {item.instructor}</Text>
            <Text className="text-gray-400 mb-3">Spots: {item.booked}/{item.capacity}</Text>

            <TouchableOpacity
                className={`p-3 rounded-lg items-center ${item.isBooked ? 'bg-red-600' : (item.booked >= item.capacity ? 'bg-gray-600' : 'bg-blue-600')}`}
                onPress={() => handleBook(item.id)}
                disabled={!item.isBooked && item.booked >= item.capacity}
            >
                <Text className="text-white font-bold">
                    {item.isBooked ? 'Cancel Booking' : (item.booked >= item.capacity ? 'Class Full' : 'Book Now')}
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-900">
            <StatusBar style="light" />
            <View className="p-6 flex-1">
                <View className="flex-row items-center mb-6">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-3xl font-bold text-white">Class Booking</Text>
                </View>

                <FlatList
                    data={classes}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};

export default BookingScreen;
