import { HStack, Text, VStack } from '@react-native-material/core';
import React, { useEffect, useState } from 'react';
import StarRatings from './starratings';
import { StyleSheet } from 'react-native';
import * as STYLE_CONSTANTS from '../StyleConstants';
import themestyles from '../Colors';
interface ReviewsSectionProps{
    reviews: Array<any>,
}

const ReviewsSection = (props:ReviewsSectionProps) => {
    const [overall, setOverall] = useState(0);
    const [scale, setScale] = useState(10);
    const computeAverageScore = async (reviews:Array<any>) =>{
        let sum = 0;
        let len = reviews.length; 
        if(len){
            for (const review of reviews){
                sum += getScoreFromString(review.reviewScoreWithDescription.value);
            }
        }
            return sum / len;
    }
    const getScoreFromString = (str: string) => {
        /*Original string: "00/00 description text"*/
        const scoreString = str.split(" ")[0];
        const scoreAndScale = scoreString.split("/");
        return parseInt(scoreAndScale[0]);
    }
    const getScaleFromReviews = (reviews: Array<any>) => {
        if(reviews.length){
            return parseInt(reviews[0].reviewScoreWithDescription.value.split(" ")[0].split("/")[1]);
        }
    }
    useEffect(()=>{
        let result = computeAverageScore(props.reviews);
        result.then((score)=>{
            setOverall(score);
        });
        setScale(getScaleFromReviews(props.reviews) || 10)
    })
    return (
        <VStack>
            <VStack>
                <Text style={styles.overallTitle}>{"Overall Score"}</Text>
                <HStack>
                    <Text style={{fontSize: STYLE_CONSTANTS.TEXT_REGULAR}}>{overall}</Text>
                    {/* Some time there is a array size error pop up in Star ratings, I dont know why */}
                    {overall && <StarRatings score={overall} scale={scale} filledColor={themestyles.delftBlue.color} size={24}></StarRatings>}
                </HStack>
                <VStack spacing={ELEMENT_SPACING}>
                    {props.reviews && props.reviews.map( (review:any, index:number) => {
                        return(
                            <VStack key={index}>
                                <Text style={styles.reviewTitle}>{review.stayDuration?review.stayDuration:"Anonymous User"}</Text>
                                {review.reviewScoreWithDescription.value && <StarRatings scale={scale} score={getScoreFromString(review.reviewScoreWithDescription.value)}></StarRatings>}
                                <Text style={{fontSize: STYLE_CONSTANTS.TEXT_REGULAR}}>{review.text.length > 0 ? review.text : "No comment"}</Text>
                            </VStack>
                        )
                    })}
                </VStack> 
            </VStack>
        </VStack>
    )
}
const ELEMENT_SPACING = 8;
const styles = StyleSheet.create({
    reviewTitle:{
        fontWeight: "bold",
        fontSize: STYLE_CONSTANTS.TEXT_REGULAR
    },
    overallTitle:{
        fontWeight: "bold",
        fontSize: 24
    }
})
export default ReviewsSection