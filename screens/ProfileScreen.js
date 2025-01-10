import * as React from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { globalColors, globalStyles } from "../app/styles";
import storageService from "../utils/storageService";
import { CommonActions } from '@react-navigation/native';
import { apiService } from "../utils/apiService";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


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
    const options = [
        {
            id: 1,
            title: 'Personal Details',
            icon: 'person',
            alt:'Personal',
        },
        {
            id: 2,
            title: 'Health Information',
            icon: 'local-hospital',
            alt:'Health',
        },
        {
            id: 3,
            title: 'Medical Aid',
            icon: 'medical-information',
            alt:'Medical',
        },
        {
            id: 4,
            title: 'Settings',
            icon: 'settings',
            alt:'Settings',
        },
    ];

    const renderItem = ({ item }) => (
        <Pressable key={item.id}
            onPress={() => clickItem(item.alt)}
            style={[styles.itemContainer]}
 
        >
            <View>
                <MaterialIcons name={item.icon} style={styles.optionsIcons} size={styles.optionsIcons.size} />
            </View>

            <Text style={styles.optionsText}>{item.title}</Text>

        </Pressable>

    )

    function clickItem(alt) {
        navigation.navigate(alt)
    }

    return (
        <View style={styles.container}>

            <View style={[styles.card, globalStyles.shadow]}>
                <View style={styles.avatar}>
                    <MaterialIcons name='person' size={48} style={styles.avatarIcon} />
                </View>
                <View style={{ padding:8 }}>
                    <Text style={styles.cardTitle}>Full Name</Text>
                    <Text style={styles.cardSubtitle}>Phone | Company</Text>
                </View>
            </View>
            <View styles={styles.flatlist}>
                <FlatList
                    data={options}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                  //ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
                />
            </View>
            <Pressable style={[globalStyles.btnPrimary,{ alignSelf: 'center', position: 'absolute', bottom: 80 }]} onPress={logout}>
                <MaterialIcons name='logout' size={18} style={{ transform: [{rotate:'180deg'}]}} color='white' />
                <Text style={globalStyles.btnText}>Sign Out</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: "column",
        alignItems: "stretch",
        paddingHorizontal: 2,
        backgroundColor: globalColors.surface.light,
        gap:8
    },
    optionsIcons: {
        size: 26,
        color: globalColors.primary.default 
    },
    flatlist: {

    },
    itemSeperator: {
        height: 2,
        backgroundColor: 'grey',
        marginHorizontal: 8,
        borderRadius:100
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: "stretch",
        padding: 8,
        margin:2,
   
    },
    card: {
        alignItems: "center",
        flexDirection:'row',
        backgroundColor: globalColors.primary.default,
        height: 100,
        width: '100%',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        padding:4
    },
    cardTitle: {
        color: 'white',
        fontWeight: 'Bold',
        fontSize:24
    },
    cardSubtitle: {
        color:'white'
    },
    avatar: {
        height: 60,
        width: 60,
        margin: 8,
        borderRadius:100,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems:'center'
    },
    avatarIcon: {
        color: globalColors.primary.default
    },
    optionsText: {
        left: 8
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