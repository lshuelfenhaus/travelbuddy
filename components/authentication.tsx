import db from "./../firebase";
import {doc,setDoc, getDoc,collection} from "firebase/firestore";
import {User} from "./../DataInterfaces";

const crypto = require("crypto-js");
  
/**
 * This function set user on firestore database, used to initiate user for development only
 * @param docName the unique identifier for the doc 
 * @param password a string which will be the token used to sign in, we will use hash function with salt to generate token, for now we just hard code the password
 * @param collectionName which collection to add the document to, in this case, "users" since we want to add user
 * @param data the data object that will be used to update the doc, similar to adding an entry to a table. Think: collections = tables, doc = entry but in object form
 */
export const setUser = async (docName: string, token: string, salt: string, collectionName: string, data: User) => {
    try{
        data.username = docName;
        data.token = token;
        data.salt = salt;
        const collectionRef = collection(db,collectionName);
        await setDoc(doc(collectionRef, docName), data);
        return true;
    }catch(error){
        console.log("there was something wrong");
        return false;
    }


};

export const signin = async (username: string, password: string) => {

}

export const signup = async (username: string, password: string) => {
    let data: User = {
        username: "",
        email: "",
        token: "",//hashed value with salt, password for now
        salt: "",
        hotels: [],
        flights: [],
        attractions: [],
        name: ""
    }
    try{
        const salt = makesalt(5);
        const concaternatedString = password + salt;
        const token = crypto.SHA256(concaternatedString);
        setUser(username, token, salt, "users", data);
    }catch(error){
        if(error){
            console.log(error);
        }
    }
}

export const logout = async () => {

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
