import React from "react";
import {View, Text, StyleSheet} from "react-native";

export default function HistoricScreen() {
    return (
        <View View style={styles.container}>
            <Text>HistoricScreen</Text>
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