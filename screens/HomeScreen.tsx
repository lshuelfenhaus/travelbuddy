import { AppBar, Button, HStack, IconButton, VStack } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaProvider } from "react-native-safe-area-context";



interface HomeScreenProps {
    navigation: any
}

const HomeScreen = (props: HomeScreenProps) => {
    return(
        <SafeAreaProvider>
        <Button variant="contained" title="Logout" />
        <AppBar
          variant="bottom"
          color="navy"        
          leading={props => (
            <IconButton icon={props => <Icon name="menu" {...props} />} {...props} />
          )}
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
