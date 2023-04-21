import {Timestamp} from "firebase/firestore";
//INTERFACE DECLARATION, I dont know where to put these 
export interface Flight {
    id:number;
    airline_name: string;
    flightNumber: string;
    time: Timestamp; 
    price: number; 
    startDate: Timestamp; 
    arrivalDate: Timestamp;
  }
  export interface Attraction{
    id: number;
    name: string;
    address: string;
    description: string;
    phone: number;
    openTime: Timestamp;
    closeTime: Timestamp;
  }
  export interface Hotel{
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
  export interface Rating{//used for flightRatings, hotelRatings, attractionRatings collections
    id: number;
    title: string;
    description: string;
    datePosted: Timestamp;
    username: string;
    targetID: number; 
  }
  export interface User {
    username: string;
    email: string;
    token: string;//hashed value with salt
    salt: string;
    name: string;
    itineraryIDs: String[];
  }
