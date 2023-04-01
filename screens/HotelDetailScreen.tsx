import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import {getRooms,getHotelDetail,getHotelReviews} from '../components/hotels/hotelinteraction'
import AsyncStorage from '@react-native-async-storage/async-storage';
interface HotelDetailScreenProps {
    navigation?:any,
    route: any
}

const HotelDetailScreen = (props: HotelDetailScreenProps) => {
    const [rooms, setRooms] = useState([]);
    const [hotelDetail, setHotelDetail] = useState({});
    const [hotelReviews, setHotelReviews] = useState([]);
    const params = props.route.params;
    const paramProcess = (key:string, def:any) => {
        return params[key] ? params[key] : def
    }
    async function getItemFromAsync (key : string){
        try{
            const global_val = await AsyncStorage.getItem(key);
            if(global_val === null){//no global check in check out and adults which are used when creating itinerary
                //try pair with type Ex: key = check_in_hotel
                try{
                    const val = await AsyncStorage.getItem(key+"_"+paramProcess('type',''));
                    return val;
                }catch(error){
                    return null;
                }
            } 
            return global_val;
        }catch(error){
            return null;
        }
       
    }
    useEffect(()=>{//load hotel detail in
        let check_in: any = getItemFromAsync('check_in');
        if(check_in === null){
            check_in = new Date();
        } 
        let check_out: any = getItemFromAsync('check_out');
        if(check_out === null){
            check_out = new Date((new Date()).getTime() + 86400000);
        }
        let adults: any =  getItemFromAsync('adults');
        if(adults === null){
            adults = 1;
        }
        getRooms(paramProcess('id',""), check_in, check_out, adults);
        getHotelDetail(paramProcess('id',""));
        getHotelReviews(paramProcess('id',""));
    },[]);
    return(
        <ScrollView>
            {/* Image container */}
            
        </ScrollView>
    )
}

export default HotelDetailScreen;