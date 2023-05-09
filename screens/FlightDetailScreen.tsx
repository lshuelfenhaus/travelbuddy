import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Flex, HStack, VStack,Badge, IconButton } from '@react-native-material/core';
import { Image } from 'react-native-elements';
import * as STYLE_CONSTANTS from '../StyleConstants';
import themestyles from '../Colors';
interface HotelDetailScreenProps {
    navigation?:any,
    route: any
}
const FlightDetailScreen = (props: HotelDetailScreenProps) => {
    let imgDefault = require('./../assets/flightimages/airplane_icon.png');
    let imgAA = require('./../assets/flightimages/aa.png');
    let imgDelta = require('./../assets/flightimages/delta.png');
    let imgJetBlue = require('./../assets/flightimages/jetblue.png');

    const [units, setUnits] = useState<Array<any>>([]);
    const [flightDetail, setFlightDetail] = useState<any>();
    const params = props.route.params;
    const paramProcess = (key:string, def:any) => {
        return params[key] ? params[key] : def
    }
    let airline_name = paramProcess('title', "");
    let flight_price = paramProcess('price', "");
    let dest_airport_name = paramProcess('dest_airport', "");
    let orig_airport_name = paramProcess('orig_airport',"");
    let duration = paramProcess('duration',"");
    let stops = paramProcess('stops', "");
    let carryon = paramProcess('carryon', "");

    let img = imgDefault;

    switch (airline_name) {
        case "American Airlines":
            img = imgAA;
            break;
        case "Delta Air Lines":
            img = imgDelta;
            break;
        case "JetBlue Airways":
            img = imgJetBlue;
            break;
    }

    console.log(paramProcess('id',""));
    console.log(airline_name);
    console.log(flight_price);

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
                    const val = await AsyncStorage.getItem(key+"_"+"flight");
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
    useEffect(()=>{//load flight detail in
        let flight_date_Promise: any = getItemFromAsync('@flight_date');
        let adults_Promise: any =  getItemFromAsync('@adults');
        //when we gell all the items from async, start loading them into state
        Promise.all([flight_date_Promise,adults_Promise]).then((values)=>{
            
            
            let FlightDate = new Date(Date.parse(values[0]));
            let adults = values[1];
            /*getFlights().then((details:any)=>{
                setFlightDetail(details);
            });*/
        });
    },[]);
    return(<>
        <ScrollView style={styles.screenBody}>
            {/* Image container */}
            <ScrollView style={styles.imageContainer} horizontal={true}> 
            </ScrollView>
            {/* Hotel Information sections */}
            {
            <VStack spacing={ELEMENT_SPACING}>
                 <Text style={{fontSize:STYLE_CONSTANTS.TEXT_XLARGE}}>{airline_name}</Text>
                 <Flex direction="row" wrap={true} >
                 </Flex>
                 <HStack justify='center'><Image style={styles.propImage} source={img}/> </HStack> 
                 <HStack>
                     <MaterialIcons name="location-pin" size={24} color={themestyles.delftBlue.color} />
                     <VStack spacing = {ELEMENT_SPACING} >
                         <Text style={{fontSize: STYLE_CONSTANTS.TEXT_REGULAR}}>{dest_airport_name}</Text> 
                         <Text style={{fontSize: STYLE_CONSTANTS.TEXT_SMALL}}>Departing From: {orig_airport_name}</Text>
                         <Text style={{fontSize: STYLE_CONSTANTS.TEXT_REGULAR}}>Duration: {duration}</Text> 
                         <Text style={{fontSize: STYLE_CONSTANTS.TEXT_REGULAR}}>Stops: {stops}</Text> 
                         <Text style={{fontSize: STYLE_CONSTANTS.TEXT_REGULAR}}>Free Carry-On Bag(s): {carryon}</Text>
                         <Text style={{fontSize: STYLE_CONSTANTS.TEXT_REGULAR}}>Total Price: ${flight_price}</Text>     
                     </VStack>
                 </HStack>
            </VStack>
            }
        </ScrollView>
        <IconButton style={styles.floatButton} onPress={back} icon={props => <AntDesign name="back" size = {40}  />} />
    </>)
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
        resizeMode: 'contain',
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
export default FlightDetailScreen;