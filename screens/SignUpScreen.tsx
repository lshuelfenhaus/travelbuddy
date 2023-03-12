import React from 'react';
import {View, StyleSheet, Text, Keyboard, Modal} from "react-native";
import {Stack, TextInput, Button, IconButton} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {useState} from 'react';
import * as Authenticate from "./../components/authentication";
interface HomeScreenProps {
    navigation: any
}
interface error{
    name: string,
    value: string
}

const SignUpScreen =(props: HomeScreenProps) =>{
    const arr: error[] = [];
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [errors, setErrors] = useState(arr);
    const [message, setMessage] = useState("");
    const [passwordReveal, setPasswordReveal] = useState(true);
    const [rePasswordReveal, setRePasswordReveal] = useState(true);
    const [registering, setRegistering] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [dirty, setDirty] = useState(false);
    const updateError = (n:string,v:string) => {
        if(!errors.find(item => item.name === n)){
            setErrors(prevState => [...prevState, {name:n, value: v}]);
        }
    }
    const deleteError = (n:string) => {
       if(errors.find((item) => item.name === n)){
        const newErrors = errors.filter((item) => item.name !== n);
        setErrors(newErrors);
       }
      
    }
    const checkSignUp = async () =>{
        let validUserLen = checkUsernameLength()
        if(validUserLen){
           checkUserNameExist();
        };
        let validPassLen = checkPasswordLength();
        if(validPassLen){
            checkPasswordMatch();
        };
        
        //validateEmail();
        if(errors.length === 0 && dirty){//move on to sign up
            setModalVisible(true);
            try{
                let status = await Authenticate.signup(username,password,email,firstName + " " + lastName );
                //if the above successfully complete
                if(status){
                    setMessage(`User ${username} created \n redirecting to login`);
                    setRegistering(prevState => !prevState);
                    setTimeout(()=>{
                        toLogin();
                    },3000)
                }
            }catch(e){
                updateError("Can not authenticate","Cannot authenticate, please try again later");
            }
            
        }else{
            setDirty(true);
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
           updateError("username require","Username is required and length must be greater than 5");
            return false;
        }else{
            deleteError("username require");
            return true;
        }
    }
    const checkPasswordLength =  () => {
        if(password.length <= 8){
           updateError("password require","Password is required and length must be greater than 8");
            return false;
        }else{
            deleteError("password require");
            return true;
        }
    }
    const toLogin = () => {
        props.navigation.navigate("Login");
    }
/*     const validateEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regex.test(email)){
            deleteError("email invalid");
            return true;
        }else{
            updateError("email invalid", "Email is not valid");
        };
      }; */
    return(
        <Stack direction="column" justify="center" items="center" spacing={4}>
            <Modal 
                animationType="fade"
                transparent={true}
                visible = {modalVisible}
            >
                <View style={styles.messageBox}>
                    <Text style={styles.messageBoxText}>{message}</Text>
                </View>
            </Modal>
            <View style={styles.signUpForm}>
            <TextInput
            placeholder="First Name"
            value ={firstName}
            onChangeText={newText => setFirstName(newText)}
            leading={props => <Icon name="account-outline" {...props} />}
            />
            <TextInput
            value = {lastName}
            onChangeText = {newText => setLastname(newText)}
            placeholder="Last Name"
            leading={props => <Icon name="account-outline" {...props} />}
            />
            <TextInput
            placeholder="Email"
            value={email}
            onChangeText={newText => setEmail(newText)}
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
            secureTextEntry = {passwordReveal}
            textContentType="oneTimeCode"
            autoCorrect={false}
            leading={props => (
            <IconButton  onPress = {event => setPasswordReveal(prevState => !prevState)} icon={props => <Icon name="eye" {...props} />} {...props} />
            )}
             /> 
            <TextInput
            placeholder ="Re-enter Password"
            onChangeText ={newText => setRePassword(newText)}
            value = {rePassword}
            secureTextEntry = {rePasswordReveal}
            textContentType="oneTimeCode"
            autoCorrect={false}
            leading={props => (
                <IconButton  onPress = {event => setRePasswordReveal(prevState => !prevState)} icon={props => <Icon name="eye" {...props} />} {...props} />
                )}
            />               
            <View style={styles.signUpButtonGroup}>
                <Button 
                    title="Register" 
                    style={styles.signUpButton} 
                    onPress={()=>
                        {Keyboard.dismiss();
                        checkSignUp()}}
                    disabled={registering}
                />
                <Button 
                    title="Cancel" 
                    style={styles.signUpButton}
                    onPress={toLogin}  
                    disabled={registering}  
                />
            </View>
            </View>
            {errors.length> 0 && 
            <Stack style={styles.errorContainer} spacing = {8}>
                {errors.map((val,index)=>{
                    return (<Text key={index} style={styles.errorItem}>{val.value}</Text>)
                })}
            </Stack>}
           
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

    },
    messageBox:{
        justifyContent:"center",
        alignItems:"center",
        padding: 16,
        backgroundColor: 'white',
        width: '100%',
        height: '100%'
    },
    messageBoxText:{
        color: "indigo",
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center"
    }
})

export default SignUpScreen;