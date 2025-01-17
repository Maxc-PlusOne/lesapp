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
import {useNavigation} from '@react-navigation/native';
import storageService from "../../utils/storageService";

export default function SignUp() {
    const [name, setName] = React.useState('');
    const [code, setCode] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] = React.useState('')
    const navigation = useNavigation();

    /////// For Real API /////
    async function requestOTP() { 
        setErrorMessage('');
        const isValid = validate();
        const user = { name: name, email: email }
        if (isValid) {
            setLoading(true)
            try {
                await storageService.save('isSignedIn', true);
                await storageService.save('userType', 'responder');
                navigation.navigate('Main');
            }
            finally {
                setLoading(false)
            }
        }
    } 

    function validate() {
        const isNumbers = (input) => /^\d+$/.test(input);
        const email = (input) => /^[^@]+@[^@]+\.[^@]+$/.test(input);
        if (!name) {
            setErrorMessage('Name cannot be empty!');
            return false;
        //} else if ('') {
        //    setErrorMessage('Name cannot contain digit(s)!')
        //    return false;
        } else if (!code) {
            setErrorMessage('Please enter a valid client code!');
            return false;
        }
        
        else if (!isNumbers(code)) {
            setErrorMessage('Code contains non-numeric character(s)!')
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
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <Pressable onPress={Keyboard.dismiss} style={styles.container}>

                    <Image style={styles.img} source={require('../../assets/images/WLOKI.png')} />
                    <Text style={[styles.title]}> Create a new responder profile. </Text>
                <View style={styles.formContainer}>
                        <View>
                            <Text style={[globalStyles.inputLabel, { color: 'white' }]}>Full Name</Text>
                            <TextInput style={[globalStyles.input, { borderColor: 'white', color:'white' }]} maxLength={20}
                            onChangeText={(value) => {
                                setName(value)
                            }} value={name}
                                placeholder='Name and Surname'
                                placeholderTextColor={globalColors.secondary.default}

                        />
                        </View>
                        <View>
                            <Text style={[globalStyles.inputLabel, { color: 'white' }]}>Email Address</Text>
                            <TextInput style={[globalStyles.input, { borderColor: 'white', color: 'white' }]}
                                onChangeText={(value) => setEmail(value)}
                                value={email}
                                inputMode={email}
                                autoComplete={email}
                                placeholder='Email Address'
                                placeholderTextColor={globalColors.secondary.default}
                            />
                        </View>
                    <View style={{ paddingTop: 4 }}>
                            <Text style={[globalStyles.inputLabel, {color:'white'}]}>Client Code</Text>
                            <TextInput style={[globalStyles.input, { borderColor:'white',color:'white' }]} maxLength={5} keyboardType='numeric'
                                onChangeText={(value) => { setCode(value) }} value={code}
                                placeholder='Provided by your company'
                                placeholderTextColor={globalColors.secondary.default}
                            />
                        </View>

                        {errorMessage ? <Text style={{ marginTop: '2%', color: globalColors.primary.default }}>{errorMessage}</Text> : null}
                        <Pressable style={[globalStyles.btnPrimary, { backgroundColor: 'white' }]} onPress={requestOTP}>
                            <Text style={{ fontSize: 24, color: '#141414' , fontWeight: 'bold' }}>Next</Text>
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
        backgroundColor: "#141414",
        flexGrow:2
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
        fontSize: 16,
        alignContent: 'center',
        padding: 8,
        color:'white'
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