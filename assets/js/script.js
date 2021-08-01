// Variables
var buttonsEl = document.querySelector("#button-div");
var homeBtnEl = document.querySelector("#home");
var outBtnEl = document.querySelector("#out");
var displayEl = document.querySelector("#display-choice");

// create a function to fetch staying home data for button click
var homeClickHandler = function () {
	
	// create a random number between 1 and 9 to use as random page generated in watchmode data (that's how many pages are shown with this type=movies)
	var randomPage = Math.floor((Math.random() * 9) + 1)

	// Get data from watchmode for id of random movie
	fetch("https://api.watchmode.com/v1/list-titles/?apiKey=kzLgYLX7rWTr6JhDKvxp1yGMscrDZCCQM81OApCG&source_ids=203&types=movie&page=" + randomPage)
		.then(function (response) {
			if (response.ok) {
				return response.json()
			}
		})
		.then(function (body) {
			console.log(body)

			// use math.random to choose a random movie from the list of data and get movie id from data
			var movieTitleId = body.titles[Math.floor(Math.random() * body.titles.length)].id;

			// fetch title details for random movie using 
			return fetch(`https://api.watchmode.com/v1/title/${movieTitleId}/details/?apiKey=kzLgYLX7rWTr6JhDKvxp1yGMscrDZCCQM81OApCG`)
		})
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

			displayEl.textContent = ""

			// display random choice to html page
			var chooseAgainEl = document.createElement("p");
			chooseAgainEl.textContent = "(Click again for another option.)";
			displayEl.appendChild(chooseAgainEl);

			var netflixChoiceEl = document.createElement("h1");
			netflixChoiceEl.textContent = "Watch this movie on Netflix!"
			displayEl.appendChild(netflixChoiceEl); 

			var titleEl = document.createElement("h2");
			titleEl.textContent = movieInfo.title;
			displayEl.appendChild(titleEl);

			var ratingEl = document.createElement("span");
			if (!movieInfo.rating) {
				ratingEl.textContent = "Rated: NR";
			} else {
				ratingEl.textContent = `Rated: ${movieInfo.rating}`;
			}
			displayEl.appendChild(ratingEl);

			var userRatingEl = document.createElement("div");
			userRatingEl.textContent = `User Rating: ${movieInfo.userRating}`
			displayEl.appendChild(userRatingEl);

			var runtimeEl = document.createElement("div");
			runtimeEl.textContent = `Runtime: ${movieInfo.runtime} minutes`;
			displayEl.appendChild(runtimeEl);

			var releaseDateEl = document.createElement("div");
			releaseDateEl.textContent = `Released: ${movieInfo.year}`;
			displayEl.appendChild(releaseDateEl);

			var descriptionLabel = document.createElement("h3");
			descriptionLabel.textContent = "Movie Summary:";
			displayEl.appendChild(descriptionLabel);

			var descriptionEl = document.createElement("p");
			descriptionEl.textContent = movieInfo.description;
			displayEl.appendChild(descriptionEl);
		})
}



// create a function for going out data for button click
var goingOutClickHandler = function () {

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
				console.log(body)

				// use math.random to choose a random event from the list of data
				var randomEvent = body._embedded.events[Math.floor(Math.random() * body._embedded.events.length)];
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


}





// Click handlers
homeBtnEl.addEventListener("click", homeClickHandler);
outBtnEl.addEventListener("click", goingOutClickHandler);


