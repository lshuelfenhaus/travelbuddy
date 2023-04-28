import { Button, Flex, TextInput, VStack } from "@react-native-material/core";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import { BUTTON_COLOR, ELEMENT_SPACING, FORM_BUTTON_ICON_COLOR, MARGIN, PADDING_XLARGE, TEXT_LARGE, TEXT_REGULAR, TEXT_XLARGE } from "../StyleConstants";
import { Entypo } from '@expo/vector-icons'; 
import CalendarPicker from 'react-native-calendar-picker';
import themestyles from "../Colors";
import { ScrollView } from "react-native-gesture-handler";
import { BottomNavigation } from "../components/bottomnavigation";
import { addInitialItinerary, getItinerary, updateItinerary} from "../components/firestoredbinteractions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Timestamp } from "firebase/firestore";
import { getLocationId, getPlaceDetails } from "../components/placesinteractions";
interface ItineraryCreationScreenProps {
    navigation: any;
    route: any;
}

const ItineraryCreationScreen = (props: ItineraryCreationScreenProps) => {
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date((new Date()).getTime() + 86400000));
    const [destination, setDestination] = useState('');
    const [adults, setAdults] = useState("1");
    const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
    const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);
    const [id, setId] = useState("");
    const mode = props.route.params ? props.route.params["mode"] : "create";
    const onStartDateChange = (date:any) => {
        setShowStartDateCalendar(false);
        setStartDate(new Date(date));
    }
    const onEndDateChange = (date:any) => {
        setShowEndDateCalendar(false);
        setEndDate(new Date(date));
    }
    const handleSubmit = async () => {
      const placeid = await getLocationId(destination);
      if(placeid !== null){
        await AsyncStorage.setItem("@dirty", "true");

        if(mode !== "edit"){
        //check if the destination is valid
          const newId = await addInitialItinerary(
            destination, 
            adults,
            startDate,
            endDate,
            name,
            placeid,
          )
          if (newId !== null){
            props.navigation.navigate("ItineraryDetail",{id: newId});
          }
        } else {
          const status = await updateItinerary(id,{
            destination: destination,
            adults: adults,
            startDate: startDate,
            endDate: endDate,
            name: name,
            placeid: placeid,
          })
          if(status){
            props.navigation.navigate("ItineraryDetail",{id: id});
          }
        } 
        
        /* await AsyncStorage.setItem('@username','anhquang2605');//FOR PRODCUTION ONLY, NEED TO REMOVE
        */
       
      }else{
        Alert.alert("Invalid Destination, Please try again with differnt destination");
      }
    };
    useEffect(()=>{
      if(id === "" && mode === "edit"){
        setId(props.route.params ? props.route.params["id"] : "");
      }
    },[]);
    useEffect(()=>{
      if(mode === "edit" && id !== ""){
        getItinerary(id).then((itinerary) => {
          if(itinerary){
            setName(itinerary.name);
            setDestination(itinerary.destination);
            setAdults(itinerary.adults);
            setStartDate(itinerary.startDate.toDate());
            setEndDate(itinerary.endDate.toDate());
          }
        })
      }
    },[id])
    return (
      
      <>
        <ScrollView style={styles.container}>
          <VStack spacing={ELEMENT_SPACING}>
            <Text style={styles.formTitle}>Itinerary Creation</Text>
              <TextInput
                  label="Name"
                  value={name}
                  variant="outlined"
                  onChangeText={setName}
                  style={styles.input}
              />
              <TextInput
                  label="Destination"
                  variant="outlined"
                  value={destination}
                  onChangeText={setDestination}
                  style={styles.input}
              />
              <TextInput
                  label="Adults Number"
                  variant="outlined"
                  value={adults}
                  onChangeText={setAdults}
                  keyboardType="numeric"
                  style={styles.input}
              />
                {/*Create input fields for max price, min price */}
                <Button 
                      variant="outlined" 
                      leading={props => <Entypo name="calendar" size={24} color={FORM_BUTTON_ICON_COLOR} />} 
                      title={"Start Date " + startDate.toISOString().substring(0,10) } onPress={event => {setShowStartDateCalendar(state => !state)}}
                      color={BUTTON_COLOR}    
                  />
                  {showStartDateCalendar && 
                  <CalendarPicker 
                    selectedStartDate={startDate} 
                    selectedDayColor={themestyles.delftBlue.color}
                    selectedDayTextColor={"white"} 
                    onDateChange={(date) => onStartDateChange(date)}></CalendarPicker>}

                  <Button 
                      variant="outlined" 
                      leading={props => <Entypo name="calendar" size={24} color={FORM_BUTTON_ICON_COLOR} />} 
                      title={"End Date " + endDate.toISOString().substring(0,10)} onPress={event => {setShowEndDateCalendar(state => !state)}}
                      color={BUTTON_COLOR}
                  />
                  
                  {showEndDateCalendar && 
                  <CalendarPicker 
                    selectedStartDate={endDate} 
                    selectedDayColor={themestyles.delftBlue.color}
                    selectedDayTextColor={"white"} 
                    initialDate={endDate} 
                    onDateChange={(date) => onEndDateChange(date)} ></CalendarPicker>}
                  <Button title="Save and Explore" onPress={handleSubmit} style={styles.button} titleStyle={{fontSize: TEXT_REGULAR}} color={BUTTON_COLOR}/>
            </VStack>
          </ScrollView>
          <BottomNavigation navigation={props.navigation}/>
        </>
    )
}
const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
      padding: PADDING_XLARGE,
      flex: 1,
    },
    input: {
      marginBottom: 16,
    },
    button: {
      paddingHorizontal: PADDING_XLARGE,
      color: BUTTON_COLOR,
    },
    formTitle: {
      fontSize: TEXT_XLARGE,
      fontWeight: 'bold',
      color: themestyles.delftBlue.color,
      textAlign: 'center',
    }
  });

export default ItineraryCreationScreen;