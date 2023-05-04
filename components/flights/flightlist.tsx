import React, { useEffect } from 'react';
import { VStack,IconButton } from '@react-native-material/core';
import FlightItemCard from './flightitemcard';
import {ScrollView,FlatList, StyleSheet, Text, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import themestyles from '../../Colors';
import { LoadingComponent } from '../loadingspinner';

interface FlightListProps {
    navigation?: any,
    items?: Array<any>,
    destlocation?: string,
}
const FlightList = (props: FlightListProps) => {
    
    const back = () =>{
        props.navigation.navigate("FlightSearch");

        
    }
    return (
        <ScrollView>
                   
            <VStack spacing={16} style={styles.container}>
                
                <IconButton style={styles.floatButton} onPress={back} icon={props => <AntDesign name="back" size = {40} color={themestyles.delftBlue.color} />} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Flights going to </Text>
                    <Text style={styles.location}>{props.destlocation}</Text>
                </View>
                <LoadingComponent/>
                {props.items && props.items.map((item,index) => {
                    let round = item.totals.total.toFixed(2);
                    return (
                        <FlightItemCard 
                        navigation = {props.navigation}
                        type={"flight"} 
                        key={index} 
                        title={item.flight_name}
                        orig_airport={item.departureAirport.label} 
                        dest_airport={item.arrivalAirport.label}
                        stops={item.stops}
                        price={round}
                        duration = {item.duration.text} 
                        carryon = {item.baggage.cabin.qty}
                        tags={[{preLabel: "Duration: ", label: item.duration.text}]} 
                        id={item.id}/>
                    )
                    }) 
                }
            </VStack>
        </ScrollView>

    )
}
const styles = StyleSheet.create({
    container:{
        padding: 16
    },
    title:{
        fontSize: 28,
    },
    titleContainer:{

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    location:{
        fontWeight: 'bold',
        color: themestyles.delftBlue.color,
        fontSize: 28
    },
    floatButton:{
        position: 'absolute',
        left: 8,
        top: 8,
        zIndex: 5000
    }
})
export default FlightList;

/* Need: departureAirport:label, arrivalAirport:label, totals:total, duration:text
Create table within Firebase
Upload logo images and match it with flight name
*/