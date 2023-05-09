import { AppBar, HStack, IconButton, Text} from "@react-native-material/core";
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'; 
import {logout} from './authentication';
import {Dimensions, StyleSheet, View } from "react-native";
import { useState } from "react";
import themestyles from "../Colors";
import { BOTTOM_NAVIGATION_HEIGHT } from "../StyleConstants";

interface BottomNavigationProps {
    navigation: any;
}
export const BottomNavigation = (props: BottomNavigationProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const logOut = async () => {
        try{
          await logout();
          props.navigation.navigate("Login")
        }catch(e){
          console.log(e);
        }
    }
    
    const chatbot = async () => {
        try {
            props.navigation.navigate("Chatbot")
        }
        catch(e){
            console.log(e);
        }
    }

    const home = async () => {
        try {
            props.navigation.navigate("Home")
        }
        catch(e){
            console.log(e);
        }
    }

    const account = async () => {
        try {
            props.navigation.navigate("Account")
        }
        catch(e){
            console.log(e);
        }
    }

    const itinerary = async () => {
        try {
            props.navigation.navigate("Itineraries")
        }
        catch(e){
            console.log(e);
        }
    }

    const createItinerary = async () => {
        try {
            props.navigation.navigate("ItineraryCreation")
        }
        catch(e){
            console.log(e)
        }
    }

    return (
        <>
{/*             <Modal animationIn="slideInRight" animationOut="slideOutRight" isVisible={modalVisible}>
                <VStack style={styles.menuContainer}>
                    <IconButton style={styles.escape} icon={<AntDesign onPress={event => setModalVisible(false)} name="arrowright" size={50} color="white" /> } />
                    <Button titleStyle={{color: "white"}}style={styles.menuButtonLogout} variant="outlined" title="Logout" onPress={logOut}/>
                    <Button style={styles.menuButton} variant="outlined" title="Setting" onPress={null}/>
                    <Button style={styles.menuButton} variant="outlined" title="Another menu option" onPress={null}/>
                </VStack>
            </Modal> */}
            <AppBar
                color={themestyles.delftBlue.color}
                variant="bottom"  
                contentContainerStyle={styles.contentContainer}   
                leadingContainerStyle={styles.leadingContainer}
                leading={(
                <HStack style={styles.hstack}>
                                        
                    <View style={styles.iconContainer}>
                        <IconButton icon={<MaterialCommunityIcons name="home-heart" size={ICONSIZE} color="white"/>} onPress={home} />
                        <Text style={styles.textIcon}>Home</Text> 
                    </View>    
            
                    <View style={styles.iconContainer}>
                        <IconButton icon={<Ionicons color="white" size={ICONSIZE} name="chatbubble-ellipses" /> } onPress={chatbot}/>
                        <Text style={styles.textIcon}>Buddy</Text> 
                    </View>    
                    <IconButton style = {styles.centralIcon} icon={<Ionicons style={ {justifyContent:"center", alignItems:"center"}} name="add" size={ICONSIZE*1.5} color={themestyles.charcoal.color} /> } onPress={createItinerary} />
                    <View style={styles.iconContainer}>
                            <IconButton  icon={props => <Entypo name="list" size={ICONSIZE} color="white" />  } onPress={itinerary} />
                            <Text style={styles.textIcon}>Itineraries</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <IconButton  icon={<MaterialCommunityIcons name="account" size={ICONSIZE} color="white" />} onPress={account} />
                        <Text style={styles.textIcon}>Account</Text> 
                    </View>
                </HStack>
                )}
                style={styles.navigationBar}
            >
            </AppBar>
        </>
    )
}
var {height} = Dimensions.get("window");
var {width} = Dimensions.get("window");
const SPACING = width*0.05;
const ICONSIZE = width*0.06;
const OURPURPLE = "#6200EE";
const styles = StyleSheet.create({
    escape:{
        alignSelf: "flex-end",
    },
    menuButton:{
        backgroundColor: "white",
        paddingVertical: 4,
        width: 300,
        marginTop: 8
    },
    hstack:{ 
        width: "100%"
    },
    contentContainer:{alignItems: "center", justifyContent: "center", flexDirection:"column"},
    leadingContainer:{
       marginStart: 0,
       marginEnd: 0,
    },
    menuButtonLogout:{
        backgroundColor: "tomato",
        paddingVertical: 4,
        paddingHorizontal: 32,
        marginTop: 32,
        color: "white"
    },
    iconContainer: {
        alignItems: "center",
        minWidth: width * 0.2,
    },

    centralIcon:{
        borderRadius: ICONSIZE * 2,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItem: "center",
        textAlign: "center",
        width: ICONSIZE * 2,
        height: ICONSIZE * 2,
        borderWidth: 2,
        marginTop:  -ICONSIZE/4,
        borderColor: themestyles.powderBlue.color,
    },
    textIcon: {
        color: "white",
        fontSize: ICONSIZE/2,
        textAlign: 'center',
        marginTop: -ICONSIZE/4,
    },
    navigationBar:{
        alignSelf: "flex-end",
        height: height * BOTTOM_NAVIGATION_HEIGHT,
        width: "100%"
    },
    menuContainer:{
        height:"100%",
        backgroundColor: themestyles.delftBlue.color,
        flexDirection: "column-reverse",
        alignItems: "center",
        borderRadius: 10,
    }
})
