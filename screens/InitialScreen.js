import * as React from "react";
import {
    View, Text, StyleSheet, TextInput, Dimensions,
    Pressable, Image, Keyboard, KeyboardAvoidingView, Platform
} from 'react-native';
import { RNPickerSelectStyles, globalColors, globalStyles } from "../app/styles";
import { apiService } from "../utils/apiService";
import Loading from "../components/ActivityIndicator";
import RNPickerSelect from 'react-native-picker-select';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Setup({navigation}) {
    const [name, setName] = React.useState('');
    const [phonePreffix, setPhonePreffix] = React.useState('+27');
    const [phoneSuffix, setPhoneSuffix] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    /////// For Real API /////
    async function requestOTP() { 
        setErrorMessage('');
        const isValid = validate();
        const phoneNumber = phonePreffix + phoneSuffix;
        const user = { name: name, phone: phoneNumber }
        if (isValid) {
            setLoading(true)
            try {
                const res = await apiService.auth.post('signup', user)
                if (res.error) {
                    console.log(res.error)
                    setErrorMessage(res.error)
                } else {
                    navigation.navigate('OTP', { phoneNumber, name });
                }
            } catch (error) {
                setErrorMessage('Something went wrong, Please try again.')
            }
            finally {
                setLoading(false)
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
    function navigateToSignUp() {
        navigation.navigate('SignUp')
        
    }
    if (loading) {
        return <Loading />
    } else {
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
                            placeholder='Name and surname'

                        />
                    </View>
                    <View style={{ paddingTop: 4 }}>
                        <Text style={globalStyles.inputLabel}>Mobile Number</Text>
                        <View style={styles.comboBox}>
                            {/*<TextInput disabled='true' style={[globalStyles.input, { width: '20%', justifyContent: 'center' }]} maxLength={10} keyboardType='numeric'*/}
                                {/*    onChangeText={(value) => { setPhonePreffix(value) }} value='+27' />*/}
                                <View style={{ overflow: "hidden", borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}>
                                    <RNPickerSelect
                                        useNativeAndroidPickerStyle={false}
                                        //Icon={() => <MaterialIcons name='arrow-drop-down' size={24} color='black'/>}
                                        value='+27'
                                        onValueChange={(value) => setPhonePreffix(value)}
                                        style={RNPickerSelectStyle}
                                        items={[
                                            { label: '+27', value: '+27' }
                                        ]} />
                                </View>
                                <TextInput style={[globalStyles.input, { flexShrink: 5, borderBottomLeftRadius: 0, borderTopLeftRadius:0 }]} maxLength={9} keyboardType='numeric'
                                onChangeText={(value) => { setPhoneSuffix(value) }} value={phoneSuffix} />
                            </View>
                    </View>
                        {errorMessage ? <Text style={{ marginTop: '2%', color: 'red' }}>{errorMessage}</Text> : null}
                        <Pressable style={({ pressed }) => [globalStyles.btnPrimary, pressed && globalStyles.btnPressed]} onPress={requestOTP}>
                            <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }}>Next</Text>
                        </Pressable>
                    </View>
                    <View style={styles.bottomContainer}>
                        <Pressable onPress={navigateToSignUp}>
                            <Text style={[{ color: globalColors.secondary.default, alignSelf: 'center' }]}>Sign-up as a responder</Text>
                        </Pressable>
                        <Pressable syles={globalStyles.btnSecondary}>
                            <Text style={[{ color:'grey' , alignSelf: 'center' }]}>Already have an account? Login Instead</Text>
                        </Pressable>
                    </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flexGrow: 2,

    },

    formContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: '8%',
        justifyContent:'center'
    },
    bottomContainer: {
        justifyContent: 'flex-end',
        flexSrink: 2,
        top:'8%'

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
        padding:8
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
        justifyContent: 'center',
        alignItems:'center'

    }
});
const RNPickerSelectStyle = StyleSheet.create({
    inputIOS: {
        alignSelf: 'center',
        width:10,
        fontSize: 16,
        borderRadius: 15,
        paddingVertical: 12,
        paddingHorizontal: 10.,
        borderRadius: 10,
        color: 'black',

    },
    iconContainer: {
        alignSelf: "center"
    },
    inputAndroid: {
        alignContent:'center',
        alignSelf: 'center',
        width:56,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor:'grey',
        borderWidth: 2,
        borderColor:'grey',

    

    }
});