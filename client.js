async function makeReq() {
    try {
        const response = await fetch('http://localhost:80')
        console.log(response.status)
    } catch (err) {
        console.error('error')
    }
}

setInterval(makeReq, 100)
