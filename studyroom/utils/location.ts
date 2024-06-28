// import axios from 'axios';

// export default async function getPlaceNameFromCoordinates(lat, lng) {
//   try {
//     const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=<span class="math-inline">\{lat\},</span>{lng}&key=YOUR_API_KEY`);
//     // return response.data.results[0].formatted_address;
//     console.log(response)
//   } catch (error) {
//     console.error('Error fetching place name:', error);
//     // Handle the error here, e.g., return a default value or throw a custom error
//   }
// }



/**
 * Gets the location name from latitude and longitude using Google Maps Geocoding API.
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @returns {Promise<string>} A promise that resolves to the location name.
 */


export default async function getLocationName(latitude, longitude) {
  const apiKey = `AIzaSyAkhIxMCNP3DGFWQDCi_a45pyPks0H1xXI`
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === 'OK') {
      const locationName = data.results[0].formatted_address;
      console.log(locationName)
      return locationName;
    } else {
      throw new Error('Failed to get location name');
    }
  } catch (error) {
    console.error('Error getting location name:', error);
    throw error;
  }
}

