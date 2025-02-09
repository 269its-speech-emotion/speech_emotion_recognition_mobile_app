import React, { useState } from "react";
import {View, Text, StyleSheet, Platform, KeyboardAvoidingView, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

import Welcome from "../components/WelcomeTitle";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import SocialCustomButton from "../components/SocialCustomButton";

import { Colors } from "../constants/Colors";
import { Fonts } from "../constants/Fonts";
import { Images } from "../constants/Images";

import ApiService from "../service/ApiService";
import StorageHelper from "../utils/StorageHelper";


export default function SignupScreen() {
    const {control, handleSubmit, watch} = useForm();
    const pwd = watch("password");
    const navigation = useNavigation();
    const [secureEntry, setSecureEntry] = useState(true);

    const onLogInPressed = data => {
        navigation.navigate("LoginScreen");
    }

    const onRegisterPressed = async (data) => {
        try {
            const {username, email, password} = data;
            const registrationData = {username, email, password};

            const response = await ApiService.signUp(registrationData);

            if (response) {
                await StorageHelper.setUserDTO(registrationData);
                console.log("Registration successful!");
                if (response.statusCode === 200) {
                    navigation.navigate("ConfirmEmailScreen");
                }
            } else {
                console.error("Unexpected response:", response);
            }
        } catch (error) {
            console.error("Error during registration:", response.message);
            Alert.alert("Registration Failed", "Something went wrong. Please try again.");
        }
    };

    const onForgetPasswordPressed = data => {
        navigation.navigate("ForgotPasswordScreen");
    }

    const onTermsOfUsePressed = data => {
        {/*
            navigation.navigate('Home');
        */}
    }

    const onPrivacyPressed = data => {
        {/*
            navigation.navigate('Home');
        */}
    }

    const togglePasswordVisibility = () => {
        setSecureEntry((prev) => !prev);
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Welcome textLine1={"Let's get"} textLine2={"Started"}/>
                <CustomTextInput
                    name="username"
                    placeholder="Enter your username"
                    iconName={"person-outline"}
                    isIonIcon={true}
                    control={control}
                    rules={{required: "Username is required"}}
                />
                <CustomTextInput
                    name="email"
                    placeholder="Enter your email"
                    iconName={"mail-outline"}
                    isIonIcon={true}
                    control={control}
                    rules={{required: "Email is required"}}
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

                <CustomTextInput
                    name="repeat-password"
                    placeholder="Repeat your password"
                    iconName={"lock"}
                    isSimpleLineIcons={true}
                    onPress={togglePasswordVisibility}
                    control={control}
                    rules={
                    {
                        required: "Password is required",
                        validate: value =>
                            value === pwd || 'Passwords do not match',
                    }}
                    secureTextEntry={secureEntry}
                    showEyeTogglePart={true}
                />

                <Text style={styles.textTermsPrivacy}>
                    By registering, you confirm that you accept our {' '}
                    <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and {' '}
                    <Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy</Text>.
                </Text>

                <CustomButton text="Sign up" onPress={handleSubmit(onRegisterPressed)} />

                <Text style={styles.continueText}>or continue with</Text>

                <SocialCustomButton iconURL={Images.googleLogo} />

                <Text style={styles.alreadyHaveAccountText}>Already have an account! {' '}
                    <Text style={styles.linkText} onPress={onLogInPressed}>Login</Text>
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
    textTermsPrivacy: {
        color: Colors.secondaryColor_45484A,
        fontFamily: Fonts.Regular,
        fontSize: 12,
        marginVertical: 5,
    },
    link: {
        color: Colors.primaryColor_EA458E
    },
    continueText: {
        textAlign: "center",
        marginVertical: 15,
        fontSize: 12,
        fontFamily: Fonts.Regular,
        color: Colors.secondaryColor_45484A
    },
    alreadyHaveAccountText: {
        textAlign: "center",
        marginVertical: 8,
        fontFamily: Fonts.Regular,
        color: Colors.secondaryColor_45484A
    },
    linkText: {
        fontFamily: Fonts.Bold,
    }
})