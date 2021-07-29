fetch("https://app.ticketmaster.com/discovery/v2/events.json?apikey=YxRbBqJ0OORNTA5ARkyi5R1uZSTtZHdH")
.then(function (response) {
    if (response.ok) {
        return response.json()
    }
})
.then(function(body) {
    console.log(body)
})

fetch("https://api.watchmode.com/v1/sources/?apiKey=kzLgYLX7rWTr6JhDKvxp1yGMscrDZCCQM81OApCG")
.then(function (response) {
    if (response.ok) {
        return response.json()
    }
})
.then(function(body) {
    console.log(body)
})

fetch("https://app.ticketmaster.com/discovery/v2/suggest?segmentId=KZFzniwnSyZfZ7v7nn&apikey=YxRbBqJ0OORNTA5ARkyi5R1uZSTtZHdH")
.then(function (response) {
    if (response.ok) {
        return response.json()
    }
})
.then(function(body) {
    console.log(body)
})