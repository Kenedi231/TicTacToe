
function getInitPOST(body = {}) {
    let headers = new Headers({
        "Content-Type": "application/json",
    });
    return {
        method: 'POST',
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: body
    };
}

export default getInitPOST;