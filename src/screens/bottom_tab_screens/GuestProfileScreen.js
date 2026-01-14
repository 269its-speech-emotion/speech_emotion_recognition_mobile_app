import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/Colors";
import { Fonts } from "../../constants/Fonts";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../../components/CustomButton";

export default function GuestProfileScreen() {
    const navigation = useNavigation();

    const onCreateAccountPressed = () => {
        navigation.navigate("SignupScreen", { fromGuestMode: true });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Guest Avatar */}
            <View style={styles.avatarContainer}>
                <View style={styles.avatarCircle}>
                    <Ionicons name="person-outline" size={60} color={Colors.primaryColor_EA458E} />
                </View>
                <Text style={styles.guestTitle}>Guest User</Text>
                <Text style={styles.guestSubtitle}>You're using SERMA as a guest</Text>
            </View>

            {/* Benefits Section */}
            <View style={styles.benefitsContainer}>
                <Text style={styles.benefitsTitle}>Create an account to unlock:</Text>
                
                <View style={styles.benefitItem}>
                    <Ionicons name="checkmark-circle" size={24} color={Colors.primaryColor_EA458E} />
                    <Text style={styles.benefitText}>Save your emotion history permanently</Text>
                </View>

                <View style={styles.benefitItem}>
                    <Ionicons name="checkmark-circle" size={24} color={Colors.primaryColor_EA458E} />
                    <Text style={styles.benefitText}>Track your progress over time</Text>
                </View>

                <View style={styles.benefitItem}>
                    <Ionicons name="checkmark-circle" size={24} color={Colors.primaryColor_EA458E} />
                    <Text style={styles.benefitText}>Sync across multiple devices</Text>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
                <CustomButton 
                    onPress={onCreateAccountPressed}
                    text="Create Account"
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "white",
        padding: 20,
    },
    avatarContainer: {
        alignItems: "center",
        marginTop: 30,
        marginBottom: 30,
    },
    avatarCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#FFF0F5",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    guestTitle: {
        fontSize: 24,
        fontFamily: Fonts.Bold,
        color: Colors.secondaryColor_45484A,
        marginBottom: 8,
    },
    guestSubtitle: {
        fontSize: 14,
        fontFamily: Fonts.Regular,
        color: Colors.secondaryColor_45484A,
        opacity: 0.7,
    },
    benefitsContainer: {
        marginBottom: 20,
    },
    benefitsTitle: {
        fontSize: 18,
        fontFamily: Fonts.SemiBold,
        color: Colors.secondaryColor_45484A,
        marginBottom: 20,
    },
    benefitItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        paddingLeft: 10,
    },
    benefitText: {
        fontSize: 16,
        fontFamily: Fonts.Regular,
        color: Colors.secondaryColor_45484A,
        marginLeft: 12,
        flex: 1,
    },
    buttonContainer: {
        marginTop: 1,
        marginBottom: 50,
    },
});
