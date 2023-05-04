import React, {useEffect, useState} from 'react';
import * as Hotel from "../components/hotels/hotelinteraction";
import HotelList from '../components/hotels/hotellist';
import {Room} from './../components/hotels/HotelInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native';


export interface HotelListSCreenProps{
    navigation: any,
    route: any,
}
const HotelListScreen = (props: HotelListSCreenProps) => {
    const [hotels, setHotels] = useState<Array<Room>>([]);  
    const params = props.route.params;
    
    const processParamsFromNavigation = (paramName:string, defaultVal: any) =>{
        return params[paramName] ? params[paramName] : defaultVal
    }

    async function setDates  (checkIn: Date, checkOut: Date) {
        await AsyncStorage.setItem("@check_in_hotel", checkIn.toISOString());
        await AsyncStorage.setItem("@check_out_hotel", checkOut.toISOString());
    }
    async function setAdults (n: number) {
        await AsyncStorage.setItem("@adults_hotel", processParamsFromNavigation("adults",1))
    }
    async function setItineraryId (id: string) {
        await AsyncStorage.setItem("@itinerary_id", id);
    }

    useEffect(()=>{
        setItineraryId(processParamsFromNavigation("itinerary_id",""));
        setDates(processParamsFromNavigation("startDate",new Date()),processParamsFromNavigation("endDate",new Date()));
        setAdults(processParamsFromNavigation("adults",1));
        //TODO: implement loading screen here, load the images from the data
       Hotel.getLocationBaseOnType(processParamsFromNavigation("location",""),'city').then((geoID:any)=>{
        Hotel.getHotels(
            geoID,
            processParamsFromNavigation("startDate",new Date()),
            processParamsFromNavigation("endDate",new Date()),
            processParamsFromNavigation("adults",1)
            ).then(hotelItems => {
                setHotels(hotelItems);
            }) 
        });  
    },[])
    return (
        <HotelList navigation={props.navigation} items={hotels} location={params["location"]}/>
    )
}

export default HotelListScreen;