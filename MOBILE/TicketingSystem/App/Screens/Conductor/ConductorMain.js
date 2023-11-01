import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button, TextInput } from 'react-native-paper';
import Header from '../../Components/Home/Header';
import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Modal, Dimensions } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import PassengerCard from './PassengerCard';
import { TouchableOpacity } from 'react-native';

// Sample data for start and end points
const startPoints = ['Start Point 1', 'Start Point 2', 'Start Point 3'];
const endPoints = ['End Point 1', 'End Point 2', 'End Point 3'];

export default function ConductorMain() {
  const navigation = useNavigation();
  const [jwtToken, setToken] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [codeData, setCodeData] = useState('');

  const [customCodeData, setCustomCodeData] = useState('');
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [matchedPassengerData, setMatchedPassengerData] = useState([]);

  const [pointsStartEnd, setPointsStartEnd] = useState([]);

  const [cardHeights, setCardHeights] = useState([]);
  // Create refs for PassengerCard components
  const scrollViewRef = useRef(); // Create a ref for ScrollView
  const passengerCardRefs = matchedPassengerData.map(() => React.createRef()); // Array of refs

  const [userRole, setUserRole] = useState('');

  const passengerData = [
    { id: 3, name: 'Dhananjaya Yapa', age: 25 },
    { id: 4, name: 'John Carter', age: 30 },
    { id: 5, name: 'Johnson John', age: 30 },
    // { id: 4, name: 'Passenger 4', age: 35 },
    // Add more passenger data here
  ];

  const tokenData = [
    { id: 1, userID: 3, tokenBalance: 1000 },
    { id: 2, userID: 4, tokenBalance: 500 },
    { id: 3, userID: 5, tokenBalance: 750 },
    // { id: 4, userID: 4, tokenBalance: 250 },
    // Add more token data here
  ];

  const getJwtToken = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      setToken(token);
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
  }

  async function getStartEndPoints(){
    const response = await axios.get('https://5513-2402-d000-a500-d118-b1a2-a9f1-ebbb-8ca1.ngrok-free.app/conductor/busHalts');
    console.log(response.data);

    setPointsStartEnd(response.data);
    console.log(pointsStartEnd);
  }

  // Fetch user role from storage or app state when the component mounts
  useEffect(() => {
    // Fetch user role from AsyncStorage or app state
    const fetchUserRole = async () => {
      const role = await AsyncStorage.getItem('userRole');
      setUserRole(role);
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    getJwtToken();
    getStartEndPoints();
  }, [userRole]);

  // useFocusEffect should be used consistently in all renders
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

    }, [jwtToken, scanned, userRole, codeData, customCodeData])
  );


  useLayoutEffect(() => {
    const heights = [];

    matchedPassengerData.forEach((_, index) => {
      // You need to replace 'PassengerCard' with the actual component rendering your passenger data
      const cardRef = passengerCardRefs[index];
      if (cardRef.current) {
        cardRef.current.measure((x, y, width, height) => {
          heights[index] = height;
          setCardHeights([...heights]);
        });
      }
    });
  }, [matchedPassengerData]);

  /*const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    setCodeData(data);
  };*/

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    // Check if the scanned token already exists in matchedPassengerData
    const existingIndex = matchedPassengerData.findIndex(
      (passenger) => passenger.token.id === Number(data)
    );

    // If the token already exists, scroll to its view
    if (existingIndex >= 0) {
      scrollViewRef.current.scrollTo({ y: existingIndex * 350, animated: true });
      return;
    }

    // Find the token in tokenData that matches the scanned QR code
    const matchedToken = tokenData.find((token) => token.id === Number(data));

    if (matchedToken) {
      // Find the passenger data associated with the matched token
      const matchedPassenger = passengerData.find((passenger) => passenger.id === matchedToken.userID);

      if (matchedPassenger) {
        // Display the matched passenger's data
        alert(`Token ID: ${data}\nPassenger Name: ${matchedPassenger.name}`);
        // Create an object containing both the matchedToken and matchedPassenger data
        const matchedData = {
          token: matchedToken,
          passenger: matchedPassenger,
        };
        console.log(matchedData);
        // Add the newly matched passenger to the existing matchedPassengerData array
        setMatchedPassengerData((prevData) => [...prevData, matchedData]);
        setCodeData(data);
      } else {
        alert(`No passenger found for Token ID: ${data}`);
      }
    } else {
      alert(`Token not found for Token ID: ${data}`);
    }
  };

  const handleCustomTokenInput = (data) => {
    setScanned(true);

    // Check if the scanned token already exists in matchedPassengerData
    const existingIndex = matchedPassengerData.findIndex(
      (passenger) => passenger.token.id === Number(data)
    );

    // If the token already exists, scroll to its view
    if (existingIndex >= 0) {
      scrollViewRef.current.scrollTo({ y: existingIndex * 350, animated: true });
      return;
    }
    /*if (existingIndex >= 0) {
      // Token already exists, scroll to its view
      scrollViewRef.current.scrollTo({ y: existingIndex * CARD_HEIGHT, animated: true });
      return;
    }*/

    /*if (existingIndex >= 0) {
      scrollViewRef.current.scrollTo({ y: cardHeights.slice(0, existingIndex).reduce((a, b) => a + b, 0), animated: true });
      return;
    }*/


    /*if (existingIndex >= 0) {
      // Scroll to the card by calculating the height of previous cards
      const heightOfPreviousCards = passengerCardRefs
        .slice(0, existingIndex)
        .reduce((totalHeight, cardRef) => {
          return totalHeight + (cardRef.current ? cardRef.current.clientHeight : 0);
        }, 0);

      scrollViewRef.current.scrollTo({
        y: heightOfPreviousCards,
        animated: true,
      });

      return;
    }*/

    /*if (existingIndex >= 0) {
      // Scroll to the card by calculating the height of previous cards
      const heightOfPreviousCards = passengerCardRefs
        .slice(0, existingIndex)
        .reduce((totalHeight, cardRef, index) => {
          return totalHeight + (cardRef.current ? cardHeights[index] : 0);
        }, 0);
  
      scrollViewRef.current.scrollTo({
        y: heightOfPreviousCards,
        animated: true,
      });
  
      return;
    }*/

    // Find the token in tokenData that matches the scanned QR code
    const matchedToken = tokenData.find((token) => token.id === Number(data));

    if (matchedToken) {
      // Find the passenger data associated with the matched token
      const matchedPassenger = passengerData.find((passenger) => passenger.id === matchedToken.userID);

      if (matchedPassenger) {
        // Display the matched passenger's data
        alert(`Token ID: ${data}\nPassenger Name: ${matchedPassenger.name}`);
        // Create an object containing both the matchedToken and matchedPassenger data
        const matchedData = {
          token: matchedToken,
          passenger: matchedPassenger,
        };
        console.log(matchedData);
        // Add the newly matched passenger to the existing matchedPassengerData array
        setMatchedPassengerData((prevData) => [...prevData, matchedData]);
        setCodeData(data);
      } else {
        alert(`No passenger found for Token ID: ${data}`);
      }
    } else {
      alert(`Token not found for Token ID: ${data}`);
    }
  };


  if (hasPermission === null) {
    return <Text>Requesting permission to access the camera</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  return (
    <View style={styles.mainContainer}>
      <Header />
      {userRole === 'CONDUCTOR' ? (
        // Render the Conductor component for Conductor users
        <>
          {/* <Text style={{ marginTop: 20 }}>{codeData ? codeData : ''}</Text> */}
          <View style={styles.container}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
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

          <ScrollView style={styles.passengerList} ref={scrollViewRef}>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              {/* <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: 5 }}> */}
              <TextInput style={{ alignSelf: 'center', height: 36 }} value={customCodeData} onChangeText={text => setCustomCodeData(text)} keyboardType={'number-pad'}></TextInput>
              <TouchableOpacity onPress={() => handleCustomTokenInput(customCodeData)}><Text style={{ backgroundColor: 'black', borderRadius: 5, color: 'white', fontSize: 15, fontWeight: '500', paddingHorizontal: 10, paddingVertical: 7 }}>Get Passenger</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => setModalIsVisible(true)} style={{ marginLeft: 'auto' }}><Text style={{ backgroundColor: 'red', borderRadius: 5, color: 'white', fontSize: 15, fontWeight: '500', paddingHorizontal: 10, paddingVertical: 7 }}>CLEAR ALL</Text></TouchableOpacity>
            </View>

            {modalIsVisible ?
              <Modal
                visible={modalIsVisible}
                animationType="slide"
                transparent={true}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Confirm Clearance</Text>
                    <Text style={styles.modalDescription}>
                      Are you sure you want to clear all data?
                    </Text>
                    <View>
                      <TouchableOpacity
                        style={styles.confirmDeleteButton}
                        onPress={() => {
                          setMatchedPassengerData([]);
                          setModalIsVisible(false);
                        }}
                      >
                        <Text style={styles.buttonText}>CLEAR</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => {
                          setModalIsVisible(false); // Close the confirmation modal
                        }}
                      >
                        <Text style={styles.buttonText}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              : ''}


            {/* {passengerData.map((passenger, index) => (
              <PassengerCard
                key={index}
                passengerData={passenger}
                startPoints={startPoints}
                endPoints={endPoints}
              />
            ))} */}
            {matchedPassengerData.map((passenger, index) => (
              <PassengerCard
                key={index}
                passengerData={passenger.passenger}
                tokenData={passenger.token}
                /*startPoints={startPoints}
                endPoints={endPoints}*/
                startPoints={pointsStartEnd}
                endPoints={pointsStartEnd}
              />
            ))}

          </ScrollView>
        </>) : (// Render an error message or redirect to another screen for unauthorized users
        <><Text style={{ textAlign: 'center', marginTop: '50%', fontWeight: 'bold', color: 'red' }}>You are not authorized to access this function.</Text>
          <Text style={{ textAlign: 'center', marginTop: '10%', fontWeight: 'bold', color: 'red' }}>Only CONDUCTORS are allowed here.</Text></>
      )}
    </View>
  )
}

const screenWidth = Dimensions.get('window').width;

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
    justifyContent: 'flex-end',
  },
  button: {
    margin: 16,
  },

  passengerList: {
    flex: 1,
    //marginTop: 20,
    marginTop: 10,
  },
  passengerItem: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 20,
    width: '80%',
    elevation: 5,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 15,
    marginBottom: 10,
  },
  confirmDeleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 5,
    paddingHorizontal: screenWidth * 0.225,
  },
})
