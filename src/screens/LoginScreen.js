import React, { useState } from "react";
import {View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import CustomTextButton from "../components/CustomTextButton";
import SocialCustomButton from "../components/SocialCustomButton";
import WelcomeTitle from "../components/WelcomeTitle";

import { Colors } from "../constants/Colors";
import { Fonts } from "../constants/Fonts";
import { Images } from "../constants/Images";

import ApiService from "../service/ApiService";
import StorageHelper from "../utils/StorageHelper";


export default function LoginScreen() {
    const {control, handleSubmit} = useForm();
    const navigation = useNavigation();
    const [secureEntry, setSecureEntry] = useState(true);

    const onLogInPressed = async (data) => {
        try {
            console.log("Login attempt with data: ", data)

            const statusCode = await ApiService.login(data);
            console.log("Login statusCode response:", statusCode);

            if (statusCode && statusCode === 200) {
                navigation.navigate("MainApp");
            }else{
                Alert.alert("Wrong password or email")
                console.log("Login failed, invalid response:", statusCode);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onSignUpPressed = () => {
        navigation.navigate('SignupScreen');
    }

    const onForgetPasswordPressed = data => {
            navigation.navigate('ForgotPasswordScreen');
    }

    const togglePasswordVisibility = () => {
        setSecureEntry((prev) => !prev);
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <WelcomeTitle textLine1={"Hey,"} textLine2={"Welcome"} textLine3={"Back"}/>
                <CustomTextInput
                    name="email"
                    placeholder="Enter your email"
                    iconName={"mail-outline"}
                    isIonIcon={true}
                    control={control}
                    rules={{
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Please enter a valid email address"
                        }
                    }}
                    keyboardType={"email-address"}
                />

                <CustomTextInput
                    name="password"
                    placeholder="Enter your password"
                    iconName={"lock"}
                    isSimpleLineIcons={true}
                    onPress={togglePasswordVisibility}
                    control={control}
                    rules={
                    {
                        required: "Password is required",
                        minLength: {value: 4, message: 'Password should be minimum 5 characters long'}
                    }}
                    secureTextEntry={secureEntry}
                    showEyeTogglePart={true}
                />

                <CustomTextButton text={"Forgot password?"} onPress={onForgetPasswordPressed}/>

                <CustomButton text="Login" onPress={handleSubmit(onLogInPressed)}/>

                <Text style={styles.continueText}>or continue with</Text>

                <SocialCustomButton iconURL={Images.googleLogo} />

                <Text style={styles.dontHaveAccountText}>Don't have an account? {' '}
                    <Text style={styles.linkText} onPress={onSignUpPressed}>Create one</Text>
                </Text>
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
    continueText: {
        textAlign: "center",
        marginVertical: 20,
        fontSize: 12,
        fontFamily: Fonts.Regular,
        color: Colors.secondaryColor_45484A,
    },
    dontHaveAccountText: {
        textAlign: "center",
        marginVertical: 20,
        fontFamily: Fonts.Regular,
        color: Colors.secondaryColor_45484A,
        gap: 5,
    },
    linkText: {
        fontFamily: Fonts.Bold,
        color: Colors.secondaryColor_45484A,
    }
})