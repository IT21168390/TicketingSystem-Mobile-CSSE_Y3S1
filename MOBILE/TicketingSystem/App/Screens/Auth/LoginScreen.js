import React, { useState } from 'react';
import { useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Header from '../../Components/Home/Header';

const LoginScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {

        try {
            const response = await axios.post('https://5513-2402-d000-a500-d118-b1a2-a9f1-ebbb-8ca1.ngrok-free.app/user/login', {
                "email": email,
                "password": password,
            });

            // Check the response and handle success or failure accordingly
            if (response.status === 200) {
                // Successful login, navigate to another screen or perform desired action
                if (response.data.authenticationResponse.jwtToken) {
                    console.log(response.data.authenticationResponse.jwtToken);
                    await AsyncStorage.setItem('jwtToken', response.data.authenticationResponse.jwtToken);
                    await AsyncStorage.setItem('userRole', response.data.userDTO.role);
                    await AsyncStorage.setItem('userID', response.data.userDTO.userId.toString());

                    if (response.data.userDTO.role === 'CONDUCTOR') {
                        navigation.navigate("Conductor");
                    }
                    else if (response.data.userDTO.role === 'INSPECTOR') {
                        navigation.navigate("Inspector");
                    }
                    else {
                        Alert.alert('Unauthorized!', 'You are neither a Conductor nor Inspector.', [
                            {
                                text: 'Try again',
                                onPress: () => {
                                    console.log('Try again pressed');
                                },
                            },
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            }
                        ]);
                    }
                }

                console.log(response.data);
            } else {
                // Login failed, handle the error, maybe show a message to the user
                console.log('FAILED', email, password);
            }
        } catch (error) {
            // Handle any network or API request errors
            console.error('Login failed:', error);
            console.log(email, password);
        }
    };


    useEffect(() => {

    }, []);

    useFocusEffect(
        useCallback(() => {

        }, [email, password])
    );

    return (
        <View style={styles.mainContainer}>
            <Header />
            <View style={styles.container}>
                <Text style={styles.logo}>Tickets+</Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email"
                        placeholderTextColor="#666"
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Password"
                        placeholderTextColor="#666"
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.signupText} >Don't have an account? Sign up</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 40,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        color: 'green',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    inputView: {
        width: '80%',
        backgroundColor: '#f2f2f2',
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        padding: 20,
    },
    inputText: {
        height: 50,
        color: 'black',
    },
    loginBtn: {
        width: '80%',
        backgroundColor: '#007bff',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginText: {
        color: 'white',
    },
    forgotPasswordText: {
        color: '#007bff',
    },
    signupText: {
        color: '#007bff',
        marginTop: 20,
    },
});

export default LoginScreen;
