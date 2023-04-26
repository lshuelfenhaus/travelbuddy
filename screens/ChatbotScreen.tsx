import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import themestyles from '../Colors';
import { BottomNavigation } from '../components/bottomnavigation';
import {Configuration, OpenAIApi} from 'openai';

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
export function Chatbot(props: HomeScreenProps) {
  console.log(process.env.OPENAI_API_KEY)
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const [messages, setMessages] = useState<Array<Message>>([]);
  
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
  }, [])

  const onSend = useCallback(async (messages:Array<Message> = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
     const prompt = messages[0]?.text
     console.log(prompt)

     try{
      const response = await openai.createCompletion(
      {
      model: 'davinci',
      temperature: 0.7,
      prompt: prompt,
      max_tokens: 20,
      n: 1,
      stop: ['\n'],
    }
    );

    const completions = await response.data.choices;
    const text = completions[0]?.text
    if (!text) {
      return;
    }
    const botMessage: Message = {
      _id: messages.length + 1,
      text: text,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'TravelBuddy AI',
        avatar: 'https://cdn.dribbble.com/users/722835/screenshots/4082720/bot_icon.gif',
      },
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]))

     }

     catch(error){
      console.log('An error was thrown.')
      console.log(error)
      const botMessage : Message = {
        _id: messages.length + 1,
        text: JSON.stringify(error),
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'TravelBuddy AI',
          avatar: 'https://cdn.dribbble.com/users/722835/screenshots/4082720/bot_icon.gif',
        },
      };
      setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]))
     }

  }, [])

  

  return (
    <SafeAreaProvider>
       <SafeAreaView
        style={styles.container}
        accessibilityLabel='main'
        testID='main'
    >
      <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}/>
      
      <BottomNavigation navigation={props.navigation} />
    </SafeAreaView>
    </SafeAreaProvider>
   
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: themestyles.eggshell.color, paddingBottom:30},
  content: { backgroundColor: themestyles.powderBlue.color, flex: 1,  }
})