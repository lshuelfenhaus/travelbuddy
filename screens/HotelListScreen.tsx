import React, {useEffect, useState} from 'react';
import * as Hotel from "../components/hotels/hotelinteraction";
import HotelList from '../components/hotels/hotellist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'; 
import {StyleSheet, View } from 'react-native';
import { Button, HStack, IconButton, Text, TextInput, VStack } from '@react-native-material/core';
import themestyles from '../Colors';
import { ICON_SIZE_S, L_SPACE, PADDING_LARGE, PADDING_REGULAR } from '../StyleConstants';
import { Picker } from '@react-native-picker/picker';
export interface HotelListSCreenProps{
    navigation: any,
    route: any,
}
const sortItems = [
    {   
        name: 'price',
        type: 'number',
        path: 'price.lead.amount'
    }
    , 
    {   
        name: 'rating',
        path: 'reviews.score',
        type: 'number'
    },
    {   
        name: 'name',
        path: 'name',
        type: 'string'
    }
]
const HotelListScreen = (props: HotelListSCreenProps) => {
    const [hotels, setHotels] = useState<Array<any>>([]);  
    const [orignalHotels, setOrignalHotels] = useState<Array<any>>([]);
    const [sorter, setSorter] = useState<any>({property: "", type: "string", desc: true, path: ''});
    const [filter, setFilter] = useState<any>({
        minPrice: "0",
        maxPrice: "0",
        rating: "10",
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
        let filteredHotels = [...orignalHotels];
        if(filter.rating){
            filteredHotels = filteredHotels.filter((item) => {
                return item.reviews.score >= filter.rating;
            })
        }
        if(filter.minPrice){
            filteredHotels = filteredHotels.filter((item) => {
                return item.price.lead.amount >= filter.minPrice;
            })
        }
        if(filter.maxPrice){
            filteredHotels = filteredHotels.filter((item) => {
                return item.price.lead.amount <= filter.maxPrice;
            })
        }
        return filteredHotels;
    }

    async function setDates  (checkIn: Date, checkOut: Date) {
        await AsyncStorage.setItem("@check_in_hotel", checkIn.toISOString());
        await AsyncStorage.setItem("@check_out_hotel", checkOut.toISOString());
    }
    async function setAdults (n: number) {
        await AsyncStorage.setItem("@adults_hotel", processParamsFromNavigation("adults",1))
    }
    async function setItineraryId (id: string) {
        await AsyncStorage.setItem("@itinerary_id", id);
    }
    const back = () =>{
        if(props.navigation.canGoBack()){
            props.navigation.goBack();
        }else{
            props.navigation.navigate("HotelSearch");
        }
    }
    const sortHotel = async () => {
        let sortee = [...hotels];
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
        applyFilter().then((filteredHotels)=>{
            setHotels(filteredHotels);
            setFilterContainerVisible(false);
        })
    }
    useEffect(()=>{
        setItineraryId(processParamsFromNavigation("itinerary_id",""));
        setDates(processParamsFromNavigation("startDate",new Date()),processParamsFromNavigation("endDate",new Date()));
        setAdults(processParamsFromNavigation("adults",1));
        //TODO: implement loading screen here, load the images from the data
       Hotel.getLocationBaseOnType(processParamsFromNavigation("location",""),'city').then((geoID:any)=>{
        Hotel.getHotels(
            geoID,
            processParamsFromNavigation("startDate",new Date()),
            processParamsFromNavigation("endDate",new Date()),
            processParamsFromNavigation("adults",1)
            ).then(hotelItems => {
                //hotel items from JSON file

                setHotels(hotelItems);
                setOrignalHotels(hotelItems);
            }) 
        });  
    },[])
    useEffect(()=>{
        if(sorter.property !== ""){
            sortHotel().then((sortedHotels)=>{
                setHotels(sortedHotels);
            })
        }
    },[sorter]);
    return (
        //Filter components
        <>
            {/* Sticky Header */}
            <HStack style={styles.stickyHeader}>
                    <IconButton style={null} onPress={back} icon={props => <AntDesign name="back" size = {ICON_SIZE_S} color={'white'} />} />
                    <View style={styles.titleContainer}>
                            <Text variant='h4' style={[styles.stickyHeaderContentColor]}>Hotels at </Text>
                            <Text variant='h4' style={[styles.location,styles.stickyHeaderContentColor]}>{processParamsFromNavigation("location","")}</Text>
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
                        <VStack style={styles.inputContainer}>
                            <Text>Rating</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    mode="dropdown"
                                    selectedValue={filter.rating}
                                    style={styles.pickerStyle}
                                    itemStyle={styles.pickerItem}
                                    onValueChange={(itemValue:any, itemIndex:number) =>
                                        handleFilterChange("rating",itemValue)
                                    }>
                                        <Picker.Item style={styles.pickerItem} label="5" value="10" />
                                        <Picker.Item style={styles.pickerItem} label="4" value="8" />
                                        <Picker.Item style={styles.pickerItem} label="3" value="6" />
                                        <Picker.Item style={styles.pickerItem} label="2" value="4" />
                                        <Picker.Item style={styles.pickerItem} label="1" value="2" />
                                </Picker>
                            </View>

                        </VStack>
                    </VStack>
                    <Button title="Apply Filter" onPress={handleApplyFilter} color={themestyles.delftBlue.color} />
                </VStack>
            }
            
            
            {/* Hotel List */}
            <VStack style={styles.container}>
                <HotelList navigation={props.navigation} items={hotels} location={params["location"]}/>
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
export default HotelListScreen;