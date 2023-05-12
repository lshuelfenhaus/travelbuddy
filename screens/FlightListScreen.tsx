import React, {useEffect, useState} from 'react';
import * as Flight from "../components/flights/flightinteraction";
import FlightList from '../components/flights/flightlist';
import { trackPromise } from 'react-promise-tracker';
import { BORDER_RADIUS, ICON_SIZE_S, L_SPACE, PADDING_LARGE, PADDING_REGULAR, PADDING_XLARGE, S_SPACE } from '../StyleConstants';
import { Button, HStack, IconButton, Text, TextInput, VStack } from '@react-native-material/core';
import themestyles from '../Colors';
import {StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Foundation, AntDesign, FontAwesome5 } from '@expo/vector-icons'; 

export interface FlightListScreenProps{
    navigation: any,
    route: any,
}

const sortItems = [
    {   
        name: 'price',
        type: 'number',
        path: 'totals.total'
    }
    , 
    {   
        name: 'name',
        path: 'flight_name',
        type: 'string'
    }
    ,
    {   
        name: 'duration',
        type: 'string',
        path: 'duration.text'
    }
]

const FlightListScreen = (props: FlightListScreenProps) => {
    const [flights, setFlights] = useState<Array<any>>([]);  
    
    const [orignalFlights, setOrignalFlights] = useState<Array<any>>([]);
    const [sorter, setSorter] = useState<any>({property: "", type: "string", desc: true, path: ''});
    const [filter, setFilter] = useState<any>({
        minPrice: "0",
        maxPrice: "0",
    });
    const [sortContainerVisible, setSortContainerVisible] = useState<boolean>(false);
    const [filterContainerVisible, setFilterContainerVisible] = useState<boolean>(false);
    const params = props.route.params;
    
    const processParamsFromNavigation = (paramName:string, defaultVal: any) =>{
        return params[paramName] ? params[paramName] : defaultVal
    }

    const handleFilterChange = (key: string, value: any) => {
        setFilter((prevState:any) => ({...prevState, [key]: value}));
    }

    const applyFilter = async () => {
        let filteredFlights = [...orignalFlights];
        if(filter.duration){
            filteredFlights = filteredFlights.filter((item) => {
                return item.duration.text >= filter.duration;
            })
        }
        if(filter.minPrice){
            filteredFlights = filteredFlights.filter((item) => {
                return item.totals.total >= filter.minPrice;
            })
        }
        if(filter.maxPrice){
            filteredFlights = filteredFlights.filter((item) => {
                return item.totals.total <= filter.maxPrice;
            })
        }
        return filteredFlights;
    }

    async function setDates  (flightDate: Date) {
        await AsyncStorage.setItem("@flight_date", flightDate.toISOString());
    }
    async function setAdults (n: number) {
        await AsyncStorage.setItem("@adults_flight", processParamsFromNavigation("adults",1))
    }
    /*async function setItineraryId (id: string) {
        await AsyncStorage.setItem("@itinerary_id", id);
    }*/
    const back = () =>{
        if(props.navigation.canGoBack()){
            props.navigation.goBack();
        }else{
            props.navigation.navigate("FlightSearch");
        }
    }

    const sortFlights = async () => {
        let sortee = [...flights];
        const sorterPaths: string = sorter.path.split(".");
        const sorterPathLen = sorterPaths.length;
        if(sorter.type === "number"){
            sortee.sort((a:any,b:any)=>{
                let aItem = a;
                let bItem = b;
                for (let i = 0; i < sorterPathLen; i++) {
                   aItem = aItem[sorterPaths[i]];
                   bItem = bItem[sorterPaths[i]]; 
                }
                if(!sorter.desc){
                    return aItem - bItem;
                }else{
                    return bItem - aItem;
                }
            });
        }else{
            sortee.sort((a:any,b:any)=>{
                let aItem = a;
                let bItem = b;
                for (let i = 0; i < sorterPathLen; i++) {
                   aItem = aItem[sorterPaths[i]];
                   bItem = bItem[sorterPaths[i]]; 
                }
                if(!sorter.desc){
                    return aItem.localeCompare(bItem);
                }else{
                    return bItem.localeCompare(aItem);
                }
            });
        }
        return sortee;
    }

    const handleApplyFilter = () => {
        applyFilter().then((filteredFlights)=>{
            setFlights(filteredFlights);
            setFilterContainerVisible(false);
        })
    }

    useEffect(()=>{
        //setItineraryId(processParamsFromNavigation("itinerary_id",""));
        setDates(processParamsFromNavigation("flightDate",new Date()));
        setAdults(processParamsFromNavigation("adults",1));
        trackPromise(Flight.getFlights(
            processParamsFromNavigation("origlocation",""),
            processParamsFromNavigation("destlocation",""),
            processParamsFromNavigation("flightDate",new Date()),
            processParamsFromNavigation("adults",1), 
        ).then(flightItems => {
            setFlights(flightItems);
            setOrignalFlights(flightItems);
        }))

        //Test flight list
        /*let entries = require('./../JSON DATA/flight_list.json')
        setFlights(entries.results)*/
    },[])
    useEffect(()=>{
        if(sorter.property !== ""){
            sortFlights().then((sortedFlights)=>{
                setFlights(sortedFlights);
            })
        }
    },[sorter]);
    return (
        //<FlightList navigation={props.navigation} items={flights} destlocation={params["destlocation"]}/>
        /*<FlightList navigation={props.navigation} items={flights} destlocation={"JFK"}/>*/
        
        
        //Filter components
        <>
        {/* Sticky Header */}
        <HStack style={styles.stickyHeader}>
                    <IconButton style={null} onPress={back} icon={props => <AntDesign name="back" size = {ICON_SIZE_S} color={'white'} />} />
                    <View style={styles.titleContainer}>
                            <Text variant='h4' style={[styles.stickyHeaderContentColor]}>Flights going to </Text>
                            <Text variant='h4' style={[styles.location,styles.stickyHeaderContentColor]}>{processParamsFromNavigation("destlocation","")}</Text>
                    </View>
                    <HStack>
                        <IconButton style={null} onPress={()=>{
                            setFilterContainerVisible(prevState => !prevState)
                            setSortContainerVisible(false);
                            }} icon={props => <AntDesign name="filter" size = {ICON_SIZE_S} color={'white'} />} />
                        <IconButton style={null} onPress={()=>{
                            setSortContainerVisible(prevState => !prevState)
                            setFilterContainerVisible(false);
                            }} icon={props => <FontAwesome5 name={sorter.desc ? "sort-amount-down" : "sort-amount-up"} size = {ICON_SIZE_S} color={'white'} />} />
                    </HStack>
            </HStack>

        {/* Sort Container */}
        {sortContainerVisible && 
                <HStack spacing={L_SPACE} style={styles.hiddenContainer}>
                    <Text>Sorted by</Text>
                    {sortItems.map((item,index)=>{
                        return (
                            <Button color={sorter.property === item.name ? themestyles.delftBlue.color : "lightgrey"}  key={index} title={item.name} onPress={()=>{setSorter({property: item.name, path: item.path, type: item.type, desc:  sorter.property === item.name ? !sorter.desc : true})}}/>
                        )
                    })}
                    
                </HStack>
            }

        {/* Filter Container */}
        {filterContainerVisible &&
                <VStack spacing={L_SPACE} style={styles.hiddenContainer}>
                    <Text>Filtered by</Text>
                    <VStack style={styles.filterInputContainer}>
                        <VStack style={styles.inputContainer}>
                            <Text>Min Price</Text>
                            <TextInput variant="outlined" color={themestyles.delftBlue.color} value={filter.minPrice} onChangeText={(text)=>{
                                handleFilterChange("minPrice",text);
                            }} keyboardType='numeric'/>
                        </VStack>
                        <VStack style={styles.inputContainer}>
                            <Text>Max Price</Text>
                            <TextInput variant="outlined" color={themestyles.delftBlue.color} value={filter.maxPrice} onChangeText={(text)=>{
                                handleFilterChange("maxPrice",text);
                            }} keyboardType='numeric'/>
                        </VStack>
                        
                    </VStack>
                    <Button title="Apply Filter" onPress={handleApplyFilter} color={themestyles.delftBlue.color} />
                </VStack>
            }

            {/* Flight List */}
            <VStack style={styles.container}>
                <FlightList navigation={props.navigation} items={flights} destlocation={params["destlocation"]}/>
                
            </VStack>

    </>

        
    )
}

const styles = StyleSheet.create({
    container:{
        padding: PADDING_LARGE
    },
    hiddenContainer:{
        padding: PADDING_LARGE,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "grey",
    },
    titleContainer:{

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stickyHeader:{
        backgroundColor: themestyles.delftBlue.color,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: PADDING_REGULAR,
    },
    location:{
        fontWeight: 'bold',
    },
    stickyHeaderContentColor:{
        color: 'white'
    },
    filterInputContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
    ,pickerStyle:{
        backgroundColor: "white",
    },
    pickerContainer:{
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
        borderColor: "grey",
    },
    pickerItem:{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    inputContainer:{
        width: '50%',
        padding: PADDING_REGULAR,
    }
})

export default FlightListScreen;

