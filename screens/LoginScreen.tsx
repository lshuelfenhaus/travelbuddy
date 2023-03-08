import React from "react";
import { Stack, TextInput, IconButton, Button, Spacer } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

interface HomeScreenProps {
    navigation: any
}

const LoginScreen = (props: HomeScreenProps) => {
    const login = () => props.navigation.navigate("Home")
    const register = () => props.navigation.navigate("Register")
    
    return(
    <Stack spacing={5} style={{ margin: 16 }}>
        <TextInput
        label="Username"
        leading={props => <Icon name="account" {...props} />}
        />
        <TextInput
        label="Password"
        variant="outlined"
        trailing={props => (
            <IconButton icon={props => <Icon name="eye" {...props} />} {...props} />
        )}
        />
        <Button variant="outlined" title="Login" onPress={login} />
        <Button variant="contained" title="Register" onPress={register} />
  </Stack>
    );
}

export default LoginScreen;
