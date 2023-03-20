import { AppBar, Button, HStack, IconButton, VStack, Text} from "@react-native-material/core";
import { Ionicons, Entypo, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'; 
import {logout} from './authentication';
import {StyleSheet, View } from "react-native";
import Modal from 'react-native-modal'
import { useState } from "react";
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
                color="primary"
                variant="bottom"  
                contentContainerStyle={styles.contentContainer}   
                leadingContainerStyle={styles.leadingContainer}
                leading={(
                <HStack style={styles.hstack} spacing={SPACING}>
                                        
                    <View style={styles.iconContainer}>
                        <IconButton icon={<MaterialCommunityIcons name="home-heart" size={ICONSIZE} color="white"/>} />
                        <Text style={styles.textIcon}>Home</Text> 
                    </View>    
            
                    <View style={styles.iconContainer}>
                        <IconButton icon={<Ionicons color="white" size={ICONSIZE} name="chatbubble-ellipses" /> } />
                        <Text style={styles.textIcon}>Buddy</Text> 
                    </View>    
                    <IconButton style = {styles.centralIcon} icon={<Ionicons style={ {textAlign:"center"}} name="add" size={50} color="#6200EE" /> }/>
                    <View style={styles.iconContainer}>
                            <IconButton  icon={props => <Entypo name="list" size={ICONSIZE} color="white" />  } />
                            <Text style={styles.textIcon}>Itinerary</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <IconButton  icon={<MaterialCommunityIcons name="account" size={ICONSIZE} color="white" />}/>
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
const SPACING = 30;
const ICONSIZE = 30;
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
        alignItems: "center"
    },

    centralIcon:{
        borderRadius: 30,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItem: "center",
        textAlign: "center",
        width: 60,
        height: 60,
        borderWidth: 1,
        marginTop: -10,
        borderColor: OURPURPLE
    },
    textIcon: {
        color: "white",
        fontSize: 12,
        textAlign: 'center',
        marginTop: -8
    },
    navigationBar:{
        position: "absolute", 
        start: 0, 
        end: 0, 
        bottom: 0, 
        height: 55,
    },
    menuContainer:{
        height:"100%",
        backgroundColor: OURPURPLE,
        flexDirection: "column-reverse",
        alignItems: "center",
        borderRadius: 10,
    }
})
