import * as React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { globalStyles } from "../app/styles";
import storageService from "../utils/storageService";
import { CommonActions } from '@react-navigation/native';
import { apiService } from "../utils/apiService";



export default function ProfileScreen({navigation}) {
    const [user, setUser] = React.useState(storageService.get('userId'));
   async function getUser() {
        const userId = await storageService.get('userId')
        
        try {
            const res = await apiService.get('user', userId.replace(/['"]/g, ''))
            return setUser(res)
        } catch {

        }
    }

    React.useState(() => {
        getUser()
    },[])

    function logout() {

        storageService.remove('userId'),
            storageService.remove('isSignedIn'),
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
                <Text style={styles.subtitle}>{user.name}</Text>
                <Text style={styles.subtitle}>{user.phone}</Text>
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