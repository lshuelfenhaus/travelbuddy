import axios from 'axios';

const API_KEY = "AIzaSyDok-04MApBdBTZfXZlhfxcL_fSoIF6iRE";

export const getLocationId = async (location: string) => {
    var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${location}&inputtype=textquery&key=${API_KEY}`,
        headers: { }
      };
      
      const response = await axios(config);
      return response.data.candidates[0].place_id;
      
}

export const getPlaceDetails = async (placeid: string) => {
    var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeid}&key=${API_KEY}`,
        headers: { }
      };
      
      return axios(config)
      .then(function (response) {
        return response.data.result;
      })
      .catch(function (error) {
        console.log(error);
        return null;
      });
}
/*
{
  photos:[{
    photo_reference: "" used to get photo from Place Photo API
  }]
}
*/

export const getPlacePhoto = async (photoreference: string) => {
    var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoreference}&key=${API_KEY}`,
        headers: { }
      };
      
      const imageSrc = await axios(config);
      return imageSrc;
}