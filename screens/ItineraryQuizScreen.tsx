import { Button, Divider, HStack, Spacer, Stack, VStack } from '@react-native-material/core';
import { Card, CheckBox } from '@rneui/themed';
import React from 'react';
import { SafeAreaProvider } from "react-native-safe-area-context";
import themestyles from '../Colors';

interface HomeScreenProps {
    navigation: any
}

const CreateItineraryScreen =(props: HomeScreenProps) => {
    const [checked, setChecked] = React.useState(false);
    const toggleCheckbox = () => setChecked(!checked)

    const [checked2, setChecked2] = React.useState(false);
    const toggleCheckbox2 = () => setChecked2(!checked2)

    const [checked3, setChecked3] = React.useState(false);
    const toggleCheckbox3 = () => setChecked3(!checked3)

    const [checked4, setChecked4] = React.useState(false);
    const toggleCheckbox4 = () => setChecked4(!checked4)

    const [checked5, setChecked5] = React.useState(false);
    const toggleCheckbox5 = () => setChecked5(!checked5)

    const [checked6, setChecked6] = React.useState(false);
    const toggleCheckbox6 = () => setChecked6(!checked6)

    const [checked7, setChecked7] = React.useState(false);
    const toggleCheckbox7 = () => setChecked7(!checked7)

    const goHome = async () => {
        props.navigation.navigate("Home");
    }
    const next = async () => {
        props.navigation.navigate("ItinerarySuggestion");
    }
    return(
        <SafeAreaProvider>
            <VStack style={{margin:10}} spacing={10}>
            <Card>
                <CheckBox
                title="Nightlife"
                textStyle={{fontSize:18}}
                checked={checked}
                onPress={toggleCheckbox}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="secondary"
                />
            </Card>
            <Card>
                <CheckBox
                title="Budget-Friendly"
                textStyle={{fontSize:18}}
                checked={checked2}
                onPress={toggleCheckbox2}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="secondary"
                />
            </Card>
            <Card>
                <CheckBox
                title="Bars & Restaurants"
                textStyle={{fontSize:18}}
                checked={checked3}
                onPress={toggleCheckbox3}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="secondary"
                />
            </Card>
            <Card>
                <CheckBox
                title="Outdoors & Nature"
                textStyle={{fontSize:18}}
                checked={checked4}
                onPress={toggleCheckbox4}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="secondary"
                />
            </Card>
            <Card>
                <CheckBox
                title="Museums"
                textStyle={{fontSize:18}}
                checked={checked5}
                onPress={toggleCheckbox5}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="secondary"
                />
            </Card>
            <Card>
                <CheckBox
                title="History"
                textStyle={{fontSize:18}}
                checked={checked6}
                onPress={toggleCheckbox6}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="secondary"
                />
            </Card>
            <Card>
                <CheckBox
                title="Music & Performing Arts"
                textStyle={{fontSize:18}}
                checked={checked7}
                onPress={toggleCheckbox7}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="secondary"
                />
            </Card>
            <Divider/>
            <HStack>
            <Spacer/>
            <Button color={themestyles.powderBlue.color} title="Next" onPress={next}  /> 
            <Spacer/>
            <Button color={themestyles.delftBlue.color} title="Cancel" onPress={goHome}  /> 
            <Spacer/>
           
            </HStack>
            </VStack>

        
            
            
        </SafeAreaProvider>
    )
}
export default CreateItineraryScreen;