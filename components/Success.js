import React from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { globalStyles } from '../app/styles';  // Assuming you have global styles

const Success = ({ title = 'Success!', message = 'Your request has been successfully completed.', buttonText = '', onButtonPress }) => {
    const scaleValue = React.useRef(new Animated.Value(0)).current;

    // Use useEffect to trigger the scale animation when the component mounts
    React.useEffect(() => {
        Animated.spring(scaleValue, {
            toValue: 1,  // Final scale size
            friction: 5, // Spring friction
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={styles.container}>
            {/* Animated Icon */}
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <MaterialIcons name="check-circle" size='150%' color="green" />
            </Animated.View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            {buttonText ? <Pressable style={globalStyles.btnPrimary} onPress={onButtonPress}>
                <Text style={globalStyles.btnText}>{buttonText}</Text>
            </Pressable> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 30,
        color: '#555',
    }
});

export default Success;
