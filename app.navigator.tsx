import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/home";


const { Navigator, Screen } = createNativeStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Navigator
        initialRouteName="TravelBuddy">
        <Screen name="TravelBuddy" component={HomeScreen} />
      </Navigator>
    </NavigationContainer>
)

export default AppNavigator;
