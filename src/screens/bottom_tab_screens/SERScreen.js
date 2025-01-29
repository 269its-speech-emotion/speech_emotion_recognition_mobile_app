import React from "react";
import {View, Text, StyleSheet} from "react-native";

export default function SERScreen() {
    return (
        <View View style={styles.container}>
            <Text>SERScreen</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor:"white",
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    }
})