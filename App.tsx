import React from "react";
import { AppBar, HStack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native";
import AppNavigator from "./app.navigator";

export default function App() {
  return (
    <AppNavigator/>
  );
};