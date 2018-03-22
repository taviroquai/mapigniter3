
const get = (url) => {
    return new Promise(resolve => {
        fetch(url, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then((result) => {
            resolve(result)
        }).catch(err => {
            resolve(false)
        })
    })
};

const post = (url, data, isFormData = false) => {
    return new Promise(resolve => {
        const headers = {}
        if (!isFormData) headers['Content-Type'] = 'application/json'
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: headers,
            body: isFormData ? data : JSON.stringify(data)
        })
        .then(res => res.json())
        .then((result) => {
            resolve(result)
        }).catch(err => {
            resolve(false)
        })
    })
}

const remove = (url) => {
    return new Promise(resolve => {
        fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then((result) => {
            resolve(result)
        }).catch(err => {
            resolve(false)
        })
    })
}

export default {
    get,
    post,
    remove
}
