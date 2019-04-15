
function getInitGET() {
    let headers = new Headers({
        "Content-Type": "text/json",
    });
    return {
        method: 'GET',
        headers: headers,
        mode: 'cors',
        cache: 'default'
    };
}

export default getInitGET;