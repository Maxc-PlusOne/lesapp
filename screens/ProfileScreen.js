import * as React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { globalStyles } from "../app/styles";
import storageService from "../utils/storageService";
import { CommonActions } from '@react-navigation/native';
import { apiService } from "../utils/apiService";



export default function ProfileScreen({ navigation }) {
    const [token, setToken] = React.useState();

    function logout() {

        storageService.remove('isSignedIn');
            storageService.remove('token');
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Welcome' }],
                })
            )
    }

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Pressable style={globalStyles.btnPrimary} onPress={logout}>
                    <Text style={globalStyles.btnText}>Logout</Text>
                </Pressable>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 24,
    },
    main: {
        flex: 1,
        justifyContent: "center",
        maxWidth: 960,
        marginHorizontal: "auto",
    },
    title: {
        fontSize: 64,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 36,
        color: "#38434D",
    },
});