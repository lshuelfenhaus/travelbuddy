import React from 'react'
import axios from 'axios'
import {Room} from "./HotelInterface";
export const getLocationBaseOnType = (location: string,rType: string) => {
    const options = { //right now we conduct hotel search within US, thus the site Id is 300000001
        method: 'GET',
        url: 'https://hotels4.p.rapidapi.com/locations/v3/search',
        params: {q: location, locale: 'en_US', langid: '1033', siteId: 300000001},
        headers: {
          'X-RapidAPI-Key': '4954808daemsh8c28b07faccd7c3p12ce85jsn42818613f228',
          'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
        }
    };

    const dataPromise = axios.request(options).then(function (response) {
        //get the geo ids so that we can pass this into the search hotels later
        const listOfLocations: Array<any> = response.data.sr;//An array
        //For now we look for hotels in the U.S
        for( const {type,gaiaId, regionNames} of listOfLocations){
            if (type.toLowerCase() === rType && regionNames.fullName.includes("United States")){
                return gaiaId; 
            }
        }
        return null;
    });
    return dataPromise;
}

export const getHotels = (geoID: string, checkIn: Date, checkOut: Date, min: number, max: number, rooms: Room) => {
    let search = {
        "currency": "USD",
        "eapid": 1,
        "locale": "en_US",
        "siteId": 300000001,
        "destination": {
            "regionId": geoID
        },
        "checkInDate": {
            "day": checkIn.getUTCDate(),
            "month": checkIn.getUTCMonth() + 1,
            "year": checkIn.getUTCFullYear()
        },
        "checkOutDate": {
            "day": checkOut.getUTCDate(),
            "month": checkOut.getUTCMonth() + 1,
            "year": checkOut.getUTCFullYear()
        },
        
        "rooms": [
            {
                "adults": rooms.adults? rooms.adults : 1,
                "children": [
                    {
                        "age": 5
                    },
                    {
                        "age": 7
                    }
                ]
            }
        ],
        "resultsStartingIndex": 0,
        "resultsSize": 40
       /*  "currency": "USD",
       "currency": "USD",
        "eapid": 1,
        "locale": "en_US",
        "siteId": 300000001,
        "destination": {
            "regionId": geoID
        },

        "rooms": [
           { "adults":1, "children":{"age":2}}
            //rooms
        ],
        "resultsStartingIndex": 0,
        "resultSize": 200, */
    }
    const options = {
        method: 'POST',
        url: 'https://hotels4.p.rapidapi.com/properties/v2/list',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '4954808daemsh8c28b07faccd7c3p12ce85jsn42818613f228',
          'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
        },
        data: search
      };
      
    const hotelsPromise = axios.request(options).then(function (response) {
          const listofHotels = response.data.data.propertySearch.properties;
          return listofHotels;
      }).catch(function (error) {
          console.error(error);
          return null;
    });
    //do this so that we can chain with this method as promise chain
    return hotelsPromise;
}

export const getHotelsWithFilters = ( filterType:string, filterOptions:any) =>{

}