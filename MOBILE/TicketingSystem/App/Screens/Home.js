import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../Components/Home/Header';

export default function Home({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <Header />

      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>Welcome,</Text>
        <Text style={styles.welcomeText}>Conductor/Inspector!</Text>
        <Text style={styles.descriptionText}>
          Use the scanner to verify passengers' tickets, or mark tickets.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Inspector')}
        >
          <Text style={styles.buttonText}>Validate Tickets</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Conductor')}
        >
          <Text style={styles.buttonText}>Ticketing</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    width: 200,
    padding: 12,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
});
