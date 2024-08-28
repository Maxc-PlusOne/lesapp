import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
export default function HomeScreen() {
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        justifyContent:'center',
        zIndex: 1
},

    map: {
        ...StyleSheet.absoluteFillObject,
         zIndex:2,

    },

});