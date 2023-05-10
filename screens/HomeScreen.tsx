import {VStack, Text } from "@react-native-material/core";
import { BottomNavigation } from "../components/bottomnavigation";
import { Card } from "@rneui/base";
import themestyles from "../Colors";
import { Fontisto, MaterialIcons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Dimensions, Pressable, ScrollView, StyleSheet } from "react-native";
import { PADDING_XLARGE } from "../StyleConstants";

interface HomeScreenProps {
    navigation: any
}

const HomeScreen = (props: HomeScreenProps) => { 
  const hotelSearch=()=>{
    props.navigation.navigate("HotelSearch");
  }

  const flightSearch=()=>{
    props.navigation.navigate("FlightSearch");
  }
  const itinerySearch = () => {
    props.navigation.navigate("ItinerarySearch")
  }
  return(
        <VStack
        style={{backgroundColor: themestyles.eggshell.color, flex:1}}
        >   
        <ScrollView contentContainerStyle={{padding: PADDING_XLARGE}}
        >
           <Text variant="h4"  color={themestyles.delftBlue.color}>Plan your trip</Text>
          <VStack style={{justifyContent:'center', alignItems:'center'}}>
            <Pressable onPress={flightSearch}>
                <Card
                containerStyle={[styles.cardContainer, {backgroundColor:themestyles.mintGreen.color}]}          
                >
                  <MaterialCommunityIcons name="briefcase-plus" size={width * 0.20} color={themestyles.charcoal300.color}/>
                  <Text color={themestyles.charcoal300.color} style={styles.cardTitle} >Itinerary</Text>
                </Card>
            </Pressable>
            </VStack> 
          <Text variant="h4"  color={themestyles.delftBlue.color}>Explore</Text> 
          <VStack style={{justifyContent:'center', alignItems:'center'}}>
            <Pressable onPress={hotelSearch}>
              <Card
              containerStyle={styles.cardContainer}
              >
                <Fontisto name="hotel" size={width * 0.2} color={'white'} />
                <Text color={'white'} style={styles.cardTitle} >Hotels</Text>
              </Card>
            </Pressable>
            <Pressable onPress={flightSearch}>
                <Card
                containerStyle={styles.cardContainer}          
                >
                  <MaterialIcons name="flight" size={width * 0.2} color={'white'} />
                  <Text color={'white'} style={styles.cardTitle} >Flights</Text>
                </Card>
            </Pressable>
            <Pressable onPress={itinerySearch}>
                <Card
                containerStyle={styles.cardContainer}          
                >
                  <MaterialIcons name="search" size={width * 0.2} color={'white'} />
                  <Text color={'white'} style={styles.cardTitle} >Things To Do</Text>
                </Card>
            </Pressable>
          </VStack>
          
        </ScrollView>
        <BottomNavigation navigation={props.navigation}></BottomNavigation>
        </VStack>

      );


}
const {width,height} = Dimensions.get("window");
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: themestyles.charcoal300.color,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: width - PADDING_XLARGE * 2,
    paddingVertical: height * 0.020,
  },
  cardTitle:{
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: 12,
  }
})
export default HomeScreen;
