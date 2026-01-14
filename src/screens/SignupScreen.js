import React, { useState } from "react";
import {View, Text, StyleSheet, Platform, KeyboardAvoidingView, ScrollView, Alert} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useForm } from "react-hook-form";

import Welcome from "../components/WelcomeTitle";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";

import { Colors } from "../constants/Colors";
import { Fonts } from "../constants/Fonts";

import ApiService from "../service/ApiService";
import StorageHelper from "../utils/StorageHelper";


export default function SignupScreen() {
    const {control, handleSubmit, watch} = useForm();
    const pwd = watch("password");
    const navigation = useNavigation();
    const route = useRoute();
    const [secureEntry, setSecureEntry] = useState(true);
    
    // Check if user is converting from guest mode
    const fromGuestMode = route.params?.fromGuestMode || false;

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
                
                // If converting from guest mode, clear guest flag
                if (fromGuestMode) {
                    await StorageHelper.clearGuestMode();
                    
                    if (__DEV__) {
                        console.log("Guest converted to user successfully!");
                    }
                    
                    // Show success message for guest conversion
                    Alert.alert(
                        "Account Created!",
                        "Your guest data has been saved. Welcome to SERMA!",
                        [
                            {
                                text: "Get Started",
                                onPress: () => navigation.navigate("MainApp")
                            }
                        ]
                    );
                } else {
                    // Regular signup flow - navigate to email confirmation
                    if (response.statusCode === 200) {
                        navigation.navigate("ConfirmEmailScreen");
                    }
                }
            } else {
                console.error("Unexpected response:", response);
                Alert.alert("Registration Failed", "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error during registration:", error.message);
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
                        minLength: {value: 5, message: 'Password should be minimum 5 characters long'}
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