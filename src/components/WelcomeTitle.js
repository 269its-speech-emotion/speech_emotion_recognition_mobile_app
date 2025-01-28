import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import { Fonts } from "../constants/Fonts";


export default function WelcomeTitle ({textLine1, textLine2, textLine3}) {
    return (
        <View style={styles.textContainer}>
            {textLine1 && <Text style={styles.headingText}>{textLine1}</Text>}
            {textLine2 && <Text style={styles.headingText}>{textLine2}</Text>}
            {textLine3 && <Text style={styles.headingText}>{textLine3}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    textContainer: {
        marginVertical: 20,
    },
    headingText: {
        fontSize: 32,
        color: Colors.primaryColor_EA458E,
        fontFamily: Fonts.SemiBold,
    },
});