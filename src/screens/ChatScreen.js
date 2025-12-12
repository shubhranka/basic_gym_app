import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatScreen = ({ navigation }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hey! How is your workout plan going?', sender: 'trainer', time: '10:00 AM' },
        { id: '2', text: 'It is going great! I just finished leg day.', sender: 'user', time: '10:05 AM' },
        { id: '3', text: 'Awesome! Remember to stretch.', sender: 'trainer', time: '10:06 AM' },
    ]);

    const handleSend = () => {
        if (message.trim()) {
            const newMessage = {
                id: Date.now().toString(),
                text: message,
                sender: 'user',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages([...messages, newMessage]);
            setMessage('');

            // Simulate trainer reply
            setTimeout(() => {
                const reply = {
                    id: (Date.now() + 1).toString(),
                    text: 'Great job! Keep it up!',
                    sender: 'trainer',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                };
                setMessages(prev => [...prev, reply]);
            }, 1000);
        }
    };

    const renderItem = ({ item }) => (
        <View className={`mb-3 max-w-[80%] p-3 rounded-lg ${item.sender === 'user' ? 'bg-blue-600 self-end' : 'bg-gray-700 self-start'}`}>
            <Text className="text-white text-base">{item.text}</Text>
            <Text className="text-gray-300 text-xs mt-1 self-end">{item.time}</Text>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-900">
            <StatusBar style="light" />
            <View className="flex-1">
                <View className="p-4 border-b border-gray-800 flex-row items-center bg-gray-900">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <View>
                        <Text className="text-xl font-bold text-white">Trainer Mike</Text>
                        <Text className="text-green-500 text-xs">Online</Text>
                    </View>
                </View>

                <FlatList
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ padding: 16 }}
                    className="flex-1"
                />

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
                    className="p-4 bg-gray-800 border-t border-gray-700 flex-row items-center"
                >
                    <TextInput
                        className="flex-1 bg-gray-700 text-white p-3 rounded-full mr-3 border border-gray-600"
                        placeholder="Type a message..."
                        placeholderTextColor="#9CA3AF"
                        value={message}
                        onChangeText={setMessage}
                    />
                    <TouchableOpacity
                        className="bg-blue-600 p-3 rounded-full"
                        onPress={handleSend}
                    >
                        <Ionicons name="send" size={20} color="white" />
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
};

export default ChatScreen;
