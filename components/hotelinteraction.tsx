import React from 'react'

const HOTEL_API_KEY = "99ed015561msh9d752cc737a2229p16d10djsn3a3da691ca91";
export const getHotels = () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': HOTEL_API_KEY,
            'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
        }
    };
    fetch('https://hotels4.p.rapidapi.com/v2/get-meta-data', options)
    .then(response => response.json())
    .then(response => console.log(response));    
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