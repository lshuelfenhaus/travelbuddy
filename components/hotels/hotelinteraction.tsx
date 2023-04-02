import React from 'react'
import axios from 'axios'
import {Room} from "./HotelInterface";
const API_KEY =  '99ed015561msh9d752cc737a2229p16d10djsn3a3da691ca91';
export const getLocationBaseOnType = (location: string,rType: string) => {
    const options = {
        method: 'GET',
        url: 'https://hotels-com-provider.p.rapidapi.com/v2/regions',
        params: {locale: 'en_US', query: location, domain: 'US'},
        headers: {
          'X-RapidAPI-Key': API_KEY,
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
          adults_number: 1,
          checkin_date: checkIn.toISOString().substring(0,10),
          available_filter: "SHOW_AVAILABLE_ONLY"
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
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
        }
      };
      
    const hotelsPromise = axios.request(options).then(function (response) {
          const listofHotels = response.data.properties;
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
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
        }
      };

    const dataPromise = axios.request(options).then(function (response:any) {
        let PropertyInfo = response.data;
        {/*   
        summary:{
            id:
            name:
            amenities:{
                topAmenities:{
                    items:[
                        {
                            text:
                        }
                    ]
                }
            }
            location: {
                address:{
                    addressLine: 
                    firstAddressLine:
                    secondAddressLine:
                    city:
                    countryCode:
                }
            }
            map:{
                markers:[ skip the last item in array since it is the hotel itself
                    {
                        title: "Name of the location"
                        subtitle: "n min drive"
                    }
                ]
            },
        },
        propertyGallery:{
                images:[
                    {
                        image:{
                            url:
                            description: //for viewing up close? future update
                        }
                    }
                ]
            }
        */}
        return PropertyInfo;
    }).catch(function (error:any) {
        return null
    });
    return dataPromise;
}
export const getHotelReviews = (id: string) => {
    const options = {
        method: 'GET',
        url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/reviews/list',
        params: {domain: 'US', locale: 'en_US', hotel_id: id, page_number: '1'},
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
        }
      };
      
    const promiseData = axios.request(options).then(function (response) {
        return response.data.reviewInfo.reviews;
        /* 
        {
            id:
            reviewScoreWithDescription:{
                value: "00/00 Text"
            }
            submissionTimeLocalized: "00 Mar 2023"
            text:
            title:
            stayDuration: "name, text"
        }
        */
    }).catch(function (error) {
        return [];
    });
    return promiseData;
}

export const getRooms = (hotelId: string, checkIn: Date, checkOut: Date, adults: number) => {   
    const options = {
        method: 'GET',
        url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/offers',
        params: {
            domain: 'US',
            locale: 'en_US',
            checkout_date: checkOut.toISOString().substring(0,10),
            hotel_id: hotelId,
            adults_number: adults,
            checkin_date: checkIn.toISOString().substring(0,10),
        },
        headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
        }
    };
  /* 
    { a unit
        id:
        header: { //overall description may be add as the room title
            text:
        },
        unitGallery:{ //images
            gallery:[
                {   image: {
                        description:
                        url:
                    }
                }
            ]
        },
        roomAmenities:{
            bodySubSections:[ usually the first one in the array 
                {
                    contents:[
                        {
                            header:{
                                text: title of the amenities
                            }
                            items:[
                                { //first item in the array usually
                                    content:{
                                        text: item will be put in <ul> and <li> so need to process them
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
        features:[
            {
                text:
            }
        ],
        ratePlans:[ //different paying options for room, if unit does not have rate plan => not available so grey out but still render
            {
                id:
                fees: [
                    check if this empty to calculate fee plus price plus 12% tax
                ]
                PriceDetails:[ //let payer know that price will go up when pay later
                    {
                        depositPolicies: "Non-refundable" low price vs "Free Cancelation" high price,
                        paymentModel: "PAY_NOW" low price vs "PAY_LATER" high price,
                        price: {
                            lead: amount per night
                        }
                    }
                ]
            }
        ]
    }
  */
  const dataPromise = axios.request(options).then(function (response) {
      return response.data.units;
  }).catch(function (error) {
      return [];
  });

  return dataPromise;

}