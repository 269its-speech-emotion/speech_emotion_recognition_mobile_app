import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import WelcomeTitle from "../components/WelcomeTitle";

import { Colors } from "../constants/Colors";
import { Fonts } from "../constants/Fonts";


export default function ForgotPasswordScreen(){
    const navigation = useNavigation();
    const EMAIL_REGEX = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const {control, handleSubmit} = useForm();

    const onSendPressed = (data) => {
        navigation.navigate('ReNewPasswordScreen');
    }

    const onLogInPressed = () => {
        navigation.navigate('LoginScreen');
    }

    return(
        <View style={styles.container}>
            <WelcomeTitle textLine1={"Reset"} textLine2={"Your"} textLine3={"Password"}/>

            <CustomTextInput
                name="email"
                placeholder="Enter your email"
                iconName={"mail-outline"}
                isIonIcon={true}
                control={control}
                rules={
                    {
                        required: 'Email is required',
                        pattern: {value: EMAIL_REGEX, message: 'Email is invalid'}
                    }
                }
            />
            <CustomButton text={"Send verification code"} onPress={handleSubmit(onSendPressed)} />
            <Text style={styles.backToLoginText} onPress={onLogInPressed}>Back to Login</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
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

})