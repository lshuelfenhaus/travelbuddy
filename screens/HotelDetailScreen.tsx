import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {getRooms,getHotelDetail,getHotelReviews} from '../components/hotels/hotelinteraction'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VStack } from '@react-native-material/core';
import { Image } from 'react-native-elements';
interface HotelDetailScreenProps {
    navigation?:any,
    route: any
}
const HotelDetailScreen = (props: HotelDetailScreenProps) => {
    const [rooms, setRooms] = useState<Array<any>>([]);
    const [hotelDetail, setHotelDetail] = useState<any>();
    const [hotelReviews, setHotelReviews] = useState<Array<any>>([]);
    const params = props.route.params;
    const paramProcess = (key:string, def:any) => {
        return params[key] ? params[key] : def
    }
    async function getItemFromAsync (key : string){
        try{
            const global_val = await AsyncStorage.getItem(key);
            if(!global_val){//no global check in check out and adults which are used when creating itinerary
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
       
    }//test id 849504
    useEffect(()=>{//load hotel detail in
        let check_in_Promise: any = getItemFromAsync('@check_in');
        let check_out_Promise: any = getItemFromAsync('@check_out');
        let adults_Promise: any =  getItemFromAsync('@adults');
        //when we gell all the items from async, start loading them into state
        Promise.all([check_in_Promise,check_out_Promise,adults_Promise]).then((values)=>{
            let check_in = new Date(Date.parse(values[0]));
            let check_out = new Date(Date.parse(values[1]));
            let adults = values[2];
            let rooms = require('./../JSON DATA/hotel_offers.json').units;
            let details = require('./../JSON DATA/hotel_detail.json');
            let reviews = require('./../JSON DATA/hotel_reviews.json').reviewInfo.reviews;
            setRooms(rooms);
            setHotelDetail(details);
            setHotelReviews(reviews);
        });
/* 
    { a unit
        id:
        header: { //overall description may be add as the room title
            text:
        },
        unitGallery:{ //images
            gallery:[
                {   image: {
                        description:
                        url:
                    }
                }
            ]
        },
        roomAmenities:{
            bodySubSections:[ usually the first one in the array 
                {
                    contents:[
                        {
                            header:{
                                text: title of the amenities
                            }
                            items:[
                                { //first item in the array usually
                                    content:{
                                        text: item will be put in <ul> and <li> so need to process them
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
        features:[
            {
                text:
            }
        ],
        ratePlans:[ //different paying options for room, if unit does not have rate plan => not available so grey out but still render
            {
                id:
                fees: [
                    check if this empty to calculate fee plus price plus 12% tax
                ]
                PriceDetails:[ //let payer know that price will go up when pay later
                    {
                        depositPolicies: "Non-refundable" low price vs "Free Cancelation" high price,
                        paymentModel: "PAY_NOW" low price vs "PAY_LATER" high price,
                        price: {
                            lead: amount per night
                        }
                    }
                ]
            }
        ]
    }
  */
/*          getRooms(paramProcess('id',""), check_in, check_out, adults).then((units)=>{
                setRooms(units);
            });
            getHotelDetail(paramProcess('id',"")).then((detail)=>{
                
            });
            getHotelReviews(paramProcess('id',""));
            }); */
    },[]);
    return(
        <ScrollView>
            {/* Image container */}
            <ScrollView style={styles.imageContainer} horizontal={true}>
                {hotelDetail && hotelDetail.propertyGallery.images.map((img:any,index:number)=> {
                    return(
                            <Image style={styles.propImage} key={img.image.url} source={{uri: img.image.url}}/>
                    )
                }) 
                
                }   
            </ScrollView>
        </ScrollView>
    )
}
const BORDER_RADIUS = 8;
const MARGIN = 8;
const PADDING = 50;
const styles = StyleSheet.create({
    propImage: {
        width: 400,
        height: 200,
        borderRadius: BORDER_RADIUS,
        marginRight: PADDING
    },
    imageContainer:{
        paddingHorizontal: PADDING,
        width: "100%"
    }
})
export default HotelDetailScreen;