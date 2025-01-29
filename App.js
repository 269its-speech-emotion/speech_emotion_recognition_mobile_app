import {loadFonts} from "./src/constants/Fonts";
import StackNavigation from "./navigation/StackNavigation";
import BottomTabs from "./navigation/BottomTabs";
import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaView, StatusBar} from "react-native";
import React from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function App() {
    const fontsLoaded = loadFonts();
    return (
        <SafeAreaProvider>
            <StatusBar barStyle={'dark-content'}/>
            <NavigationContainer>
                <BottomTabs />
            </NavigationContainer>
        </SafeAreaProvider>

    );
};


