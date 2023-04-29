import {HStack,VStack} from 'react-native-flex-layout';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native-elements';
import { Text, Button } from '@react-native-material/core';
import { Alert, ScrollView, StyleSheet, View} from 'react-native';
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
     
            <ScrollView contentContainerStyle={styles.screenBody}>
                {curUnit &&
                <VStack spacing={STYLE_CONSTANTS.L_SPACE}>
                    <ScrollView style={styles.imageContainer} horizontal={true}>
                        {curUnit.unitGallery.gallery.map((img:any,index:number)=> {
                            return(
                                    <Image style={styles.propImage} key={img.image.url} source={{uri: img.image.url}}/>
                            )
                        })}   
                    </ScrollView>
                    <Text variant="h3" style={[styles.textMainTitle]}>{curUnit.header.text}</Text>
                    {/* Rate Plan */}
                    <VStack>
                        <Text variant="h4" style={[styles.title]}>Current Offer</Text>
                        {curPlan &&
                            <HStack style={[styles.planDetail]} spacing={STYLE_CONSTANTS.L_SPACE}>
                                <Text style={[styles.textRegular, styles.planPrice]}>$ {Math.round(curPlan.price.lead.amount)}</Text>
                                <HStack spacing={STYLE_CONSTANTS.L_SPACE} style={[styles.planInfo]}>
                                    <Text style={[styles.textRegular,  {color: 'white'}]}>{curPlan.depositPolicies}</Text>
                                    <Text style={[styles.textRegular,  {color: 'white'}]}>{curPlan.paymentModel.replace("_", " ")}</Text>
                                </HStack>
                            </HStack>
                        }

                    </VStack>

                    <VStack spacing={STYLE_CONSTANTS.ELEMENT_SPACING}>
                        <Text variant='h4' style={[ styles.title]}>Room Amenities</Text>
                        {curUnit.roomAmenities.bodySubSections[0].contents &&
                        curUnit.roomAmenities.bodySubSections[0].contents.map((content:any, index:number) => {
                            return(
                                <VStack key={index}>
                                    <Text variant='h5' style={[styles.title]}>{content.header.text}</Text>
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
                </VStack>
                }
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Button contentContainerStyle={styles.button} titleStyle={styles.buttonText}   title="Back"/>
                <Button contentContainerStyle={styles.button} titleStyle={styles.buttonText}  title="Remove offer"/>
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
    title:{
        color: themeStyles.charcoal.color,   
    },
    planDetail:{
        padding: STYLE_CONSTANTS.PADDING_REGULAR,
        borderRadius: STYLE_CONSTANTS.BORDER_RADIUS,
        marginBottom: STYLE_CONSTANTS.MARGIN,
        alignItems: 'center',
        minWidth: 200,
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
    textRegular:{
        fontSize: STYLE_CONSTANTS.TEXT_REGULAR
    },
    textSubTitle:{
        fontSize: STYLE_CONSTANTS.TEXT_LARGE
    },
    textMainTitle:{
        color: themeStyles.charcoal.color,
    },
    planPrice:{
        maxWidth: 250,
        fontWeight: 'bold',
        backgroundColor: "gold",
        padding: STYLE_CONSTANTS.PADDING_REGULAR,
        borderRadius: STYLE_CONSTANTS.BORDER_RADIUS,
        borderColor: 'black'
    },
    reserveButton:{
        flex: 1
    },
    planInfo:{
        backgroundColor: themeStyles.delftBlue.color,
        padding: STYLE_CONSTANTS.PADDING_REGULAR,
        borderRadius: STYLE_CONSTANTS.BORDER_RADIUS,
    },
    buttonContainer:{
        flexDirection: 'row',
    },
    buttonText:{
        fontSize: STYLE_CONSTANTS.TEXT_XLARGE,
        color: 'white',
    },
    button:{
        padding: STYLE_CONSTANTS.PADDING_REGULAR,
    }
})

export default HotelOfferDetailScreen;