import React from "react";
import {useState} from "react";
import { Stack, TextInput, IconButton, Button, VStack } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {signin} from "./../components/authentication";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, StyleSheet } from "react-native";

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
    <Stack spacing={5} style={{margin: 25}} >
    <Stack style={{margin:40}}>
    <Image
        style= {styles.logo}
        source={ require('travel-buddy/assets/travel-buddy.png')}
        />
    </Stack>
    <Stack spacing={5} style={{ paddingTop: 25 } }>
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
        <Stack style={{marginHorizontal: 89}} spacing={10}>
        <Button variant="outlined" color="black" title="Login" onPress={login}  />
            <Stack spacing={100}>
            <Button variant="text" title="Forgot Password?"/>
            <Button variant="contained" color="secondary" title="Register" onPress={register}  />
            </Stack> 
            
        </Stack> 
    </Stack> 
     </Stack>
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
