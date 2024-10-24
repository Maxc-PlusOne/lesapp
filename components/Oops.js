import { Image, StyleSheet, View, Text,Pressable } from 'react-native';
import { globalStyles } from '../app/styles';


export default function Oops({ status, retry }) {

    function errorStatus() {
        if (status) {
            return <Text style={styles.errorText}>ERROR_STATUS:{status}</Text>
        } else {
            return null;
        }
    }

    return (
        < View style={styles.container} >
            <Image style={styles.image} source={require('../assets/images/database.png')} />
            <Text style={styles.errorText}>Oops, something went wrong.</Text>
            {errorStatus()}
            {/*<Pressable style={globalStyles.btnPrimary} onPress={{}}>*/}
            {/*    <Text style={globalStyles.btnText}>Retry</Text>*/}
            {/*</Pressable>*/}
        </View >

    )
}

const styles = StyleSheet.create({

    image: {
        width: 100,
        height: 100,
        margin:'4%'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    errorText: {
        color: 'grey',
        padding: '1%'
    },
})