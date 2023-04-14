import React from 'react'
import axios from 'axios'

const API_KEY = '9a08860ac3mshdeb21522541f3eap11d480jsn05a1721050d6'

export const getFlights = (from_location: string, to_location: string, flight_date: Date, adults_number: number) => {
     console.log(from_location, to_location, flight_date, adults_number);
    const options = {
        method: 'GET',
        url: 'https://flight-fare-search.p.rapidapi.com/v2/flight/',
        params: {
          from: from_location,
          to: to_location,
          date: '2023-05-09',/*flight_date.toISOString().substring(0,10),*/
          adult: adults_number,
          type: 'economy',
          currency: 'USD'
        },
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com'
        }
      }
      
      const flightsPromise = axios.request(options).then(function (response) {
        let flightRequest = response.data;
        console.log(response.data);
        return flightRequest;
      }).catch(function (error) {
          console.error(error);
      });
      return flightsPromise;
      

/*const options = {
  method: 'GET',
  url: 'https://flight-fare-search.p.rapidapi.com/v2/flight/',
  params: {
    from: 'SJC',
    to: 'JFK',
    date: '2023-05-09',
    adult: '1',
    type: 'economy',
    currency: 'USD'
  },
  headers: {
    'X-RapidAPI-Key': '9a08860ac3mshdeb21522541f3eap11d480jsn05a1721050d6',
    'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com'
  }
};

axios.request(options).then(function (response: { data: any; }) {
	console.log(response.data);
}).catch(function (error: any) {
	console.error(error);
});*/
}