import db from "./../firebase";
import {doc,setDoc, getDoc,collection, updateDoc} from "firebase/firestore";
import {User} from "./../DataInterfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

const crypto = require("crypto-js");
const SALT_LENGTH = 5;

export const setUser = async (docName: string, token: string, salt: string, collectionName: string, data: User) => {
    try{
        data.username = docName;
        data.token = token;
        data.salt = salt;
        const collectionRef = collection(db,collectionName);
        await setDoc(doc(collectionRef, docName), data);
        return true;
    }catch(error){
        console.log("there was something wrong" + error);
        return false;
    }
};

export const signin = async (username: string, password: string) => {
    let user = await findUser(username, "users");
    if(user){
        //compare hashed password
        const testToken = generateToken(password,user.salt);;
        if(testToken === user.token){
            return user;
        }else{
            return null;
        }
    }
}

export const signup = async (username: string, password: string, email?:string, name?:string) => {
    let data: User = {
        username: "",
        email: email? email : "",
        token: "",//hashed value with salt, password for now
        salt: "",
        itineraryIDs: [],
        name: name? name : ""
    }
    try{
        const salt = makesalt(SALT_LENGTH);
        const token = generateToken(password,salt);
        setUser(username, token, salt, "users", data);
        return true;
    }catch(error){
        if(error){
            console.log(error);
            return false;
        }
    }
}

export const logout = async () => {
    try{
        const user = await AsyncStorage.getItem('@username');
        if(user){
            await AsyncStorage.removeItem('@username');
            return true;
        }
    }catch(e){
        console.log(e);
        return false;
    }
}
export const findUser = async (username: string, collectionName: string) => {
    const docRef = doc(db,collectionName,username);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        return docSnap.data();
    }else {
        return null;
    }
}

export const makesalt = (len:number) => {//should be 5
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < len) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export const updateUser = async (uid:string, fields: any) => {
    try{
        const docRef = doc(db,"users",uid);
        let payload:any = {}; 
        for (const key in fields) {
            payload[key] = fields[key];
        }
        await updateDoc(docRef, payload);
        return true;
    
    } catch (error) {
        console.log("there was something wrong" + error);
        return false;
    }
}

const generateToken = (password: string, salt: string) => {
    const concaternatedString = password + salt;
    return crypto.SHA256(concaternatedString).toString(crypto.enc.Base64);
}

export const resetPassword = async (username: string, oldPassword: string, newPassword: string) => {
    const user = await findUser(username, "users");
    let status = {
        success: true,
        message: "",
    }
    if(user){
        const testToken = generateToken(oldPassword,user.salt);
        if(testToken === user.token){
            const salt = makesalt(SALT_LENGTH);
            const token = generateToken(newPassword,salt);
            const data = {
                token: token,
                salt: salt,
            }
            await updateUser(username, data);
            status.success = true;
            status.message = "Password reset successful";
        }else{
            status.success = false;
            status.message = "Incorrect password";
        }
        return status;
    }else{
        status.success = false;
        status.message = "User does not exist";
        return status;
    }
}