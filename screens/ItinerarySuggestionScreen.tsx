import { SafeAreaProvider } from "react-native-safe-area-context";
import { HomeButton } from '../components/HomeButton';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import themestyles from "../Colors";
import { GiftedChat } from "react-native-gifted-chat";

interface HomeScreenProps {
    navigation: any
}

const ItinerarySuggestion =(props: HomeScreenProps) => {
        return (
          <SafeAreaProvider>
             <HomeButton navigation={props.navigation}/>
          </SafeAreaProvider>
         
        )
      }

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: themestyles.eggshell.color, paddingBottom:30},
    content: { backgroundColor: themestyles.powderBlue.color, flex: 1,  }
  })

export default ItinerarySuggestion;