import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
export default function HomeScreen() {
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
            <View style={styles.container}>
                <ActivityIndicator size="large" color="red" />
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <View style={styles.infoBar}>
                <Text style={styles.infoText}>Showing current address here</Text>
            </View>
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