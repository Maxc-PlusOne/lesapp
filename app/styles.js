import { StyleSheet, Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
    input: {
        borderColor: '#808A93',
        borderWidth: 2,
        borderRadius: 15,
        width: width * 0.80,
        height: 60,
        paddingLeft: 20,
        fontSize: 16,
    },
    btnPrimary: {
        margin: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderRadius: 15,
        width: width * 0.85,
        height: 60,
        paddingHorizontal:'4%',
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        size: 24,
    },
    inputLabel: {
        color: '#808A93',
        left: 0,
        margin:'2%'
    },
    imagePreview: {
        margin: '8%',
        marginTop: '0%',
        width: '80%',
        height: '40%',
        borderRadius: 10,
    },
    title: {
        size: 48,
        fontWeight: 'bold',

    },
    subtitle: {
        size: 48,
        fontWeight: 'bold',
    },
});
