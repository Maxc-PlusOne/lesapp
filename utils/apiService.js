import storageService from "./storageService";

const testURL = 'http://192.168.0.172:3000'; //json-server url for tests
const baseURL = 'http://192.168.0.172:5000/api';
export const apiService = {
    get:async (destination, id) => {
        const url = destination && !id ? (baseURL + '/' + destination) : id ? (baseURL + '/' + destination + '/' + id) : baseURL;
        const token = (await storageService.get('token')).replace(/^"|"$/g, '')
        return (
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:`Bearer ${token}`
                }
            })
                .then(async res => {
                    //console.log('Getting data from, ', url)
                    if (res.ok) {
                        console.log('api says get request was successful, STATUS:', res.status);
                        return res.json();

                    } else {
                        console.log('api says get request failed, ERROR STATUS:', res.status);
                        console.log(res);
                        const response = await res.json();
                        const error = response.error;
                        return {error:error};
                    }
                })
                .then(res => { return res })
                .catch(error => {
                    console.log('Error', error);
                    throw error;
                })
                
        )
    },
    post: async (destination, data) => {
        const url = (baseURL + '/' + destination);
        const token = (await storageService.get('token')).replace(/^"|"$/g, '')
        return (
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data),
  
            })
                .then(async res => {
                   // console.log('Posting:', data, 'to URL', res.url, ' with token: ', token)
                    if (res.ok) {
                        console.log('api says post request successful, STATUS:', res.status);
                        return res.json()
                    } else {
                        console.log('api says post request failed, STATUS:', res.status);
                        const response = await res.json()
                        console.log(response);
                        const error = response.error;
                        return { error: error }
                    }
                })
                .then(res => { return res })
                .catch(error => {
                    console.log('Error', error);
                    throw error;
                })
        )
    },

    auth: {
        post: (destination, data) => {
            const url = (baseURL + '/auth/' + destination)
            return (
                fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })
                    .then(async res => {
                        //console.log('Posting:', data, 'to URL', res.url)
                        if (res.ok) {
                            console.log('api says post request successful, STATUS:', res.status);
                            return res.json()
                        } else {
                            console.log('api says post request failed, STATUS:', res.status);
                            const response = await res.json()
                            const error = response.error;
                            return { error: error }
                        }
                    })
                    .then(res => { return res })
                    .catch(error => {
                        console.log('Error', error);
                        throw error;
                    })
            )
        }
    }
}

