import React from 'react'
import axios from 'axios'
import {Room} from "./HotelInterface";
export const getLocationBaseOnType = (location: string,rType: string) => {
    const options = {
        method: 'GET',
        url: 'https://hotels-com-provider.p.rapidapi.com/v2/regions',
        params: {locale: 'en_US', query: location, domain: 'US'},
        headers: {
          'X-RapidAPI-Key': '99ed015561msh9d752cc737a2229p16d10djsn3a3da691ca91',
          'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
        }
      };

    const dataPromise = axios.request(options).then(function (response) {
        //get the geo ids so that we can pass this into the search hotels later
        const listOfLocations: Array<any> = response.data.data;//An array (might be one data)
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
        /*
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
        "resultSize": 200, 
    }*/
/*     const options = {
        method: 'POST',
        url: 'https://hotels4.p.rapidapi.com/properties/v2/list',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '4954808daemsh8c28b07faccd7c3p12ce85jsn42818613f228',
          'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
        },
        data: search
      };  */
      const options = {
        method: 'GET',
        url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/search',
        params: {
          //REQUIRED
          domain: 'US',
          sort_order: 'REVIEW',//required
          locale: 'en_US',
          checkout_date: checkOut.toISOString().substring(0,10),
          region_id: geoID,
          adults_number: rooms.adults,
          checkin_date: checkIn.toISOString().substring(0,10)
          //OPTIONALS PARAMS FOLLOWS
         /*  available_filter: 'SHOW_AVAILABLE_ONLY',
          meal_plan: 'FREE_BREAKFAST',
          guest_rating_min: '8',
          price_min: '10',
          page_number: '1',
          children_ages: '4,0,15',
          amenities: 'WIFI,PARKING',
          price_max: '500',
          lodging_type: 'HOTEL,HOSTEL,APART_HOTEL',
          payment_type: 'PAY_LATER,FREE_CANCELLATION',
          star_rating_ids: '3,4,5' */
        },
        headers: {
          'X-RapidAPI-Key': '99ed015561msh9d752cc737a2229p16d10djsn3a3da691ca91',
          'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
        }
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

export const getHotelDetail = (id: string) => {
    const axios = require("axios");

    const options = {
        method: 'GET',
        url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/details',
        params: {domain: 'US', locale: 'en_US', hotel_id: id},
        headers: {
          'X-RapidAPI-Key': '99ed015561msh9d752cc737a2229p16d10djsn3a3da691ca91',
          'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
        }
      };

    const dataPromise = axios.request(options).then(function (response:any) {
        let PropertyInfo = response.data;
        console.log(PropertyInfo);
        return PropertyInfo;
    }).catch(function (error:any) {
        console.error(error);
        return null
    });
    return dataPromise;
}