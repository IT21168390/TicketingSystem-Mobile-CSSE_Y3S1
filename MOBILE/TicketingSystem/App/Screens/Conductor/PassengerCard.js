import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import ModalDropdown from 'react-native-modal-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const PassengerCard = ({ passengerData, tokenData, startPoints, endPoints }) => {
    const [startPoint, setStartPoint] = useState('');
    const [endPoint, setEndPoint] = useState('');
    const [startPointID, setStartPointID] = useState(null); // State to store the selected start point ID
    const [endPointID, setEndPointID] = useState(null); // State to store the selected end point ID

    const [distance, setDistance] = useState(0);
    const [cost, setCost] = useState(0);

    const [submissionStatus, setSubmissionStatus] = useState('');

    const handleStartPointChange = (index, value) => {
        setStartPoint(value);
        // Set the selected start point's ID
        setStartPointID(startPoints[index].haltID);
    };

    const handleEndPointChange = (index, value) => {
        setEndPoint(value);
        // Set the selected end point's ID
        setEndPointID(endPoints[index].haltID);
    };

    const calculateCostAndDistance = async () => {
        //const response = await axios.post('https://5513-2402-d000-a500-d118-b1a2-a9f1-ebbb-8ca1.ngrok-free.app/conductor/calculateCharge', startPointID, endPointID);
        try {
            const response = await axios.get('https://5513-2402-d000-a500-d118-b1a2-a9f1-ebbb-8ca1.ngrok-free.app/conductor/calculateCharge', {
                params: {
                    startPointID: startPointID,
                    endPointID: endPointID,
                },
            });
            console.log(response.data);
            setDistance(response.data.travelledDistance);
            setCost(response.data.tripCharge);
        } catch (error) { 
            console.error(error);
        }

        // You can implement the logic to calculate distance and cost based on start and end points here.
        // For this example, let's assume a fixed value for demonstration purposes.
        /*const fixedDistance = 10; // Example: 10 miles
        const costPerMile = 2; // Example: LKR 2 per mile

        setDistance(fixedDistance);
        setCost(fixedDistance * costPerMile);*/
    };

    /*const handleSubmit = () => {
        // Implement the logic to submit passenger data to the database here.
        // You can use Axios or any other method to make an API call to save the data.
        // Don't forget to include the passengerData, startPoint, endPoint, distance, and cost in your API request.
    };*/
    const handleSubmit = async () => {
        // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint for submitting passenger data
        const apiEndpoint = 'https://5513-2402-d000-a500-d118-b1a2-a9f1-ebbb-8ca1.ngrok-free.app/conductor/newPassengerJourney';

        try {
            const loggedInUserID = await AsyncStorage.getItem('userID');
            console.log(loggedInUserID);

            const response = await axios.post(apiEndpoint, {
                conductorID: parseInt(loggedInUserID),
                passengerID: passengerData.id, //3
                tokenID: tokenData.id,//tokenData.find((token) => token.userID === passengerData.id).id,
                busID: 1,
                cost: cost,
                startPoint: startPoint,
                endPoint: endPoint,
                distance: distance,
                routeID: 123
                //remainingBalance: tokenData.find((token) => token.userID === passengerData.id).tokenBalance - cost,
            });

            // Handle the response, e.g., show a success message
            console.log('Data submitted successfully:', response.data);

            setSubmissionStatus(`Passenger #${passengerData.id} 's trip (#${response.data.journeyID}) successfully recorded.`);
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <View style={styles.card}>
            <Text style={styles.passengerName}>{passengerData.name}</Text>
            <Text style={styles.passengerDetails}>Passenger ID: {passengerData.id}</Text>
            <Text style={styles.passengerDetails}>Age: {passengerData.age}</Text>

            {submissionStatus ? ( // Check if submissionStatus is not empty
                <Text style={styles.successMessage}>{submissionStatus}</Text>
            ) : (<>

                <ModalDropdown
                    // options={startPoints}
                    options={startPoints.map((halt) => halt.haltName)}
                    onSelect={handleStartPointChange}
                    defaultValue="Select Start Point"
                    defaultIndex={0}
                    style={styles.dropdown}
                    textStyle={styles.dropdownText}
                    dropdownStyle={styles.dropdownList}
                    dropdownTextStyle={{ fontSize: 14 }}
                />

                <ModalDropdown
                    //options={endPoints}
                    options={endPoints.map((halt) => halt.haltName)}
                    onSelect={handleEndPointChange}
                    defaultValue="Select End Point"
                    defaultIndex={0}
                    style={styles.dropdown}
                    textStyle={styles.dropdownText}
                    dropdownStyle={styles.dropdownList}
                    dropdownTextStyle={{ fontSize: 14, borderBottomWidth: 1, borderRadius: 10 }}
                />

                <Button mode="contained" onPress={calculateCostAndDistance} style={styles.calculateButton}>
                    Calculate
                </Button>

                <View style={{ alignSelf: 'center', alignItems: 'center', flexDirection: 'row', gap: 15 }}>
                    <Text style={styles.boldLabel}>Distance:</Text>
                    <Text style={styles.passengerDetails}>{distance} km</Text>
                </View>
                <View style={{ alignSelf: 'center', alignItems: 'center', flexDirection: 'row', gap: 15 }}>
                    <Text style={styles.boldLabel}>Cost:</Text>
                    <Text style={styles.passengerDetails}>Rs. {cost}</Text>
                </View>
                <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
                    Submit
                </Button>
            </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    passengerName: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    passengerDetails: {
        fontSize: 16,
    },
    dropdown: {
        height: 40, // Increase the dropdown height
        justifyContent: 'center',
        //borderColor: '#ccc',
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 5,
        //paddingLeft: 10,
        paddingHorizontal: 10,

        marginTop: 5,
        backgroundColor: 'lightyellow'
    },
    dropdownText: {
        fontSize: 14,
        fontWeight: '500',
    },
    dropdownList: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        width: '50%'
    },
    calculateButton: {
        backgroundColor: '#007aff', // Change the button color
        marginTop: 10,
        width: '60%',
        alignSelf: 'center'
    },
    boldLabel: {
        fontWeight: 'bold', // Make labels bold
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#4caf50', // Change the button color
        marginTop: 10,
        borderRadius: 10,
        marginTop: 15
    },

    successMessage: {
        paddingVertical: 50,
        marginHorizontal: 15,
        fontSize: 18,
        color: 'green',
        textAlign: 'center'
    },
});

export default PassengerCard;
