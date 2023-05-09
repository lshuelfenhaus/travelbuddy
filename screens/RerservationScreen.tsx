import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import * as STYLE_CONSTANTS from '../StyleConstants';
import themestyles from '../Colors';
import { Button, HStack, TextInput, VStack } from '@react-native-material/core';
interface ReservationScreenProps{

}
//create component ReservationScreen
const ReservationScreen = (props: ReservationScreenProps) => {
    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [packet, setPacket] = useState<any>(null);
    return (
        //Genreate form react-native components for user to enter reservation information
        <VStack spacing={STYLE_CONSTANTS.ELEMENT_SPACING} style={styles.container}>
            <Text style={styles.title}>Reservation</Text>

            <TextInput 
            color={themestyles.charcoal400.color} 
            variant='outlined' label="Name"  
            inputStyle={styles.input} 
            onChangeText={text => setName(text)} value={name} />

            <TextInput 
            color={themestyles.charcoal400.color} 
            variant='outlined' label="Card Number" 
            inputStyle={styles.input} 
            onChangeText={text => setCardNumber(text)} value={cardNumber} />

            <HStack style={styles.subInputGroup} spacing={STYLE_CONSTANTS.ELEMENT_SPACING}>
                <TextInput 
                color={themestyles.charcoal400.color} 
                style={styles.subInput} 
                variant='outlined' 
                label="Expiration Date"  
                inputStyle={styles.input}
                onChangeText={text => setExpirationDate(text)} value={expirationDate} />

                <TextInput 
                color={themestyles.charcoal400.color} 
                style={styles.subInput} variant='outlined' 
                label="CVV"  
                inputStyle={styles.input} 
                onChangeText={text => setCVV(text)} value={cvv} />

                <TextInput 
                color={themestyles.charcoal400.color} 
                style={styles.subInput} variant='outlined' 
                label="Zip Code" 
                inputStyle={styles.input} 
                onChangeText={text => setZipCode(text)} value={zipCode} />
            </HStack>
            <HStack spacing={STYLE_CONSTANTS.ELEMENT_SPACING}>
                <Button titleStyle={styles.buttonTitle} style={[styles.button,styles.cancelButton]} title="Cancel" onPress={()=>{}}/>
                <Button titleStyle={styles.buttonTitle} style={[styles.button,styles.submitButton]}title="Submit" onPress={() => {}} />
            </HStack>
           
        </VStack>
    )
}

const styles = StyleSheet.create({
    label:{
        fontSize: STYLE_CONSTANTS.TEXT_REGULAR,
    },
    title:{
        fontSize: STYLE_CONSTANTS.TEXT_XLARGE,
    },
    input:{
        fontSize: STYLE_CONSTANTS.TEXT_LARGE,
        color: themestyles.delftBlue.color,
    },
    container: {
        padding: STYLE_CONSTANTS.PADDING_XLARGE,
    },
    subInputGroup:{
        width: '100%',
    },
    subInput:{
        flex: 1,
        borderColor: themestyles.delftBlue.color,
    },
    button:{
        padding: STYLE_CONSTANTS.PADDING_REGULAR
    },
    buttonTitle:{
        fontSize: STYLE_CONSTANTS.TEXT_REGULAR,
    },
    cancelButton:{
        backgroundColor: STYLE_CONSTANTS.CLOSE_BUTTON_COLOR,
        flex: 1,
    },
    submitButton:{
        backgroundColor: themestyles.delftBlue.color,
        flex: 1,
    },
})

export default ReservationScreen;