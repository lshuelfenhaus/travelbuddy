import React from 'react';
import {View, StyleSheet, Text} from "react-native";
import {Stack, TextInput, Button, Box} from "@react-native-material/core";
import {useState} from 'react';
import * as Authenticate from "./../components/authentication";
interface HomeScreenProps {
    navigation: any
}

const SignUpScreen =(props: HomeScreenProps) =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    let errors = new Map();
    const checkSignUp = () =>{
        checkUsernameLength();
        checkPasswordLength();
        if(errors.size == 0){//move on to sign up
            
        }
    }
    const handleUsername = (u: string) => {
        setUsername(u);
    }
    const handlePassword = (p: string) => {
        setPassword(p);
    }
    const handleRePassword = (rp: string) =>{
        setRePassword(rp);
    }
    const checkPasswordMatch = () => {
        if(password !== rePassword){
            errors.set("password match", "The passwords are not matched")
        }else{
            errors.delete("password match");
        }
    }
    const checkUserNameExist = async () => {
        const user = await Authenticate.findUser(username, 'users');
        if(user){
            errors.set("user exist", "This username is already created");
        }else{
            errors.delete("user exist");
        }
    }
    const checkUsernameLength = () => {
        if(username.length <= 5){
            errors.set("username require","username is required and length must be greater than 5")
        }else{
            errors.delete("username require");
        }
    }
    const checkPasswordLength = () => {
        if(username.length <= 8){
            errors.set("password require","password is required and length must be greater than 8")
        }else{
            errors.delete("password require");
        }
    }
    const toLogin = () => {
        props.navigation.navigate("Login");
    }
    return(
        <Stack direction="row" justify="center" items="center" spacing={4}>
            {errors.size && 
            <View>
{/*                 { for (const [key,val] of errors){
                    return (<Text>
                        </Text>)
                } } */}
            </View>}
            <View style={styles.signUpForm}>
                <TextInput
                    label ="New username"
                    onChange={newText => handleUsername}
                    onEndEditing={checkUserNameExist}
                    value = {username}
                />
                <TextInput
                    label ="Password"
                    value = {password}
                    onChange={newText => handlePassword}
                />
                <TextInput
                    label ="Re enter Password"
                    onChange ={newText => handleRePassword}
                    onEndEditing={checkPasswordMatch}
                    value = {rePassword}
                />
                {
                //Button group
                }
                <View style={styles.signUpButtonGroup}>
                    <Button 
                        title="Sign Up" 
                        style={styles.signUpButton} 
                        onPress={checkSignUp}
                    />
                    <Button 
                        title="Cancel" 
                        style={styles.signUpButton}
                        onPress={toLogin}    
                    />
                </View>
            </View>
        </Stack>
    )
}
const buttonTitles = ['Sign Up','Cancel'];
const styles = StyleSheet.create({
    signUpForm:{
        width: '100%'
    },
    signUpButtonGroup:{
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signUpButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginRight: 8 
    },
    container:{
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SignUpScreen;