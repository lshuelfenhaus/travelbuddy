import React, { useState, useCallback, useEffect } from 'react'
import { SafeAreaViewBase, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import themestyles from '../Colors';
import { BottomNavigation } from '../components/bottomnavigation';
import {ChatCompletionRequestMessage, Configuration, CreateChatCompletionRequest, OpenAIApi} from 'openai';
import { Box, Button, Divider, Spacer, VStack } from '@react-native-material/core';

interface HomeScreenProps {
  navigation: any
}

interface Message {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
    avatar: string;
  };
}
let chatCounter = 1
export function Chatbot(props: HomeScreenProps) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const [sent, setSent] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [aiMessages, setAiMessages] = useState<Array<ChatCompletionRequestMessage>>([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! How can I help?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'TravelBuddy AI',
          avatar: 'https://cdn.dribbble.com/users/722835/screenshots/4082720/bot_icon.gif',
        },
      },
    ])
  }, []);
  const sendToAPI = async () => {
    setSent(false);
    try{
        const apiRequestBody = {
          model: "gpt-3.5-turbo",
          messages: aiMessages
        }
        const completions = await openai.createChatCompletion(apiRequestBody)
        if(!completions.data.choices[0].message?.content){
          return
        }
        const botMessage: Message = {
          _id: ++chatCounter,
          text: completions.data.choices[0].message?.content,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'TravelBuddy AI',
            avatar: 'https://cdn.dribbble.com/users/722835/screenshots/4082720/bot_icon.gif',
          },
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]))
        setAiMessages(previousMessages => [...previousMessages, {'role': 'assistant', 'content': messages[0].text}])
      }
      catch(error){
        console.log(error)
        const botMessage : Message = {
          _id: ++chatCounter,
          text: 'An error was thrown',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'TravelBuddy AI',
            avatar: 'https://cdn.dribbble.com/users/722835/screenshots/4082720/bot_icon.gif',
          },
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]))
        setAiMessages(previousMessages => [...previousMessages, {'role': 'assistant', 'content': messages[0].text}])
      }
    
    return
  
  }
  useEffect(() => {
    if(messages.length > 0 && aiMessages.length > 0 && sent){
      sendToAPI();
    }
  },[messages]);
  const onSend = useCallback(async (messages:Array<Message> = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    setAiMessages(previousMessages => [...previousMessages, {'role': 'user', 'content': messages[0].text}]);
    setSent(true);

  }, [])

  

  return (
    <SafeAreaProvider>
       <SafeAreaView
        style={styles.container}
        accessibilityLabel='main'
        testID='main'
    >
      {/* <Box pr={220} pl={15} pt={5}>
      <Button title="Home" color={themestyles.delftBlue.color} ></Button>
      </Box> */}
      
        <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}/>
      
      
      {/* <BottomNavigation navigation={props.navigation} />  */}
    </SafeAreaView>
    </SafeAreaProvider>
   
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: themestyles.eggshell.color, paddingBottom:30},
  content: { backgroundColor: themestyles.powderBlue.color, flex: 1,  }
})