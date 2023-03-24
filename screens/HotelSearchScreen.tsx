import { Button, Text, TextInput, VStack } from '@react-native-material/core';
import React, {useState, useEffect} from 'react';
const HotelSearchScreen = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [location, setLocation] = useState("");
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState([]);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [minPrice, setMinPrice] = useState(0);

    return (
        <VStack>
            <Text>{"Let's search your hotels"}</Text>
            <TextInput label="Destination" variant='outlined'/>
            <TextInput label="Number of adult" variant='outlined'/>
            <Button  title="search"/>
        </VStack>
    )
}

export default HotelSearchScreen