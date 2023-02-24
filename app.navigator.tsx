import React, { createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const { Navigator, Screen } = createNativeStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Navigator
        initialRouteName="Login">
        <Screen name="Home" component={HomeScreen} />
        <Screen name="Login" component={LoginScreen} />
      </Navigator>
    </NavigationContainer>
)

export default AppNavigator;
