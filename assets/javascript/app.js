$(document).ready(function(){
  
 
 // Initial array of heroes
 var heroes = ["Batman", "Ironman", "Wonder Woman", "Hulk", "The Flash"];

 // displayheroInfo function re-renders the HTML to display the appropriate content
 function displayheroInfo() {

     var hero = $(this).attr("data-name");
     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + hero + "&limit=9&api_key=s4iy00EOrGdwBmhxLXvv0bm8b41bHS93";

    
     // Creating an AJAX call for the specific hero button being clicked
     $.ajax({
         url: queryURL,
         method: "GET"
     }).then(function (response) {
         console.log(response)
         var results = response.data;
         for (var i = 0; i < results.length; i++) {

             // Only taking action if the photo has an appropriate rating
             if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                 // Creating a div for the gif
                 var gifDiv = $("<div>");

                 // Storing the result item's rating
                 var rating = results[i].rating;
                 var still = results[i].images.original_still.url
                 var moving = results[i].images
                 console.log (still);
                 console.log(moving)

                 // Creating a paragraph tag with the result item's rating
                 var p = $("<p>").text("Rating: " + rating);

                 // Creating an image tag
                 var personImage = $("<img>");

                 // Giving the image tag an src attribute of a proprty pulled off the
                 // result item
                 personImage.attr("src", results[i].images.fixed_height.url);


                 // Appending the paragraph and personImage we created to the "gifDiv" div we created
                 gifDiv.append(personImage);
                 gifDiv.append(p);
                 

                 // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                 $("#gifs-appear-here").prepend(gifDiv);
             }
         }

    
     });

 }

 // Function for displaying hero data
 function renderButtons() {

     // Deleting the heroes prior to adding new heroes
     // (this is necessary otherwise you will have repeat buttons)
     $("#buttons-view").empty();

     // Looping through the array of heroes
     for (var i = 0; i < heroes.length; i++) {

         // Then dynamicaly generating buttons for each hero in the array
         // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
         var a = $("<button>");
         // Adding a class of hero-btn to our button
         a.addClass("hero-btn btn btn-outline-danger");
         // Adding a data-attribute
         a.attr("data-name", heroes[i]);
         // Providing the initial button text
         a.text(heroes[i]);
         // Adding the button to the buttons-view div
         $("#buttons-view").append(a);
     }
 }

 // This function handles events where a hero button is clicked
 $("#add-hero").on("click", function (event) {
     
    event.preventDefault();
     // This line grabs the input from the textbox
     var hero = $("#hero-input").val().trim();
if(hero===""){
    
}else{
     // Adding hero from the textbox to our array
     heroes.push(hero);

    // Calling renderButtons which handles the processing of our hero array
     renderButtons();
}
     
 });

 // Adding a click event listener to all elements with a class of "hero-btn"
 $(document).on("click", ".hero-btn", displayheroInfo);
 

 // Calling the renderButtons function to display the intial buttons
 renderButtons();
 
})

