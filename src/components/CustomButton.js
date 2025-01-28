import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Colors";
import { Fonts } from "../constants/Fonts";


export default function CustomButton({ onPress, text }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primaryColor_EA458E,
        borderRadius: 100,
        marginTop: 10,
    },
    text: {
        color: Colors.white,
        fontSize: 20,
        fontFamily: Fonts.SemiBold,
        textAlign: 'center',
        padding: 10,
    },
});