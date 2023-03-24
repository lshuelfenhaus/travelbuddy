import React, {useEffect, useState} from 'react';
import * as Hotel from "../components/hotels/hotelinteraction";
import HotelList from '../components/hotels/hotellist';
import {Room} from './../components/hotels/HotelInterface';
export interface HotelListSCreenProps{
    navigation: any,
    route: any,
}
const HotelListScreen = (props: HotelListSCreenProps) => {
    const params = props.route.params;
    const processParamsFromNavigation = (paramName:string, defaultVal: any) =>{
        return params[paramName] ? params[paramName] : defaultVal
    } 
    useEffect(()=>{
        Hotel.getLocationBaseOnType('San Jose','city').then((geoID:any)=>{
           Hotel.getHotels(
            geoID,
            new Date(processParamsFromNavigation("startDate",new Date())),
            new Date(processParamsFromNavigation("endDate",new Date())),
            processParamsFromNavigation("minPrice",0), 
            800,
            {
                adults: processParamsFromNavigation("adults",2),
                children:[
                    {age: 1}
                ]
            }) 
        }); 
    },[])
    return (
        <HotelList location={"San Jose"}/>
    )
}

export default HotelListScreen;