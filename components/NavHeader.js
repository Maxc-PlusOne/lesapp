import { View, Text, StyleSheet, Pressable } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { globalStyles } from "../app/styles";

const NavHeader = ({ backButton, title = '' }) => {
    return (
        <View >
            <View style={[styles.container, globalStyles.shadow]}>
                <Pressable onPress={backButton} style={styles.button }>
                    <MaterialIcons name='arrow-back-ios' size={24} />
                </Pressable>
                <Text style={styles.title}>{title}</Text>
                <Pressable style={styles.button}>
                    <MaterialIcons name='info-outline' size={24} />
                </Pressable>
            </View>
            {/*<View style={styles.seperator} />*/}
        </View>
    )

};

export default NavHeader;

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 8,
        paddingHorizontal: 4,

    },
    title: {
        
    },
    seperator: {
        height: 2,
        backgroundColor: 'black',
        borderRadius: 100,
        marginBottom:8

    },
    button: {
        padding:4
    }

})