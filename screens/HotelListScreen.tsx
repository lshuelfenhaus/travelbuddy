import React, {useEffect} from 'react';
import * as Hotel from "./../components/hotelinteraction";

const HotelListScreen = () => {
    useEffect(()=>{
        Hotel.getLocation();
    },[])
    return (
        null
    )
}

export default HotelListScreen;