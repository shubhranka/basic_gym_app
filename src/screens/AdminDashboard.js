import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Activity, QrCode, Users, ArrowRight } from 'lucide-react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

import { CameraView, useCameraPermissions } from 'expo-camera';

const AdminDashboard = ({ navigation }) => {
    const [activeView, setActiveView] = useState('dashboard');
    const [scanInput, setScanInput] = useState('');
    const [lastCheckIn, setLastCheckIn] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();

    // Member creation state
    const [newMemberName, setNewMemberName] = useState('');
    const [members, setMembers] = useState([
        { id: '1', name: 'John Doe', uid: '12345678', status: 'Active', joinDate: '2024-01-01' },
        { id: '2', name: 'Jane Smith', uid: '87654321', status: 'Active', joinDate: '2024-02-15' },
    ]);

    const attendance = [];

    const handleCheckIn = (uid) => {
        const idToCheck = uid || scanInput;
        if (!idToCheck?.trim()) return;

        setLastCheckIn({
            name: uid ? `Member ${uid.substring(0, 6)}` : 'Demo Member',
            time: new Date().toLocaleTimeString()
        });
        setScanInput('');
        setIsScanning(false);
    };

    const handleAddMember = () => {
        if (!newMemberName.trim()) {
            alert('Please enter a name');
            return;
        }

        const newId = Math.random().toString(36).substr(2, 9);
        const newUid = Math.floor(10000000 + Math.random() * 90000000).toString();

        const newMember = {
            id: newId,
            name: newMemberName,
            uid: newUid,
            status: 'Active',
            joinDate: new Date().toISOString().split('T')[0]
        };

        setMembers([...members, newMember]);
        setNewMemberName('');
        setActiveView('members');
        alert(`Member Created! UID: ${newUid}`);
    };

    const handleBarCodeScanned = ({ data }) => {
        handleCheckIn(data);
        alert(`Scanned: ${data}`);
    };

    const startScanning = async () => {
        if (!permission?.granted) {
            const { granted } = await requestPermission();
            if (!granted) return;
        }
        setIsScanning(true);
    };

    if (isScanning) {
        return (
            <StyledView className="flex-1 bg-black">
                <CameraView
                    style={{ flex: 1 }}
                    facing="back"
                    onBarcodeScanned={handleBarCodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr"],
                    }}
                >
                    <StyledView className="flex-1 justify-between p-10">
                        <StyledTouchableOpacity
                            onPress={() => setIsScanning(false)}
                            className="self-end bg-black/50 p-2 rounded-full"
                        >
                            <StyledText className="text-white font-bold">Close</StyledText>
                        </StyledTouchableOpacity>
                        <StyledView className="border-2 border-lime-400 h-64 w-64 self-center rounded-lg opacity-50" />
                        <StyledText className="text-white text-center bg-black/50 p-2 rounded">Scan Member QR Code</StyledText>
                    </StyledView>
                </CameraView>
            </StyledView>
        );
    }

    return (
        <StyledView className="flex-1 bg-zinc-100">
            <StyledView className="bg-zinc-950 pt-16 pb-4 px-6 border-b border-zinc-800">
                <StyledView className="flex-row justify-between items-center mb-6">
                    <StyledView className="flex-row items-center">
                        <Activity color="#a3e635" size={24} />
                        <StyledText className="text-white font-black text-xl ml-3 italic">ADMIN<StyledText className="text-lime-400">PANEL</StyledText></StyledText>
                    </StyledView>
                    <TouchableOpacity onPress={() => navigation.replace('Login')}>
                        <StyledText className="text-zinc-500 text-xs font-bold uppercase">Exit</StyledText>
                    </TouchableOpacity>
                </StyledView>

                <StyledView className="flex-row gap-4">
                    <StyledTouchableOpacity
                        onPress={() => setActiveView('dashboard')}
                        className={`flex-1 flex-row items-center justify-center p-3 rounded-lg ${activeView === 'dashboard' ? 'bg-lime-400' : 'bg-zinc-900'}`}
                    >
                        <QrCode size={20} color={activeView === 'dashboard' ? '#09090b' : '#a1a1aa'} />
                        <StyledText className={`ml-2 text-xs font-bold uppercase ${activeView === 'dashboard' ? 'text-zinc-950' : 'text-zinc-400'}`}>Kiosk</StyledText>
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity
                        onPress={() => setActiveView('members')}
                        className={`flex-1 flex-row items-center justify-center p-3 rounded-lg ${activeView === 'members' ? 'bg-lime-400' : 'bg-zinc-900'}`}
                    >
                        <Users size={20} color={activeView === 'members' ? '#09090b' : '#a1a1aa'} />
                        <StyledText className={`ml-2 text-xs font-bold uppercase ${activeView === 'members' ? 'text-zinc-950' : 'text-zinc-400'}`}>Members</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>

            <StyledView className="flex-1 p-6">
                <StyledText className="text-2xl font-black text-zinc-950 uppercase mb-6">
                    {activeView === 'dashboard' ? 'Access Control' : 'Membership Roster'}
                </StyledText>

                {activeView === 'dashboard' && (
                    <StyledScrollView>
                        <StyledView className="bg-white p-6 shadow-xl border-t-4 border-lime-400 mb-6 rounded-lg">
                            <StyledText className="text-xs font-bold text-zinc-500 uppercase mb-4">Manual Entry / Scanner Input</StyledText>
                            <StyledView className="flex-row gap-2 mb-4">
                                <StyledTextInput
                                    value={scanInput}
                                    onChangeText={setScanInput}
                                    placeholder="Waiting for input..."
                                    className="flex-1 bg-zinc-50 border-2 border-zinc-200 p-3 font-mono text-lg focus:border-zinc-950"
                                />
                                <StyledTouchableOpacity
                                    onPress={() => handleCheckIn()}
                                    className="bg-zinc-950 px-6 justify-center items-center"
                                >
                                    <StyledText className="text-white font-bold uppercase">Log</StyledText>
                                </StyledTouchableOpacity>
                            </StyledView>

                            <StyledTouchableOpacity
                                onPress={startScanning}
                                className="w-full py-4 bg-lime-100 border border-lime-400 items-center justify-center rounded-lg flex-row"
                            >
                                <QrCode size={20} color="#4d7c0f" />
                                <StyledText className="text-lime-800 font-bold uppercase ml-2">Open Camera Scanner</StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>

                        {lastCheckIn && (
                            <StyledView className="bg-zinc-950 p-6 rounded-lg flex-row justify-between items-center mb-6">
                                <StyledView>
                                    <StyledText className="text-xs font-mono text-lime-400 uppercase">Entry Granted</StyledText>
                                    <StyledText className="text-xl font-bold text-white">{lastCheckIn.name}</StyledText>
                                </StyledView>
                                <StyledText className="text-2xl font-mono text-white">{lastCheckIn.time}</StyledText>
                            </StyledView>
                        )}

                        <StyledView className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
                            <StyledView className="bg-zinc-50 px-6 py-4 border-b border-zinc-200 flex-row justify-between items-center">
                                <StyledText className="font-bold text-zinc-900 uppercase text-sm">Live Feed</StyledText>
                                <StyledView className="flex-row items-center gap-2">
                                    <StyledView className="w-2 h-2 bg-red-500 rounded-full" />
                                    <StyledText className="text-[10px] font-bold text-zinc-400 uppercase">Recording</StyledText>
                                </StyledView>
                            </StyledView>
                            {attendance.length === 0 ? (
                                <StyledView className="p-8 items-center">
                                    <StyledText className="text-zinc-400 italic text-sm">No activity recorded today.</StyledText>
                                </StyledView>
                            ) : (
                                <View />
                            )}
                        </StyledView>
                    </StyledScrollView>
                )}

                {activeView === 'members' && (
                    <StyledView className="bg-white border border-zinc-200 rounded-lg overflow-hidden flex-1">
                        <StyledView className="p-4 border-b border-zinc-200 flex-row justify-between items-center bg-zinc-50">
                            <StyledText className="text-xs font-bold text-zinc-500 uppercase">Member List</StyledText>
                            <StyledTouchableOpacity
                                onPress={() => setActiveView('add_member')}
                                className="bg-lime-400 px-3 py-1 rounded"
                            >
                                <StyledText className="text-xs font-bold text-zinc-950 uppercase">+ Add New</StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>
                        <StyledView className="flex-row bg-zinc-100 border-b border-zinc-200 p-4">
                            <StyledText className="flex-1 text-xs font-bold text-zinc-500 uppercase">Name</StyledText>
                            <StyledText className="w-20 text-xs font-bold text-zinc-500 uppercase">Status</StyledText>
                        </StyledView>
                        <FlatList
                            data={members}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <StyledView className="flex-row p-4 border-b border-zinc-100 items-center">
                                    <StyledView className="flex-1">
                                        <StyledText className="font-bold text-zinc-900">{item.name}</StyledText>
                                        <StyledText className="font-mono text-xs text-zinc-400">{item.uid}</StyledText>
                                    </StyledView>
                                    <StyledView className="w-20">
                                        <StyledView className="bg-lime-100 self-start px-2 py-1 rounded">
                                            <StyledText className="text-lime-800 text-[10px] font-bold uppercase">{item.status}</StyledText>
                                        </StyledView>
                                    </StyledView>
                                </StyledView>
                            )}
                        />
                    </StyledView>
                )}

                {activeView === 'add_member' && (
                    <StyledView className="bg-white p-6 shadow-xl border-t-4 border-lime-400 rounded-lg">
                        <StyledText className="text-xl font-black text-zinc-950 uppercase mb-6">Create New Member</StyledText>

                        <StyledView className="mb-6">
                            <StyledText className="text-xs font-bold text-zinc-500 uppercase mb-2">Full Name</StyledText>
                            <StyledTextInput
                                value={newMemberName}
                                onChangeText={setNewMemberName}
                                placeholder="e.g. Alex Johnson"
                                className="w-full bg-zinc-50 border-2 border-zinc-200 p-4 font-bold text-lg focus:border-lime-400"
                            />
                        </StyledView>

                        <StyledView className="flex-row gap-4">
                            <StyledTouchableOpacity
                                onPress={() => setActiveView('members')}
                                className="flex-1 py-4 border-2 border-zinc-200 items-center justify-center"
                            >
                                <StyledText className="text-zinc-500 font-bold uppercase">Cancel</StyledText>
                            </StyledTouchableOpacity>
                            <StyledTouchableOpacity
                                onPress={handleAddMember}
                                className="flex-1 py-4 bg-zinc-950 items-center justify-center"
                            >
                                <StyledText className="text-white font-bold uppercase">Create Member</StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>
                    </StyledView>
                )}
            </StyledView>
        </StyledView>
    );
};

export default AdminDashboard;
