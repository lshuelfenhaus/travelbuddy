import React, {useEffect, useState} from 'react';
import * as Hotel from "../components/hotels/hotelinteraction";
import HotelList from '../components/hotels/hotellist';
import {Room} from './../components/hotels/HotelInterface';
export interface HotelListSCreenProps{
    navigation: any,
    route: any,
}
const HotelListScreen = (props: HotelListSCreenProps) => {
    const [hotels,setHotels] = useState([]);
    const params = props.route.params;
    const processParamsFromNavigation = (paramName:string, defaultVal: any) =>{
        return params[paramName] ? params[paramName] : defaultVal
    } 
    useEffect(()=>{

        //TODO: implement loading screen here, load the images from the data
        Hotel.getLocationBaseOnType(processParamsFromNavigation("location",""),'city').then((geoID:any)=>{
           Hotel.getHotels(
            geoID,
            processParamsFromNavigation("startDate",new Date()),
            processParamsFromNavigation("endDate",new Date()),
            processParamsFromNavigation("minPrice",0), 
            processParamsFromNavigation("maxPrice",0),
            {
                adults: processParamsFromNavigation("adults",2),
                children:[
                    {"age": 1}
                ]
            }).then(hotelItems => {
                setHotels(hotelItems);
            }) 
        });   
    },[])
    return (
        <HotelList navigation={props.navigation} items={hotels} location={params["location"]}/>
    )
}

export default HotelListScreen;