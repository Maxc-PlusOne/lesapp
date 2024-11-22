import * as React from 'react';
import { View, Text, StyleSheet, Alert, Pressable, ScrollView } from 'react-native';
import { apiService } from '../utils/apiService';
import { RNPickerSelectStyles, globalColors, globalStyles } from '../app/styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Loading from '../components/ActivityIndicator';
import RNPickerSelect from 'react-native-picker-select';
import storageService from '../utils/storageService';
export default function AlertViewScreen({ route }) {
    const { params } = route;
    const [alert, setAlert] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [severitylLevel, setSeverityLevel] = React.useState(null);

    async function fetchAlert() {
        try {
            const res = await apiService.get('alerts', params.id)
            setAlert(res);
                await fetchUser(res.user); // Fetch user only if user ID is available
        } catch {

        }
    }
    async function fetchUser(value) {
        try {
            const res = await apiService.get('user', value)
            return ( setUser(res))
        } catch {

        }
    }

    React.useEffect(() => {
        fetchAlert()
    },[])


    if (!alert && !user) {
        return <Loading/> 
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                {/*<Text style={styles.text}> Alert View for item , {JSON.stringify(alert)} </Text>*/}

                <Text style={[globalStyles.title, { marginTop: '4%', fontSize: 18 }]}>{alert.location.lat}, {alert.location.lng}</Text>
                <View style={styles.image}></View>
                <View style={styles.subContainer}>
                    {/*<MaterialIcons name="emergency" size={24} color="black" />*/}
                    <Text style={[globalStyles.subtitle, { marginVertical: '2%',fontSize:18 }]}>Accident Type Here</Text>
                </View>
                <View style={styles.userInfo}>
                    <Text style={styles.text, { color: 'grey' }}>REQUESTED BY</Text>
                    <Text style={styles.text}>{user?.name}</Text>
                    <Text style={styles.text}>{user?.phone}</Text>
                    <Text style={styles.text}>Time Created</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '85%', marginVertical: 16, alignItems: 'center' }}>
                    <View style={styles.assignedInfo}>
                        <Text style={[styles.text, { color: 'grey' }]}>HANDLED BY</Text>
                        <Text style={styles.text}>Responders Name</Text>
                    </View >
                    <View style={styles.statusInfo}>
                        <Text style={styles.text, { color: 'grey' }}>STATUS</Text>
                        <Text style={styles.text}>{alert.status ? alert.status : ' ---'} </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'column', width: '85%', marginVertical: '2%', alignItems: 'flex-start' }}>
                    <Text style={[globalStyles.text, { color: 'grey' }]}>SEVERITY LEVEL</Text>
                    <RNPickerSelect
                        disabled={false}
                        style={RNPickerSelectStyles}
                        onValueChange={(value) => console.log(value)}
                        items={[
                            { label: 'Level 1', value: '1' }, //change these values to match API 
                            { label: 'Level 2', value: '2' },
                            { label: 'Level 3', value: '3' },
                        ]}
                    />
                </View>
                <Pressable style={globalStyles.btnPrimary}>
                    <Text style={[globalStyles.btnText]}>Handle Request</Text>
                </Pressable>
                {/*<Pressable style={[globalStyles.btnPrimary, { backgroundColor: 'grey', }]}>*/}
                {/*    <Text style={globalStyles.btnText}>Cancel</Text>*/}
                {/*</Pressable>*/}
            </View>
        </ScrollView>
    )


}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center'
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        size: 36
    },
    image: {
        backgroundColor: 'black',
        width: '85%',
        height: 380,
        borderRadius: 10,
        marginVertical: '2%',
    },
    userInfo: {
        alignSelf: 'flex-start',
        left: '8%',
    },
    assignedInfo: {
    },
    statusInfo: {

    },
    picker: {
        height: 50,
        width: '85%',
    },
})
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        alignSelf: 'center',
        width:"100%",
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: globalColors.primary.default,
        borderRadius: 10,
        color: 'black', 
        top:4
    },
    inputAndroid: {
        alignSelf: 'center',
        width: "85%",
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: 'light-grey',
        color: 'black',

    },
});