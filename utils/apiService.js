const testURL = 'http://192.168.0.172:3000/';
const testURL2 = 'https://23ba8e32-0bdb-4680-b84f-a3e67d592426.mock.pstmn.io/alerts';
const baseURL = 'https://api.restful-api.dev/objects';
export const apiService = {
    get: (destination = '') => {
        const url = destination ? testURL + '/' + destination : testURL;
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
    }
    ,

    post:(data)=> {

        return (
            fetch(testURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data })
            })
                .then(res => {
                    if (res.ok) {
                        console.log('api says post request successful, STATUS:', res.status);
                        return { ok: res.ok }
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

