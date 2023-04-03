import { Flex, HStack, Pressable, VStack } from '@react-native-material/core';
import React, { useState } from 'react';
import { Image } from 'react-native-elements';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
interface UnitsProps{
    units: Array<any>
}

const Units = (props:UnitsProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [curUnit, setCurUnit] = useState<any>();
    const [curPlan, setCurPlan] = useState<any>();
    const viewUnit = (event:any,unit:any) => {
        setModalVisible(true);
        setCurUnit(unit);
    }
    const setCurrentPlan = (event:any, curP: any) => {
        setCurPlan(curP);
    }
    return(
        <>
      <Modal animationIn="fadeIn" animationOut="fadeOut" isVisible={modalVisible}>
            <View style={{borderRadius: 16,overflow: 'hidden'}}>
            <ScrollView style={styles.screenBody}>
                {curUnit && 
                <>
                    <ScrollView style={styles.imageContainer} horizontal={true}>
                        {curUnit.unitGallery.gallery.map((img:any,index:number)=> {
                            return(
                                    <Image style={styles.propImage} key={img.image.url} source={{uri: img.image.url}}/>
                            )
                        })}   
                    </ScrollView>
                    <Text>{curUnit.header.text}</Text>
                    {/* Rate Plan */}
                    <VStack>
                        {curUnit.ratePlans &&
                        curUnit.ratePlans.map((plan:any,index:number)=>{
                            return(
                                plan.priceDetails.map( (detail:any, index: number) => {
                                    return(
                                        <Pressable onPress={event=>setCurrentPlan(event,detail)}>
                                            <HStack style={curPlan == detail ? styles.curPlan : styles.planDetail}>
                                                <Text>{detail.price.lead.amount}</Text>
                                                <VStack>
                                                    <Text>{detail.depositPolicies}</Text>
                                                    <Text>{detail.paymentModel}</Text>
                                                </VStack>
                                            </HStack>
                                        </Pressable>
                                    )
                                })
                            )
                        })
                        }

                    </VStack>

                    <VStack spacing={ELEMENT_SPACING}>
                        <Text>Room Amenities</Text>
                        {curUnit.roomAmenities.bodySubSections[0].contents &&
                        curUnit.roomAmenities.bodySubSections[0].contents.map((content:any, index:number) => {
                            return(
                                <VStack>
                                    <Text style={styles.amenityTitle}>{content.header.text}</Text>
                                    {content.items && content.items.map((item:any, index:number)=>{
                                        let amenities = item.content.text.replace(/<ul>|<li>|<\/ul>|<\/li>/gi, " ").trim().split("  ");
                                        return(
                                            amenities.map((item:any,index:number)=>
                                                <Text>{item.trim()}</Text>
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
            <Flex  direction='row' >
               <Pressable onPress={(event)=>{
                setModalVisible(false);
               }} style={styles.modalButton}>
                    <Text style={styles.buttonText}>Close</Text>
               </Pressable>
               <Pressable style={styles.modalButton}>
                <HStack>                    
                    <Text style={styles.buttonText}>Reserve with current Plan</Text>
                    <Text style={styles.buttonTextPrice}>$ {curPlan.price.lead.amount}</Text>
                </HStack>

               </Pressable>
            </Flex>
            </View>
        </Modal>

        <ScrollView horizontal={true}>
        { props.units && props.units.map((unit,index)=>(
            <Pressable key={index} onPress={event=>viewUnit(event,unit)}>
                <VStack key = {index} style={styles.unitSmallBox} spacing={ELEMENT_SPACING}>
                    <Image style={styles.unitThumbnail} source={{uri:unit.unitGallery.gallery[0].image.url }}/>
                    <Text>{unit.header.text}</Text>
                    {unit.ratePlans[0] ? <Text>{ unit.ratePlans[0].priceDetails[0].price.lead.amount}</Text>
                    :<Text>{"Not Available"}</Text>}
                </VStack>
            </Pressable>
            )
        )}
        </ScrollView>
        
        </>
    )
}
const BORDER_RADIUS = 8;
const MARGIN = 8;
const SPACE = 40;
const ELEMENT_SPACING = 16;
const styles = StyleSheet.create({
    unitThumbnail:{
        width: 200,
        height: 100
    },
    unitSmallBox:{
        marginRight: ELEMENT_SPACING
    },
    imageContainer:{
        width: "100%"
    },
    propImage: {
        width: 400,
        height: 200,
        borderRadius: BORDER_RADIUS,
        marginRight: SPACE
    },
    screenBody:{
        padding: ELEMENT_SPACING,
        backgroundColor: 'white',
    },
    amenityTitle:{
        fontWeight: 'bold'
    },
    planDetail:{

    },
    curPlan:{
        backgroundColor: 'grey'
    },
    modalButton:{
        backgroundColor: 'blue',
        padding: ELEMENT_SPACING,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    buttonText:{
        fontSize: 20,
        color: 'white'
    },
    buttonTextPrice:{
        fontWeight: 'bold',
        color: 'white'
    }
})

export default Units;