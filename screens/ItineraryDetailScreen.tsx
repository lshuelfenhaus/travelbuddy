import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, HStack, Text, VStack } from '@react-native-material/core';
import React, { useEffect, useState } from 'react';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView } from 'react-native-gesture-handler';
import { deleteItinerary, deleteItineraryFromUser, getItinerary } from '../components/firestoredbinteractions';
import { Timestamp } from 'firebase/firestore';
import { Card } from "@rneui/base";
import themestyles from '../Colors';
import { BottomNavigation } from '../components/bottomnavigation';
import { Alert, Dimensions, Image, StyleSheet } from 'react-native';
import { PADDING_XLARGE, BUTTON_COLOR, L_SPACE, BORDER_RADIUS, ICON_SIZE_M } from '../StyleConstants';
import { API_KEY, getPlaceDetails } from '../components/placesinteractions';
import { useIsFocused } from '@react-navigation/native';

interface ItineraryDetailScreenProps {
    navigation: any,
    route: any,
}
const {width, height} = Dimensions.get('window');
const SPACE_RESPONSIVE = width * 0.075;
export default function ItineraryDetailScreen(props: ItineraryDetailScreenProps) {
    const [itinerary, setItinerary] = useState<any>(null);
    const [id, setId] = useState("");
    const [placeImage, setPlaceImage] = useState("");
    const isFocused = useIsFocused();
    const getUsername = async () => {
        const user = await AsyncStorage.getItem('@username');
        return user;
    }
    const searchForHotel = () => {
        props.navigation.navigate("HotelList",{
            location: itinerary.destination,
            startDate: new Date(itinerary.startDate.toDate()),
            endDate: new Date(itinerary.endDate.toDate()),
            adults: itinerary.adults,
            itinerary_id: id,
        })
    }
    const getDirtyStatus = async () => {
        const dirty = await AsyncStorage.getItem("@dirty");
        return dirty;
    }

    const searchFlight = () => {
        props.navigation.navigate("FlightSearch", {
            itinerary_id: id,
        });
    }

    const viewSavedFlight = () => {
        props.navigation.navigate("FlightSaved", {
            flightid: itinerary.flightid,
            itinerary_id: id
        });
    }

    const viewOffer = () => {
        props.navigation.navigate("HotelOfferDetail",{
            unit: itinerary.unit,
            plan: itinerary.plan,
            itinerary_id: id
        })
    }

    const cancelTrip =  () => {
        deleteItinerary(id).then((status)=>{
            if(status){
                getUsername().then(async (username)=>{
                    if(username){
                        await deleteItineraryFromUser(id, username);
                        Alert.alert("Itinerary deleted successfully");
                        props.navigation.navigate("Itineraries");
                    }
                });
                
            }else{
                Alert.alert("Itinerary deletion failed");
            }
                
        })
    }
    const edit = () => {
        if(id !== ""){
            props.navigation.navigate("ItineraryCreation", {mode: "edit", id: id});
        }
    }
    useEffect(() => {
        if(props.route.params){
            setId(props.route.params["id"]);
        }
    }, [])
    useEffect( () => {
        getDirtyStatus().then( async (result) => {
            if( (result === "true" || itinerary === null) && id !== ""){
                getItinerary(id).then((result) => { 
                    setItinerary(result);
                    AsyncStorage.setItem("@dirty", "false");
                });
            }
        });
    }, [id,isFocused]);
    useEffect(() => {//get place image
        if(itinerary){
            getPlaceDetails(itinerary.placeid).then((result) => {
                if(result["photos"] && result["photos"].length > 0){
                   setPlaceImage(result["photos"][0]["photo_reference"]);
                   
                }
            });
            AsyncStorage.setItem("@check_in", itinerary.startDate.toDate().toISOString());
            AsyncStorage.setItem("@check_out", itinerary.endDate.toDate().toISOString());
            AsyncStorage.setItem("@adults", itinerary.adults);
        }
        },[itinerary]);
    const convertToDateString = (tmsp: Timestamp) => {
        return tmsp.toDate().toISOString().substring(0,10);
    }
    return(
        <>
        <ScrollView style={styles.container}>
            {itinerary && 

                <VStack spacing={L_SPACE}>
                    {placeImage &&<Image style={styles.image} 
                    source={{uri: 
                        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=` + placeImage + "&key=" + API_KEY,
                        cache: 'default'
                    }}/>}
                    <Text variant='h4' color={themestyles.delftBlue.color}>{itinerary.destination}</Text>
                    <HStack spacing={L_SPACE} style={
                        {justifyContent:'space-between', alignItems:'center'}
                    }>
                        <Text>Start Date: {convertToDateString(itinerary.startDate)}</Text>
                        <Text>End Date: {convertToDateString(itinerary.endDate)}</Text>
                    </HStack>
                    <Card containerStyle={{justifyContent:'center', alignItems:'center'}}>
                        <HStack spacing={SPACE_RESPONSIVE}> 
                            <Icon name={"bed"} size={ICON_SIZE_M} color={themestyles.charcoal.color}/>
                            <Text style={styles.cardTitle} variant="h5">Hotel </Text>
                            {itinerary.unit && itinerary.plan ? 
                                <Button title="View" onPress={viewOffer} color={themestyles.delftBlue.color}/>:
                                <Button title="Search" color={themestyles.delftBlue.color} onPress={searchForHotel}/> 
                                
                            }
                        </HStack>
                    </Card>

                    <Card containerStyle={{justifyContent:'center', alignItems:'center'}}>
                        <HStack spacing={SPACE_RESPONSIVE}> 
                            <Icon name={"airplane"} size={ICON_SIZE_M} color={themestyles.charcoal.color}/>
                            <Text style={styles.cardTitle} variant="h5">Flight</Text>
                            {itinerary.flightid == "" ? 
                                 <Button title="Search" onPress={searchFlight} color={themestyles.delftBlue.color}/> : 
                                 <Button title="View" onPress={viewSavedFlight} color={themestyles.delftBlue.color}/>
                            }
                            
                        </HStack>
                    </Card>

                    <VStack style={{marginTop: 50}} spacing={L_SPACE}>
                        <Button style={styles.button} color={BUTTON_COLOR} onPress={edit} title="Edit"/>
                    
                        <Button onPress={cancelTrip}
                        variant='text' color="error" title="Cancel Trip"  style={{
                            paddingHorizontal: PADDING_XLARGE,
                        }} />
                    </VStack>                
                </VStack>
            }
        </ScrollView>
        <BottomNavigation navigation={props.navigation}></BottomNavigation>
        </>
    )
}
const styles = StyleSheet.create({
    button: {
        paddingHorizontal: PADDING_XLARGE,
      },
    container: {
        padding: PADDING_XLARGE,
    },
    cardTitle: {
        width: "46%",
        textAlign: "center",
    },
    image:{
        width: "100%", 
        height: height * 0.2,
        borderRadius: BORDER_RADIUS,
    }
})