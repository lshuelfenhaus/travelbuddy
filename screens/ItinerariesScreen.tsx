import { VStack, Button, HStack, Text } from "@react-native-material/core";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons'; 
import themestyles from "../Colors";
import { BottomNavigation } from "../components/bottomnavigation";
import React, { useEffect, useState } from "react";
import { getEarliestItineraryFromUser, getItinerariesFromUser } from "../components/firestoredbinteractions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ClickableCard from "../components/clickablecard";
import { BUTTON_COLOR, ICON_COLOR, L_SPACE, MARGIN, PADDING_LARGE, PADDING_REGULAR, PADDING_XLARGE, SPACE, S_SPACE } from "../StyleConstants";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
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
    const createItinerary = () => {
        props.navigation.navigate("ItineraryCreation", {mode: "create"});
    }
    useEffect( ()=>{
        getUserName().then((username) => {
            if(username !== null){
                getDirtyStatus().then( async (result) => {
                    if(result === "true" || itineraries.length === 0){
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
        <ScrollView contentContainerStyle={{padding: PADDING_LARGE}}>
            <VStack style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: themestyles.eggshell.color}}>
            {itineraries.length === 0 ? 
                <VStack spacing={L_SPACE} style={{
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <Text color={themestyles.charcoal.color} variant="h3">No trip for now</Text>
                    <MaterialCommunityIcons color={ICON_COLOR} name="checkbox-blank-off-outline" size={100} />
                    <Button color={BUTTON_COLOR} onPress={createItinerary} title={"Add a trip"}/>
                </VStack>
                :
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
                        >
                        <HStack spacing={40}>
                        {itineraries && itineraries.map((itinerary: any,index:number) => {
                            return(
                                <ClickableCard 
                                    key={index} 
                                    navigation={props.navigation}
                                    styles={{marginRight: width * 0.05, minWidth: width * 0.7}}
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
            }
            
            </VStack>
        </ScrollView>
        <BottomNavigation navigation={props.navigation} />
        </>
    );
}
const {width,height} = Dimensions.get("window");
const styles = StyleSheet.create({
    label:{
        fontWeight: "bold"
    },
    allTripsContainer:{
        paddingHorizontal: PADDING_REGULAR,
        paddingVertical: PADDING_XLARGE,
        
    },
})
export default ItinerariesScreen;
