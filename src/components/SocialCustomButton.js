import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Colors";

export default function SocialCustomButton({iconURL, onPress}) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image style={styles.image} source={iconURL} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.borderColor_AEB5BB,
        borderRadius: 100,
        justifyContent: 'center',
        padding: 10,
        marginVertical: 8,
    },
    image: {
        height: 30,
        width: "100%",
        resizeMode: 'contain',
    },
})