import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoardingScreen from "../src/screens/OnBoardingScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}} id="StackNav">
                <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};