import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoardingScreen from "../src/screens/OnBoardingScreen";
import LoginScreen from "../src/screens/LoginScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}} id="StackNav">
                <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};