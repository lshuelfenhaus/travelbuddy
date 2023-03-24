import { HStack } from '@react-native-material/core';
import React, {useMemo, useState} from 'react';
import {AntDesign} from '@expo/vector-icons';
import {View} from 'react-native';
interface StarRatingsProps{
    score: number,
    scale?: number,
    starNo?: number,
    filledColor?: string,
    style?:any
}

const StarRatings = (props: StarRatingsProps) => {
    const [score, setScore] = useState(0);
    const SIZE = 20;
    useMemo(()=>{
        setScore(Math.floor( (props.score / (props.scale ? props.scale:5)) * (props.starNo? props.starNo : 5)));
    }, [props])
    return(
        <View style={props.style}>
            <HStack>
                { 
                    new Array(Math.floor( (props.score / (props.scale ? props.scale:5)) * (props.starNo? props.starNo : 5))).fill(0).map((item,index)=>{
                        return (
                            <AntDesign key={index} name="star" size={SIZE} color={props.filledColor} />
                        );
                    })
                }
                {
                    new Array( (props.starNo? props.starNo : 5) - Math.floor( (props.score / (props.scale ? props.scale:5)) * (props.starNo? props.starNo : 5))).fill(0).map((item,index)=>{
                        return (
                            <AntDesign key={index} name="staro" size={SIZE} color="black" />
                        );
                    })
                }
            </HStack>
        </View>
    )

}

// setting default value to name prop
StarRatings.defaultProps = {
    starNo: 5,
    scale: 5,
    filledColor: "gold",
}

export default StarRatings;