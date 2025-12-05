import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Activity } from 'lucide-react-native';
// import { signInWithEmailAndPassword } from 'firebase/auth'; // Disabled
// import { auth } from '../config/firebase'; // Disabled
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (role) => {
        // Mock login
        if (role === 'admin') {
            navigation.replace('Admin');
        } else {
            navigation.replace('MemberApp');
        }
    };

    return (
        <StyledView className="flex-1 bg-zinc-100 justify-center px-6">
            <StyledView className="bg-white p-8 shadow-2xl border-t-4 border-lime-400 rounded-lg">
                <StyledView className="mb-10">
                    <Activity className="text-zinc-950 mb-6" size={40} color="#09090b" />
                    <StyledText className="text-4xl font-black text-zinc-950 uppercase">Portal Access</StyledText>
                    <StyledText className="text-zinc-500 mt-2">Enter your credentials to proceed.</StyledText>
                </StyledView>

                <StyledView className="space-y-6">
                    <StyledView>
                        <StyledText className="text-xs font-bold text-zinc-900 uppercase mb-2">Email Address</StyledText>
                        <StyledTextInput
                            className="w-full px-4 py-3 bg-zinc-50 border-2 border-zinc-200 focus:border-lime-500 rounded-none"
                            placeholder="user@example.com"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                        />
                    </StyledView>
                    <StyledView>
                        <StyledText className="text-xs font-bold text-zinc-900 uppercase mb-2">Password</StyledText>
                        <StyledTextInput
                            className="w-full px-4 py-3 bg-zinc-50 border-2 border-zinc-200 focus:border-lime-500 rounded-none"
                            placeholder="••••••••"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </StyledView>

                    <StyledView className="flex-row gap-4 pt-4">
                        <StyledTouchableOpacity
                            onPress={() => handleLogin('member')}
                            className="flex-1 py-4 bg-zinc-950 items-center justify-center"
                        >
                            <StyledText className="text-white text-xs font-bold uppercase">Member Login</StyledText>
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity
                            onPress={() => handleLogin('admin')}
                            className="flex-1 py-4 border-2 border-zinc-200 items-center justify-center"
                        >
                            <StyledText className="text-zinc-950 text-xs font-bold uppercase">Admin Login</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>
            </StyledView>
        </StyledView>
    );
};

export default LoginScreen;
