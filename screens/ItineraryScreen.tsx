import { VStack } from "@react-native-material/core";
import { Text } from "react-native-elements";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import themestyles from "../Colors";
import { BottomNavigation } from "../components/bottomnavigation";

interface HomeScreenProps {
    navigation: any,
}

const ItineraryScreen = (props: HomeScreenProps) => {
    return(
        <SafeAreaProvider style={{backgroundColor: themestyles.eggshell.color}}>
            <VStack center spacing={30}>
            <Text>Itinerary Screen: Todo</Text>
            </VStack>
            <BottomNavigation navigation={props.navigation} />
        </SafeAreaProvider>
    );
}

export default ItineraryScreen;