import React from "react";
import AppNavigator from "./app.navigator";
import {Text} from "react-native";
import db from "./firebase";
import {doc,setDoc, getDoc,collection, Timestamp} from "firebase/firestore";
//INTERFACE DECLARATION, I dont know where to put these 
interface Flight {
  id:number;
  airline_name: string;
  flightNumber: string;
  time: Timestamp; 
  price: number; 
  startDate: Timestamp; 
  arrivalDate: Timestamp;
}
interface Attraction{
  id: number;
  name: string;
  address: string;
  description: string;
  phone: number;
  openTime: Timestamp;
  closeTime: Timestamp;
}
interface Hotel{
  id: number;
  name: string;
  address: string;
  phone: number;
  email: string;
  checkinTime: Timestamp;
  checkoutTime: Timestamp;
  checkinDate: Timestamp;
  checkoutDate: Timestamp;
}
interface Rating{//used for flightRatings, hotelRatings, attractionRatings collections
  id: number;
  title: string;
  description: string;
  datePosted: Timestamp;
  username: string;
  targetID: number; 
}
interface User {
  username: string;
  email: string;
  token: string;//hashed value with salt
  salt: string;
  hotels: Hotel[];
  flights: Flight[];
  attractions: Attraction[];
  name: string;
}

export default function App() {
  //DEVELOPMENT ONLY!!!!!, to add data to database for testing
  
  /**
   * This function set user on firestore database, used to initiate user for development only
   * @param docName the unique identifier for the doc 
   * @param password a string which will be the token used to sign in, we will use hash function with salt to generate token, for now we just hard code the password
   * @param collectionName which collection to add the document to, in this case, "users" since we want to add user
   * @param data the data object that will be used to update the doc, similar to adding an entry to a table. Think: collections = tables, doc = entry but in object form
   */
  const setUser = async (docName: string, password: string, collectionName: string, data: User) => {
    data.username = docName;
    data.token = password;
    const cityRef = collection(db,collectionName);
    await setDoc(doc(cityRef, docName), data);
  };
  
  try{//run this block to set your user, don't forget to comment out the setUser() line 
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
    //COMMENT THIS LINE OUT TO ADD USER TO users COLLECTION change username string and password to your liking
    //setUser("anhquang", "123", "users", data);
  } catch (error){
    if(error){
      console.log(error);
    }
  }
  
  return (
    <AppNavigator/>
  );
};