import { AppBar, Button, HStack, IconButton, VStack, Text } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Flex, Spacer, Box } from 'react-native-flex-layout';



interface HomeScreenProps {
    navigation: any
}

const HomeScreen = (props: HomeScreenProps) => {
  const curation = () => props.navigation.navigate("Curation")
    return(
        <SafeAreaProvider>
        <VStack center spacing={16}>
          <Text variant="h4" color="indigo">Let's plan your trip</Text>
          <Icon name="bag-checked" size={96} color="indigo"/>
          <Button color="indigo" title="Create Itinerary" onPress={curation}/>
          <Spacer /><Spacer /><Spacer /><Spacer /><Spacer /><Spacer />
          <Text variant="h4" color="indigo">Already planned? Let's check it out!</Text>
          <Icon name="map-check-outline" size={96} color="indigo"/>
          <Button color="indigo" title="Upcoming Itinerary"/>
          
        </VStack>
        <AppBar
          variant="bottom"
          color="indigo"        
          leading={props => (
            <IconButton icon={props => <Icon name="menu" {...props} />} {...props} />
          )}
          title="Travel Buddy"
          trailing={props => (
            <HStack>
                <IconButton
                  icon={props => <Icon name="chat" {...props} />}
                  {...props}
                />
                <IconButton
                  icon={props => <Icon name="dots-vertical" {...props} />}
                  {...props}
                />
              </HStack>
          )}
          style={{  position: "absolute", start: 0, end: 0, bottom: 0, height:75 }}
        >
        </AppBar> 
        </SafeAreaProvider>
 
      );


}
export default HomeScreen;
