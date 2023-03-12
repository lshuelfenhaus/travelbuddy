import React, { createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import CurationScreen from "./screens/CurationScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const { Navigator, Screen } = createNativeStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Navigator
        initialRouteName="Login">
        <Screen name="Home" component={HomeScreen} />
        <Screen name="Login" component={LoginScreen} />
        <Screen name="SignUp" component={SignUpScreen} />
        <Screen name="Curation" component={CurationScreen}/>
      </Navigator>
    </NavigationContainer>
)

export default AppNavigator;
