import { Avatar, Button, IconButton, Spacer, Stack, Text, TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomNavigation } from "../components/bottomnavigation";
import themestyles from "../Colors";

// _user name view and change
// _password change
// _profile picture
// _signout button
// _Link to their personal Itinerary

interface HomeScreenProps {
    navigation: any,
}

const AccountScreen = (props: HomeScreenProps) => {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");
    const [passwordReveal, setPasswordReveal] = useState(true);

    const [newPassword, setNewPassword] = useState("");
    const [newPasswordReveal, setNewPasswordReveal] = useState(true);
    
    const [confirmPasswordReveal, setConfirmPasswordReveal] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState("");

    const logout = async () => {
        props.navigation.navigate("Login")
      }

    return(
        <SafeAreaProvider style={{alignItems:"center", justifyContent:"center", backgroundColor:themestyles.eggshell.color }}>
            <Stack spacing={150}>
            <Stack spacing={10} style={{alignItems:"center", justifyContent:"center"}} >
            <Text variant="h4" >Account Details</Text>
               <Avatar
               color={themestyles.mintGreen.color}
                size={75}
                label="Test Account"
                />
                <Text variant="h6" >User Name</Text>
            <Stack spacing={50}style={{paddingHorizontal:25, paddingTop:25}}>
                <Stack>
                <TextInput
                placeholder="Current Password"
                secureTextEntry = {passwordReveal}
                variant="outlined"
                trailing={props => (
                <IconButton onPress={event => setPasswordReveal(prevState => !prevState)}icon={props => <Icon name="eye" {...props} />} {...props} />
                )}
                onChangeText={text => setPassword(text)}
                value={password}
                />
                <TextInput
                placeholder="New Password"
                secureTextEntry = {newPasswordReveal}
                variant="outlined"
                trailing={props => (
                <IconButton onPress={event => setNewPasswordReveal(prevState => !prevState)}icon={props => <Icon name="eye" {...props} />} {...props} />
                )}
                onChangeText={text => setNewPassword(text)}
                value={newPassword}
                />
                <TextInput
                placeholder="Confirm New Password"
                secureTextEntry = {confirmPasswordReveal}
                variant="outlined"
                trailing={props => (
                <IconButton onPress={event => setConfirmPasswordReveal(prevState => !prevState)}icon={props => <Icon name="eye" {...props} />} {...props} />
                )}
                onChangeText={text => setConfirmPassword(text)}
                value={confirmPassword}
                />
                <Button style={{marginHorizontal:75,}}variant="text" color={themestyles.delftBlue.color} title="Change Password"/>
                </Stack>
                </Stack>
            </Stack>
            <Button style={{marginHorizontal:120}}variant="contained" title="Logout" color={themestyles.mintGreen.color} onPress={logout} />
            </Stack>
            <BottomNavigation navigation={props.navigation} />
        </SafeAreaProvider>
    );
}

export default AccountScreen;