import * as React from "react";
import {
    View, Text, StyleSheet, TextInput, Dimensions,
    Pressable, Image, Keyboard, KeyboardAvoidingView, Platform
} from 'react-native';

export default function Setup({navigation}) {
    const [name, setName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    function nextPress() {
        navigation.jumpTo('OTP', { phoneNumber, name });
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // Adjust if needed
        >
        <Pressable onPress={Keyboard.dismiss} style={styles.container}>

                <Image style={styles.img} source={require('../assets/images/lesappLogoW.png')} />
            <Text style={styles.title}>Getting you started.</Text>
          
            <View style={styles.formContainer}>
                <View>
                        <Text style={styles.label}>Name</Text>
                        <TextInput style={styles.input} maxLength={20}
                            onChangeText={(value) => { setName(value) }} value={name} />
                </View>
                <View style={{ paddingTop: 8 }}>
                        <Text style={styles.label}>Mobile Number</Text>
                        <TextInput style={styles.input} maxLength={10} keyboardType='numeric'
                            onChangeText={(value) => { setPhoneNumber(value) }} value={phoneNumber} />
                    </View>
                    <Pressable style={styles.button} onPress={nextPress}>
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor:'white'
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        top:'2%',
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
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderRadius: 15,
        width: screenWidth * 0.85,
        height: 60,
        top:'8%'
    },
    title: {
        fontSize: 32,
        paddingTop:'12%',
        alignContent: 'center',
        paddingHorizontal:'16%',
    },
    img: {
        width: 400,
        height:'16%',
        marginTop:'16%',
        marginLeft:32
    }
});
