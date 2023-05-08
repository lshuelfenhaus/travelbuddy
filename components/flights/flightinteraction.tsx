import React from 'react'
import axios from 'axios'

const API_KEY = process.env.FLIGHT_API_KEY;

export const getFlights = (from_location: string, to_location: string, flight_date: Date, adults_number: number) => {
    const options = {
        method: 'GET',
        url: 'https://flight-fare-search.p.rapidapi.com/v2/flight/',
        params: {
          from: from_location,
          to: to_location,
          date: flight_date.toISOString().substring(0,10),
          adult: adults_number,
          type: 'economy',
          currency: 'USD'
        },
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com'
        }
      }
      
      const flightsPromise = axios.request(options).then(function (response) {
        let flightRequest = response.data.results;
        console.log(response.data.results);
        return flightRequest;
      }).catch(function (error) {
          console.error(error);
      });
      return flightsPromise;

}