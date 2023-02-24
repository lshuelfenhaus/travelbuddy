import React from "react";
import { AppBar, HStack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native";

export default function App() {
  return (
    <SafeAreaView >
      <AppBar
          color="navy"
          title="TravelBuddy"
          leading={props => (
            <IconButton icon={props => <Icon name="menu" {...props} />} {...props} />
          )}
          trailing={props => (
            <HStack>
              <IconButton
                icon={props => <Icon name="chat" {...props} />}
                {...props}
              />
              <IconButton
                icon={props => <Icon name="dots-vertical" {...props} />}
                {...props}
              />
            </HStack>
          )}
        />
    </SafeAreaView>
  );
};