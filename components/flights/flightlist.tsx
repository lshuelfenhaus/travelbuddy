import React, { useEffect } from 'react';
import { VStack,IconButton } from '@react-native-material/core';
import ItemCard from './../itemcard';
import {ScrollView,FlatList, StyleSheet, Text, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import themestyles from '../../Colors';

interface FlightListProps {
    navigation?: any,
    items?: Array<any>,
    destlocation?: string,
}
const items = [{id:'1',name:"airline name 1", price: 800, reviews: 10},{id:'2', price: 200,name:"airline name 2", reviews: 9},{id:'3', price: 50, name:"airline name 3", reviews: 4.5}]
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
            
                {props.items && props.items.map((item,index) => {
                    return (
                        <ItemCard 
                        navigation = {props.navigation}
                        type={"flight"} 
                        key={index} 
                        title={item.flight_name} 
                        price={item.totals.total} 
                        tags={[{label: item.duration.text, postLabel: "Duration of Flight"}]} 
                        imageSrc={"image"} 
                        reviews={0} 
                        id={item.id}/>
                    )
                    }) 
                }
            </VStack>
        </ScrollView>

    )
}
const OUR_PURPLE = "#6200EE";
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
        color: OUR_PURPLE,
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