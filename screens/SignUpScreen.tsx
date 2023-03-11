import React from 'react';
import {View, StyleSheet, Text} from "react-native";
import {Stack, TextInput, Button, Snackbar, IconButton} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {useState} from 'react';
import * as Authenticate from "./../components/authentication";
interface HomeScreenProps {
    navigation: any
}

const SignUpScreen =(props: HomeScreenProps) =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [errors, setErrors] = useState(new Map());
    const [message, setMessage] = useState("");
    const updateError = (k:string,v:string) => {
        setErrors(new Map(errors.set(k,v)));
    }
    const deleteError = (k:string) => {
        if(errors.has(k)){
            let errorscopy = new Map([...errors.entries()]);
            errorscopy.delete(k);
            setErrors(errorscopy);
        }
      
    }
    const checkSignUp = async () =>{
        if(checkUsernameLength()){
            checkUserNameExist();
        };
        if(checkPasswordLength()){
            checkPasswordMatch();
        };
        if(errors.size == 0){//move on to sign up
            try{
                let status = await Authenticate.signup(username,password);
                //if the above successfully complete
                if(status){
                    setMessage(`User ${username} created redirecting to login`);
                    toLogin();
                }
            }catch(e){
                updateError("can not authenticate","Cannot authenticate, please try again later");
            }
            
        }
    }
    const checkPasswordMatch = () => {
        if(password !== rePassword){
            updateError("password match", "The passwords are not matched");
            return false;
        }else{
            deleteError("password match");
            return true;
        }
    }
    const checkUserNameExist = async () => {
        const user = await Authenticate.findUser(username, "users");
        if(user){
           updateError("user exist", "This username is already created");
            return true;
        }else{
            deleteError("user exist");
            return false;
        }
    }
    const checkUsernameLength = () => {
        if(username.length <= 5){
           updateError("username require","username is required and length must be greater than 5");
            return false;
        }else{
            deleteError("username require");
            return true;
        }
    }
    const checkPasswordLength = () => {
        if(password.length <= 8){
           updateError("password require","password is required and length must be greater than 8");
            return false;
        }else{
            deleteError("password require");
            return true;
        }
    }
    const toLogin = () => {
        props.navigation.navigate("Login");
    }
    return(
        <Stack direction="column" justify="center" items="center" spacing={4}>
            <View style={styles.signUpForm}>
            <TextInput
            placeholder="First Name"
            leading={props => <Icon name="account-outline" {...props} />}
            />
            <TextInput
            placeholder="Last Name"
            leading={props => <Icon name="account-outline" {...props} />}
            />
            <TextInput
            placeholder="Email"
            leading={props => <Icon name="email" {...props} />}
            />
            <TextInput
            placeholder="Username"
            leading={props => <Icon name="account" {...props} />}
            onChangeText={newText => setUsername(newText)}
            value = {username}
            />
            <TextInput
            placeholder="Password"
            value = {password}
            onChangeText={newText => setPassword(newText)}
            leading={props => (
            <IconButton icon={props => <Icon name="eye" {...props} />} {...props} />
            )}
             /> 
            <TextInput
            placeholder ="Re-enter Password"
            onChangeText ={newText => setRePassword(newText)}
            value = {rePassword}
            leading={props => (
                <IconButton icon={props => <Icon name="eye" {...props} />} {...props} />
                )}
            />               
            <View style={styles.signUpButtonGroup}>
                <Button 
                    title="Register" 
                    style={styles.signUpButton} 
                    onPress={()=>checkSignUp()}
                />
                <Button 
                    title="Cancel" 
                    style={styles.signUpButton}
                    onPress={toLogin}    
                />
            </View>
            </View>
            {errors.size > 0 && 
            <Stack style={styles.errorContainer} spacing = {8}>
                {[...errors.values()].map((val)=>{
                    return (<Text style={styles.errorItem}>{val}</Text>)
                })}
            </Stack>}
            {message.length > 0 && 
            <Snackbar message={message}/>
            }
        </Stack>
    )
}
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
    },
    errorItem:{
        color: 'tomato',
        fontSize: 15
    },
    errorContainer:{
        padding: 8,

    }
})

export default SignUpScreen;