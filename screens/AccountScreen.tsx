import { Avatar, Button, IconButton, Spacer, Stack, Text, TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomNavigation } from "../components/bottomnavigation";
import themestyles from "../Colors";
import { CLOSE_BUTTON_COLOR } from "../StyleConstants";
import { Alert, Keyboard } from "react-native";
import { resetPassword } from "../components/authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

// _user name view and change
// _password change
// _profile picture
// _signout button
// _Link to their personal Itinerary

interface HomeScreenProps {
    navigation: any,
}

const AccountScreen = (props: HomeScreenProps) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
          setKeyboardVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
          setKeyboardVisible(false)
        );
    
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
      }, []);

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");
    const [passwordReveal, setPasswordReveal] = useState(true);

    const [newPassword, setNewPassword] = useState("");
    const [newPasswordReveal, setNewPasswordReveal] = useState(true);
    
    const [confirmPasswordReveal, setConfirmPasswordReveal] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleResetPassword = async () => {
        if(newPassword === confirmPassword){
            let status =  await resetPassword(username,password, newPassword);
            if(status){
                Alert.alert(status.message);
            }
        }else{
            Alert.alert("Passwords do not match, please try again.");
        }
    }

    const logout = async () => {
        props.navigation.navigate("Login")
    }
    const getUsername = async () => {
        const user = await AsyncStorage.getItem('@username');
        if(user){
            return user;
        }
    }
    useEffect(()=>{
        getUsername().then((user)=>{
            if(user){
                setUsername(user);
            }else{
                Alert.alert("There was an error, please try again.");
            }
            
        })
    },[])
    return(
        <SafeAreaProvider style={{alignItems:"center", justifyContent:"center", backgroundColor:themestyles.eggshell.color }}>
            <Stack spacing={150} style={{flex: 1}}>
                <Stack spacing={10} style={{alignItems:"center", justifyContent:"center"}} >
                <Text variant="h4" >Account Details</Text>
                <Avatar
                color={themestyles.mintGreen.color}
                    size={75}
                    label={username}
                    />
                    <Text variant="h6" >{username}</Text>
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
                            <Button style={{marginHorizontal:75,}}variant="text" color={themestyles.delftBlue.color} onPress={handleResetPassword} title="Change Password"/>
                        </Stack>
                    </Stack>
                </Stack>
                <Button style={{marginHorizontal:120}}variant="contained" title="Logout" color={CLOSE_BUTTON_COLOR} titleStyle = {{color:"white"}} onPress={logout} />
            </Stack>
            <BottomNavigation navigation={props.navigation} renderComponent={!isKeyboardVisible} />
        </SafeAreaProvider>
    );
}

export default AccountScreen;