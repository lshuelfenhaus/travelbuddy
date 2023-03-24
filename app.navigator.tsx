import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateItineraryScreen from './screens/ItineraryQuizScreen';
import HotelSearchScreen from './screens/HotelSearchScreen';
import HotelListScreen from './screens/HotelListScreen';

const { Navigator, Screen } = createNativeStackNavigator();


const AppNavigator = () => (
    <NavigationContainer>
        <Navigator
        initialRouteName="HotelSearch"
        screenOptions={{ 
          headerBackButtonMenuEnabled: false,
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerTitle: "",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "400"
          }
        }}
        >
        <Screen name="Home" component={HomeScreen} />
        <Screen name="Login" component={LoginScreen} />
        <Screen name="SignUp" component={SignUpScreen} />
        <Screen name="CreateItinerary" component={CreateItineraryScreen} />
        <Screen name="HotelSearch" component={HotelSearchScreen} />
        <Screen name="HotelList" component={HotelListScreen} />
      </Navigator>
    </NavigationContainer>
)

export default AppNavigator;
