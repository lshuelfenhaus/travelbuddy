import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from './screens/AccountScreen';
import CreateItineraryScreen from './screens/ItineraryQuizScreen';
import HotelSearchScreen from './screens/HotelSearchScreen';
import HotelListScreen from './screens/HotelListScreen';
import { Chatbot } from './screens/ChatbotScreen';
import ItineraryScreen from './screens/ItinerariesScreen';
import FlightSearchScreen from './screens/FlightSearchScreen';
import FlightListScreen from './screens/FlightListScreen';
import HotelDetailScreen from './screens/HotelDetailScreen';
import ReservationScreen from './screens/RerservationScreen';
import ItineraryCreationScreen from './screens/ItineraryCreationScreen';
import ItinerariesScreen from './screens/ItinerariesScreen';
import ItineraryDetailScreen from './screens/ItineraryDetailScreen';

const { Navigator, Screen } = createNativeStackNavigator();


const AppNavigator = () => (
    <NavigationContainer>
        <Navigator
        initialRouteName="Itineraries"
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
        <Screen name="Account" component={AccountScreen} />
        <Screen name="HotelSearch" component={HotelSearchScreen} />
        <Screen name="HotelList" component={HotelListScreen} />
        <Screen name="FlightSearch" component={FlightSearchScreen} />
        <Screen name="FlightList" component={FlightListScreen} />
        <Screen name="Chatbot" component={Chatbot} />
        <Screen name="Itineraries" component={ItinerariesScreen} />
        <Screen name="HotelDetail" component={HotelDetailScreen} />
        <Screen name="Reservation" component={ReservationScreen} />
        <Screen name="ItineraryCreation" component={ItineraryCreationScreen} />
        <Screen name="ItineraryDetail" component={ItineraryDetailScreen} />
      </Navigator>
    </NavigationContainer>
)

export default AppNavigator;
