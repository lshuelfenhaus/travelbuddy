import React from "react";
import {useState} from "react";
import { Stack, TextInput, IconButton, Button, Spacer } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {signin} from "./../components/authentication";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    <Stack spacing={5} style={{ margin: 16 }}>
        <TextInput
        placeholder="Username"
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
        <Button variant="outlined" title="Login" onPress={login} />
        <Button variant="contained" title="Register" onPress={register} />
    </Stack>
    );
}

export default LoginScreen;
