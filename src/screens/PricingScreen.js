import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);

const PricingScreen = () => {
    const plans = [
        { name: 'DROP IN', price: '$15', period: '/visit', features: ['Gym Access', 'Locker Room'] },
        { name: 'MONTHLY', price: '$45', period: '/month', features: ['Unlimited Access', 'All Benefits', 'Guest Pass (1)', 'No Contract'], highlight: true },
        { name: 'ANNUAL', price: '$450', period: '/year', features: ['All Monthly Perks', 'Personal Training Session', 'Merch Pack', 'Priority Booking'] }
    ];

    return (
        <StyledView className="flex-1 bg-white">
            <StyledSafeAreaView className="flex-1">
                <ScrollView className="px-6 py-8">
                    <StyledView className="mb-12">
                        <StyledText className="text-5xl font-black text-zinc-950 tracking-tighter leading-none mb-6">
                            SIMPLIFIED{'\n'}ACCESS.
                        </StyledText>
                        <StyledText className="text-xl text-zinc-500 font-light">
                            We don't believe in hidden fees or impossible contracts. Choose your intensity.
                        </StyledText>
                    </StyledView>

                    <StyledView className="gap-8 pb-20">
                        {plans.map((plan) => (
                            <StyledView
                                key={plan.name}
                                className={`p-8 border-2 ${plan.highlight ? 'bg-zinc-950 border-zinc-950 shadow-2xl' : 'bg-transparent border-zinc-200'}`}
                            >
                                <StyledText className="text-sm font-black tracking-widest uppercase mb-4 text-lime-600">{plan.name}</StyledText>
                                <StyledView className="mb-8 flex-row items-baseline">
                                    <StyledText className={`text-6xl font-black tracking-tighter ${plan.highlight ? 'text-white' : 'text-zinc-950'}`}>{plan.price}</StyledText>
                                    <StyledText className={`text-sm font-mono ml-2 ${plan.highlight ? 'text-zinc-500' : 'text-zinc-400'}`}>{plan.period}</StyledText>
                                </StyledView>

                                <StyledView className="space-y-4 mb-8">
                                    {plan.features.map((f) => (
                                        <StyledView key={f} className="flex-row items-center">
                                            <StyledView className={`h-1.5 w-1.5 mr-3 ${plan.highlight ? 'bg-lime-400' : 'bg-zinc-950'}`} />
                                            <StyledText className={`text-sm font-bold tracking-wide ${plan.highlight ? 'text-white' : 'text-zinc-950'}`}>{f}</StyledText>
                                        </StyledView>
                                    ))}
                                </StyledView>

                                <StyledTouchableOpacity
                                    className={`w-full py-4 items-center ${plan.highlight ? 'bg-lime-400' : 'bg-zinc-100'}`}
                                >
                                    <StyledText className={`text-sm font-black uppercase tracking-widest ${plan.highlight ? 'text-zinc-950' : 'text-zinc-950'}`}>
                                        Select Plan
                                    </StyledText>
                                </StyledTouchableOpacity>
                            </StyledView>
                        ))}
                    </StyledView>
                </ScrollView>
            </StyledSafeAreaView>
        </StyledView>
    );
};

export default PricingScreen;
