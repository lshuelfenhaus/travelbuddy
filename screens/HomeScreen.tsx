import { AppBar, Button, HStack, IconButton, VStack } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
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
        
        <Button variant="contained" title="Logout" onPress={logOut} />
        
        <AppBar
          variant="bottom"
          color="indigo"        
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
