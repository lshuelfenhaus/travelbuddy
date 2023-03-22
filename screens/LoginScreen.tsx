import React from "react";
import {useState} from "react";
import { Stack, TextInput, IconButton, Button, VStack } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {signin} from "./../components/authentication";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, StyleSheet } from "react-native";
import themestyles from "../Colors";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface HomeScreenProps {
    navigation: any
}

const LoginScreen = (props: HomeScreenProps) => {
    const login = async () => {
        try{
            let status = await signin(username,password);
            if(status){
                await AsyncStorage.setItem('@username', username);
                props.navigation.navigate("Home");
            }    
        }catch(e){
            console.log(e);
        }
        
    }
    const register = () => props.navigation.navigate("SignUp")

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordReveal, setPasswordReveal] = useState(true);
    
    return(
        <SafeAreaProvider
        style={{backgroundColor: themestyles.loginWhite.color}}>
    <Stack spacing={25} style={{justifyContent:"center", alignItems:"center"}}  >
    <Stack >
    <Image
        style= {styles.logo}
        source={ require('travel-buddy/assets/travel-buddy.png')}
        />
    </Stack>
    <Stack>
        <TextInput
        placeholder="Username"
        variant="outlined"
        leading={props => <Icon name="account" {...props} />}
        value={username}
        onChangeText={text => setUsername(text)}
        />
        <TextInput
        placeholder="Password"
        secureTextEntry = {passwordReveal}
        variant="outlined"
        trailing={props => (
            <IconButton onPress={event => setPasswordReveal(prevState => !prevState)}icon={props => <Icon name="eye" {...props} />} {...props} />
        )}
        onChangeText={text => setPassword(text)}
        value={password}
        />
        <Stack style={{marginHorizontal: 85}} spacing={10}>
         <Button variant="text" color={themestyles.delftBlue.color} title="Login" onPress={login}  />
          <Stack spacing={100}>
           <Button variant="text" title="Forgot Password?" color={themestyles.delftBlue.color}/>
           <Button variant="contained" color={themestyles.mintGreen.color} title="Register" onPress={register}  />
          </Stack> 
        </Stack> 
    </Stack> 
     </Stack>

     </SafeAreaProvider>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    logo: { 
      borderRadius: 10,
      width: 300,
      height: 300
    },
  });
