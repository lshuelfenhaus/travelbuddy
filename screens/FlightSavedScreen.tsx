import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View, Dimensions} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Flex, HStack, VStack,Badge, IconButton, Pressable, Button } from '@react-native-material/core';
import { Image } from 'react-native-elements';
import * as STYLE_CONSTANTS from '../StyleConstants';
import themestyles from '../Colors';
import { deleteFlight, getFlightDetailDocID } from '../components/firestoredbinteractions';
import { updateItinerary } from '../components/firestoredbinteractions';
import { FontAwesome } from '@expo/vector-icons';
import { CLOSE_BUTTON_COLOR } from './../StyleConstants';
import { useIsFocused } from '@react-navigation/native';
interface FlightSavedScreenProps {
    navigation?:any,
    route: any
}
const {width,height} = Dimensions.get('window');

const FlightSavedScreen = (props: FlightSavedScreenProps) => {
    
    const [curFlight, setCurFlight] = useState<any>("");
    let imgDefault = require('./../assets/flightimages/airplane_icon.png');
    let imgAA = require('./../assets/flightimages/aa.png');
    let imgDelta = require('./../assets/flightimages/delta.png');
    let imgJetBlue = require('./../assets/flightimages/jetblue.png');



    const params = props.route.params;
    const paramProcess = (key:string, def:any) => {
        return params[key] ? params[key] : def
    }
    let flight_id = props.route.params["flightid"];
    

    useEffect(() => {//load flight detail in
        getFlightDetailDocID(flight_id).then((result) =>{
            setCurFlight(result);
        })
    }, []);

    let airline_name = curFlight.airline_name;
    let flight_price = curFlight.flight_price;
    let dest_airport_name = curFlight.dest_airport_name;
    let orig_airport_name = curFlight.orig_airport_name;
    let duration = curFlight.duration;
    let stops = curFlight.stops;
    let carryon = curFlight.carryon;
    

    
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
    const displayRemovalConfirmation = () => {
        Alert.alert(
            "Remove Offer",
            "Are you sure you want to remove this offer from your itinerary?",
            [
                {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel"
                },
                {
                    text: "Remove",
                    onPress: () => {
                        removeFlightFromItinerary();
                    },
                    style: "destructive"
                }
            ]
        )
    }
    const removeFlightFromItinerary = async () => {
        {
        const status2 = await deleteFlight(curFlight.id);
        const status = await updateItinerary(props.route.params["itinerary_id"], {flightid: ""})
            if(status || status2){
                Alert.alert("Flight removed successfully");
                props.navigation.navigate("ItineraryDetail");
            }else{
                Alert.alert("Flight removal failed");
            }
        }
    }
    return(<>
        <ScrollView style={styles.screenBody}>
        
            {/* Image container */}
            <ScrollView style={styles.imageContainer} horizontal={true}> 
            </ScrollView>
            {/* Flight Information sections */}
            {
            <VStack spacing={ELEMENT_SPACING}>
                <HStack spacing={ELEMENT_SPACING}>
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
        <HStack style={styles.buttonContainer}>
                <Button 
                pressableContainerStyle={[styles.button,styles.backButton]} 
                titleStyle={styles.buttonText} 
                onPress={back}   
                title="Back"
                leading={<AntDesign name="back" size={width * 0.05} color="white" />}
                />
                <Button 
                    pressableContainerStyle={[styles.button,styles.removeButton]} 
                    titleStyle={styles.buttonText}  
                    title="Remove offer"
                    leading={<FontAwesome name="trash" size={width * 0.05} color="white" />}
                    onPress={displayRemovalConfirmation}
                />
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
    button:{
        padding: STYLE_CONSTANTS.PADDING_REGULAR,
    },
    backButton:{
        minWidth: "30%",
        backgroundColor: themestyles.delftBlue.color,
    },
    removeButton:{
        minWidth: "70%",
        backgroundColor: CLOSE_BUTTON_COLOR,
    },
    buttonContainer:{
        flexDirection: 'row',
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
export default FlightSavedScreen;