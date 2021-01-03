export default function request(url, method = 'GET', body) {

    const config = {
        method,
        headers: {
            "Content-Type": "application/json"
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    };

    return fetch(url, config)
        .then((res) => res.json())
        .then(res => {
            if (res.error) {
                throw res.error;
            };
            return res;
        });
};