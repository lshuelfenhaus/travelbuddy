import { Flex, HStack, Pressable, VStack } from '@react-native-material/core';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native-elements';
import { Alert, Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import themeStyles from './../Colors'
import Modal from 'react-native-modal';
import * as STYLE_CONSTANTS  from './../StyleConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateItinerary } from '../components/firestoredbinteractions';
interface HotelOfferDetailScreenProps{
    navigation: any,
    route: any,
}

const HotelOfferDetailScreen = (props:HotelOfferDetailScreenProps) => {
    const [curUnit, setCurUnit] = useState<any>();
    const [curPlan, setCurPlan] = useState<any>();
    const setCurrentPlan = (event:any, curP: any) => {
        setCurPlan(curP);
    }
    useEffect(() => {
        setCurUnit(props.route.params["unit"]);
        setCurPlan(props.route.params["plan"]);
    }, []);
    return(
        <>
     
            <View style={{borderRadius: STYLE_CONSTANTS.BORDER_RADIUS, overflow:"hidden"}}>
            <ScrollView contentContainerStyle={styles.screenBody}>
                {curUnit &&
                <>
                    <ScrollView style={styles.imageContainer} horizontal={true}>
                        {curUnit.unitGallery.gallery.map((img:any,index:number)=> {
                            return(
                                    <Image style={styles.propImage} key={img.image.url} source={{uri: img.image.url}}/>
                            )
                        })}   
                    </ScrollView>
                    <Text style={[styles.textMainTitle]}>{curUnit.header.text}</Text>
                    {/* Rate Plan */}
                    <VStack>
                        <Text style={[styles.textSubTitle]}>Offers</Text>
                        {curUnit.ratePlans &&
                        curUnit.ratePlans.map((plan:any,index:number)=>{
                            return(
                                plan.priceDetails.map( (detail:any, index: number) => {
                                    return(
                                        <Pressable onPress={event=>setCurrentPlan(event,detail)}>
                                            <HStack style={[styles.planDetail, curPlan == detail ? styles.curPlan : {}]}>
                                                <Text style={[styles.textRegular,styles.planPrice, curPlan == detail ? {color: 'white'}: {}]}>$ {Math.round(detail.price.lead.amount)}</Text>
                                                <VStack>
                                                    <Text style={[styles.textRegular, curPlan == detail ? {color: 'white'}: {}]}>{detail.depositPolicies}</Text>
                                                    <Text style={[styles.textRegular, curPlan == detail ? {color: 'white'}: {}]}>{detail.paymentModel}</Text>
                                                </VStack>
                                            </HStack>
                                        </Pressable>
                                    )
                                })
                            )
                        })
                        }

                    </VStack>

                    <VStack spacing={STYLE_CONSTANTS.ELEMENT_SPACING}>
                        <Text style={[styles.textSubTitle]}>Room Amenities</Text>
                        {curUnit.roomAmenities.bodySubSections[0].contents &&
                        curUnit.roomAmenities.bodySubSections[0].contents.map((content:any, index:number) => {
                            return(
                                <VStack key={index}>
                                    <Text style={[styles.amenityTitle,styles.textSubTitle]}>{content.header.text}</Text>
                                    {content.items && content.items.map((item:any, index:number)=>{
                                        let amenities = item.content.text.replace(/<ul>|<li>|<\/ul>|<\/li>/gi, " ").trim().split("  ");
                                        return(
                                            amenities.map((item:any,index:number)=>
                                                item !== "" ? <Text style={[styles.textRegular]}>{item.trim()}</Text> : null
                                            )
                                        )
                                    })}
                                </VStack>
                            )
                        })
                        }
                    </VStack>
                </>
                }
            </ScrollView>
            {curPlan && <Flex  direction='row' >
               <Pressable onPress={null} style={[styles.modalButton,styles.reserveButton]}>
                    <HStack>                    
                        <Text style={[styles.buttonText,styles.textSubTitle]}>Save Offer</Text>
                        <Text style={[styles.buttonTextPrice,styles.textSubTitle]}>$ {Math.round(curPlan.price.lead.amount)}</Text>
                    </HStack>

               </Pressable>
            </Flex>}
            </View>
        
        </>
    )
}

const styles = StyleSheet.create({
    unitThumbnail:{
        width: 200,
        height: 100
    },
    unitSmallBox:{
        marginRight: STYLE_CONSTANTS.ELEMENT_SPACING
    },
    imageContainer:{
        width: "100%"
    },
    propImage: {
        width: 400,
        height: 200,
        borderRadius: STYLE_CONSTANTS.BORDER_RADIUS,
        marginRight: STYLE_CONSTANTS.SPACE
    },
    screenBody:{
        padding: STYLE_CONSTANTS.ELEMENT_SPACING,
        backgroundColor: 'white',
    },
    amenityTitle:{
        fontWeight: 'bold'
    },
    planDetail:{
        padding: STYLE_CONSTANTS.PADDING_REGULAR,
        borderWidth: 1,
        borderRadius: STYLE_CONSTANTS.BORDER_RADIUS,
        marginBottom: STYLE_CONSTANTS.MARGIN,
        borderColor: 'grey',
        alignItems: 'center',
        minWidth: 200
    },
    curPlan:{
        backgroundColor: themeStyles.charcoal400.color,
        color: 'white'
    },
    modalButton:{
        backgroundColor: themeStyles.delftBlue.color,
        padding: STYLE_CONSTANTS.ELEMENT_SPACING,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    closeButton:{
        backgroundColor: STYLE_CONSTANTS.CLOSE_BUTTON_COLOR,
        color: 'white',
        paddingHorizontal: STYLE_CONSTANTS.PADDING_XLARGE * 2
    },
    buttonText:{
        fontSize: 20,
        color: 'white'
    },
    buttonTextPrice:{
        fontWeight: 'bold',
        color: 'white',
        marginLeft: STYLE_CONSTANTS.MARGIN
    },
    textRegular:{
        fontSize: STYLE_CONSTANTS.TEXT_REGULAR
    },
    textSubTitle:{
        fontSize: STYLE_CONSTANTS.TEXT_LARGE
    },
    textMainTitle:{
        fontSize: STYLE_CONSTANTS.TEXT_XLARGE
    },
    planPrice:{
        maxWidth: 250,
        marginRight: STYLE_CONSTANTS.MARGIN,
        fontWeight: 'bold',
    },
    reserveButton:{
        flex: 1
    }
})

export default HotelOfferDetailScreen;