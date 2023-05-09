import React from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import { IconButton} from '@react-native-material/core';
import { ICON_SIZE_S} from '../StyleConstants';

interface HomeScreenProps {
    navigation: any
}

export const HomeButton = (props: HomeScreenProps) => {
    const home = async () => {
        try {
            props.navigation.navigate("Home")
        }
        catch(e){
            console.log(e);
        }
    }

    return (
        <IconButton style={null} onPress={home} icon={props => <AntDesign name="back" size = {ICON_SIZE_S} color={'black'} />} />
    )
};