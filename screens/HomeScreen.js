import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text,Pressable, Alert} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import Capture from '../components/Capture';
import Loading from '../components/ActivityIndicator';
import { locationService } from '../utils/locationService';
import { globalColors, globalStyles } from '../app/styles';
import Oops from '../components/Oops';

export default function HomeScreen() {
    const [BtnColor, setBtnColor] = useState(globalColors.primary.default);
    const [isActivated, setIsActivated] = useState(false);
    const [BtnText, setBtnText] = useState('Send SOS');
    const navigation = useNavigation();


    //// Location logic starts here ////
    const [address, setAddress] = useState('');
    //Reverse Geocoding 
    async function fetchLocation(lat,lng) {
        const res = await locationService.getLocation(lat, lng);
        const addressComponents = {};
        try {
            console.log(res.data)
            if (res.flag === 'success') {
                res.data.results[0].address_components.forEach(component => {
                    component.types.forEach(type => {
                        addressComponents[type] = component.long_name;
                    });
                });
                setAddress(addressComponents)
            } else if (res.flag === 'fail') {
               setAddress(null);
            }
        } catch (error) {
            console.log('Reverse Geocoding Error: ', error)
            setAddress('error');
        }
    }

    //Address Bar Component
    function AddressInfo({address}) {
        if (address) {
            return (
                <Text style={[styles.infoText]}>
                    {address['street_number']} {address['route']}, {address['locality']}, {address['postal_code']}
                </Text>
            )
        } else if (address === 'error' || address == null) {
            return (
                <Text style={[styles.infoText]}>
                    Something went wrong, Tap to try again.
                </Text>
            )
        } else {
            return <Loading/>
        }
    }

    // Location (GPT)//
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    //Getting Location on component mount.
    useEffect(() => {
        (async (res) => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            try {
                const location = await Location.getCurrentPositionAsync({});
                return setLocation(location);
            } catch (error) {
                console.error(error)
                return <Oops/>
            }
        })();
    }, []);

    //Runs location when location changes
    useEffect(() => {
        if (location) {
            fetchLocation(location.coords.latitude, location.coords.longitude);
        }
    }, [location?.coords.latitude, location?.coords.longitude]); //Listening for change.

    //// Location Logic Ends Here ////

    if (errorMsg) {
        return (
            <View style={styles.container}>
                <Text>{errorMsg}</Text>
            </View>
        );
    }
    if (!location) {
        return (
                <Loading/>
        );
    }

    //Confirmation Popup (Alert) //Delete
    function showAlert(action) {

        const onPress = () => {

            if (!isActivated) {
                setIsActivated(true),
                    setBtnColor('black'),
                    setBtnText('Cancel')

            }
            else if (isActivated) {
                setIsActivated(false),
                    setBtnColor('red'),
                    setBtnText('Send SOS')
         
            }
        }

        return (
            Alert.alert(
            'Confirmation',
            'Are sure you want to ' + action,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: onPress

                }
            ]
            )
        )

    }

    //SOS Button Press
    function sendSOS() {
        const navigateToCapture = () => { navigation.navigate('Capture', { locationParam: {location}}) };
        if (!isActivated) {
            navigateToCapture();
        }
        else if (isActivated) {
                showAlert('cancel request?')
        }

    };



    return (
        <View style={styles.container}>
            <Pressable onPress={() => fetchLocation(location.coords.latitude, location.coords.longitude)} style={[styles.infoBar, globalStyles.shadow]}>
                <AddressInfo address={address} />
            </Pressable>
            <Pressable onPress={sendSOS} style={[{
                zIndex: 5,
                backgroundColor:BtnColor,
                width: '80%',
                height: 48,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 35,
                position: 'absolute',
                bottom: 100

            }, globalStyles.shadow]}>
                <Text style={[{ fontSize: 24, color: 'white', textStyle: 'bold' }]}>{BtnText}</Text>
            </Pressable>

            <MapView
                style={styles.map}
                region={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    longitudeDelta: 0.002,
                    latitudeDelta: 0.002,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}

                    title="You"
                />
            </MapView>
        </View>
    );
}

// StyleSheet //
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        zIndex: 1,
        flexDirection: 'column'
    },

    infoBar: {
        height: 48,
        zIndex: 3,
        position: 'absolute',
        backgroundColor: '#E9EBEC',
        width: "90%",
        borderRadius: 12,
        borderColor: '#DB222A',
        borderWidth: 0,


        // Android shadow
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        top: 16,
    },

    infoText: {
        color: '#5B636C',
        fontSize: 12,
        textAlign:'center',
    },

    map: {
        ...StyleSheet.absoluteFillObject,
         zIndex:2,

    },

});