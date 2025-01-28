import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Colors";
import { Fonts } from "../constants/Fonts";

export default function CustomTextButton({ onPress, text }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.forgotPasswordText}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    forgotPasswordText: {
        textAlign: "right",
        fontFamily: Fonts.SemiBold,
        marginVertical: 10,
        color: Colors.secondaryColor_45484A,
        },
});