import React from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Colors } from "../../constants/Colors";


const circleContainerSize = 50;

const AnimatedCircle = ({ circleX }) => {
    const circleContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: circleX.value - circleContainerSize / 2 }],
        };
        }, []);

    return <Animated.View style={[circleContainerStyle, styles.container]} />;
};

export default AnimatedCircle;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: -circleContainerSize / 1.1,
        width: circleContainerSize,
        borderRadius: circleContainerSize,
        height: circleContainerSize,
        backgroundColor: Colors.primaryColor_EA458E,
        justifyContent: "center",
        alignItems: "center",
    },
});
