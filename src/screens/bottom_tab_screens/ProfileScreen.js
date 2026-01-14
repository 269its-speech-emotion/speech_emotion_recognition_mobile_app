import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, ActivityIndicator} from "react-native";
import StorageHelper from "../../utils/StorageHelper";
import GuestProfileScreen from "./GuestProfileScreen";

export default function ProfileScreen() {
    const [isGuest, setIsGuest] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkGuestStatus();
    }, []);

    const checkGuestStatus = async () => {
        try {
            const guestMode = await StorageHelper.isGuestMode();
            setIsGuest(guestMode);
        } catch (error) {
            console.error("Error checking guest status:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#EA458E" />
            </View>
        );
    }

    // If guest, show GuestProfileScreen
    if (isGuest) {
        return <GuestProfileScreen />;
    }

    // Otherwise show regular profile (placeholder for now)
    return (
        <View View style={styles.container}>
            <Text>Authenticated User Profile</Text>
            <Text style={styles.subtitle}>Full profile features coming soon...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor:"white",
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        padding: 20,
    },
    loadingContainer: {
        backgroundColor: "white",
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    subtitle: {
        marginTop: 10,
        fontSize: 14,
        color: "#666",
    },
})