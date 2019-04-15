
function getInitGET() {
    let headers = new Headers({
        "Content-Type": "application/json",
    });
    return {
        method: 'GET',
        headers: headers,
        mode: 'cors',
        cache: 'default'
    };
}

export default getInitGET;