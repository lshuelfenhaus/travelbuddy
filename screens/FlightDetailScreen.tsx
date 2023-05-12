import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Flex, HStack, VStack,Badge, IconButton, Pressable } from '@react-native-material/core';
import { Image } from 'react-native-elements';
import * as STYLE_CONSTANTS from '../StyleConstants';
import themestyles from '../Colors';
import { updateItinerary, addNewFlightDetail, getFlightDetailDocID } from '../components/firestoredbinteractions';

interface FlightDetailScreenProps {
    navigation?:any,
    route: any
}
const FlightDetailScreen = (props: FlightDetailScreenProps) => {
    let imgDefault = require('./../assets/flightimages/airplane_icon.png');
    let imgAA = require('./../assets/flightimages/aa.png');
    let imgDelta = require('./../assets/flightimages/delta.png');
    let imgJetBlue = require('./../assets/flightimages/jetblue.png');

    const [id, setId] = useState<any>();
    const getItineraryIdFromAsyncStore = async () => {
        const id = await AsyncStorage.getItem('@itinerary_id');
        return id;
    }
    const params = props.route.params;
    const paramProcess = (key:string, def:any) => {
        return params[key] ? params[key] : def
    }
    let flight_id = paramProcess('id', "");
    let airline_name = paramProcess('title', "");
    let flight_price = paramProcess('price', "");
    let dest_airport_name = paramProcess('dest_airport', "");
    let orig_airport_name = paramProcess('orig_airport',"");
    let duration = paramProcess('duration',"");
    let stops = paramProcess('stops', "");
    let carryon = paramProcess('carryon', "");
    

    const saveOffer = async () => {
        if(id !== null && id.length > 0){
            const status2 = await addNewFlightDetail(
                flight_id,
                airline_name,
                flight_price,
                dest_airport_name,
                orig_airport_name,
                duration,
                stops,
                carryon
            )
            const status = await updateItinerary(id, {flightid: flight_id});
            if(status || status2){
                Alert.alert("Offer saved to itinerary");
                props.navigation.navigate("ItineraryDetail");
            }else{
                Alert.alert("Error saving offer to itinerary");
            }
        } 
    }
    useEffect(()=>{
        getItineraryIdFromAsyncStore().then((daid)=>{
            setId(daid);
        })
        console.log(id);
    } ,[])
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
                <HStack spacing={ELEMENT_SPACING}>
                <IconButton  onPress={back} icon={props => <AntDesign name="back" size = {40}  />} />
                <Text style={{fontSize:STYLE_CONSTANTS.TEXT_XLARGE}}>{airline_name}</Text>
                </HStack>
                 
                 <Flex direction="row" wrap={true} >
                 </Flex>
                 <HStack justify='center'><Image style={styles.propImage} source={img}/> </HStack> 
                 
                 <HStack>
                     <MaterialIcons name="location-pin" size={24} color={themestyles.delftBlue.color} />
                     <VStack spacing = {ELEMENT_SPACING} >
                        
                         <Text style={[styles.textMainTitle]}>{dest_airport_name}</Text> 
                         <VStack>
                         <Text style={[styles.textMainTitle]}>Departing From</Text>
                         <Text style={{fontSize: STYLE_CONSTANTS.TEXT_REGULAR}}>{orig_airport_name}</Text> 
                         </VStack>

                         <VStack>
                         <Text style={[styles.textMainTitle]}>Duration</Text> 
                         <Text style={{fontSize: STYLE_CONSTANTS.TEXT_REGULAR}}>{duration}</Text>
                         </VStack> 

                         <VStack>
                         <Text style={[styles.textMainTitle]}>Stops</Text>
                         <Text style={{fontSize: STYLE_CONSTANTS.TEXT_REGULAR}}>{stops}</Text>
                         </VStack>

                         <VStack>
                         <Text style={[styles.textMainTitle]}>Free Carry-On Bag(s)</Text>
                         <Text style={{fontSize: STYLE_CONSTANTS.TEXT_REGULAR}}>{carryon}</Text>
                         </VStack>
                         <VStack>
                         <Text style={[styles.textMainTitle]}>Total Price</Text>
                         <Text style={{fontSize: STYLE_CONSTANTS.TEXT_REGULAR}}>${flight_price}</Text>
                         </VStack>     
                     </VStack>
                 </HStack>
            </VStack>
            }
        </ScrollView>
        <HStack>
        <Pressable onPress={saveOffer} style={[styles.modalButton,styles.reserveButton]}>
                    <HStack>                    
                        <Text style={[styles.buttonText,styles.textSubTitle]}>Save Offer</Text>
                    </HStack>
                    </Pressable>
            
        </HStack>
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
    textMainTitle:{
        fontSize: STYLE_CONSTANTS.TEXT_LARGE
    },
    modalButton:{
        backgroundColor: themestyles.delftBlue.color,
        padding: STYLE_CONSTANTS.ELEMENT_SPACING,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    reserveButton:{
        flex: 1
    },
    textSubTitle:{
        fontSize: STYLE_CONSTANTS.TEXT_LARGE
    },
    closeButton:{
        backgroundColor: STYLE_CONSTANTS.CLOSE_BUTTON_COLOR,
        color: 'white',
        paddingHorizontal: STYLE_CONSTANTS.PADDING_XLARGE * 2
    },
    buttonText:{
        fontSize: 20,
        color: 'white'
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