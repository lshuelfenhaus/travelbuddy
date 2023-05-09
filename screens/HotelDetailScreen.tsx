import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons'; 
import {getRooms,getHotelDetail,getHotelReviews} from '../components/hotels/hotelinteraction'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Flex, HStack, VStack, IconButton } from '@react-native-material/core';
import { Image } from 'react-native-elements';
import Units from '../components/hotels/units';
import ReviewsSection from '../components/reviewssection';
import * as STYLE_CONSTANTS from '../StyleConstants';
import themestyles from '../Colors';
interface HotelDetailScreenProps {
    navigation?:any,
    route: any
}
const HotelDetailScreen = (props: HotelDetailScreenProps) => {
    const [units, setUnits] = useState<Array<any>>([]);
    const [hotelDetail, setHotelDetail] = useState<any>();
    const [hotelReviews, setHotelReviews] = useState<Array<any>>([]);
    const params = props.route.params;
    const paramProcess = (key:string, def:any) => {
        return params[key] ? params[key] : def
    }
    const back = () =>{
        if(props.navigation.canGoBack()){
            props.navigation.goBack();
        }   
    }
    async function getItemFromAsync (key : string){
        try{
            const global_val = await AsyncStorage.getItem(key);
            if(global_val === null){//no global check in check out and adults which are used when creating itinerary
                //try pair with type Ex: key = check_in_hotel
                try{
                    const val = await AsyncStorage.getItem(key+"_"+"hotel");
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
            getRooms(paramProcess('id',""), check_in, check_out, adults).then((units)=>{
                setUnits(units);
            });
            getHotelDetail(paramProcess('id',"")).then((details:any)=>{
                setHotelDetail(details);
            });
            getHotelReviews(paramProcess('id',"")).then((reviews)=>{
                setHotelReviews(reviews);
            }); 
           /*  let units = require('./../JSON DATA/hotel_offers.json');
            let details = require('./../JSON DATA/hotel_detail.json');
            let reviews = require('./../JSON DATA/hotel_reviews.json');
            setUnits(units.units);
            setHotelDetail(details);
            setHotelReviews(reviews.reviewInfo.reviews); */
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


    },[]);
    return(
    <>
        <ScrollView contentContainerStyle={styles.screenBody}>
            {/* Image container */}
            <ScrollView style={styles.imageContainer} horizontal={true}>
                {hotelDetail && hotelDetail.propertyGallery.images.map((img:any,index:number)=> {
                    return(
                            <Image style={styles.propImage} key={img.image.url} source={{uri: img.image.url}}/>
                    )
                }) 
                
                }   
            </ScrollView>
            {/* Hotel Information sections */}
            {hotelDetail &&
            <VStack spacing={ELEMENT_SPACING}>
                 <Text style={{fontSize:STYLE_CONSTANTS.TEXT_XLARGE}}>{hotelDetail.summary.name}</Text>
                 <Flex direction="row" wrap={true} >
                     {hotelDetail.summary.amenities.topAmenities.items.map((item:any,index:number)=>{
                         return(
                             <Text  style={styles.badge} key={index}>{item.text}</Text>
                         )
                     }) }
                 </Flex>
                 <HStack>
                     <MaterialIcons name="location-pin" size={24} color={themestyles.delftBlue.color} />
                     <VStack spacing = {ELEMENT_SPACING} >
                         <Text style={{fontSize: STYLE_CONSTANTS.TEXT_REGULAR}}>{hotelDetail.summary.location.address.firstAddressLine}</Text> 
                         <Text style={{fontSize: STYLE_CONSTANTS.TEXT_REGULAR}}>{hotelDetail.summary.location.address.secondAddressLine}</Text>     
                     </VStack>
                 </HStack>
            </VStack>
            }
            {/* Hotel units information */}
            <Units  units={units}></Units>
            {/* Hotel reviews sections */}
            {hotelReviews && <ReviewsSection reviews={hotelReviews}></ReviewsSection>}
        </ScrollView>
        <IconButton style={styles.floatButton} onPress={back} icon={props => <AntDesign name="back" size = {40}  />} />
    </>
    )
}
const BORDER_RADIUS = 8;
const MARGIN = 8;
const SPACE = 40;
const ELEMENT_SPACING = 16;
const styles = StyleSheet.create({
    propImage: {
        width: 400,
        height: 200,
        borderRadius: BORDER_RADIUS,
        marginRight: SPACE
    },
    imageContainer:{
        width: "100%"
    },
    screenBody:{
        padding: ELEMENT_SPACING,
    },
    floatButton:{
        position: 'absolute',
        right: MARGIN,
        bottom: MARGIN,
        zIndex: 5000
    },
    badge:{
        backgroundColor: STYLE_CONSTANTS.BADGE_COLOR,
        fontSize: STYLE_CONSTANTS.TEXT_SMALL,
        fontWeight: 'bold',
        paddingHorizontal: STYLE_CONSTANTS.PADDING_REGULAR,
        paddingVertical: STYLE_CONSTANTS.PADDING_REGULAR/2,
        borderRadius: BORDER_RADIUS * 3,
        marginRight: MARGIN,
        marginBottom: MARGIN,
        minWidth: STYLE_CONSTANTS.BADGE_MIN_WIDTH,
        textAlign: 'center',
        color: STYLE_CONSTANTS.BADGE_TEXT_COLOR,
    }
})
export default HotelDetailScreen;