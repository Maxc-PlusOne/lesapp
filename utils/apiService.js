const testURL = 'http://192.168.0.172:3000'; //json-server url for tests
const baseURL = '';
export const apiService = {
    get: (destination,id) => {
        const url = destination && !id ? (testURL + '/' + destination) : id ? (testURL + '/' + destination + '/' + id) : testURL;
        return (
            fetch(url)
                .then(res => {
                    if (res.ok) {
                        console.log('api says get request was successful, STATUS:', res.status);
                        return res.json();

                    } else {
                        console.log('api says get request failed, ERROR STATUS:', res.status);
                        return {status: res.status};
                    }
                })
                .then(res => { return res })
                .catch(error => {
                    console.log('Could not reach API', error);
                    throw error;
                })
                
        )
    },

    post: (destination, data) => {
        const url = (testURL + '/' + destination)

        return (
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(res => {
                    if (res.ok) {
                        console.log('api says post request successful, STATUS:', res.status);
                        return res.json() 
                    } else {
                        console.log('api says post request failed, STATUS:', res.status)
                        return { status: res.status };
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

