import React from "react";
import {View, Text, Image, StyleSheet} from "react-native";
import {Colors} from "../constants/Colors";
import {Fonts} from "../constants/Fonts";

export default function BottomTabIcon({img, text, focused}) {
    return (
        <View style={[styles.container,]}>
            <Image
                source={img}
                resizeMode="contain"
                style={{
                    width: 30,
                    height: 30,
                    tintColor: "blue",
                }}
            />
            <Text style={{
                alignSelf: "center",
                color: "blue",
                fontFamily: focused ? Fonts.Bold : Fonts.Regular,
                fontSize: focused ? 18 : 15,
                }}
            >
                {text}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        borderWidth: 1,
        borderColor: "blue",
        backgroundColor: Colors.primaryColor_EA458E,
        paddingHorizontal: 10,
        borderRadius: 100,
        width: 110,
        height: 50,
    }
})