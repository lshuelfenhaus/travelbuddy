import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppBarHeader from "../components/header";

interface HomeScreenProps {
    navigation: any
}

export default function HomeScreen(prop: HomeScreenProps) {
       return(
        <AppBarHeader/>
    );
}
