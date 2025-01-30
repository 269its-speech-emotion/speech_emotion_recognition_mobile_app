import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import HomeScreen from "../src/screens/bottom_tab_screens/HomeScreen";
import HistoricScreen from "../src/screens/bottom_tab_screens/HistoricScreen";
import SERScreen from "../src/screens/bottom_tab_screens/SERScreen";
import ProfileScreen from "../src/screens/bottom_tab_screens/ProfileScreen";

import CustomBottomTab from "../src/components/BottomTabs/CustomBottomTab";

const BottomTab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <BottomTab.Navigator id="BottomNav" tabBar={props => <CustomBottomTab {...props}/>}>
            <BottomTab.Group screenOptions={{headerShown: false, }}>
                <BottomTab.Screen name="Home" component={HomeScreen} options={{tabBarLabel: "Home"}}/>
                <BottomTab.Screen name="Settings" component={HistoricScreen} options={{tabBarLabel: "Settings"}}/>
                <BottomTab.Screen name="SER" component={SERScreen} options={{tabBarLabel: "SER"}}/>
                <BottomTab.Screen name="Profile" component={ProfileScreen} options={{tabBarLabel: "Profile"}}/>
            </BottomTab.Group>
        </BottomTab.Navigator>

    );
};
