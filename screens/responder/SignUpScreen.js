import * as React from "react";
import {
    View, Text, StyleSheet, TextInput, Dimensions,
    Pressable, Image, Keyboard, KeyboardAvoidingView, Platform
} from 'react-native';
import { RNPickerSelectStyles, globalColors, globalStyles } from "../../app/styles";
import { apiService } from "../../utils/apiService";
import Loading from "../../components/ActivityIndicator";
import RNPickerSelect from 'react-native-picker-select';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function SignUp({navigation}) {
    const [name, setName] = React.useState('');
    const [code, setCode] = React.useState('');
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

                    <Image style={styles.img} source={require('../../assets/images/WLOKI.png')} />
                    <Text style={{ paddingTop:20, textAlign: 'center', fontSize: 16, color: 'white' }}> Create a new responder profile. </Text>
                <View style={styles.formContainer}>
                        <View>
                            <Text style={[globalStyles.inputLabel, { color: 'white' }]}>Name</Text>
                            <TextInput style={[globalStyles.input, { borderColor: 'white', color:'white' }]} maxLength={20}
                            onChangeText={(value) => {
                                setName(value)
                            }} value={name}
                            placeholder='enter your name and surname'

                        />
                    </View>
                    <View style={{ paddingTop: 4 }}>
                            <Text style={[globalStyles.inputLabel, {color:'white'}]}>Client Code</Text>
                            <TextInput style={[globalStyles.input, { borderColor:'white',color:'white' }]} maxLength={5} keyboardType='numeric'
                                onChangeText={(value) => { setCode(value) }} value={code}
                                placeholder='provided by your company'
                            />
                        </View>
                        {errorMessage ? <Text style={{ marginTop: '2%', color: 'red' }}>{errorMessage}</Text> : null}
                        <Pressable style={[globalStyles.btnPrimary, { backgroundColor: 'white' }]} onPress={requestOTP}>
                            <Text style={{ fontSize: 24, color: globalColors.primary.default , fontWeight: 'bold' }}>Next</Text>
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
        backgroundColor: globalColors.primary.default,
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