import React from 'react'
import axios from 'axios'
export const getLocation = (location: string) => {
    const options = {
        method: 'GET',
        url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation',
        params: {query: location},
        headers: {
            'X-RapidAPI-Key': '99ed015561msh9d752cc737a2229p16d10djsn3a3da691ca91',
            'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
    };

    const dataPromise = axios.request(options).then(function (response) {
        //get the geo ids so that we can pass this into the search hotels later
        const listOfLocation: Array<any> = response.data.data;//An array
        const geoID: string = listOfLocation[0].geoId; 
        return geoID;
    });
    return dataPromise;
}

export const getHotels = (geoID: string, checkIn: Date, checkOut: Date) => {
    
    const today = new Date();
    if (checkIn === undefined) checkIn = today;
    if (checkOut === undefined) checkOut = today;
    const options = {
        method: 'GET',
        url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels',
        params: {
          geoId: geoID,
          checkIn: checkIn.toISOString().slice(0, 10),//to get date string format yyyy-mm-dd
          checkOut: checkOut.toISOString().slice(0, 10),
          pageNumber: '1',
          currencyCode: 'USD'
        },
        headers: {
          'X-RapidAPI-Key': '99ed015561msh9d752cc737a2229p16d10djsn3a3da691ca91',
          'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          const listofHotels = response.data.data.data;
          for (const {title} of listofHotels){
            console.log(title);
          }
        
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