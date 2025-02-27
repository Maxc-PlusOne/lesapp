import { StyleSheet, Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window');

export const globalColors = {
    primary: {
        default: '#DB222A',
        subtle: '#FFD3CC'
    },
    secondary: {
        xstrong: '#2C3034',
        strong: '#808A93',
        default: '#ACB3B9',
        subtle: '#E9EBEC',

    },

    border: {
        primary:'#B11B23',
        secondary:'#ACB3B9'
    },
    surface: {
        light: "#f9f9f9"
    }
}

export const globalStyles = StyleSheet.create({
    input: {
        borderColor: '#808A93',
        borderWidth: 2,
        borderRadius: 15,
        width: width * 0.85,
        height: 56,
        paddingLeft: 20,
        fontSize: 16,
        marginVertical: '1%'
    },


    btnPrimary: {
        flexDirection: 'row',
        marginVertical: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: globalColors.primary.default,
        borderRadius: 15,
        width: width * 0.85,
        height: 50,
        gap:4,
        paddingHorizontal: '4%',
    },    
    btnSecondary: {
        marginVertical: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: globalColors.secondary.default,
        borderRadius: 15,
        width: width * 0.85,
        height: 50,
        paddingHorizontal: '4%',

    },
    btnPressed: {
        opacity: 0.5
    },
    shadow: {
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // Android shadows
        elevation: 5, // For smooth edges that blend better with the shadow

    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        size: 42,
    },
    inputLabel: {
        color: globalColors.secondary.strong,
        left: 8,
        button: 8
    },
    imagePreview: {
        marginVertical: '4%',
        width: '85%',
        height: '45%',
        borderRadius: 15,
        flexGrow: 5,
        flexShrink:5
    },
    title: {
        size: 48,
        fontWeight: 'bold',

    },
    subtitle: {
        size: 48,
        fontWeight: 'bold',
        margin:8
    },
    container: {
        padding: 16,
        backgroundColor: "#f9f9f9",
    }


});
export const RNPickerSelectStyles = StyleSheet.create({
    inputIOS: {
        alignSelf: 'center',
        width: width*0.85,
        fontSize: 16,
        borderRadius:15,
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: globalColors.primary.default,
        borderRadius: 10,
        color: 'white',
        top: 2,

    },
    inputAndroid: {
        alignSelf: 'center',
        width: width * 0.85,
        borderRadius:100,
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: globalColors.primary.default,
        borderWidth:2,
        color: 'white',
        top: 2,

    },
});

