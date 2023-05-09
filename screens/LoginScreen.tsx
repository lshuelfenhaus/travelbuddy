import React from "react";
import {useState} from "react";
import { Stack, TextInput, IconButton, Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {signin} from "./../components/authentication";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Dimensions, Image, StyleSheet } from "react-native";
import themestyles from "../Colors";
import { ScrollView } from "react-native-gesture-handler";

interface HomeScreenProps {
    navigation: any
}

const LoginScreen = (props: HomeScreenProps) => {
    const login = async () => {
        try{
            if(username == "" || password == ""){
                Alert.alert("Please fill in all fields");
                return;
            }
            let status = await signin(username,password);
            if(status){
                await AsyncStorage.setItem('@username', username);
                props.navigation.navigate("Home");
            }else{
                Alert.alert("Invalid username or password");
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
        <ScrollView
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
        color={themestyles.delftBlue.color}
        onChangeText={text => setUsername(text)}
        />
        <TextInput
        placeholder="Password"
        secureTextEntry = {passwordReveal}
        variant="outlined"
        color={themestyles.delftBlue.color}
        trailing={props => (
            <IconButton onPress={event => setPasswordReveal(prevState => !prevState)}icon={props => <Icon name="eye" {...props} />} {...props} />
        )}
        onChangeText={text => setPassword(text)}
        value={password}
        />
        <Stack style={{marginHorizontal: 85}} spacing={16}>
            <Button variant="text" title="Forgot Password?" color={themestyles.delftBlue.color}/>
          <Stack spacing={12}>
            <Button color={themestyles.delftBlue.color} title="Login" onPress={login}  />
           <Button  color={themestyles.mintGreen.color} title="Register" onPress={register}  />
          </Stack> 
        </Stack> 
    </Stack> 
     </Stack>

     </ScrollView>
    );
}

export default LoginScreen;
const {width, height} = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    logo: { 
      width: width * 0.5,
        height: width * 0.65,
      resizeMode: "center",
    },
  });
