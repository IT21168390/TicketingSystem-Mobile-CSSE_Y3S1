import React, { useState } from 'react';
import { useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Header from '../../Components/Home/Header';

const RegistrationScreen = () => {
    const navigation = useNavigation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Implement registration logic here
    const handleRegistration = () => {
        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Prepare registration data
        const registrationData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        };

        // Make an HTTP POST request to your Spring Boot registration endpoint
        axios.post('https://5513-2402-d000-a500-d118-b1a2-a9f1-ebbb-8ca1.ngrok-free.app/signup/newUser', registrationData)
            .then((response) => {
                // Registration successful
                console.log('Registration successful:', response.data);
                navigation.navigate('Login'); // Redirect to the login screen
            })
            .catch((error) => {
                // Handle registration error, e.g., duplicate email
                console.error('Registration error:', error.response.data);
                alert('Registration failed. Please check your data and try again.');
            });
    };


    useEffect(() => {

    }, []);

    useFocusEffect(
        useCallback(() => {

            return () => {
            };
        }, [email, password])
    );

    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.logo}>REGISTER</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="FirstName"
                    placeholderTextColor="#666"
                    onChangeText={(text) => setFirstName(text)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="LastName"
                    placeholderTextColor="#666"
                    onChangeText={(text) => setLastName(text)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="MobileNumber"
                    placeholderTextColor="#666"
                    onChangeText={(text) => setMobileNumber(text)}
                />
            </View>
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
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Confirm Password"
                    placeholderTextColor="#666"
                    secureTextEntry
                    onChangeText={(text) => setConfirmPassword(text)}
                />
            </View>
            <TouchableOpacity style={styles.registerBtn} onPress={handleRegistration}>
                <Text style={styles.registerText}>REGISTER</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.signupText} onPress={() => navigation.navigate("Login")}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    logo: {
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
    registerBtn: {
        width: '80%',
        backgroundColor: '#007bff',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    registerText: {
        color: 'white',
    },
    signupText: {
        color: '#007bff',
        marginTop: 20,
    },
});

export default RegistrationScreen;
