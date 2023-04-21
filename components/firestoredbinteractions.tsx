import db from "./../firebase";
import {doc,addDoc,setDoc, getDoc,collection, Timestamp} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

//always get username from the AsyncStorage 
export const addItinerary = async (destination:string = "", adutls: number = 1, startDate: string, endDate: string, collectionName: string) => {
    //add itineraryID to user's itineraryIDs array
/*     try{
        const username = await AsyncStorage.getItem("username");
        if(username){
            const userRef = doc(db, "users", username);
            const userDoc = await getDoc(userRef);
            const user = userDoc.data();
            if(user){
                user.itineraryIDs.push(itineraryID);
                await setDoc(userRef, user);
            }
            //add itinerary
            
        }

        return true;
    }catch(error){
        console.log(error);
        return false;
    } */
}