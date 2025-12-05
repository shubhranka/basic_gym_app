import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight } from 'lucide-react-native';
import { styled } from 'nativewind';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const HomeScreen = ({ navigation }) => {
    return (
        <StyledView className="flex-1 bg-zinc-950 relative">
            {/* Abstract Background Shapes */}
            <StyledView className="absolute top-0 right-0 w-64 h-64 bg-zinc-900 rounded-full opacity-30 translate-x-1/2 -translate-y-1/2" />
            <StyledView className="absolute bottom-0 left-0 w-48 h-48 bg-lime-900 rounded-full opacity-20 -translate-x-1/3 translate-y-1/3" />

            <StyledSafeAreaView className="flex-1 px-6 pt-20 justify-center">
                <View>
                    <StyledText className="text-6xl font-black text-white tracking-tighter leading-tight mb-8">
                        BUILD <StyledText className="text-lime-400">CHAOS.</StyledText>{'\n'}
                        FIND <StyledText className="text-zinc-700">PEACE.</StyledText>
                    </StyledText>

                    <StyledView className="border-l-2 border-lime-400 pl-6 mb-12">
                        <StyledText className="text-zinc-400 text-lg font-light tracking-wide">
                            The neighborhood studio for the modern athlete. No contracts. Pure kinetic energy. Digital access.
                        </StyledText>
                    </StyledView>

                    <StyledView className="gap-6">
                        <StyledTouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                            className="bg-lime-400 px-8 py-4 flex-row items-center justify-center"
                        >
                            <StyledText className="text-zinc-950 font-black text-lg uppercase tracking-wider mr-2">Start Now</StyledText>
                            <ArrowRight color="#09090b" size={20} />
                        </StyledTouchableOpacity>

                        <StyledTouchableOpacity
                            onPress={() => navigation.navigate('Benefits')}
                            className="border border-zinc-700 px-8 py-4 items-center justify-center"
                        >
                            <StyledText className="text-white font-bold text-lg uppercase tracking-wider">Explore Schedule</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                </View>
            </StyledSafeAreaView>
        </StyledView>
    );
};

export default HomeScreen;
