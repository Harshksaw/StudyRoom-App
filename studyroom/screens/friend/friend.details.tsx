import React, { useEffect, useState } from 'react';
import { View, TextInput, SafeAreaView, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Header from '@/components/Header'; // Assuming Header is imported correctly
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing } from '../../utils/theme';
import axios from 'axios';
import { BACKEND } from '@/utils/config';
import { Toast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '@/components/Button';


const FriendDetails = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [friends, setFriends] = useState([]); // [ {name: 'John', email: 'john@gmail', phoneNumber: '1234567890'}

    const AddFriend = async () => {
        // Implement seat booking logic using friend's details
        const res = await axios.post(`${BACKEND}/api/v1/auth/addFriend`, {
            name: name,
            email: email,
            phoneNumber: phoneNumber

        })

        if (res.status === 201) {
            console.log(res.data, "----????")
            setFriends(res.data);

            console.log('Friend added successfully');
            Toast.show('Friend added successfully');

        }
        console.log('Booking seat for:', name, email, phoneNumber);
    };
    const GetFriend = async () => {
        const id = AsyncStorage.getItem('userId');
        const userId = JSON.parse(id);
        // Implement seat booking logic using friend's details
        const res = await axios.post(`${BACKEND}/api/v1/auth/getFriends`, {
            userId: userId
        })
        if (res.status === 201) {
            console.log('Friend Fetched successfully');


        }

    };

    useEffect(() => {
        GetFriend();
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Header color='black' />
            </View>
            <View>


                <View style={styles.friendDetailsContainer}>
                    <Text style={styles.heading}>Add Your Friend</Text>
                    <Ionicons name="person-add" size={24} color={colors.black} style={styles.icon} />
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => AddFriend()}
                >

                    <Button text="Add Friend"
                        width={150}

                    />
                </TouchableOpacity>

            </View>

            <ScrollView>
                {friends.map((friend, index) => (
                    <View key={index} style={{
                        backgroundColor: '#fff',
                        padding: 20,
                        marginVertical: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: 5,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.23,
                        shadowRadius: 2.62,
                        elevation: 4,
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}>Name: {friend.name}</Text>
                        <Text style={{
                            fontSize: 14,
                            color: '#666',
                        }}>Email: {friend.email}</Text>
                        <Text style={styles.label}>Phone Number: {friend.phoneNumber}</Text>
                    </View>
                ))}

            </ScrollView>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: spacing.large,
    },
    headerContainer: {
        marginBottom: spacing.large,
    },
    friendDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.medium,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
        textAlign: 'center',
        letterSpacing: 2,
    },
    icon: {
        marginLeft: spacing.medium,
    },
    formContainer: {
        width: '80%',
        borderWidth: 1,
        borderRadius: 10,
        padding: spacing.medium,
        backgroundColor: colors.white,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.black,
        marginBottom: spacing.small,
    },
    textInput: {
        marginBottom: spacing.small,
        width: '100%',
        borderWidth: 1,
        borderRadius: 5,
        padding: spacing.small,
        borderColor: colors.gray,
    },
    button: {
        marginTop: spacing.large,
        backgroundColor: colors.primary,
        color: colors.white,
        borderRadius: 5,
        paddingHorizontal: spacing.medium,
        paddingVertical: spacing.small,
    },
});

export default FriendDetails;