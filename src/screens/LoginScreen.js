import React, { useState, useCallback } from "react";
import {View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert, Keyboard} from "react-native";
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
        // Dismiss keyboard to ensure Alert messages are visible
        Keyboard.dismiss();
        
        try {
            // Attempt to login with user credentials
            const statusCode = await ApiService.login(data);

            // Handle different response status codes
            if (statusCode === 200) {
                // Success - navigate to main app
                navigation.navigate("MainApp");
            } else if (statusCode === 401) {
                // Invalid credentials
                Alert.alert(
                    "Login Failed", 
                    "Invalid email or password. Please check your credentials and try again."
                );
            } else if (statusCode === 403) {
                // Account locked or disabled
                Alert.alert(
                    "Account Locked", 
                    "Your account has been temporarily locked. Please contact support."
                );
            } else if (statusCode === 404) {
                // User not found
                Alert.alert(
                    "Account Not Found", 
                    "No account found with this email. Please sign up first."
                );
            } else if (statusCode >= 500) {
                // Server error
                Alert.alert(
                    "Server Error", 
                    "Our servers are experiencing issues. Please try again later."
                );
            } else {
                // Unknown error
                Alert.alert(
                    "Login Failed", 
                    "Unable to login at this time. Please try again later."
                );
            }
        } catch (error) {
            // Handle network and unexpected errors
            if (error.message && error.message.toLowerCase().includes('network')) {
                Alert.alert(
                    "No Internet Connection", 
                    "Please check your internet connection and try again."
                );
            } else if (error.code === 'ECONNABORTED') {
                Alert.alert(
                    "Request Timeout", 
                    "The request took too long. Please check your connection and try again."
                );
            } else {
                Alert.alert(
                    "Error", 
                    "An unexpected error occurred. Please try again."
                );
            }
            // Only log errors in development mode for debugging
            if (__DEV__) {
                console.error("Login error:", error);
            }
        }
    }

    const onSignUpPressed = useCallback(() => {
        navigation.navigate('SignupScreen');
    }, [navigation]);

    const onForgetPasswordPressed = useCallback(() => {
        navigation.navigate('ForgotPasswordScreen');
    }, [navigation]);

    const togglePasswordVisibility = useCallback(() => {
        setSecureEntry((prev) => !prev);
    }, []);

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
                    autoCapitalize="none"
                    textContentType="emailAddress"
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
                        minLength: {value: 5, message: 'Password should be minimum 5 characters long'}
                    }}
                    secureTextEntry={secureEntry}
                    showEyeTogglePart={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="password"
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