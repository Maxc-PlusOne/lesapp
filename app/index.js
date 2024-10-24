import * as React from "react";
import { StatusBar } from "expo-status-bar"
import Icon from 'react-native-ico-material-design';
import {View, StyleSheet } from 'react-native'
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

export default function App() {
    const [isSignedIn, setIsSignedIn] = React.useState(true);
    const updateIsSignedIn = (value) => {
        setIsSignedIn(value)
    };
    const OTPScreenWrapper = (props) => <OTPScreen {...props} updateStatus={updateIsSignedIn} />;
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();

    //MainApp Stack for navigation 
    function MainAppStack() {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false, tabBarShown: false, initialRoute: 'Main Screen' }}>
                <Stack.Screen name='Main Screen' component={MainScreen} />
                <Stack.Screen name='Capture' component={Capture} />
                <Stack.Screen name='AlertView' component={AlertViewScreen} />
            </Stack.Navigator>
        )
    }

    //Main Screen
    function MainScreen() {
        const sOptions = ({ route }) => ({
            headerShown: false,
            tabBarStyle: {
                position: "absolute",
                marginBottom: 0,
            },

            tabBarIcon: ({ focused, color, size }) => {
                let iconName;


                if (route.name === "Home") {
                    iconName = 'home-button';
                } else if (route.name === "Alerts") {
                    iconName = 'turn-notifications-on-button';
                } else if (route.name === "Profile") {
                    iconName = 'user-shape'
                }
                return <Icon name={iconName} color={color} />;
            },

            tabBarInactiveTintColor: "black",
            tabBarActiveTintColor: "red",
            tabBarLabelStyle: {
                fontSize: 12,
                marginBottom: -20,
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
        <NavigationContainer independent={true}>
            {isSignedIn ? <MainAppStack /> : <InitialSetup />}
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        align: "center"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
    }
})