import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons'
import { View, Text, Image, TextInput, StyleSheet, Dimensions } from 'react-native'
import React from 'react';
import { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
    const navigation = useNavigation();
    const [jwtToken, setToken] = useState(null);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('jwtToken');
        await AsyncStorage.removeItem('userRole');
        console.log('Logged out.');
        navigation.navigate('Login');
    }

    return (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', gap: 5, alignItems: 'center' }}>
            <Image source={require('./../../../assets/favicon.png')} style={styles.logo} />
            <View>
                <TextInput style={styles.searchBar} placeholder='Search here...' />
            </View>
            <FontAwesome onPress={() => handleLogout()} name="user-circle" size={30} color="black" />
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 50,
        height: 50
    },
    searchBar: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 4,
        borderRadius: 50,
        paddingLeft: 10,
        width: Dimensions.get('screen').width * 0.55
    }
})

