import * as React from "react";
import {
    View, Text, StyleSheet, TextInput, Dimensions,
    Pressable, Image, Keyboard, KeyboardAvoidingView, Platform
} from 'react-native';

export default function Setup({ navigation,updateStatus}) {
    const pNumber = '{ your phone number }';
    const [otp, setOtp] = React.useState('');

    const onConfirmPress= () => {
        updateStatus(true);
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // Adjust if needed
        >
            <Text style={styles.title}>Verify your phone number</Text>
            <Text style={styles.subtitle}> Type the 4-digit OTP that was sent to {pNumber}</Text>
            <Pressable style={{marginTop:'2%'} }>
                <Text style={{color:'red'}}> Didn't get code? </Text>
            </Pressable>
            <Pressable onPress={Keyboard.dismiss} style={styles.container}>
                <View style={styles.formContainer}>
                    <TextInput style={styles.inputBox} maxLength={4}
                        onChangeText={(value) => setOtp(value)}
                        value={otp }
                        keyboardType='numeric' />

                </View>
                <Pressable style={styles.btnConfirm} onPress={onConfirmPress}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24 }}>Confirm</Text>
                </Pressable>
                <Pressable style={styles.btnChangeNum} onPress={() => navigation.goBack()} >
                    <Text style={{ color: '#5B636C', fontWeight: 'bold', fontSize: 16 }}>edit phone number</Text>
                </Pressable>
            </Pressable>
            </KeyboardAvoidingView>
    );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: '4%',
        flexDirection: 'row',
    },
    inputBox: {
        borderColor: '#808A93',
        borderWidth: 2,
        borderRadius: 15,
        width: screenWidth*0.40,
        height: 60,
        padding: 12,
        fontSize: 24,
        margin: 8,
        textAlign:'center'
    },
    label: {
        color: '#808A93',
        left:'4%'
    },
    btnConfirm: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderRadius: 15,
        width: screenWidth * 0.85,
        height: 60,
        marginTop: '8%',
    },
    btnChangeNum: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#5B636C',
        borderRadius: 15,
        width: screenWidth * 0.85,
        height: 40,
        marginTop: '4%',
    },
    title: {
        fontSize: 32,
        paddingTop:'24%',
        alignContent: 'center',
        paddingHorizontal: '16%',
        fontWeight: 'bold',
        textAlign:'center'
    },
    subtitle: {
        fontSize: 16,
        paddingTop:'16%',
        alignContent: 'center',
        paddingHorizontal: '16%',
        fontWeight: 'bold',
        textAlign:'center'
    },
    img: {
        width: 400,
        height:'16%',
        marginTop:'16%',
        marginLeft:32
    }
});
