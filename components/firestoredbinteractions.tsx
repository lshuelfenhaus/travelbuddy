import db from "./../firebase";
import {doc,addDoc,setDoc, getDoc,collection, Timestamp, orderBy, limit, query, getDocs, updateDoc, arrayUnion, where} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Itinerary } from "../DataInterfaces";
//always get username from the AsyncStorage, for async funtion to resolve, use await to get the value from the promise
export const addItineraryToUser = async (itineraryid:string, username:string) => {
    const userRef = doc(db, 'users', username);
    await updateDoc(userRef, {
        itineraryIDs: arrayUnion(itineraryid)
    })
}
export const addInitialItinerary = async (destination:string = "", adutls: string = "1", startDate: Date, endDate: Date, name: string, placeid:string) => {
    let current_timestamp = Timestamp.fromDate(new Date());
    //after this add newly created doc to the user
    const username = await AsyncStorage.getItem('@username');
    try{
        if(username !== null){
            const collectionRef = collection(db,"itineraries");
            let newItinerary: Itinerary = {
                name: name,
                destination: destination,
                adults: adutls,
                startDate: dateToTstmp(startDate),
                endDate: dateToTstmp(endDate),
                dateAdded: current_timestamp,
                attractionids: [],
                hotelid: "",
                flightid: "",
                username: username,
                placeid: placeid
            }
            await addDoc(collectionRef, newItinerary);
            const q = query(collectionRef,orderBy("dateAdded","desc"),limit(1));
            const querySnapshot = await getDocs(q);
            for (const doc of querySnapshot.docs) {
                await addItineraryToUser(doc.id,username);
                return doc.id;
            }
        }else{
            return null;
        }
    }catch(error){
        console.log("there was something wrong" + error);
        return null;
    }
}
export const updateItinerary = async (id:string, fields: any) => {
    try{
        const docRef = doc(db,"itineraries",id);
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

export const getItinerariesFromUser = async (username:string) => {
    const q = query(
        collection(db,"itineraries"),
        where("username","==",username),
        orderBy("dateAdded","desc"));
    const querySnapshots = await getDocs(q);
    return querySnapshots.docs.map((doc) => 
        {
            let thedoc = doc.data();
            thedoc.id = doc.id;
            return thedoc;
        }  
    );
}

export const getItinerary = async (id:string) => {
    const docRef = doc(db,"itineraries",id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        return docSnap.data();
    }else{
        return null;
    }
}

export const getEarliestItineraryFromUser = async (username:string) => {
    const q = query(collection(db,"itineraries"),orderBy("startDate","asc"),limit(1));
    const querySnapshot = await getDocs(q);
    for (const doc of querySnapshot.docs) {
        let thedoc = doc.data();
        thedoc.id = doc.id;
        return thedoc;
    }
    return null;
}


export const dateToTstmp = (date:Date) => {
    return Timestamp.fromDate(date);
}
