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
        justifyContent: 'center',
        width: width,
        paddingHorizontal: 20,
    },
    slideImage: {
        height: 300,
        width: width - 80,
        resizeMode: 'contain',
        marginBottom: 40,
    },
    title: {
        color: Colors.primaryColor_EA458E,
        fontFamily: Fonts.SemiBold,
        fontSize: 24,
        marginBottom: 15,
        textAlign: 'center',
    },
    description: {
        color: Colors.primaryColor_EA458E,
        fontFamily: Fonts.Regular,
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 30,
    },
});