import React from "react";
import { Stack, TextInput, IconButton, Button, Spacer } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

interface HomeScreenProps {
    navigation: any
}

const RegisterScreen = (props: HomeScreenProps) => {
    const register = () => props.navigation.navigate("Login")
    
    return(
    <Stack spacing={2} style={{ margin: 16 }}>
        <TextInput
        label="First Name"
        leading={props => <Icon name="account-outline" {...props} />}
        />
        <TextInput
        label="Last Name"
        leading={props => <Icon name="account-outline" {...props} />}
        />
        <TextInput
        label="Email"
        leading={props => <Icon name="email" {...props} />}
        />
        <TextInput
        label="Username"
        leading={props => <Icon name="account" {...props} />}
        />
        <TextInput
        label="Password"
        leading={props => (
            <IconButton icon={props => <Icon name="eye" {...props} />} {...props} />
        )}
        />
        <Spacer/>
        <Button variant="outlined" title="Register" onPress={register} />
  </Stack>
    );
}

export default RegisterScreen;