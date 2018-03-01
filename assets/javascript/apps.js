
var stickers = ["Car", "Flower", "Dog", "Emoji"];

function displayStickers() {

    var sticker = $(this).attr("data-name");
    // var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ sticker +"&api_key=2i8xBwliDKymSUfr0txea1n8PPxVwE5r&limit=5";

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=2i8xBwliDKymSUfr0txea1n8PPxVwE5r&q=" + sticker + "&limit=10&offset=0&rating=G&lang=en"
    // var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=2i8xBwliDKymSUfr0txea1n8PPxVwE5r&q=cat&limit=25&offset=0&rating=G&lang=en"
    // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sticker + "&api_key=2i8xBwliDKymSUfr0txea1n8PPxVwE5r";

    // console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response)

        // Creating a div to hold the sticker
        var stickerDiv = $("<div class='sticker'>");

        // // Appending the image
        // stickerDiv.append(image);
        // Retrieving the URL for the image
        // var imgURL = response.data.images.fixed_width.url;
        var imgURLs = response.data;

        if (imgURLs == "") {
            alert("Sorry No Gif's found.");
            console.log("sorry no gifs found")
        }

        for (var i = 0; i < imgURLs.length; i++) {

            var gifDiv = $("<div>"); //div for the gifs to go inside
            gifDiv.addClass("gifDiv");
            // pulling rating of gif
            var gifRating = $("<p>").text("Rating: " + imgURLs[i].rating);
            gifDiv.append(gifRating);
            // pulling gif
            var gifImage = $("<img>");
            gifImage.attr("src", imgURLs[i].images.fixed_height_small_still.url); // still image stored into src of image
            gifImage.attr("data-still", imgURLs[i].images.fixed_height_small_still.url); // still image
            gifImage.attr("data-animate", imgURLs[i].images.fixed_height_small.url); // animated image
            gifImage.attr("data-state", "still"); // set the image state
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            // pulling still image of gif

            $("#stickers-view").prepend(gifDiv);
        }
    });
}


$(document).on("click", ".image", function () {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});

function makeButtons() {

    // Deleting the stickers before adding new stickers       
    //This makes sure that the same button doesn't repeat
    $("#buttons-view").empty();

    // Looping through the array of stickers
    for (var i = 0; i < stickers.length; i++) {


        var searchItem = $("<button>");

        searchItem.addClass("sticker-btn");

        searchItem.attr("data-name", stickers[i]);

        searchItem.text(stickers[i]);

        $("#buttons-view").append(searchItem);
    }
}

// This function handles events when a sticker button is clicked
$("#add-sticker").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var sticker = $("#sticker-input").val().trim();


    //Adding sticker to the array
    stickers.push(sticker);


    makeButtons();
    clearSearch();
});


$(document).on("click", ".sticker-btn", displayStickers);


makeButtons();



//Function to Clear search field when submit button is clicked
function clearSearch() {
    // console.log("calling clear search")
    // if(document.getElementById("sticker-input").value === "") {
    document.getElementById("sticker-input").value = "";
}//if condition ends here.
                // }//MySearch function ends here.


                // clearSearch()
