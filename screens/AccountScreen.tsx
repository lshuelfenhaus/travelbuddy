import { Avatar, Button, IconButton, Stack, Text, TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
    
    return(
        <SafeAreaProvider style={{justifyContent:"center"}}>
            <Stack spacing={10} style={{alignItems:"center"}} >
            <Text variant="h4" >Account Details</Text>
               <Avatar
                size={75}
                label="Test Account"
                //image={}
                />
                <Text variant="h6" >User Name</Text>
            </Stack>
            <Stack spacing={10}style={{paddingHorizontal:25, paddingTop:25}}>
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
                <Stack>
                <TextInput
                placeholder="New Password"
                secureTextEntry = {passwordReveal}
                variant="outlined"
                trailing={props => (
                <IconButton onPress={event => setPasswordReveal(prevState => !prevState)}icon={props => <Icon name="eye" {...props} />} {...props} />
                )}
                onChangeText={text => setPassword(text)}
                value={password}
                />
                <TextInput
                placeholder="Re-type New Password"
                secureTextEntry = {passwordReveal}
                variant="outlined"
                trailing={props => (
                <IconButton onPress={event => setPasswordReveal(prevState => !prevState)}icon={props => <Icon name="eye" {...props} />} {...props} />
                )}
                onChangeText={text => setPassword(text)}
                value={password}
                />
                <Button style={{marginHorizontal:75}} variant="outlined" title="Change Password"/>
                </Stack>
            </Stack>

            <Button style={{marginHorizontal:10, marginTop:100}} color="secondary" variant="text" title="View Your Itineraries"/>

            <Button style={{marginHorizontal:150, marginTop:100}} variant="contained" title="Logout"/>

        </SafeAreaProvider>
    );
}

export default AccountScreen;