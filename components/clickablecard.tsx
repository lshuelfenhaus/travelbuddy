import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BORDER_RADIUS, MARGIN, PADDING_XLARGE } from '../StyleConstants';
import { Pressable } from '@react-native-material/core';
interface ClickableCardProps {
    navigation?: any,
    styles?: any,
    children?: any,
    background?: any,
    params?: any,
    navigateEnd?: any,
    height?: any,
    width?: any,
}

export default function ClickableCard (props: ClickableCardProps) {
    const goToLink = () => {
        if(props.navigateEnd && props.navigation){
            props.navigation.navigate(props.navigateEnd, props.params || {});
        }
    }
   return(
        <View>
            <Pressable 
                onPress={goToLink} 
                style={[
                    styles.container,props.styles,
                    {
                        backgroundColor: props.background || "white",
                        height: props.height || 200,
                        width: props.width || "auto",
                    }
                ]}>
                {props.children}
            </Pressable>
        </View>
   ) 
    
}

const styles = StyleSheet.create({
    container:{
        padding: PADDING_XLARGE,
        paddingHorizontal: PADDING_XLARGE * 2,
        boderColor: "grey",
        borderWidth: 1,
        borderRadius: BORDER_RADIUS,
        justifyContent: "center",         
        shadowColor: "BLACK",
        shadowOffset: {
            width: 4,
            height: 20,
        },
        shadowOpacity:  0.3,
        shadowRadius: 20.05,
        elevation: 8
    },
    
});