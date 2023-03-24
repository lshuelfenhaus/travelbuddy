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
        let region_ID = 0;
        for( const {type,gaiaId} of listOfLocations){
            if (type.toLowerCase() === rType){
                region_ID = gaiaId; 
            }
        }
        return region_ID;
    });
    return dataPromise;
}

export const getHotels = (geoID: string, checkIn: Date, checkOut: Date, min: number, max: number, rooms: Room) => {
    
    const SORT = "PRICE_LOW_TO_HIGH";
   
    let search = {
        "currency": "USD",
        "locale": "en_US",
        "siteId": 300000001,
        "destination": {
            "regionId": "3179"
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
           rooms
        ],
        "resultsStartingIndex": 0,
        "resultsSize": 200,
        "sort": SORT,
        "filters":{
            "price":{
                max: max? max : Infinity,
                min: min? min : 0
            }
        }
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
      
      axios.request(options).then(function (response) {
          const listofHotels = response.data;
         console.log(listofHotels)
        
      }).catch(function (error) {
          console.error(error);
      });
}

export const getHotelsBasedOnLocation = () => {
/*     const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4954808daemsh8c28b07faccd7c3p12ce85jsn42818613f228',
            'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
        }
    };
    fetch('https://hotels-com-provider.p.rapidapi.com/v2/regions?locale=en_GB&query=San%Jose&domain=AE', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err)); */
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4954808daemsh8c28b07faccd7c3p12ce85jsn42818613f228',
            'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
        }
    };
    
    fetch('https://hotels-com-provider.p.rapidapi.com/v2/hotels/search?domain=AE&sort_order=REVIEW&locale=en_GB&checkout_date=2023-09-27&region_id=2872&adults_number=1&checkin_date=2023-09-26&available_filter=SHOW_AVAILABLE_ONLY&meal_plan=FREE_BREAKFAST&guest_rating_min=8&price_min=10&page_number=1&children_ages=4%2C0%2C15&amenities=WIFI%2CPARKING&price_max=500&lodging_type=HOTEL%2CHOSTEL%2CAPART_HOTEL&payment_type=PAY_LATER%2CFREE_CANCELLATION&star_rating_ids=3%2C4%2C5', options)
        .then(response => response.json())
        .then(response => console.log( response ))
        .catch(err => console.error(err));
}