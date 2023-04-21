import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

interface ItineraryDetailScreenProps {
    navigation: any
}

export default function ItineraryDetailScreen() {
    return(
        <ScrollView>
            <Text>Your Itineraries</Text>
        </ScrollView>
    )
}