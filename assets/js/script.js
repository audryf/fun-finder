// create a random number between 1 and 14 to use as random page generated in watchmode data
var randomPage = Math.floor((Math.random() * 9) + 1)

// Get data from watchmode for id of random movie
fetch("https://api.watchmode.com/v1/list-titles/?apiKey=kzLgYLX7rWTr6JhDKvxp1yGMscrDZCCQM81OApCG&source_ids=203&types=movie&page=" + randomPage)
	.then(function (response) {
		if (response.ok) {
			return response.json()
		}
	})
	.then(function (body) {
		// console.log(body)

		// use math.random to choose a random movie from the list of data and get movie id from data
		var movieTitleId = body.titles[Math.floor(Math.random() * 250)].id;

		// fetch title details for random movie using 
		return fetch(`https://api.watchmode.com/v1/title/${movieTitleId}/details/?apiKey=kzLgYLX7rWTr6JhDKvxp1yGMscrDZCCQM81OApCG`)

			.then(function (titleResponse) {
				if (titleResponse.ok) {
					return titleResponse.json()
				}
			})
			.then(function (titleBody) {
				// console.log(titleBody)
				var movieInfo = {
					title: titleBody.title,
					rating: titleBody.us_rating,
					userRating: titleBody.user_rating,
					description: titleBody.plot_overview,
					runtime: titleBody.runtime_minutes,
					year: titleBody.year
				}
				console.log(movieInfo);
			})
	})

// display random choice to html page



// get users current location
navigator.geolocation.getCurrentPosition((position) => {
	var latitude = position.coords.latitude;
	// console.log(latitude);
	var longitude = position.coords.longitude;
	// console.log(longitude);

	// get data from ticketmaster for name, description, image, cost, and location
	fetch(`https://app.ticketmaster.com/discovery/v2/suggest?latlong=${latitude},${longitude}&apikey=YxRbBqJ0OORNTA5ARkyi5R1uZSTtZHdH`)
		.then(function (response) {
			if (response.ok) {
				return response.json()
			}
		})
		.then(function (body) {
			// console.log(body)

			// use math.random to choose a random event from the list of data
			var randomEvent = body._embedded.events[Math.floor(Math.random() * 5)];
			// console.log(randomEvent);

			// create variables to hold this data
			var eventInfo = {
				name: randomEvent.name,
				url: randomEvent.url,
				startDate: randomEvent.dates.start.localDate,
				startTime: randomEvent.dates.start.localTime,
				image: randomEvent.images[0]
			}
			console.log(eventInfo);
			// display random choice to html page

		})

})








