import * as react from "react";
import { View, Text, StyleSheet, FlatList,Pressable} from "react-native";
import { apiService } from '../utils/apiService';
import { globalStyles } from "../app/styles";
import Loading from "../components/ActivityIndicator";
import Oops from "../components/Oops";
import { useNavigation } from '@react-navigation/native';

export default function AlertsScreen() {

    const [alerts, setAlerts] = react.useState(null);
    const [statusCode, setStatusCode] = react.useState(null);
    const navigation = useNavigation();


    async function getAlerts() {
        try {
            const res = await apiService.get('alerts');
            if (res.status) {
                setStatusCode(res.status)
                setAlerts('error')
            } else {
                setAlerts(res)
            }
        } catch(error) {
            console.log('...waited for service,', error)
            setAlerts('error')
        }

    }

    //Call once, after the component mounts
    react.useEffect(() => {
        getAlerts()
    }, []);

    function viewItem(value) {
        return navigation.navigate('AlertView', { id: value });
    }

    //Function to render FlatList item
    function render({ item }) {
        return (
            <Pressable onPress={() => { viewItem(item.id) } }>
                <View style={styles.item}>
                    <Text style={styles.subtitle}> {item.location.lat}, {item.location.lng} </Text>
                </View>
            </Pressable>
        )
    }


    //Output
    if (!alerts) {
        return <Loading />
    } else if (alerts === 'error') {
        return <Oops status={statusCode} />;
    }

    return ( 
        
        < View style = { styles.container } >
            <View style={styles.main}>
                <FlatList
                    data={alerts}
                    renderItem={render}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={() =>
                        <View style={{ height: 2, marginVertical: 4, width: '100%', backgroundColor: 'gray' }} />
                    }
                />
            </View>
        </View >
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
        flexDirection:'row',
        justifyContent: "start",
        maxWidth: 960,
        marginHorizontal: "auto",
    },
    title: {
        fontSize: 64,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 24,
        color: "#38434D",
    },
    item: {
        padding:4
    }
});