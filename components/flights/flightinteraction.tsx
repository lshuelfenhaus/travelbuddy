import React from 'react'
import axios from 'axios'

const API_KEY = '4954808daemsh8c28b07faccd7c3p12ce85jsn42818613f228'

export const getFlights = () => {
        
    const options = {
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
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com'
        }
      };
      
      const flightsPromise = axios.request(options).then(function (response) {
          console.log(response.data);
      }).catch(function (error) {
          console.error(error);
      });
      return flightsPromise;
}