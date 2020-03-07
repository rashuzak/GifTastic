
// GLOBAL VARIABLES
let disneyMovies = ["The Little Mermaid", "Mulan", "The Lion King", "Aladdin", "Lady and the Tramp", "The Aristocats", "Bambi", "Chicken Little", "Pinocchio", "Brother Bear"];

let limitRating = "PG";

$(document).ready(function(){

// FUNCTIONS
// This function takes the array of disneyMovies and creates individual buttons for each movie using the for loop.
function arrayButtons() {
    for(let i = 0; i < disneyMovies.length; i++) {
        let movieButton = $("<button>");
      
        movieButton.text(disneyMovies[i]);
        movieButton.addClass("movieButton");
        $("#movie-Buttons").append(movieButton);
    };
    // This click function will display the gifs from the GIPHY API when the movieButton is clicked.
    $(".movieButton").on("click", function() {
        $(".gifs-holder").empty();
        searchGiphy($(this).text());
    });
};
// This function will search for the movie name entered by the user and then push the name to the disneyMovies array if their button does not already exist.

function buttonAddMovie(movie) {
    if(disneyMovies.indexOf(movie) === -1) {
        disneyMovies.push(movie);
        $("#movie-Buttons").empty();
        arrayButtons();
    };
};

// This function will use AJAX to fetch the API data from the GIPHY url below.
function searchGiphy(movie) {
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=GxTep39gN0O08oxfAnKwNABsEqNH9UPO&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        let results = response.data;
        results.forEach(function(element) {
            // Need a new div tag to store the ratings.
            let addDiv = $("<div>");
            addDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
            addDiv.attr("align", "center");
            addDiv.addClass("gif-box");
            // Need a new img tag to store the gifs.
            let newGiphy = $("<img src = '" + element.images.fixed_height_still.url + "'>");
            newGiphy.attr("data-state", "still");
            newGiphy.attr("data-stil", element.images.fixed_height_still.url);
            newGiphy.attr("data-animated", element.images.fixed_height.url);
            newGiphy.addClass("giphy");
            // Add the newGiphy variable to the addDiv variable
            addDiv.append(newGiphy);
            // Add the addDiv variable to the .gifs-holder id
            $(".gifs-holder").append(addDiv);
        });
        
        // Click function for if/else conditional statement to define which gif is to play or pause
        $(".giphy").on("click", function() {
            let state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animated"));
                $(this).attr("data-state", "animated");
            } else {
                $(this).attr("src", $(this).attr("data-stil"));
                $(this).attr("data-state", "still");
            };
        });
    });
};
    // CALL FUNCTIONS
    arrayButtons();
    $("#add-movie").on("click", function() {
        event.preventDefault();
        let userChoice = $("#user-input").val().trim();
            buttonAddMovie(userChoice);
            $("#user-input").val("");
    });
});