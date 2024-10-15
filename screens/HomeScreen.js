import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text,Pressable, Alert} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import Capture from '../components/Capture';
import Loading from '../components/ActivityIndicator';

export default function HomeScreen() {
    const [BtnColor, setBtnColor] = useState('red');
    const [isActivated, setIsActivated] = useState(false);
    const [BtnText, setBtnText] = useState('Send SOS');
    const navigation = useNavigation();

    // Location //
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

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

    //Confirmation Popup (Alert)
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
        const navigateToCapture = () => { navigation.navigate('Capture') };
        if (!isActivated) {
            navigateToCapture();
        }
        else if (isActivated) {
                showAlert('cancel request?')
        }

    };



    return (
        <View style={styles.container}>
            <View style={styles.infoBar}>
                <Text style={styles.infoText}>Showing current address here</Text>
            </View>
            <Pressable onPress={sendSOS} style={{
                zIndex: 5,
                backgroundColor:BtnColor,
                width: '80%',
                height: 48,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 35,
                bottom: '14%',
                position: 'absolute',

            }}>
                <Text style={{fontSize:24,color:'white', textStyle:'bold' }}>{BtnText}</Text>
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
        zIndex: 1
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

        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // Android shadow
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: '5%',
        top: 0,
    },

    infoText: {
        color: '#5B636C',
        fontSize: 16,
    },

    map: {
        ...StyleSheet.absoluteFillObject,
         zIndex:2,

    },

});