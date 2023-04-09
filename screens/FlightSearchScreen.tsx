import { Button, Text, TextInput, VStack } from '@react-native-material/core';
import React, {useState, useEffect} from 'react';
import { Platform, LogBox } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
LogBox.ignoreLogs([ 'Non-serializable values were found in the navigation state', ]);
interface FlightSearchScreenProps {
    navigation: any
}
const FlightSearchScreen = (props: FlightSearchScreenProps) => {
    const [flightDate, setFlightDate] = useState(new Date());
    const [origlocation, setOrigLocation] = useState("");
    const [destlocation, setDestLocation] = useState("");
    const [adults, setAdults] = useState("0");
    const [children, setChildren] = useState([]);
    const [maxPrice, setMaxPrice] = useState("0");
    const [minPrice, setMinPrice] = useState("0");
    const [showFlightDateCalendar, setShowFlightDateCalendar] = useState(false);
    const onFlightDateChange = (date:any) => {
        setShowFlightDateCalendar(state => !state);
        setFlightDate(new Date(date));
    }
    const searchForFlight = () => {
        props.navigation.navigate("FlightList",{
            origlocation: origlocation,
            destlocation: destlocation,
            flightDate: flightDate,
            adults: adults,
            chidren: children,
            maxPrice: maxPrice,
            minPrice: minPrice
        })
    }
    return (
        <VStack>
            <Text>{"Let's search your hotels"}</Text>
            <TextInput label="Origin Location" value={origlocation} onChangeText={setOrigLocation} variant='outlined'/>
            <TextInput label="Destination Location" value={destlocation} onChangeText={setDestLocation} variant='outlined'/>
            <TextInput label="Number of adult(s)" value={adults} onChangeText={setAdults} variant='outlined'/>
            <TextInput label='Min Price' value={minPrice} onChangeText={setMinPrice} variant='outlined' /> 
            <TextInput label='Max Price' value={maxPrice} onChangeText={setMaxPrice} variant='outlined'/>
            <Button variant="outlined" title="Flight Date" onPress={event => {setShowFlightDateCalendar(state => !state)}}/>
            {showFlightDateCalendar && <CalendarPicker onDateChange={(date) => onFlightDateChange(date)}></CalendarPicker>}
            <Button  title="search" onPress={searchForFlight}/>
        </VStack>
    )
}

export default FlightSearchScreen