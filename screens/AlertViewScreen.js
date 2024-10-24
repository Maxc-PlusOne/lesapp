import * as React from 'react';
import { View, Text, StyleSheet, Alert, Pressable, ScrollView } from 'react-native';
import { apiService } from '../utils/apiService';
import { globalStyles } from '../app/styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Loading from '../components/ActivityIndicator';
import RNPickerSelect from 'react-native-picker-select';
export default function AlertViewScreen({ route }) {
    const { params } = route;
    const [alert, setAlert] = React.useState(null);
    const [criticalLevel, setCriticalLevel] = React.useState(null);

    async function fetchAlert() {
        try {
            const data = await apiService.get(params.id)
            return setAlert(data)
        } catch {

        }
    }

    React.useEffect(() => {
        fetchAlert()
    },[])


    if (!alert) {
        return <Loading/>
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                {/*<Text style={styles.text}> Alert View for item , {JSON.stringify(alert)} </Text>*/}

                <Text style={[globalStyles.title, { marginTop: '4%', fontSize: 18 }]}>{alert.location}</Text>
                <View style={styles.image}></View>
                <View style={styles.subContainer}>
                    {/*<MaterialIcons name="emergency" size={24} color="black" />*/}
                    <Text style={[globalStyles.subtitle, { marginVertical: '2%',fontSize:18 }]}>{alert.accidentType}</Text>
                </View>
                <View style={styles.userInfo}>
                    <Text style={styles.text, { color: 'grey' }}>REQUESTED BY</Text>
                    <Text style={styles.text}>{alert.sender.name}</Text>
                    <Text style={styles.text}>{alert.sender.phoneNumber}</Text>
                    <Text style={styles.text}>{alert.timeCreated}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '85%', marginVertical: 16, alignItems: 'center' }}>
                    <View style={styles.assignedInfo}>
                        <Text style={[styles.text, { color: 'grey' }]}>HANDLED BY</Text>
                        <Text style={styles.text}>{alert.sender.name}</Text>
                    </View >
                    <View style={styles.statusInfo}>
                        <Text style={styles.text, { color: 'grey' }}> STATUS </Text>
                        <Text style={styles.text}>{alert.status ? alert.status : ' ---'} </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'column', width: '85%', marginVertical: '2%', alignItems: 'flex-start' }}>
                    <Text style={[globalStyles.text, { color: 'grey' }]}>CRITICAL LEVEL: </Text>
                    <RNPickerSelect
                        disabled={false}
                        style={pickerSelectStyles}
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
        backgroundColor:'grey',
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