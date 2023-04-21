import axios from 'axios';

const API_KEY = "AIzaSyDok-04MApBdBTZfXZlhfxcL_fSoIF6iRE";

export const getLocationInfo = (location: string) => {
    var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${location}&inputtype=textquery&fields=editorial_summary%2Cname%2Crating%2Copening_hours%2Cgeometry&key=${API_KEY}`,
        headers: { }
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
}