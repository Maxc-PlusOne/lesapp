import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { globalStyles } from "../../app/styles";
import NavHeader from "../../components/NavHeader";
import { useNavigation } from '@react-navigation/native';



export default function PersonalDetails() {

    const navigation = useNavigation();
    const [details, setDetails] = useState({
        name: "",
        phone: "",
        email: "",
    });

    const handleInputChange = (field, value) => {
        setDetails({ ...details, [field]: value });
    };

    const handleSave = () => {
        // Handle save logic here
        console.log("Saved Details:", details);
    };

    return (
        <View style={globalStyles.container}>
            <NavHeader title='Edit Personal Details' backButton={() => navigation.goBack()} />
            <ScrollView>
                <View style={styles.container}>

                    <View style={styles.inputContainer}>
                        <MaterialIcons name="person" size={20} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            value={details.name}
                            onChangeText={(value) => handleInputChange("name", value)}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialIcons name="phone" size={20} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone"
                            value={details.phone}
                            onChangeText={(value) => handleInputChange("phone", value)}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialIcons name="email" size={20} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={details.company}
                            onChangeText={(value) => handleInputChange("email", value)}
                        />
                    </View>

                    <Pressable style={globalStyles.btnPrimary} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({


    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#333",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,
        marginBottom: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    inputIcon: {
        marginRight: 10,
        color: "#888",
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    saveButton: {
        backgroundColor: "#4caf50",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 16,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
