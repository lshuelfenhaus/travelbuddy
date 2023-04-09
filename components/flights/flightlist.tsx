import React, { useEffect } from 'react';
import { VStack,IconButton } from '@react-native-material/core';
import ItemCard from './../itemcard';
import {ScrollView,FlatList, StyleSheet, Text, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
interface FlightListProps {
    navigation?: any,
    items?: Array<any>,
    location?: string,
}
const items = [{id:'1',name:"airline name 1", price: 800, reviews: 10},{id:'2', price: 200,name:"airline name 2", reviews: 9},{id:'2', price: 50, name:"airline name 3", reviews: 4.5}]
const FlightList = (props: FlightListProps) => {
    const back = () =>{
        props.navigation.navigate("HotelSearch");
    }
    return (
        <ScrollView>        
            <VStack spacing={16} style={styles.container}>
                <IconButton style={styles.floatButton} onPress={back} icon={props => <AntDesign name="back" size = {40} color={OUR_PURPLE} />} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Flights going to </Text>
                    <Text style={styles.location}>{props.location}</Text>
                </View>
            
                {props.items && props.items.map((item,index) => {
                    return (
                        <ItemCard key={index} title={item.name} price={item.price.lead.amount} tags={[{label: item.availability.minSeatsLeft, postLabel: "Seats Left"}]} imageSrc={item.propertyImage.image.url} reviews={item.reviews.score} id={item.id}/>
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