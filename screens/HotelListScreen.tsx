import React, {useEffect, useState} from 'react';
import * as Hotel from "../components/hotels/hotelinteraction";
import HotelList from '../components/hotels/hotellist';
import {Room} from './../components/hotels/HotelInterface';
export interface HotelListSCreenProps{
    maxPrice?: number,
    minPrice?: number,
    location: string,
    startDate?: Date,
    endDate?: Date,
    room: Room,
    navigation: any
}
const HotelListScreen = (props: HotelListSCreenProps) => {

    useEffect(()=>{
        Hotel.getLocationBaseOnType('San Jose','city').then((geoID:any)=>{
            Hotel.getHotels(
                geoID,
                props.startDate?props.startDate : new Date(),
                props.startDate?props.startDate : new Date(), 
                props.minPrice?props.minPrice : 0, 
                props.maxPrice?props.maxPrice : 0,
                props.room)
        }); 
    },[])
    return (
        <HotelList location={"San Jose"}/>
    )
}

export default HotelListScreen;