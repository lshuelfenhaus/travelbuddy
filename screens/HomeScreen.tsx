import { AppBar, Button, HStack, IconButton, VStack, Text, Divider } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from "react-native-safe-area-context";
import {logout} from './../components/authentication';

interface HomeScreenProps {
    navigation: any
}

const HomeScreen = (props: HomeScreenProps) => {
  const logOut = async () => {
    try{
      await logout();
      props.navigation.navigate("Login")
    }catch(e){
      console.log(e);
    }
    
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
          <Button variant="outlined" title="Create Itinerary"/>
          <Divider style={{marginTop:10}} />
          <Text adjustsFontSizeToFit={true} variant="button" color="black">Already planned? Let's check it out!</Text>
          <Icon name="map-check-outline" size={96} />
          <Button variant="outlined" title="Upcoming Itinerary"/>
        </VStack>
        <AppBar
          color="primary"
          variant="bottom"      
          leading={(
            <HStack>
              <IconButton style={{marginLeft: 10}} icon={props => <Feather color="white" size={25} name="menu" /> } />
              <IconButton icon={<Ionicons color="white" size={35} name="chatbubble-ellipses" /> } /> 
            </HStack>
           
          )}
          trailing={props => (
                <HStack>
                  <IconButton style={{marginRight: 20}}
                  icon={<Ionicons color="white" size={30} name="log-out-outline" onPress={logOut}/>}
                />
                </HStack>
                
          )}
          style={{  position: "absolute", start: 0, end: 0, bottom: 0, height:65 }}
        >
        </AppBar> 
        </SafeAreaProvider>

      );


}
export default HomeScreen;
