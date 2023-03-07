import React from "react";
import { Stack, TextInput, IconButton, Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

interface HomeScreenProps {
    navigation: any
}

const LoginScreen = (props: HomeScreenProps) => {
    const login = () => props.navigation.navigate("Home")
    const signup = () => props.navigation.navigate("SignUp")
    return(
    <Stack spacing={2} style={{ margin: 16 }}>
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
        <Button variant="outlined" title="Sign Up" onPress={signup} />
  </Stack>
    );
}

export default LoginScreen;
