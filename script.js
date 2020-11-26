var ingredients = ["beans", "rice", "cabbage", "milk", "water", "cinnamon", "cumin", "carrots", "barley", ""]
// TODO: Make each first letter capitalized automatically via CharAt[0]

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

autocomplete(document.getElementById("myInput"), ingredients);

function capitalizeFirstLetter(string) {
    return String(string).charAt(0).toUpperCase() + string.slice(1);

}

$('#add-btn').on("click", function () {

    // grabs the text typed into autocomplete form
    // capitalizes the input value
    var ingredientList = $("<ul>").text(capitalizeFirstLetter($('#myInput').val()))

    
    if($('#myInput').val() !== ""){

        // adds icon to the ul text element 
        ingredientList.append('<img id="trash" src="img/trashcan.png" style="width: 20%;padding-left: 5px; padding-bottom: 3px;"    />');
        
        // adds styling to the ul text element
        ingredientList.attr("class", "box column is-three-fifths").css("margin-bottom", 3 + "%").attr('id', 'theUl');
        
    }



    // creates a button for deleting ul text element
    // var ingredientClear = $("<button>").text('x').attr("class", "button column is-one-fifth").attr("id", "this-clear-btn").css("padding", 0);

    $('#this-clear-btn').on("click", function () {
        $('#ingred-list').empty();

    })

    // appends styled ul text to HTML container
    $('#ingred-list').append(ingredientList);

    

})

// on click function for emptying the entire list
$('#clear-btn').on("click", function () {
    $('#ingred-list').empty();
})







// take whatever items are in the list and return recipe cards
// 
function findListIngredients(response) {

    var queryIngredientList = `https://api.spoonacular.com/recipes/complexSearch?apiKey=6169f388db784517baecf8e2590f1d45&includeIngredients=${response}&number=100`;

    $.ajax({
        url: queryIngredientList,
        method: "GET"
      }).then(function(res) {

        // working code goes here
        console.log(res.results);
      })


}

findListIngredients();

$('#recipe-btn').on('click', function(){
    console.log($('#ingred-list').text());
    
   $( "ul" ).each(function() {
        console.log(findListIngredients( $( this ).text() + "," ));
      });

})








var queryIngredientsURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+carrots,+flour,+potatoes,+milk&number=5&apiKey=27846b408a8344708ee32a5c91abf0a8";

$.ajax({
    url: queryIngredientsURL,
    method: "GET"
}).then(function (response) {
    console.log(response);

    var caraselCardWrapper = $(".carousel-inner");
    var caraselIndicatorWrapper = $(".carousel-indicators");

    var cardsPerPage = 4;
    var isActiveCardSet = false;


    var caraselItem, indicatorItem;
    var cardIndex = 0;
    var indicatorIndex = 0;

    while (cardIndex < response.length) {
        if (isActiveCardSet === false) {
            caraselItem = $("<div>").attr("class", "carousel-item active");
            indicatorItem = $("<li>").attr("data-target", "#multi-item-example").attr("data-slide-to", indicatorIndex).attr("class", "active");

            isActiveCardSet = true;
        } else {
            caraselItem = $("<div>").attr("class", "carousel-item");
            indicatorItem = $("<li>").attr("data-target", "#multi-item-example").attr("data-slide-to", indicatorIndex);
        }

        // Append indicator
        caraselIndicatorWrapper.append(indicatorItem);
        indicatorIndex++; // Add 1 to indicator index

        while (cardIndex < response.length) {

            // Create main div that holds your single card
            var cardOuterDiv = $("<div>").attr("class", "col-md-3 left");

            // Create inner div that will hold the card image and body
            var cardInnerDiv = $("<div>").attr("class", "card mb-2");

            // Create image
            var image = $("<img>").attr("class", "card-img-top").attr("src", response[cardIndex].image);
            cardInnerDiv.append(image);

            // Create body
            var recipeTitle = response[cardIndex].title;
            var missedCount = response[cardIndex].missedIngredientCount;
            var usedCount = response[cardIndex].usedIngredientCount;
            var percentMatch = parseInt((usedCount / (missedCount + usedCount)) * 100) + "% match";
            var cardBody = $("<div>").attr("class", "card-body");
            var h4 = $("<h4>").attr("class", "card-title").text(recipeTitle);
            var pTag = $("<p>").attr("class", "card-text").text(percentMatch);
            var button = $("<button>").attr("class", "btn btn-primary").text("Button");
            cardBody.append(h4, pTag, button);
            cardInnerDiv.append(cardBody);

            // Append card inner div to outer div
            cardOuterDiv.append(cardInnerDiv);

            // Append card outer div to carasel item, and then to main carasel wrapper
            caraselItem.append(cardOuterDiv);
            caraselCardWrapper.append(caraselItem);

            if ((cardIndex + 1) % cardsPerPage === 0) {
                cardIndex++;
                break;
            }

            // increment my index
            cardIndex++;
        }
    }
})     