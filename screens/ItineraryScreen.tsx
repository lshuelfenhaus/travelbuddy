import { VStack, Button, HStack, Text } from "@react-native-material/core";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Entypo, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'; 
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import themestyles from "../Colors";
import { Card } from "@rneui/base";
import { BottomNavigation } from "../components/bottomnavigation";

interface HomeScreenProps {
    navigation: any,
}

const ItineraryScreen = (props: HomeScreenProps) => {
    return(
        <SafeAreaProvider style={{backgroundColor: themestyles.eggshell.color}}>
            
            <VStack center spacing={30}>
                <Text variant="h2" color={themestyles.charcoal.color}>Upcoming Trip</Text>

                <Card containerStyle={{justifyContent:'center', alignItems:'center'}}>
                <HStack spacing={50}> 
                <Icon name={"bed"} size={40} color={themestyles.charcoal.color}/>
                <Text variant="h4">Hotel Booking</Text>
                <Button title="View" color={themestyles.delftBlue.color}/>
                </HStack>
                </Card>

                <Card containerStyle={{justifyContent:'center', alignItems:'center'}}>
                <HStack spacing={50}> 
                <Icon name={"airplane"} size={40} color={themestyles.charcoal.color}/>
                <Text variant="h4">Flight Booking</Text>
                <Button title="View" color={themestyles.delftBlue.color}/>
                </HStack>
                </Card>

                <Card containerStyle={{justifyContent:'center', alignItems:'center'}}>
                <HStack spacing={50}> 
                <Icon name={"map-marker"} size={40} color={themestyles.charcoal.color}/>
                <Text variant="h4">My Attractions</Text>
                <Button title="View" color={themestyles.delftBlue.color}/>
                </HStack>
                </Card>

                
                <Button variant="text" title="Cancel this trip" color="error" />

            </VStack>
            <BottomNavigation navigation={props.navigation} />
        </SafeAreaProvider>
    );
}

export default ItineraryScreen;