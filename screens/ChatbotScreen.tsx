import { Button, Divider, Spacer, Stack, VStack } from '@react-native-material/core';
import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BottomNavigation } from '../components/bottomnavigation';

interface HomeScreenProps {
  navigation: any
}

export function Chatbot(props: HomeScreenProps) {
  const [messages, setMessages] = useState([]);
  
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

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
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
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingBottom:30},
  content: { backgroundColor: "#ffffff", flex: 1,  }
})