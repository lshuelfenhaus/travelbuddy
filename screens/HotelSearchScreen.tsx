import { Button, Text, TextInput, VStack } from '@react-native-material/core';
import React, {useState, useEffect} from 'react';
import { Platform, LogBox } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
LogBox.ignoreLogs([ 'Non-serializable values were found in the navigation state', ]);
interface HotelSearchScreenProps {
    navigation: any
}
const HotelSearchScreen = (props: HotelSearchScreenProps) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date((new Date()).getTime() + 86400000));
    const [location, setLocation] = useState("");
    const [adults, setAdults] = useState("1");
    const [children, setChildren] = useState([]);
    const [maxPrice, setMaxPrice] = useState("0");
    const [minPrice, setMinPrice] = useState("0");
    const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
    const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);
    const onStartDateChange = (date:any) => {
        setShowStartDateCalendar(state => !state);
        setStartDate(new Date(date));
    }
    const onEndDateChange = (date:any) => {
        setShowStartDateCalendar(state => !state);
        setEndDate(new Date(date));
    }
    const searchForHotel = () => {
        props.navigation.navigate("HotelList",{
            location: location,
            startDate: startDate,
            endDate: endDate,
            adults: adults,
            chidren: children,
            maxPrice: maxPrice,
            minPrice: minPrice
        })
    }
    return (
        <VStack>
            <Text>{"Let's search your hotels"}</Text>
            <TextInput label="Destination" value={location} onChangeText={setLocation} variant='outlined'/>
            <TextInput label="Number of adult" value={adults} onChangeText={setAdults} variant='outlined'/>
            {/*Create two button to reveal the calendar one for start date one for end date */}
            {/*Create input fields for max price, min price */}
            <TextInput label='Min Price' value={minPrice} onChangeText={setMinPrice} variant='outlined' /> 
            <TextInput label = 'Max Price' value={maxPrice} onChangeText={setMaxPrice} variant='outlined'/>
            <Button variant="outlined" title="Start Date" onPress={event => {setShowStartDateCalendar(state => !state)}}/>
            {showStartDateCalendar && <CalendarPicker onDateChange={(date) => onStartDateChange(date)}></CalendarPicker>}
            <Button variant="outlined" title="End Date" onPress={event => {setShowEndDateCalendar(state => !state)}}/>
            {showEndDateCalendar && <CalendarPicker onDateChange={(date) => onEndDateChange(date)} ></CalendarPicker>}
            <Button  title="search" onPress={searchForHotel}/>
        </VStack>
    )
}

export default HotelSearchScreen