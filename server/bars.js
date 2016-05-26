"use strict";
var _ = require('underscore');
var keys = require('../configuration.js');
var axios = require('axios');

function getBarsList(location, radius) {
<<<<<<< 6608e5616a1d2344d2847b3eb76e41183408a244
  // build request string
=======
>>>>>>> core: removed unnecessary comments
  let base = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
  let params = {
    // build this request object
    location: location,
    radius: radius,
    type: 'bar',
    opennow: true,
    key: keys.GOOGLE_PLACES_API_KEY
  }
// return results
  return axios.get(base, params)
    .then((response) => {
      return response.data;
    })
    .catch(function (response) {
      if (response instanceof Error) {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', response.message);
      } else {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        console.log(response.data);
        console.log(response.status);
        console.log(response.headers);
        console.log(response.config);
      }
<<<<<<< 6608e5616a1d2344d2847b3eb76e41183408a244
    }); 
=======
    });  
  
>>>>>>> core: removed unnecessary comments
}

module.exports = getBarsList
