const key = process.env.EXPO_PUBLIC_GEOLOCATION_API_KEY;
const baseURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
export const locationService = {
  

    //Reverse Geocoding 
    getLocation: (lat, lng) => {
        const url = baseURL + lat + ',' + lng + '&key=' + key;
        return (
            fetch(url)
                .then(async (res) => {
                    const result = await res.json();
                    
                    if (result.status === 'REQUEST_DENIED') {
                        return {
                            flag: 'fail',
                            message: result.error_message
                        }
                    } else {
                        return {
                            flag: 'success',
                            data:result
                        }
                    }
                  
                })
                .catch(error => {
                    console.log('Could not reach Geocoding API', error);
                    return error;
                })
        )
    }
}
