import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, HStack, Text } from '@react-native-material/core';
import React, { useEffect, useState } from 'react';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView } from 'react-native-gesture-handler';
import { getItinerary } from '../components/firestoredbinteractions';
import { Timestamp } from 'firebase/firestore';
import { Card } from "@rneui/base";
import themestyles from '../Colors';
import { BottomNavigation } from '../components/bottomnavigation';

interface ItineraryDetailScreenProps {
    navigation: any,
    route: any,
}

export default function ItineraryDetailScreen(props: ItineraryDetailScreenProps) {
    const [itinerary, setItinerary] = useState<any>(null);

    const params = props.route.params;
    const id = params["id"];
    const edit = () => {
        props.navigation.navigate("ItineraryCreation", {mode: "edit", id: id});
    }
    useEffect( () => {
        if(id !== ""){
            getItinerary(id).then((result) => { 
                setItinerary(result);
            });
        }
    }, [])
    const convertToDateString = (tmsp: Timestamp) => {
        return tmsp.toDate().toISOString().substring(0,10);
    }
    return(
        <>
        <ScrollView>
            {itinerary && 
                <>
                    <Text>{itinerary.name}</Text>
                    <Text>Start Date: {convertToDateString(itinerary.startDate)}</Text>
                    <Text>End Date: {convertToDateString(itinerary.endDate)}</Text>
                    <Card containerStyle={{justifyContent:'center', alignItems:'center'}}>
                <HStack spacing={50}> 
                <Icon name={"bed"} size={40} color={themestyles.charcoal.color}/>
                <Text variant="h4">Hotel Booking</Text>
                <Button title="View" color={themestyles.delftBlue.color}/>
                </HStack>
                </Card>

                <Card containerStyle={{justifyContent:'center', alignItems:'center'}}>
                <HStack spacing={50}> 
                <Icon name={"airplane"} size={40} color={themestyles.charcoal.color}/>
                <Text variant="h4">Flight Booking</Text>
                <Button title="View" color={themestyles.delftBlue.color}/>
                </HStack>
                </Card>

                <Card containerStyle={{justifyContent:'center', alignItems:'center'}}>
                <HStack spacing={50}> 
                <Icon name={"map-marker"} size={40} color={themestyles.charcoal.color}/>
                <Text variant="h4">My Attractions</Text>
                <Button title="View" color={themestyles.delftBlue.color}/>
                </HStack>
                </Card>

                
                <Button variant="text" title="Cancel this trip" color="error" />
                    <Button onPress={edit} title="Edit Initerary"/>
                </>
            }
        </ScrollView>
        <BottomNavigation navigation={props.navigation}></BottomNavigation>
        </>
    )
}