import * as React from "react";
import { StatusBar } from "expo-status-bar";
import Icon from 'react-native-ico-material-design';
import {View, StyleSheet, Text} from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import AlertsScreen from "../screens/AlertsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import InitialScreen from "../screens/InitialScreen";
import OTPScreen from "../screens/OTPScreen";
import Capture from "../components/Capture";
import AlertViewScreen from "../screens/AlertViewScreen";
import storageService from "../utils/storageService";
import Loading from "../components/ActivityIndicator";

export default function App() {
    const [isSignedIn, setIsSignedIn] = React.useState('pending');
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    const updateIsSignedIn = () => {
        checkSignInStatus()
    };
    const OTPScreenWrapper = (props) => <OTPScreen {...props} updateStatus={updateIsSignedIn} />;
    const checkSignInStatus = () => {
        storageService.get('isSignedIn').then(value => {
            setIsSignedIn(value);
        });
    };

    React.useEffect(() => {
        checkSignInStatus()
    }, [])


    //MainApp Stack for navigation 
    function MainAppStack() {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false, tabBarShown: false, initialRouteName: 'Main' }}>
                <Stack.Screen name='Main' component={MainScreen} />
                <Stack.Screen name='Capture' component={Capture} />
                <Stack.Screen name='AlertView' component={AlertViewScreen} />
                <Stack.Screen name='Welcome' component={InitialSetup} />
            </Stack.Navigator>
        )
    }

    //Main Screen
    function MainScreen() {
        const sOptions = ({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                position: "absolute",
                marginBottom: 0,
                height:80
            },


            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let label;


                if (route.name === "Home") {
                    iconName = 'home-button';
                    label = 'Home';
                } else if (route.name === "Alerts") {
                    iconName = 'turn-notifications-on-button';
                    label='Alerts'
                } else if (route.name === "Profile") {
                    iconName = 'user-shape';
                    label='Profile'
                }
                return (
                    <View style={{ alignItems: 'center', justifyContent: 'center', gap:4 }}>
                        <Icon name={iconName} color={color} />
                        <Text>{label}</Text>
                    </View>
                    
                )
            },

            tabBarInactiveTintColor: "black",
            tabBarActiveTintColor: "red",
            tabBarLabelStyle: {
                fontSize: 12,
            }
        })

        return (
            <Tab.Navigator screenOptions={sOptions}>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Alerts" component={AlertsScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        );
    }

    //Initinial Setup Screen
    function InitialSetup() {
        const options = () => (
            {
                tabBarStyle: {
                    display: "none",
                }
            }
        );

        return (
            <Tab.Navigator screenOptions={{ headerShown: false, tabBarShown: false, initialRoute: 'Initial' }}>
                <Tab.Screen name="Initial" component={InitialScreen} options={options} />
                <Tab.Screen name="OTP" component={OTPScreenWrapper}
                    options={options} />
            </Tab.Navigator>
        );
    }




    return (
        console.log('isSignedIn',isSignedIn),
        <NavigationContainer independent={true}>
                {
                    isSignedIn === 'true' ? (<MainAppStack />)
                        : isSignedIn === 'pending' ? (<Loading />)
                            : (<InitialSetup/>)
                }
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        align: "center",
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
    }
})