var key = 'AIzaSyBN6zrTJstlBS7DZN-mQpQtUH9SSRElmZ0';
const baseURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
export const locationService = {
  

    //Reverse Geocoding 
    getLocation: (lat, lng) => {
        const url = baseURL + lat + ',' + lng + '&key=' + key;
        return (
            fetch(url)
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    } else {
                       //Missing Error Handling
                    }
                })
                .then(res => { return res })
                .catch(error => {
                    console.log('Could not reach API', error);
                    throw error;
                })
        )
    }
}
