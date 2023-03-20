import {Button, HStack, VStack, Text, Divider } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomNavigation } from "../components/bottomnavigation";

interface HomeScreenProps {
    navigation: any
}

const HomeScreen = (props: HomeScreenProps) => { 
  const createItinerary = async () => {
    props.navigation.navigate("CreateItinerary")
  }

  return(
        <SafeAreaProvider>
        <HStack>
          {/* Put some kind of header here? */}
        </HStack>   
        <VStack center spacing={30}>
          <Divider style={{marginTop: 60}} />
          <Text adjustsFontSizeToFit={true} variant="button" color="black" >Let's plan your trip</Text>
          <Icon name="bag-checked" size={96} />
          <Button variant="outlined" title="Create Itinerary" onPress={createItinerary}/>
          <Divider style={{marginTop:10}} />
          <Text adjustsFontSizeToFit={true} variant="button" color="black">Already planned? Let's check it out!</Text>
          <Icon name="map-check-outline" size={96} />
          <Button variant="outlined" title="Upcoming Itinerary"/>
        </VStack>
        <BottomNavigation navigation={props.navigation}></BottomNavigation>
        </SafeAreaProvider>

      );


}
export default HomeScreen;
