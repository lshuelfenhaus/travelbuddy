import { Button, Text, TextInput, VStack } from '@react-native-material/core';
import React, {useState, useEffect} from 'react';
import { LogBox, StyleSheet } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import themestyles from '../Colors';
import { ScrollView } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ELEMENT_SPACING, TEXT_LARGE, TEXT_XLARGE, PADDING_XLARGE } from '../StyleConstants';
import { useNavigationState } from '@react-navigation/native';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';

LogBox.ignoreLogs([ 'Non-serializable values were found in the navigation state', ]);
interface FlightSearchScreenProps {
    navigation: any
    route: any,
}
const usePreviousRouteName = () =>  {
    return useNavigationState(state =>
      state.routes[state.index - 1]?.name
        ? state.routes[state.index - 1].name
        : 'None'
    );
  }
const FlightSearchScreen = (props: FlightSearchScreenProps) => {

    const validationSchema = yup.object().shape({
        flightDate: yup.date().required('A flight date is required'),
        origlocation: yup.string().required('Please enter your origin location'),
        destlocation: yup.string().required('Please enter your destination location'),
        adults: yup.string().required('Please select the number of adults')
    });

    async function setItineraryId (id: string) {
        await AsyncStorage.setItem("@itinerary_id", id);
        return id;
    }


    const processParamsFromNavigation = (paramName:string, defaultVal: any) =>{
        return params[paramName] ? params[paramName] : defaultVal
    }

    const params = props.route.params;

    if(usePreviousRouteName() != "Home" && props.navigation.isFocused()){
        setItineraryId(processParamsFromNavigation("itinerary_id",""));
        }

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
    const searchForFlight = async () => {
        try{
            await validationSchema.validate({
                flightDate,
                origlocation,
                destlocation,
                adults 
            }, {abortEarly: false})

            props.navigation.navigate("FlightList",{
                origlocation: origlocation,
                destlocation: destlocation,
                flightDate: flightDate,
                adults: adults,
           
        })
        }
        catch (error: any) {
            error.errors.map((errorMessage: string, index: number) => {
                setTimeout(() => {
                   Toast.show({
                    type: 'error',
                    text1: '\ud83d\uded1 Wait!',
                    text2:  errorMessage
                    
                }) 
                }, index*1000)
            }); 
        }
        }
    useEffect(()=>{
        //setItineraryId(processParamsFromNavigation("itinerary_id",""));
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