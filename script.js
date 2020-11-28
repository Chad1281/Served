var ingredients = ["beans", "rice", "cabbage", "milk", "water", "cinnamon", "cumin", "carrots", "barley", ""];

var data = [];
var tempData = [];
// putting the array outside the click event to preserve the changes made in it


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

// grabs the text typed into autocomplete form
// put into an array
function itemGen() {
    // validate by seeing if the content in the temp array is in the data array
    var ingredientList = capitalizeFirstLetter($('#myInput').val());

    for (var i = 0; i <= data.length; i++) {

        //if data has tempdata.toString?
        if (tempData.toString() === data[i]) {
            return;
        }
        if (tempData.toString() === "") {
            return;
        }
    }
    // after looping through every item in list, concat to new array and add it to global array var data
    newArr = data.concat(tempData);
    data = newArr;
    tempData = [];

    var guiList = $("<div>").text(ingredientList);

    // appends styled text to HTML container
    guiList.attr("class", "box column is-three-fifths").attr("id", "delete-me").css("margin-bottom", 3 + "%");

    var trashBtn = $("<img  id='img' src='img/trashcan.png'  style='width:12%; margin-bottom:4px; margin-left:4px; cursor:pointer' onclick='deleteBorgar(this)' />");   

    guiList.append(trashBtn);
    $('#ingred-list').append(guiList);

}

// function to delete each list item
function deleteBorgar(el) {

    // this one is bad
    // I need to find each one in particular
    var index = ($(el).closest('div').text());
      
    for (var i = 0; i < data.length; i++){ 
                                   
        if ( data[i] === index) { 
            data.splice(i, 1); 
            
        }
    }
    
    el.parentNode.parentNode.removeChild(el.parentNode);
}

$('#add-btn').on("click", function () {

    // push div list items to array
    var ingredientList = capitalizeFirstLetter($('#myInput').val());

    // push the input value into a temporary array
    tempData.push(ingredientList);

    // run validation function/item creation
    itemGen();

    // empty temporary array
    tempData = [];

    document.getElementById('myInput').value = '';
})

// on click function for emptying the entire list
$('#clear-btn').on("click", function () {
    $('#ingred-list').empty();
    data = [];
})

// take whatever items are in the list and return recipe cards






var queryIngredientsURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + ingredients + "&number=5&apiKey=27846b408a8344708ee32a5c91abf0a8";

$.ajax({
    url: queryIngredientsURL,
    method: "GET"
}).then(function (response) {


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
            var cardInnerDiv = $("<div>").attr("class", "card");

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
            var button = $("<button>").attr("class", "btn btn-primary").text("Go to Recipe");
            var saveBtn = $("<a href:''>").attr("id", "save-button");
            var saveHeart = $("<img>").attr("src", "./img/emptyHeart.png").attr("class", "heart-btn empty");

            saveBtn.append(saveHeart);

            cardBody.append(h4, pTag, button, saveBtn);
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

    heartClicker();
})


function heartClicker() {
    $('.heart-btn').on("click", function () {
        if ($(this).hasClass("empty")) {
            $(this).attr('src', './img/heart.png');
            $(this).addClass('full').removeClass('empty');
        }
        else {
            $(this).attr('src', './img/emptyHeart.png');
            $(this).addClass('empty').removeClass('full');

        }

    });
}
