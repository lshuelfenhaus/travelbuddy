import React from "react";
import {useState} from "react";
import { Stack, TextInput, IconButton, Button, Spacer } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {signin} from "./../components/authentication";
interface HomeScreenProps {
    navigation: any
}

const LoginScreen = (props: HomeScreenProps) => {
    const login = async () => {
        let status = await signin(username,password);
        if(status){
            props.navigation.navigate("Home");
        }
    }
    const signup = () => props.navigation.navigate("SignUp")
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const register = () => props.navigation.navigate("Register")
    return(
    <Stack spacing={5} style={{ margin: 16 }}>
        <TextInput
        label="Username"
        leading={props => <Icon name="account" {...props} />}
        value={username}
        onChangeText={text => setUsername(text)}
        />
        <TextInput
        label="Password"
        variant="outlined"
        trailing={props => (
            <IconButton icon={props => <Icon name="eye" {...props} />} {...props} />
        )}
        onChangeText={text => setPassword(text)}
        value={password}
        />
        <Button variant="outlined" title="Login" onPress={login} />
        <Button variant="outlined" title="Sign Up" onPress={signup} />
        <Button variant="contained" title="Register" onPress={register} />
  </Stack>
    );
}

export default LoginScreen;
