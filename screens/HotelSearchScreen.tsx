import { Button, Text, TextInput, VStack } from '@react-native-material/core';
import React, {useState, useEffect} from 'react';
import { Platform } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
interface HotelSearchScreenProps {
    navigation: any
}
const HotelSearchScreen = (props: HotelSearchScreenProps) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [location, setLocation] = useState("");
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState([]);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [minPrice, setMinPrice] = useState(0);
    const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
    const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);
    const onStartDateChange = (date:any) => {
        setShowStartDateCalendar(state => !state);
        setStartDate(date);
    }
    const onEndDateChange = (date:any) => {
        setShowStartDateCalendar(state => !state);
        setEndDate(date);
    }
    const searchForHotel = () => {
        props.navigation.navigate("HotelList",{
            location: location,
            startDate: startDate.toString(),
            endDate: endDate.toString(),
            adults: adults,
            chidren: children,
            maxPrice: maxPrice,
            minPrice: minPrice
        })
    }
    return (
        <VStack>
            <Text>{"Let's search your hotels"}</Text>
            <TextInput label="Destination" variant='outlined'/>
            <TextInput label="Number of adult" variant='outlined'/>
            {/*Create two button to reveal the calendar one for start date one for end date */}
            {/*Create input fields for max price, min price */}
            <TextInput label='Min Price' variant='outlined' /> 
            <TextInput label = 'Max Price' variant='outlined'/>
            <Button variant="outlined" title="Start Date" onPress={event => {setShowStartDateCalendar(state => !state)}}/>
            {showStartDateCalendar && <CalendarPicker onDateChange={(date) => onStartDateChange(date)}></CalendarPicker>}
            <Button variant="outlined" title="End Date" onPress={event => {setShowEndDateCalendar(state => !state)}}/>
            {showEndDateCalendar && <CalendarPicker onDateChange={(date) => onEndDateChange(date)} ></CalendarPicker>}
            <Button  title="search" onPress={searchForHotel}/>
        </VStack>
    )
}

export default HotelSearchScreen