import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { Dumbbell, Users, Clock, Heart, Zap } from 'lucide-react-native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);

const BenefitsScreen = () => {
    const benefits = [
        {
            title: 'State-of-the-art Equipment',
            description: 'Train with the latest Technogym and Rogue Fitness gear designed for peak performance.',
            icon: <Dumbbell size={32} color="#a3e635" />,
        },
        {
            title: 'Expert Trainers',
            description: 'Get personalized guidance from certified professionals who are dedicated to your success.',
            icon: <Users size={32} color="#a3e635" />,
        },
        {
            title: '24/7 Access',
            description: 'Work out on your schedule with round-the-clock access to all facilities.',
            icon: <Clock size={32} color="#a3e635" />,
        },
        {
            title: 'Nutritional Guidance',
            description: 'Fuel your body right with customized meal plans and nutritional advice.',
            icon: <Heart size={32} color="#a3e635" />,
        },
        {
            title: 'Community Events',
            description: 'Join monthly challenges, workshops, and social events to stay motivated.',
            icon: <Zap size={32} color="#a3e635" />,
        },
    ];

    return (
        <StyledView className="flex-1 bg-zinc-900">
            <StyledSafeAreaView className="flex-1">
                <ScrollView className="px-6 py-8">
                    <StyledView className="mb-12 border-b border-zinc-800 pb-8">
                        <StyledText className="text-4xl font-black text-white tracking-tighter">
                            MEMBER <StyledText className="text-lime-400">BENEFITS</StyledText>
                        </StyledText>
                        <StyledText className="text-zinc-400 mt-2 text-lg">
                            Everything you need to crush your goals.
                        </StyledText>
                    </StyledView>

                    <StyledView className="gap-6 pb-20">
                        {benefits.map((benefit, index) => (
                            <StyledView key={index} className="bg-zinc-950 p-6 rounded-xl border border-zinc-800">
                                <StyledView className="flex-row items-center mb-4">
                                    <StyledView className="bg-zinc-900 p-3 rounded-full mr-4">
                                        {benefit.icon}
                                    </StyledView>
                                    <StyledText className="text-xl font-bold text-white flex-1">
                                        {benefit.title}
                                    </StyledText>
                                </StyledView>
                                <StyledText className="text-zinc-400 leading-relaxed">
                                    {benefit.description}
                                </StyledText>
                            </StyledView>
                        ))}
                    </StyledView>
                </ScrollView>
            </StyledSafeAreaView>
        </StyledView>
    );
};

export default BenefitsScreen;
