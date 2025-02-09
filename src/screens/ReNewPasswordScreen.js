import React, { useState } from "react";
import {View, Text, StyleSheet, Platform, KeyboardAvoidingView, ScrollView} from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import WelcomeTitle from "../components/WelcomeTitle";

import { Colors } from "../constants/Colors";
import { Fonts } from "../constants/Fonts";

export default function ReNewPasswordScreen(){
    const navigation = useNavigation();
    const [secureEntry, setSecureEntry] = useState(true);
    const {control, handleSubmit} = useForm();

    const onSubmitPressed = () => {
        //navigation.navigate('LogInScreen');
    }

    const onLogInPressed = () => {
        navigation.navigate("LogInScreen");
    }

    const togglePasswordVisibility = () => {
        setSecureEntry((prev) => !prev);
    };

    return(
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <WelcomeTitle textLine1={"Renew"} textLine2={"Your"} textLine3={"Password"} />

                <CustomTextInput
                    name="confirmation-code"
                    placeholder="Enter your confirmation code"
                    iconName={"pin"}
                    isIonIcon={false}
                    isNumeric={true}
                    control={control}
                    rules={{required: "Confirmation code is required"}}
                />

                <CustomTextInput
                    name="new-password"
                    placeholder="Enter you new password"
                    control={control}
                    iconName={"lock-closed-outline"}
                    onPress={togglePasswordVisibility}
                    rules={
                        {
                            required: 'Password is required',
                            minLength: {value: 5, message: 'Password should be minimum 5 characters long'}
                        }
                    }
                    secureTextEntry={secureEntry}
                    showEyeTogglePart={true}
                />
                <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)}/>
                <Text style={styles.backToLoginText} onPress={onLogInPressed}>Back to Login</Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    text: {
        color: "gray",
        marginVertical: 10,
    },
    backToLoginText: {
        fontFamily: Fonts.SemiBold,
        textAlign: "center",
        marginVertical: 20,
        fontSize: 16,
        color: Colors.secondaryColor_45484A,
    },
})