import {loadFonts} from "./src/constants/Fonts";
import StackNavigation from "./navigation/StackNavigation";
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
    const fontsLoaded = loadFonts();
    return (
        <StackNavigation />
    );
};