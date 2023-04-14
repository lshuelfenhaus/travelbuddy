import React, {useEffect, useState} from 'react';
import * as Flight from "../components/flights/flightinteraction";
import FlightList from '../components/flights/flightlist';
export interface FlightListScreenProps{
    navigation: any,
    route: any,
}
const FlightListScreen = (props: FlightListScreenProps) => {
    const [flights,setFlights] = useState([]);
    const params = props.route.params;
    const processParamsFromNavigation = (paramName:string, defaultVal: any) =>{
        return params[paramName] ? params[paramName] : defaultVal
    } 
    useEffect(()=>{
        Flight.getFlights(
            processParamsFromNavigation("origlocation",""),
            processParamsFromNavigation("destlocation",""),
            processParamsFromNavigation("flightDate",new Date()),
            processParamsFromNavigation("adults",1), 
        )
    },[])
    return (
        <FlightList navigation={props.navigation} items={flights} location={params["destLocation"]}/>
    )
}

export default FlightListScreen;

/* Need: departureAirport:label, arrivalAirport:label, totals:total, duration:text
Create table within Firebase
Upload logo images and match it with flight name
*/