import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper'; // Import Card and Button from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Header from '../../Components/Home/Header'; // Verify the path to the Header component.
import React, { useState, useEffect, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';

export default function InspectorMain() {
  const navigation = useNavigation();
  const [jwtToken, setToken] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [codeData, setCodeData] = useState('');
  const [scannedTokens, setScannedTokens] = useState([]);
  const [invalidCount, setInvalidCount] = useState(0);

  const [userRole, setUserRole] = useState('');
  const [loggedInUserID, setLoggedInUserID] = useState('');
  const [customCodeData, setCustomCodeData] = useState('');

  const getJwtToken = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const loggedInUserID = await AsyncStorage.getItem('userID');
      setLoggedInUserID(loggedInUserID);
      setToken(token);
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
  }

  useEffect(() => {
    getJwtToken();
    const fetchUserRole = async () => {
      const role = await AsyncStorage.getItem('userRole');
      setUserRole(role);
    };

    fetchUserRole();
  }, [userRole]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();

      const fetchUserRole = async () => {
        const role = await AsyncStorage.getItem('userRole');
        setUserRole(role);
      };

      fetchUserRole();
      console.log(userRole);
    }, [jwtToken, scanned, userRole, invalidCount])
  );

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setCodeData(data);
    setScannedTokens([...scannedTokens, data]);
  };
  const handleCustomeCodeInput = (data) => {
    setScanned(true);
    setCodeData(data);
    setScannedTokens([...scannedTokens, data]);
  };

  const markAsValid = async (token) => {
    try {
      const response = await axios.get('https://5513-2402-d000-a500-d118-b1a2-a9f1-ebbb-8ca1.ngrok-free.app/inspector/validateToken', {
        params: {
          tokenID: token
        },
      });
      console.log(response.data);
      if (response.data === false) {
        const currentInvalids = invalidCount + 1;
        setInvalidCount(currentInvalids);
        alert('INVALID TOKEN!');
      }
      else {
        alert('TOKEN IS VALID');
      }
      console.log(invalidCount);
    } catch (error) {
      console.error(error);
    }
  };

  const checkPassengerActivity = (token) => {
    setScannedTokens(() => {
      const restTokens = scannedTokens.filter((scannedToken) => scannedToken !== token);
      return restTokens;
    })
  };


  const submitInvalidCount = async () => {
    try {
      const loggedInUserID = await AsyncStorage.getItem('userID');
      console.log(loggedInUserID);

      const response = await axios.post('https://5513-2402-d000-a500-d118-b1a2-a9f1-ebbb-8ca1.ngrok-free.app/inspector/invalidTokensCount', {
        inspectorID: parseInt(loggedInUserID),
        invalidCount: invalidCount
      });

      // Handle the response, e.g., show a success message
      console.log('Data submitted successfully:', response.data);
      setScannedTokens([]);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
    setInvalidCount(0);
  }


  if (hasPermission === null) {
    return <Text>Requesting permission to access the camera</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.mainContainer}>
      <Header />
      {userRole === 'INSPECTOR' ? (
        // Render the Conductor component for Conductor users
        <>
          <Text style={styles.heading}>Inspect Passengers</Text>
          <View style={styles.container}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.scanner}
            />
            {scanned && (
              <Button
                mode="contained"
                onPress={() => setScanned(false)}
                style={styles.button}
              >
                Scan Again
              </Button>
            )}
          </View>
          <ScrollView style={styles.scannedTokensContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: 5 }}>
              <TextInput style={{ alignSelf: 'center', height: 36 }} value={customCodeData} onChangeText={text => setCustomCodeData(text)}></TextInput>
              <TouchableOpacity onPress={() => handleCustomeCodeInput(customCodeData)}><Text style={{ backgroundColor: 'black', borderRadius: 5, color: 'white', fontSize: 15, fontWeight: '500', paddingHorizontal: 10, paddingVertical: 7 }}>Get Passenger</Text></TouchableOpacity>
            </View>
            {scannedTokens.map((token, index) => (
              <Card key={index} style={styles.tokenCard}>
                <Text style={styles.tokenText}>Token ID: {token}</Text>
                <View style={styles.tokenButtonsContainer}>
                  <Button
                    mode="contained"
                    onPress={() => markAsValid(token)}
                    style={styles.validButton}
                  >
                    Check Validity
                  </Button>
                  <Button
                    mode="contained"
                    onPress={() => checkPassengerActivity(token)}
                    style={styles.activityButton}
                  >
                    DONE
                  </Button>
                </View>
              </Card>
            ))}
            <TouchableOpacity style={{ marginTop: 10, backgroundColor: 'green', padding: 7.5, borderRadius: 10, /*alignSelf: 'center'*/ }} onPress={submitInvalidCount}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: 'white', paddingHorizontal: 10 }}>SUBMIT</Text>
            </TouchableOpacity>
          </ScrollView>
        </>) : (
        <><Text style={{ textAlign: 'center', marginTop: '50%', fontWeight: 'bold', color: 'red' }}>You are not authorized to access this function.</Text>
          <Text style={{ textAlign: 'center', marginTop: '10%', fontWeight: 'bold', color: 'red' }}>Only INSPECTORS are allowed here.</Text></>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  scanner: {
    height: 300, // Set a fixed height for the scanner
    width: '100%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center'
  },
  button: {
    marginVertical: 10,
  },
  scannedTokensContainer: {
    flex: 1, // Allow the container to scroll
    marginTop: 63,
    paddingHorizontal: 10,
  },
  tokenCard: {
    marginVertical: 10,
    padding: 10,
  },
  tokenText: {
    fontSize: 16,
    marginBottom: 10,

    textAlign: 'center',
    fontWeight: '600'
  },
  tokenButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  validButton: {
    flex: 1,
    marginRight: 5,
    backgroundColor: '#0080ff'
  },
  activityButton: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: '#ff8c00'
  },
});
