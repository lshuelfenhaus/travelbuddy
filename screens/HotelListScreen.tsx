import React, {useEffect} from 'react';
import * as Hotel from "../components/hotels/hotelinteraction";
import HotelList from '../components/hotels/hotellist';
const HotelListScreen = () => {
    useEffect(()=>{
       /*  Hotel.getLocation('San Jose').then((geoID:string)=>{
            Hotel.getHotels(geoID,new Date('2023-12-01'),new Date('2023-12-05'));
        }); */
    },[])
    return (
        <HotelList location={"San Jose"}/>
    )
}

export default HotelListScreen;