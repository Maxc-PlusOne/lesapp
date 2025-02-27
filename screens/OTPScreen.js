import * as React from "react";
import {
    View, Text, StyleSheet, TextInput, Dimensions,
    Pressable, Image, Keyboard, KeyboardAvoidingView, Platform
} from 'react-native';
import storageService from "../utils/storageService";
import { apiService } from "../utils/apiService";
import Loading from "../components/ActivityIndicator";
import { CommonActions } from '@react-navigation/native';
import { globalStyles } from "../app/styles";

export default function Setup({ navigation,updateStatus,route}) {
    const [otp, setOtp] = React.useState('');
    const {phoneNumber} = route.params;
    const { name } = route.params;
    const [errorMessage, setErrorMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    function validate() {
        if (otp.length === 6) {
            return true;
        } else {
            setErrorMessage('Please enter a valid OTP.')
            return false;
        }
    }

    ////// API request funtion /////

    async function confirmOTP() {
        const isValid = validate();
        if (isValid) {
            setErrorMessage('');
            setLoading(true);
            const data = { otp: otp, phone: phoneNumber };
           
            try {
                const res = await apiService.auth.post('verify-otp', data);
                if (res.error) {
                    setErrorMessage(res.error);
                } else {
                    console.log(res);
                    await storageService.save('token', res.token.replace(/['"]/g, ''));
                    await storageService.save('isSignedIn', true);
                    await storageService.save('userType','patient');
                    updateStatus();
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'Main' }],
                        })
                    );
                }

            } catch (error) {
                setErrorMessage('Something went wrong, Please try again.');
            } finally {
                setLoading(false);
            }
        }
    }
    ////////////////////////////////
    async function signUp() {
        setErrorMessage('');
        setLoading(true);
        const isValid = validate();
        const user = {
            name: name,
            phone: phoneNumber,
        }

        try {
            if (isValid) {
                const res = await apiService.post('user', user)
                storageService.save('isSignedIn', true)
                await storageService.save('userId', res.id) 
                updateStatus()
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Main' }],
                    })
                );
            }
        } catch (error) {
            setErrorMessage('Failed to verify phone number, Please try again.')
        } finally {
            setLoading(false)
        }
    }
    
    //Output 
    if (loading) {
        return <Loading />
    } else {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}>

                <Pressable onPress={Keyboard.dismiss} style={styles.container}>
                    <Text style={styles.title}> Verify your phone number </Text>
                    <Text style={styles.subtitle}> Type the 6-digit OTP that was sent to {phoneNumber}</Text>
                    <Pressable>
                        <Text style={{ color: '#5B636C' }}> Didn't get code? </Text>
                    </Pressable>
                    <View style={styles.formContainer}>
                        <TextInput style={styles.inputBox} maxLength={6}
                            onChangeText={(value) => { setOtp(value) }}
                            value={otp}
                            keyboardType='numeric'
                        />

                    </View>
                    {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}
                    <Pressable style={globalStyles.btnPrimary} onPress={confirmOTP}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24 }}>Confirm</Text>
                    </Pressable>
                    <Pressable style={styles.btnChangeNum} onPress={() => navigation.goBack()} >
                        <Text style={{ color: '#5B636C', fontWeight: 'bold', fontSize: 16 }}>edit phone number</Text>
                    </Pressable>
                </Pressable>
            </KeyboardAvoidingView>
        )
    }
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
    },
    title: {
        fontSize: 32,
        paddingTop:'16%',
        alignContent: 'center',
        paddingHorizontal: '16%',
        fontWeight: 'bold',
        textAlign:'center'
    },
    subtitle: {
        fontSize: 16,
        paddingTop:'2%',
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
