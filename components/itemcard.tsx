import React, { useEffect } from 'react';
import { VStack, HStack, Badge, Button } from '@react-native-material/core';
import { Text, View, StyleSheet, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'; 
import StarRatings from './starratings';
interface ItemCardProps {
    navigation?: any,
    title?: string,
    price?: number,
    address?: string,
    id?: string,
    reviews?: number,
    imageSrc?: string,
    tags?: Array<any>
}
const ItemCard = (props: ItemCardProps) => {
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
                <MaterialIcons name="location-pin" size={30} color={OUR_PURPLE} />
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
                        return <Badge labelStyle={styles.label} key={index} label={ (item.label == null ? 0 : item.label) + " " + (item.postLabel ? item.postLabel : "")}/>
                    }) }
                </HStack>
            }
            <Button style={styles.button} title="View Detail"/>
        </VStack>
    )
}
const OUR_PURPLE = "#6200EE";
const L_SPACE = 16;
const S_SPACE = 4;
const M_SPACE = 8;
const BORDER_RADIUS = 10;
const BORDER_WIDTH = 2;
const styles = StyleSheet.create({
    container:{
        borderRadius: BORDER_RADIUS,
        padding: L_SPACE,
        borderWidth: BORDER_WIDTH,
        borderColor: OUR_PURPLE,
        marginBottom: L_SPACE*2
    },
    button:{
        borderRadius : BORDER_RADIUS,
    },
    title:{
        fontWeight:"bold",
        fontSize: 16
    },
    price:{
        color: OUR_PURPLE,
        fontWeight: "bold",
        fontSize: 16
    },
    address:{
        color: "gray",
        fontSize: 16
    },
    image:{
        width: "100%",
        height: 150,
        borderRadius: BORDER_RADIUS
    },
    stars:{
        marginBottom: L_SPACE
    },
})

export default ItemCard;