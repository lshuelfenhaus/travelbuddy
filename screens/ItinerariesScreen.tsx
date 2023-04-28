import { VStack, Button, HStack, Text } from "@react-native-material/core";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { MaterialIcons } from '@expo/vector-icons'; 
import themestyles from "../Colors";
import { BottomNavigation } from "../components/bottomnavigation";
import React, { useEffect, useState } from "react";
import { getEarliestItineraryFromUser, getItinerariesFromUser } from "../components/firestoredbinteractions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ClickableCard from "../components/clickablecard";
import { ICON_COLOR, L_SPACE, MARGIN, PADDING_LARGE, PADDING_REGULAR, PADDING_XLARGE, SPACE, S_SPACE } from "../StyleConstants";
import { ScrollView, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
interface HomeScreenProps {
    navigation: any,
}

const ItinerariesScreen = (props: HomeScreenProps) => {
    const [earliestItinerary, setEarliestItinerary] = useState<any>(null);
    const [itineraries, setItineraries] = useState<any>([]);
    const isFocused = useIsFocused();
    const getDirtyStatus = async () => {
        const dirty = await AsyncStorage.getItem("@dirty");
        return dirty;
    }
    const getUserName = async () => {
        const username = await AsyncStorage.getItem("@username");
        return username;
    }
    useEffect( ()=>{
        getUserName().then((username) => {
            if(username !== null){
                getDirtyStatus().then( async (result) => {
                    if(result === "true" || (result && itineraries.length === 0)){
                        getItinerariesFromUser(username).then((results) => {
                            setItineraries(results);
                        });
                        getEarliestItineraryFromUser(username).then((results) => {
                            setEarliestItinerary(results);
                        });
                        await AsyncStorage.setItem("@dirty", "false");
                    }
                });
            }
        });
       
       
    },[isFocused])
    return(
        <>
        <SafeAreaProvider  style={{flex: 1, backgroundColor: themestyles.eggshell.color}}>
            
            <VStack style={{
                padding:PADDING_LARGE,
                justifyContent:'center',
                alignItems:'center',
                }} spacing={L_SPACE}>
                <Text variant="h4" color={themestyles.charcoal.color}>Upcoming Trip</Text>
                <VStack>
                    {earliestItinerary && 
                        <ClickableCard background={themestyles.mintGreen.color} navigateEnd={"ItineraryDetail"} params={{id:earliestItinerary.id}} navigation={props.navigation}>
                            <VStack  spacing={S_SPACE}>
                                <Text variant="h6">{earliestItinerary.name.length ? earliestItinerary.name : `Trip to ${earliestItinerary.destination}`}</Text>
                                <Text variant="body1">
                                    <Text style={styles.label}>Start Date: </Text> 
                                    {earliestItinerary.startDate.toDate().toISOString().substring(0,10)}</Text>
                                <Text variant="body1">
                                    <Text style={styles.label}>End Date: </Text> 
                                    {earliestItinerary.endDate.toDate().toISOString().substring(0,10)}</Text>
                                <Text variant="body1"><MaterialIcons name="location-pin" size={30} color={ICON_COLOR} /> {earliestItinerary.destination}</Text>
                            </VStack>
                        </ClickableCard>
                    }
                </VStack>
                
                <Text variant="h4" color={themestyles.charcoal.color}>All Trips</Text>
                
                <ScrollView
                    horizontal 
                    contentContainerStyle={styles.allTripsContainer}
                    snapToInterval={500}
                    >
                    <HStack spacing={40}>
                    {itineraries && itineraries.map((itinerary: any,index:number) => {
                        return(
                            <ClickableCard 
                                key={index} 
                                navigation={props.navigation}
                                navigateEnd={"ItineraryDetail"} params={{id:itinerary.id}}
                                >
                                
                                <VStack spacing={S_SPACE}>
                                    <Text variant="h6">{itinerary.name.length ? itinerary.name  : `Trip to ${itinerary.destination}`}</Text>
                                    <Text variant="body1">
                                        <Text style={styles.label}>Start Date: </Text> 
                                        {itinerary.startDate.toDate().toISOString().substring(0,10)}</Text>
                                    <Text variant="body1">
                                        <Text style={styles.label}>End Date: </Text> 
                                        {itinerary.endDate.toDate().toISOString().substring(0,10)}</Text>
                                    <Text variant="body1"><MaterialIcons name="location-pin" size={30} color={ICON_COLOR} /> {itinerary.destination}</Text>
                                </VStack>
                            </ClickableCard>
                        )
                    })}
                    </HStack>
                </ScrollView>
                              
            </VStack>

            
        </SafeAreaProvider>
        <BottomNavigation navigation={props.navigation} />
        </>
    );
}
const styles = StyleSheet.create({
    label:{
        fontWeight: "bold"
    },
    allTripsContainer:{
        paddingHorizontal: PADDING_REGULAR,
        paddingVertical: PADDING_XLARGE,
        
    }
})
export default ItinerariesScreen;
