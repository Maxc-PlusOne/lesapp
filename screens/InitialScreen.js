import * as React from "react";
import {
    View, Text, StyleSheet, TextInput, Dimensions,
    Pressable, Image, Keyboard, KeyboardAvoidingView, Platform
} from 'react-native';
import { globalStyles } from "../app/styles";
import { apiService } from "../utils/apiService";

export default function Setup({navigation}) {
    const [name, setName] = React.useState('');
    const [phonePreffix, setPhonePreffix] = React.useState('+27');
    const [phoneSuffix, setPhoneSuffix] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

    /////// For Real API /////
    async function requestOTP() { 
        setErrorMessage('');
        const isValid = validate();
        const phoneNumber = phonePreffix + phoneSuffix;
        const user = { name: name, phone: phoneNumber }
        if (isValid) {
            try {
                const res = await apiService.post('newUser', user)
                if (res.status) {
                    console.log('Error Status: ', res.status)
                    setErrorMessage('Check your connection & try again.')
                } else {
                    navigation.navigate('OTP', { phoneNumber, name });
                }
            } catch (error) {
                setErrorMessage('Something went wrong, Please try again.')
            }
        }
    } 


    function nextPress() {
        const isValid = validate();
        const phoneNumber = phonePreffix + phoneSuffix;
        if (isValid) {
            navigation.navigate('OTP', { phoneNumber, name }); 
        }
    }

    function validate() {
        const isNumbersOnly = (input) => /^\d+$/.test(input);
        if (!name) {
            setErrorMessage('Name cannot be empty!');
            return false;
        } else if (phoneSuffix.length !== 9) {
            setErrorMessage('Please enter a valid phone number.');
            return false;
        }
        else if (!isNumbersOnly(phoneSuffix)) {
            setErrorMessage('Phone number contains non-numeric character')
            return false;
        } else {    
            setErrorMessage();
            return true;

        }

    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // Adjust if needed
        >
        <Pressable onPress={Keyboard.dismiss} style={styles.container}>

                <Image style={styles.img} source={require('../assets/images/BLOKI.png')} />
            <Text style={styles.title}> Getting you started.</Text>
          
            <View style={styles.formContainer}>
                    <View>
                        <Text style={globalStyles.inputLabel}>Full Name</Text>
                        <TextInput style={[globalStyles.input]} maxLength={20}
                            onChangeText={(value) => {
                                setName(value)
                            }} value={name}
                            placeholder='Enter your name and surname'

                        />
                </View>
                    <View style={{ paddingTop: 4}}>
                        <Text style={globalStyles.inputLabel}>Mobile Number</Text>
                        <View style={styles.comboBox}>
                            <TextInput disabled='true' style={[globalStyles.input, { width: '20%', justifyContent: 'center' }]} maxLength={10} keyboardType='numeric'
                                onChangeText={(value) => { setPhonePreffix(value) }} value='+27' />
                            <TextInput style={[globalStyles.input, { width: '80%' }]} maxLength={9} keyboardType='numeric'
                                onChangeText={(value) => { setPhoneSuffix(value) }} value={phoneSuffix} />
                        </View>
                    </View>
                    {errorMessage ? <Text style={{ marginTop: '2%', color: 'red' }}>{errorMessage}</Text> : null}
                    <Pressable style={[globalStyles.btnPrimary]} onPress={nextPress}>
                    <Text style={{ fontSize: 24, color: 'white',fontWeight:'bold' }}> Next </Text>
                </Pressable>
            </View>
            </Pressable>
            </KeyboardAvoidingView>
    );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: '8%',
    },
    input: {
        borderColor: '#808A93',
        borderWidth: 2,
        borderRadius: 15,
        width: screenWidth * 0.80,
        height: 60,
        paddingLeft: 20,
        fontSize: 16,
    },
    label: {
        color: '#808A93',
        left:'4%'
    },
    title: {
        fontSize: 24,
        alignContent: 'center',
    },
    img: {
        alignSelf: 'center',
        width:120,
        height: 50,
    },
    comboBox: {
        flexDirection: 'row',
        gap: 5,
        width: screenWidth * 0.85,
        justifyContent:'space-evenly'

    }
});
