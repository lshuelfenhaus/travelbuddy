import {Button, HStack, VStack, Text, Divider } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomNavigation } from "../components/bottomnavigation";
import { Card } from "@rneui/base";
import { Image } from "react-native-elements";
import themestyles from "../Colors";

interface HomeScreenProps {
    navigation: any
}

const HomeScreen = (props: HomeScreenProps) => { 
  const hotelSearch=()=>{
    props.navigation.navigate("HotelSearch");
  }
  return(
        <SafeAreaProvider
        style={{backgroundColor: themestyles.eggshell.color}}
        >   
        <VStack 
        >
          <Card
          containerStyle={{height:170, justifyContent:'center', alignItems:'center'}}
          >
          <Button title="Hotels" variant="text" color={themestyles.charcoal.color} onPress={hotelSearch}/>
          </Card>
          <Card
          containerStyle={{height:170, justifyContent:'center', alignItems:'center'}}          
          >
          <Button title="Flights" variant="text" color={themestyles.charcoal200.color}/>
          </Card>
          <Card
          containerStyle={{height:170, justifyContent:'center', alignItems:'center'}}          
          >
          <Button title="Attractions" variant="text" color={themestyles.charcoal300.color}/>
          </Card>
          <Card
          containerStyle={{height:170, justifyContent:'center', alignItems:'center'}}          
          >
          <Button title="Explore" variant="text" color={themestyles.charcoal400.color}/>
          </Card>
        </VStack>
        <BottomNavigation navigation={props.navigation}></BottomNavigation>
        </SafeAreaProvider>

      );


}
export default HomeScreen;
