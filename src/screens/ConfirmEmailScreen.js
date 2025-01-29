import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import WelcomeTitle from "../components/WelcomeTitle";

import ApiService from "../service/ApiService";
import StorageHelper from "../utils/StorageHelper";

import { Fonts } from "../constants/Fonts";
import { Colors } from "../constants/Colors";

export default function ConfirmEmailScreen() {
    const {control, handleSubmit} = useForm();
    const navigation = useNavigation();

    const onConfirmPressed = async (verificationCode) => {
        try {
            const userDTO = await StorageHelper.getUserDTO();
            console.log("await StorageHelper.getUserDTO", userDTO);

            if (userDTO) {
                console.log("Retrieved userdto:", userDTO);
                const verificationRequest = {
                    "verificationCode": verificationCode["confirmation-code"],
                    "email": userDTO["email"],
                };

                console.log("verificationRequest:", verificationRequest);

                const response = await ApiService.verifyUser(verificationRequest);
                if (response && response.statusCode === 200) {
                    console.log("Email verification successful !");
                    navigation.navigate("HomeWelcomeScreen");
                } else {
                    console.log("Email verification failed  !", response.statusCode);
                    console.log("Email verification failed  !", response.message);
                }
            } else {
                console.log("No userDTO found");
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const onResendPress = () => {
        console.warn("onResendPress");
    }

    const onLogInPressed = () => {
        navigation.navigate("LogInScreen");
    }
    return (
        <View style={styles.container}>
            <WelcomeTitle textLine1={"Confirm"} textLine2={"Your"} textLine3={"Email"} />

            <CustomTextInput
                name="confirmation-code"
                control={control}
                iconName={"pin"}
                isIonIcon={false}
                isNumeric={true}
                placeholder="Enter your confirmation code"
                rules={{required: "Confirmation code is required"}}
            />

            <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed)}/>

            <CustomButton text="Resend code" onPress={onResendPress}/>

            <Text style={styles.backToLoginText} onPress={onLogInPressed}>Back to Login</Text>

        </View>
    );
};


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        backgroundColor: Colors.white,
        padding: 20,
    },
    backToLoginText: {
        fontFamily: Fonts.SemiBold,
        textAlign: "center",
        marginVertical: 20,
        fontSize: 16,
        color: Colors.secondaryColor_45484A,
    },
});