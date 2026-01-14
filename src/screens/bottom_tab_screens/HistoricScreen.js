import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, FlatList, ActivityIndicator} from "react-native";
import { Colors } from "../../constants/Colors";
import { Fonts } from "../../constants/Fonts";
import StorageHelper from "../../utils/StorageHelper";

export default function HistoricScreen() {
    const [isGuest, setIsGuest] = useState(false);
    const [loading, setLoading] = useState(true);
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        checkGuestStatusAndLoadHistory();
    }, []);

    const checkGuestStatusAndLoadHistory = async () => {
        try {
            const guestMode = await StorageHelper.isGuestMode();
            setIsGuest(guestMode);
            
            if (!guestMode) {
                // Load persistent history for authenticated users
                // TODO: Fetch from AsyncStorage or backend
                const savedHistory = []; // Placeholder
                setHistoryData(savedHistory);
            }
            // For guests, historyData stays as empty array (session-only in parent component)
        } catch (error) {
            console.error("Error checking guest status:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primaryColor_EA458E} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Guest Mode Banner */}
            {isGuest && (
                <View style={styles.banner}>
                    <Text style={styles.bannerIcon}>⚠️</Text>
                    <View style={styles.bannerTextContainer}>
                        <Text style={styles.bannerTitle}>Temporary History</Text>
                        <Text style={styles.bannerText}>
                            Your history is saved for this session only. Sign up to save it permanently.
                        </Text>
                    </View>
                </View>
            )}

            {/* History List */}
            {historyData.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyIcon}>📊</Text>
                    <Text style={styles.emptyTitle}>No History Yet</Text>
                    <Text style={styles.emptyText}>
                        {isGuest 
                            ? "Your emotion analysis results will appear here during this session."
                            : "Your emotion analysis history will appear here."}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={historyData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.historyItem}>
                            <Text style={styles.historyText}>{item.emotion}</Text>
                            <Text style={styles.historyDate}>{item.date}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
    },
    loadingContainer: {
        backgroundColor: "white",
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    banner: {
        backgroundColor: "#FFF3CD",
        padding: 16,
        flexDirection: "row",
        alignItems: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: "#FFE69C",
    },
    bannerIcon: {
        fontSize: 24,
        marginRight: 12,
    },
    bannerTextContainer: {
        flex: 1,
    },
    bannerTitle: {
        fontSize: 14,
        fontFamily: Fonts.SemiBold,
        color: "#856404",
        marginBottom: 4,
    },
    bannerText: {
        fontSize: 12,
        fontFamily: Fonts.Regular,
        color: "#856404",
        lineHeight: 18,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 20,
        fontFamily: Fonts.Bold,
        color: Colors.secondaryColor_45484A,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        fontFamily: Fonts.Regular,
        color: Colors.secondaryColor_45484A,
        textAlign: "center",
        lineHeight: 20,
        opacity: 0.7,
    },
    historyItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    historyText: {
        fontSize: 16,
        fontFamily: Fonts.SemiBold,
        color: Colors.secondaryColor_45484A,
    },
    historyDate: {
        fontSize: 12,
        fontFamily: Fonts.Regular,
        color: Colors.secondaryColor_45484A,
        marginTop: 4,
        opacity: 0.6,
    },
})