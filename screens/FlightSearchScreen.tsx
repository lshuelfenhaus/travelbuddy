import { Button, Text, TextInput, VStack } from '@react-native-material/core';
import React, {useState, useEffect} from 'react';
import { LogBox, StyleSheet } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import themestyles from '../Colors';
import { ScrollView } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ELEMENT_SPACING, TEXT_LARGE, TEXT_XLARGE, PADDING_XLARGE } from '../StyleConstants';
LogBox.ignoreLogs([ 'Non-serializable values were found in the navigation state', ]);
interface FlightSearchScreenProps {
    navigation: any
    route: any,
}
const FlightSearchScreen = (props: FlightSearchScreenProps) => {
    async function setItineraryId (id: string) {
        await AsyncStorage.setItem("@itinerary_id", id);
        return id;
    }
    const processParamsFromNavigation = (paramName:string, defaultVal: any) =>{
        return params[paramName] ? params[paramName] : defaultVal
    }
    const params = props.route.params;
    const [flightDate, setFlightDate] = useState(new Date());
    const [origlocation, setOrigLocation] = useState("");
    const [destlocation, setDestLocation] = useState("");
    const [adults, setAdults] = useState("1");
    const [showFlightDateCalendar, setShowFlightDateCalendar] = useState(false);

    const onFlightDateChange = (date:any) => {
        setShowFlightDateCalendar(state => !state);
        setFlightDate(new Date(date));
    }
    const back = () =>{
        if(props.navigation.canGoBack()){
            props.navigation.goBack();
        }
}
    const searchForFlight = () => {
        setItineraryId(processParamsFromNavigation("itinerary_id",""));
        props.navigation.navigate("FlightList",{
            origlocation: origlocation,
            destlocation: destlocation,
            flightDate: flightDate,
            adults: adults,
        })
    }
    useEffect(()=>{
        setItineraryId(processParamsFromNavigation("itinerary_id",""));
    },[])
    return (
        <ScrollView contentContainerStyle={{padding: PADDING_XLARGE}}>
        <VStack  spacing={ELEMENT_SPACING}>
            <Text>{"Let's search for flights"}</Text>
            <TextInput label="Origin Location" value={origlocation} onChangeText={setOrigLocation} variant='outlined'/>
            <TextInput label="Destination Location" value={destlocation} onChangeText={setDestLocation} variant='outlined'/>
            <TextInput label="Number of adult(s)" value={adults} onChangeText={setAdults} variant='outlined'/>
            <Button 
                    variant="outlined" 
                    leading={props => <Entypo name="calendar" size={24} color={FORM_BUTTON_ICON_COLOR} />} 
                    title={"Flight Date " + flightDate.toISOString().substring(0,10) } onPress={event => {setShowFlightDateCalendar(state => !state)}}
                    color={BUTTON_COLOR}    
                />
                {showFlightDateCalendar && 
                <CalendarPicker onDateChange={(date) => onFlightDateChange(date)}></CalendarPicker>}
            <Button color={BUTTON_COLOR} title="search" onPress={searchForFlight}/>
            <Button color={BUTTON_COLOR}  title="back" onPress={back}/>
        </VStack>
        </ScrollView>
    )
}
const BUTTON_COLOR = themestyles.delftBlue.color;
const FORM_BUTTON_ICON_COLOR = themestyles.charcoal400.color;
const styles = StyleSheet.create({
    formButton:{
        color: themestyles.delftBlue.color,
    }
})
export default FlightSearchScreen