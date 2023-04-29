import {Button, HStack, VStack, Text, Divider } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomNavigation } from "../components/bottomnavigation";
import { Card } from "@rneui/base";
import { Image } from "react-native-elements";
import themestyles from "../Colors";
import { Dimensions, StyleSheet } from "react-native";

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
  return(
        <SafeAreaProvider
        style={{backgroundColor: themestyles.eggshell.color}}
        >   
        <VStack style={styles.container}
        >
          <Card
          containerStyle={{height:170, justifyContent:'center', alignItems:'center'}}
          >
          <Button title="Hotels" variant="text" color={themestyles.charcoal.color} onPress={hotelSearch}/>
          </Card>
          <Card
          containerStyle={{height:170, justifyContent:'center', alignItems:'center'}}          
          >
          <Button title="Flights" variant="text" color={themestyles.charcoal200.color} onPress={flightSearch}/>
          </Card>
          <Card
          containerStyle={{height:170, justifyContent:'center', alignItems:'center'}}          
          >
          <Button title="Attractions" variant="text" color={themestyles.charcoal300.color}/>
          </Card>
        </VStack>
        <BottomNavigation navigation={props.navigation}></BottomNavigation>
        </SafeAreaProvider>

      );


}
const {height} = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
export default HomeScreen;
