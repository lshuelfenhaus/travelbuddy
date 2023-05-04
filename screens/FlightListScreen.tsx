import React, {useEffect, useState} from 'react';
import * as Flight from "../components/flights/flightinteraction";
import FlightList from '../components/flights/flightlist';
import { trackPromise } from 'react-promise-tracker';

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
        trackPromise(Flight.getFlights(
            processParamsFromNavigation("origlocation",""),
            processParamsFromNavigation("destlocation",""),
            processParamsFromNavigation("flightDate",new Date()),
            processParamsFromNavigation("adults",1), 
        ).then(flightItems => {
            setFlights(flightItems);
        }))

        //Test flight list
        /*let entries = require('./../JSON DATA/flight_list.json')
        setFlights(entries.results)*/
    },[])
    return (
        <FlightList navigation={props.navigation} items={flights} destlocation={params["destlocation"]}/>
        /*<FlightList navigation={props.navigation} items={flights} destlocation={"JFK"}/>*/
    )
}

export default FlightListScreen;

