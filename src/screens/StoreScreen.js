import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const StoreScreen = ({ navigation }) => {
    const [cart, setCart] = useState([]);
    const [products] = useState([
        { id: '1', name: 'Whey Protein', price: 49.99, image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
        { id: '2', name: 'Gym T-Shirt', price: 24.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
        { id: '3', name: 'Pre-Workout', price: 39.99, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
        { id: '4', name: 'Shaker Bottle', price: 14.99, image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    ]);

    const addToCart = (product) => {
        setCart([...cart, product]);
        Alert.alert("Added to Cart", `${product.name} has been added to your cart.`);
    };

    const renderItem = ({ item }) => (
        <View className="bg-gray-800 rounded-xl mb-4 overflow-hidden border border-gray-700 w-[48%] mr-[2%]">
            <Image source={{ uri: item.image }} className="w-full h-32" resizeMode="cover" />
            <View className="p-3">
                <Text className="text-white text-base font-bold mb-1" numberOfLines={1}>{item.name}</Text>
                <Text className="text-green-400 font-bold mb-2">${item.price}</Text>
                <TouchableOpacity
                    className="bg-blue-600 p-2 rounded-lg items-center"
                    onPress={() => addToCart(item)}
                >
                    <Text className="text-white font-bold text-sm">Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-900">
            <StatusBar style="light" />
            <View className="flex-1 p-4">
                <View className="flex-row items-center justify-between mb-6">
                    <View className="flex-row items-center">
                        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                        <Text className="text-3xl font-bold text-white">Store</Text>
                    </View>
                    <View className="relative">
                        <Ionicons name="cart" size={28} color="white" />
                        {cart.length > 0 && (
                            <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                                <Text className="text-white text-xs font-bold">{cart.length}</Text>
                            </View>
                        )}
                    </View>
                </View>

                <FlatList
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};

export default StoreScreen;
