import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {Colors} from "../../constants/Colors";

export default function HomeWelcomeScreen() {
    return (
        <View style={styles.container}>
            <Text>home screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
        padding: 20,
    }
});