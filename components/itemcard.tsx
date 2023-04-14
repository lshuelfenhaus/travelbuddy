import React, { useEffect } from 'react';
import { VStack, HStack, Badge, Button } from '@react-native-material/core';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'; 
import StarRatings from './starratings';
import themestyles from '../Colors';
import { BADGE_COLOR, BADGE_MIN_WIDTH, BADGE_TEXT_COLOR, BORDER_COLOR, BORDER_RADIUS, BORDER_WIDTH, BUTTON_COLOR, HIGHLIGHT_COLOR, ICON_COLOR, L_SPACE, MARGIN, M_SPACE, PADDING_REGULAR, S_SPACE, TEXT_LARGE, TEXT_REGULAR, TEXT_SMALL } from '../StyleConstants';
interface ItemCardProps {
    navigation?: any,
    title?: string,
    price?: number,
    address?: string,
    id?: string,
    reviews?: number,
    imageSrc?: string,
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
    const goToDetail = (id: any) => {
        if(!id){
            //Display error message
        } else {
            props.navigation.navigate(get_detail_navigation(props.type),{
                id: id,
            })
        }
    }
    return (
        <VStack style={styles.container} key={props.id} spacing={L_SPACE}>
            <HStack spacing={M_SPACE}>
                <Image style={styles.image} source={props.imageSrc? {uri: props.imageSrc}  : require("./../assets/hotelimages/hotel1.jpg")}/>
            </HStack>
            <Text style={styles.title}>{props.title}</Text>
            <StarRatings style={styles.stars} score={props.reviews?props.reviews:5} scale={10}/>
            <Text style={styles.price}>$ {props.price}</Text>
              {/**Address section */}
            {props.address && <HStack>
                <MaterialIcons name="location-pin" size={30} color={ICON_COLOR} />
                <VStack spacing={S_SPACE}>
                    <Text style={styles.address}>Address line 1</Text>
                    <Text style={styles.address}>Address line 2</Text>
                    <Text style={styles.address}>Address line 3</Text>
                </VStack>
            </HStack>}
            {/*Item tags*/}
            {
                props.tags && <HStack>
                    {props.tags.map((item,index)=>{
                        return <Text style={styles.badge} key={index}> {(item.label == null ? 0 : item.label) + " " + (item.postLabel ? item.postLabel : "")}</Text>
                    }) }
                </HStack>
            }
            <Button style={styles.button} title="View Detail" onPress={event => goToDetail(props.id)}/>
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
        height: height * 0.25,
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