import * as React from "react";
import { StatusBar } from "expo-status-bar"
import Icon from 'react-native-ico-material-design';
import {View, StyleSheet } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import AlertsScreen from "../screens/AlertsScreen";
import ProfileScreen from "../screens/ProfileScreen";


const Tab = createBottomTabNavigator();
const sOptions = ({route}) => ({
    headerShown: false,
    tabBarStyle: {
        position: "absolute",
        marginBottom:0,
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

    tabBarInactiveTintColor:"black",
    tabBarActiveTintColor: "red",
    tabBarLabelStyle: {
        fontSize: 12,
        marginBottom:-20,
    }
})
export default function App() {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent={true} style="auto" />
            <NavigationContainer independent={true}>
                <Tab.Navigator style={styles.tabBar} screenOptions={sOptions}>
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Alerts" component={AlertsScreen} />
                    <Tab.Screen name="Profile" component={ProfileScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        align: "center"
    }
})