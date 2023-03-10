import { AppBar, Button, HStack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

interface HomeScreenProps {
    navigation: any
}

const AppBarHeader = (props: HomeScreenProps) => {
    const logout = () => props.navigation.navigate("Login")
    return(
      <AppBar
        variant="bottom"
        color="navy"        
        leading={props => (
          <IconButton icon={props => <Icon name="menu" {...props} />} {...props} />
        )}
        trailing={props => (
          <HStack>
              <Button variant="outlined" title="Logout" onPress={logout} />
            </HStack>
        )}
        style={{  position: "absolute", start: 0, end: 0, bottom: 0, height:75 }}
      >
      </AppBar>
    );
}

export default AppBarHeader;