import db from "./../firebase";
import {doc,addDoc,setDoc, getDoc,collection, Timestamp, orderBy, limit, query, getDocs, updateDoc, arrayUnion} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Itinerary } from "../DataInterfaces";
//always get username from the AsyncStorage 
export const addInitialItinerary = async (destination:string = "", adutls: string = "1", startDate: string, endDate: string, name: string) => {
    let current_timestamp = Timestamp.fromDate(new Date());
    let newItinerary: Itinerary = {
        name: name,
        destination: destination,
        adults: adutls,
        startDate: startDate,
        endDate: endDate,
        dateAdded: current_timestamp,
        attractionids: [],
        hotelid: "",
        flightid: "",
    }
    try{
        const collectionRef = collection(db,"itineraries");
        await addDoc(collectionRef, newItinerary);
        //after this add newly created doc to the user
        const username = await AsyncStorage.getItem('@username');
        if(username !== null){
            const q = query(collectionRef,orderBy("dateAdded"),limit(1));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                addItineraryToUser(doc.id,username);
            });
        }else{
            return false;
        }
        return true;
    }catch(error){
        console.log("there was something wrong" + error);
        return false;
    }
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
export const updateToItinerary = async (id:string, fiedl:string, value:any) => {

}

export const getItineraryFromUser = (username:string) => {

}

export const addItineraryToUser = async (itineraryid:string, username:string) => {
    const userRef = doc(db, 'users', username);
    await updateDoc(userRef, {
        itineraryIDs: arrayUnion(itineraryid)
    })
}