const API_URL = 'https://opentdb.com';

export async function getQuestions(sessionToken) {
    try {
        const resp = await fetch(`${API_URL}/api.php?amount=10&token=${sessionToken}`);

        if(!resp.ok) {
            throw new Error(`Response status: ${resp.status}`);
        }

        const data = await resp.json();

        if(data.response_code !== 0) {
            throw new Error(`Request returned response code: ${data.response_code}`);
        }

        return data;
    } catch (err) {
        console.error(err);
    }
}

export async function getToken() {
    try {
        const resp = await fetch(`${API_URL}/api_token.php?command=request`);

        if(!resp.ok) {
            throw new Error(`Response status: ${resp.status}`);
        }

        const data = await resp.json();
        return data.token;
    } catch (err) {
        console.error(err);
    }
}
