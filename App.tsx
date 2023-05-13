import 'react-native-gesture-handler';
import "react-native-url-polyfill/auto"
import React from "react";
import AppNavigator from "./app.navigator";
import Toast, {ErrorToast, BaseToast} from 'react-native-toast-message';

export default function App() {  

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{borderLeftColor: 'green'}}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 17,
          fontWeight: '400',
          color: 'green'
        }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17,
          fontWeight: '400',
          color: 'red'
        }}
        text2Style={{
          fontSize: 15
        }}
      />
    ),
  }

  return (
    <> 
    <AppNavigator/>
    <Toast position='bottom' config={toastConfig} />
    </>
   
  );
};