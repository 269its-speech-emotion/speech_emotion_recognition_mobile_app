import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { Fonts } from "../../constants/Fonts";

const { width } = Dimensions.get("window");

export default function Slide({ item }) {
    return (
        <View style={styles.slideContainer}>
            <Image source={item?.image} style={styles.slideImage} />
            <View>
                <Text style={styles.title}>{item?.title}</Text>
                <Text style={styles.description}>{item?.description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    slideContainer: {
        alignItems: 'center',
    },
    slideImage: {
        height: '75%',
        width: width,
        resizeMode: 'contain',
    },
    title: {
        color: Colors.primaryColor_EA458E,
        fontFamily: Fonts.SemiBold,
        fontSize: 22,
        marginTop: 20,
        textAlign: 'center',
    },
    description: {
        color: Colors.primaryColor_EA458E,
        fontFamily: Fonts.Regular,
        fontSize: 14,
        marginTop: 10,
        maxWidth: '70%',
        textAlign: 'center',
        lineHeight: 23,
    },
});