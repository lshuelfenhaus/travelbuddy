import React, { useEffect } from 'react';
import { VStack, HStack, Badge, Button } from '@react-native-material/core';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'; 
import { BADGE_COLOR, BADGE_MIN_WIDTH, BADGE_TEXT_COLOR, BORDER_COLOR, BORDER_RADIUS, BORDER_WIDTH, BUTTON_COLOR, HIGHLIGHT_COLOR, ICON_COLOR, L_SPACE, MARGIN, M_SPACE, PADDING_REGULAR, S_SPACE, TEXT_LARGE, TEXT_REGULAR, TEXT_SMALL } from '../../StyleConstants';
interface ItemCardProps {
    navigation?: any,
    title?: string,
    price?: number,
    orig_airport?: string,
    dest_airport?: string,
    stops?: string,
    id?: string,
    imageSrc?: string,
    duration?: string,
    carryon?: number,
    tags?: Array<any>,
    type: string
}
const get_detail_navigation = (type: string) =>{
    switch(type){
        case "hotel":
            return "HotelDetail";
        case "attraction":
            return "AttractionDetail";
        case "flight":
            return "FlightDetail";
    }
} 
const ItemCard = (props: ItemCardProps) => {
    let imgDefault = require('../../assets/flightimages/airplane_icon.png');
    let imgAA = require('../../assets/flightimages/aa.png');
    let imgDelta = require('../../assets/flightimages/delta.png');
    let imgJetBlue = require('../../assets/flightimages/jetblue.png');
    let img = imgDefault;
    switch (props.title) {
        case "American Airlines":
            img = imgAA;
            break;
        case "Delta Air Lines":
            img = imgDelta;
            break;
        case "JetBlue Airways":
            img = imgJetBlue;
            break;
    }
    const goToDetail = (
        id: any, 
        title: any, 
        price: any, 
        orig_airport: any, 
        dest_airport: any,
        carryon: any, 
        duration: any,
        stops: any
        ) => {
        if(!id){
            //Display error message
        } else {
            props.navigation.navigate(get_detail_navigation(props.type),{
                id: id,
                title: title,
                price: price,
                orig_airport: orig_airport,
                dest_airport: dest_airport,
                stops: stops,
                carryon: carryon,
                duration: duration
            })
        }
    }
    return (
        <VStack style={styles.container} key={props.id} spacing={L_SPACE}>
            <HStack spacing={M_SPACE}>
                <Image style={styles.image} source={img}/>
            </HStack>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>$ {props.price}</Text>
            {/*Item tags*/}
            {
                props.tags && <HStack>
                    {props.tags.map((item,index)=>{
                        return <Text style={styles.badge} key={index}> {(item.preLabel ? item.preLabel : "") + (item.label == null ? 0 : item.label) + " " + (item.postLabel ? item.postLabel : "")}</Text>
                    }) }
                </HStack>
            }
            <Button style={styles.button} title="View Detail" onPress={event => goToDetail(
                props.id, 
                props.title, 
                props.price, 
                props.orig_airport, 
                props.dest_airport,
                props.carryon,
                props.duration,
                props.stops,
                )}/>
        </VStack>
    )
        
        
}

var {height} = Dimensions.get("window");
const styles = StyleSheet.create({
    container:{
        borderRadius: BORDER_RADIUS,
        padding: L_SPACE,
        borderWidth: BORDER_WIDTH,
        borderColor: BORDER_COLOR,
        marginBottom: L_SPACE*2
    },
    button:{
        borderRadius : BORDER_RADIUS,
        backgroundColor: BUTTON_COLOR,
    },
    title:{
        fontWeight:"bold",
        fontSize: TEXT_REGULAR
    },
    price:{
        color: HIGHLIGHT_COLOR,
        fontWeight: "bold",
        fontSize: TEXT_REGULAR
    },
    address:{
        color: "gray",
        fontSize: TEXT_REGULAR
    },
    image:{
        width: "100%",
        height: height*.25,
        resizeMode: 'contain',
        borderRadius: BORDER_RADIUS
    },
    stars:{
        marginBottom: L_SPACE
    },
    badge:{
        backgroundColor: BADGE_COLOR,
        fontSize: TEXT_SMALL,
        fontWeight: 'bold',
        paddingHorizontal: PADDING_REGULAR,
        paddingVertical: PADDING_REGULAR/2,
        borderRadius: BORDER_RADIUS * 3,
        marginRight: MARGIN,
        marginBottom: MARGIN,
        minWidth: BADGE_MIN_WIDTH,
        textAlign: 'center',
        color: BADGE_TEXT_COLOR,
    }
})

export default ItemCard;