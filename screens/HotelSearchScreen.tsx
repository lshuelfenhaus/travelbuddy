import { Button, Text, TextInput, VStack } from '@react-native-material/core';
import React, {useState, useEffect} from 'react';
import { LogBox, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import CalendarPicker from 'react-native-calendar-picker';
import { ScrollView } from 'react-native-gesture-handler';
import themestyles from '../Colors';
import { ELEMENT_SPACING, PADDING_XLARGE, TEXT_LARGE, TEXT_XLARGE } from '../StyleConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';


LogBox.ignoreLogs([ 'Non-serializable values were found in the navigation state', ]);
interface HotelSearchScreenProps {
    navigation: any
}
const HotelSearchScreen = (props: HotelSearchScreenProps) => {
    const validationSchema = yup.object().shape({
        startDate: yup.date().required('A start date is required'),
        endDate: yup.date().required('An End Date is Required'),
        location: yup.string().required('Please choose a location'),
        adults: yup.string().required('Please select the number of adults')
    });

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date((new Date()).getTime() + 86400000));
    const [location, setLocation] = useState("");
    const [adults, setAdults] = useState("1");
    const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
    const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);

    const onStartDateChange = (date:any) => {
        setShowStartDateCalendar(false);
        setStartDate(new Date(date));
    }
    const onEndDateChange = (date:any) => {
        setShowEndDateCalendar(false);
        setEndDate(new Date(date));
    }
    const back = () =>{
            props.navigation.navigate("Home");
    }
    const searchForHotel = async () => {
        try{
            await validationSchema.validate({
                startDate,
                endDate,
                location,
                adults,
            }, {abortEarly: false})
            props.navigation.navigate("HotelList",{
            location: location,
            startDate: startDate,
            endDate: endDate,
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
        AsyncStorage.setItem('@itinerary_id',"");
    },[])
    return (
        <ScrollView contentContainerStyle={{padding: PADDING_XLARGE}}>
            <VStack spacing={ELEMENT_SPACING}>
                <Text style={styles.title}>{"Let's search your hotel"}</Text>
                <TextInput variant="outlined"  label="Destination" value={location} onChangeText={setLocation} />
                <TextInput variant="outlined" label="Number of adults" value={adults} onChangeText={setAdults} />
                {/*Create two button to reveal the calendar one for start date one for end date */}
                {/*Create input fields for max price, min price */}
                <Button 
                    variant="outlined" 
                    leading={props => <Entypo name="calendar" size={24} color={FORM_BUTTON_ICON_COLOR} />} 
                    title={"Start Date " + startDate.toISOString().substring(0,10) } onPress={event => {setShowStartDateCalendar(state => !state)}}
                    color={BUTTON_COLOR}    
                />
                               {showStartDateCalendar && 
                <CalendarPicker 
                  selectedStartDate={startDate} 
                  selectedDayColor={themestyles.delftBlue.color}
                  selectedDayTextColor={"white"} 
                  onDateChange={(date) => onStartDateChange(date)}></CalendarPicker>}

                <Button
                    variant="outlined"  
                    leading={props => <Entypo name="calendar" size={24} color={FORM_BUTTON_ICON_COLOR} />} 
                    title={"End Date " + endDate.toISOString().substring(0,10)} onPress={event => {setShowEndDateCalendar(state => !state)}}
                    color={BUTTON_COLOR}
                />
                
                {showEndDateCalendar && 
                <CalendarPicker 
                  selectedStartDate={endDate} 
                  selectedDayColor={themestyles.delftBlue.color}
                  selectedDayTextColor={"white"} 
                  initialDate={endDate} 
                  onDateChange={(date) => onEndDateChange(date)} ></CalendarPicker>}
                
                <Button color={BUTTON_COLOR}  title="search" onPress={searchForHotel}/>
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
    },
    title:{
        fontSize: TEXT_XLARGE,
        textAlign: "center",
        color: themestyles.delftBlue.color,
    }
})

export default HotelSearchScreen