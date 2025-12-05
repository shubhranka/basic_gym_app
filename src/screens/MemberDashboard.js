import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, LogOut } from 'lucide-react-native';
import { auth, db, appId } from '../config/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);

const MemberDashboard = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('card');
    const [formData, setFormData] = useState({ name: 'Demo User', phone: '', emergency: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const userId = auth.currentUser?.uid || 'demo-user';
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${userId}&color=000000&bgcolor=FFFFFF`;

    const handleLogout = () => {
        navigation.replace('Login');
    };

    const handleUpdate = async () => {
        setIsEditing(false);
    };

    return (
        <StyledView className="flex-1 bg-zinc-50">
            <StyledView className="bg-zinc-950 pt-16 pb-8 px-6 relative overflow-hidden">


                <StyledView className="flex-row justify-between items-end z-10">
                    <StyledView>
                        <StyledText className="text-zinc-500 text-xs font-mono uppercase mb-1">Welcome Back</StyledText>
                        <StyledText className="text-2xl font-black text-white uppercase truncate max-w-[200px]">{formData.name}</StyledText>
                    </StyledView>
                    <StyledView className="flex-row items-center gap-4">
                        <TouchableOpacity onPress={handleLogout}>
                            <LogOut color="#71717a" size={20} />
                        </TouchableOpacity>
                        <StyledView className="h-10 w-10 bg-lime-400 rounded-full items-center justify-center">
                            <StyledText className="font-black text-zinc-950">{formData.name.charAt(0)}</StyledText>
                        </StyledView>
                    </StyledView>
                </StyledView>
            </StyledView>

            <StyledView className="bg-zinc-950 px-6 pb-6">
                <StyledView className="flex-row bg-zinc-900 p-1 rounded-lg">
                    {['card', 'profile', 'alerts'].map(tab => (
                        <StyledTouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            className={`flex-1 py-2 items-center rounded-md ${activeTab === tab ? 'bg-zinc-800 shadow-lg' : ''}`}
                        >
                            <StyledText className={`text-[10px] font-bold uppercase ${activeTab === tab ? 'text-white' : 'text-zinc-500'}`}>
                                {tab}
                            </StyledText>
                        </StyledTouchableOpacity>
                    ))}
                </StyledView>
            </StyledView>

            <StyledScrollView className="flex-1 p-6">
                {activeTab === 'card' && (
                    <StyledView>
                        <StyledView className="bg-white p-6 rounded-2xl shadow-xl border border-zinc-100 relative overflow-hidden mb-6">
                            <StyledView className="absolute top-0 left-0 w-full h-2 bg-lime-400" />
                            <StyledView className="items-center justify-center py-8">
                                <StyledView className="bg-white p-2 rounded-lg border-2 border-zinc-950 mb-4">
                                    <StyledImage source={{ uri: qrUrl }} className="w-48 h-48" resizeMode="contain" />
                                </StyledView>
                                <StyledText className="font-mono text-zinc-400 text-xs uppercase">{userId.substring(0, 12)}</StyledText>
                            </StyledView>
                            <StyledView className="flex-row justify-between items-center border-t border-zinc-100 pt-4 mt-2">
                                <StyledView>
                                    <StyledText className="text-[10px] font-bold text-zinc-400 uppercase">Status</StyledText>
                                    <StyledView className="flex-row items-center mt-1">
                                        <StyledView className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
                                        <StyledText className="text-sm font-bold text-emerald-600">ACTIVE</StyledText>
                                    </StyledView>
                                </StyledView>
                                <StyledView className="items-end">
                                    <StyledText className="text-[10px] font-bold text-zinc-400 uppercase">Expires</StyledText>
                                    <StyledText className="text-sm font-bold text-zinc-900 mt-1">DEC 2025</StyledText>
                                </StyledView>
                            </StyledView>
                        </StyledView>
                        <StyledText className="text-center text-xs text-zinc-400 font-medium">Scan at front desk kiosk for entry.</StyledText>
                    </StyledView>
                )}

                {activeTab === 'profile' && (
                    <StyledView className="space-y-6">
                        {['name', 'phone', 'emergency'].map((field) => (
                            <StyledView key={field}>
                                <StyledText className="text-xs font-bold text-zinc-500 uppercase mb-2">{field}</StyledText>
                                <StyledTextInput
                                    editable={isEditing}
                                    value={formData[field]}
                                    onChangeText={(text) => setFormData({ ...formData, [field]: text })}
                                    className={`w-full bg-white border-b-2 py-2 text-zinc-900 ${isEditing ? 'border-lime-500' : 'border-zinc-200 text-zinc-500'}`}
                                />
                            </StyledView>
                        ))}

                        <StyledView className="pt-6">
                            {!isEditing ? (
                                <StyledTouchableOpacity
                                    onPress={() => setIsEditing(true)}
                                    className="w-full bg-zinc-950 py-4 items-center"
                                >
                                    <StyledText className="text-white text-xs font-bold uppercase">Edit Details</StyledText>
                                </StyledTouchableOpacity>
                            ) : (
                                <StyledView className="flex-row gap-4">
                                    <StyledTouchableOpacity
                                        onPress={() => setIsEditing(false)}
                                        className="flex-1 py-4 border border-zinc-300 items-center bg-white"
                                    >
                                        <StyledText className="text-zinc-500 text-xs font-bold uppercase">Cancel</StyledText>
                                    </StyledTouchableOpacity>
                                    <StyledTouchableOpacity
                                        onPress={handleUpdate}
                                        className="flex-1 py-4 bg-lime-400 items-center"
                                    >
                                        <StyledText className="text-zinc-950 text-xs font-bold uppercase">Save</StyledText>
                                    </StyledTouchableOpacity>
                                </StyledView>
                            )}
                        </StyledView>
                    </StyledView>
                )}

                {activeTab === 'alerts' && (
                    <StyledView className="space-y-4">
                        {[
                            { title: 'Holiday Hours', desc: 'Closing at 4PM on Dec 24th.', type: 'warn' },
                            { title: 'New Gear', desc: 'Squat racks arriving Tuesday.', type: 'info' }
                        ].map((alert, idx) => (
                            <StyledView key={idx} className="bg-white p-6 border-l-4 border-lime-400 shadow-sm">
                                <StyledText className="text-sm font-black text-zinc-900 uppercase mb-1">{alert.title}</StyledText>
                                <StyledText className="text-sm text-zinc-500">{alert.desc}</StyledText>
                            </StyledView>
                        ))}
                    </StyledView>
                )}
            </StyledScrollView>
        </StyledView>
    );
};

export default MemberDashboard;
