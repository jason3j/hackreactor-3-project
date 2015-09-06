////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////     BLACKJACK     ///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// declared variables
var possibleCardSymbols = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];
//var possibleCardSymbols = ["2","3","4","ace","ace","ace","ace","ace","10","jack", "queen", "king", "ace"];
var possibleCardSuit = ["spades", "hearts", "clubs", "diamonds"];
var timesUserHit = 0;
var deck = [];
var userHandArray = [];
var dealerHandArray = [];
var userNumWins = 0;
var dealerNumWins = 0;
var numTies = 0;

//
//This hides the hit and stay buttons and the table for the beginning
//until the user clicks the play blackjack button
document.getElementById("hitButton").innerHTML = " ";
document.getElementById("stayButton").innerHTML = " ";
document.getElementById("tableBlackJack").style.display = "none";
//--------------------------------------------FUNCTIONS---------------------------------------------------//

//blackJackGame function that correlates to the html button to start a game
// no inputs or outputs
function blackJackGame () {
    document.getElementById("userHand").innerHTML = "Your Hand";
    document.getElementById("dealerHand").innerHTML = "Dealer's Hand";
    document.getElementById("tableBlackJack").style.display = "table";

    // call the resetTable function to reset everything on the table so the user can play again
    resetTable();

    // give user and dealer each two cards which are popped out of the deck array
    userHandArray.push(deck.pop());
    dealerHandArray.push(deck.pop());
    userHandArray.push(deck.pop());
    dealerHandArray.push(deck.pop());

    // show user what cards that start with
    matchObjectToCardUser(userHandArray[0].symbol + "_of_" + userHandArray[0].suit);
    matchObjectToCardUser(userHandArray[1].symbol + "_of_" + userHandArray[1].suit);

    // show user one card the dealer starts with
    matchObjectToCardDealer(dealerHandArray[0].symbol + "_of_" + dealerHandArray[0].suit);

}// end blackJackGame function

//resetTable Function
//resets everything on the table in order to play again
//output - return a shuffled deck
function resetTable () {
    //these show the Hit and Stay buttons in the html again after the finishing the previous game
    document.getElementById("hitButton").innerHTML = "<button onclick=\"userHandHit()\">HIT</button>";
    document.getElementById("stayButton").innerHTML = "<button onclick=\"userHandStay()\">STAY</button>";

    //these reset the table in the html so that no cards from the previous game are showing
    document.getElementById("toPlayAgain").innerHTML = " ";
    document.getElementById("dealerHandCards").innerHTML = " ";
    document.getElementById("userHandCards").innerHTML = " ";
    document.getElementById("whoWon").innerHTML = " ";

    //variables that need to be reset
    userHandArray = [];
    dealerHandArray = [];

    // put cards in deck array
    deck = createDeckObjects();

    // call the shuffle function to shuffle deck array and return deck
    shuffle(deck);
    return deck;
}

//matchObjectToCardUser Function
//input - string with card data
//output - card with picture on html page in the user table section
function matchObjectToCardUser (cardString) {
    //this matches string to the card
    var img = document.createElement("img");
    img.src = "../Pictures/faceCards/" + cardString + ".png";
    img.width = 100;
    img.height = 100;
    img.alt = "card";

    //this shows the card to html page
    document.getElementById("userHandCards").appendChild(img);
}

//matchObjectToCardDealer Function
//input - string with card data
//output - card with picture on html page in the dealer table section
function matchObjectToCardDealer (cardString) {
    //this matches string to the card
    var img = document.createElement("img");
    img.src = "../Pictures/faceCards/" + cardString + ".png";
    img.width = 100;
    img.height = 100;
    img.alt = "card";

    //this shows the card to html page
    document.getElementById("dealerHandCards").appendChild(img);
}

//userhandHit Function
//input - none
//output - returns the userHandArray
//This function is called when the user clicks the "HIT" button in the html
//used for matching suit and number to their picture as they are drawn
function userHandHit() {
    timesUserHit++;
    var poppedCard = deck.pop();
    userHandArray.push(poppedCard);
    matchObjectToCardUser(poppedCard.symbol + "_of_" + poppedCard.suit);

    if(timesUserHit === 11) {
        document.getElementById("hitButton").innerHTML = " ";
        timesUserHit = 0;
    }
    return userHandArray;
}// end userHandHit Function

//userHandStay Function
//input - none
//output - none, other than using other functions to write strings to the html
//This function is called when the user clicks the "STAY" button in the html
//used for matching suit and number to their picture as they are drawn
function userHandStay () {
    //This hides the hit and stay buttons
    document.getElementById("hitButton").innerHTML = " ";
    document.getElementById("stayButton").innerHTML = " ";

    console.log("Dealer Total: " + dealerHand());
    console.log("User Total: " + userHand());
    //This reveals the dealers second card
    matchObjectToCardDealer(dealerHandArray[1].symbol + "_of_" + dealerHandArray[1].suit)

    //call the finalResults function to see who won
    finalResults(userHand(), dealerHand());
}

//finalResults Function
//inputs - the userHand array and the dealerHand array
//outputs - none other than writing strings to html page
function finalResults (userTot, dealerTot) {
    document.getElementById("userHand").innerHTML = "Your Hand Total: " + userTot;
    document.getElementById("dealerHand").innerHTML = "Dealer's Hand Total: " + dealerTot;

    var toPlayAgain = "<p>To play again, click the button above</p>";
    //Use logic to compare the user and dealer totals to see who won
    //see if user busted
    if (userTot > 21) {
        document.getElementById("whoWon").innerHTML = "<h1>You BUSTED!!!</h1>";
        dealerNumWins++;
    } else if (dealerTot !== 21 && userTot === 21) {
        document.getElementById("whoWon").innerHTML = "<h1>You win with a 21. BLACKJACK!!!</h1>";
        userNumWins++;
    }  else if (dealerTot > 21) {
        document.getElementById("whoWon").innerHTML = "<h1>Dealer Busted! You Win!</h1>";
        userNumWins++;
    } else if (dealerTot === 21 && userTot < 21) {
        document.getElementById("whoWon").innerHTML = "<h1>Dealer wins with a 21...</h1>";
        dealerNumWins++;
    } else if (dealerTot < userTot) {
        document.getElementById("whoWon").innerHTML = "<h1>You beat the dealer!!!</h1>";
        userNumWins++;
    } else if (dealerTot === userTot) {
        document.getElementById("whoWon").innerHTML = "<h1>Tie</h1>";
        numTies++;
    } else if (dealerTot > userTot) {
        document.getElementById("whoWon").innerHTML = "<h1>The Dealer won...</h1>";
        dealerNumWins++;
    }

    //display message on how to play again
    document.getElementById("toPlayAgain").innerHTML = "<p>To play again, click the button above</p>";

    //this shows and updates the chart
    chart();
}

//userHand Function
//input - none
//output - returns total of user hand for final calculation
function userHand () {
    //this count is two and then passed into dealerHand and userHand
    //so then the correct cards can be show after the ones that have already been drawn
    var count = 2;
    do {
        var userTotal = 0;

        userTotal = symbolAssigner(userHandArray);
        //userHandArray.push(deck.pop());
        //matchObjectToCardDealer(userHandArray[count].symbol + "_of_" + userHandArray[count].suit)
        count++;
    } while (count < userHandArray.length);
    return userTotal;
}

//dealerHand Function
//input - none
//output - returns total of dealer hand for final calculation
function dealerHand () {
    //this count is two and then passed into dealerHand and userHand
    //so then the correct cards can be show after the ones that have already been drawn
    var count = 2;

    //do this loop until dealerTotal is 17 or higher
    do {
        var dealerTotal = 0;

        dealerTotal = symbolAssigner(dealerHandArray);

        if (dealerTotal < 17) {
            dealerHandArray.push(deck.pop());
            matchObjectToCardDealer(dealerHandArray[count].symbol + "_of_" + dealerHandArray[count].suit)
        }
        count++;
    } while (dealerTotal < 17);
    return dealerTotal;
}// end dealerHand Function

//symbolAssigner Function
//input - an array of objects
//output - total number for the dealer of users hand
//this function also matches symbols to the number they need
function symbolAssigner(array) {
    var numberTotal = 0;
    array.forEach(function (array) {
        if (array.symbol === "king" ||
            array.symbol === "queen" ||
            array.symbol === "jack") {

            numberTotal += 10;
        } else if (array.symbol === "ace") {
            numberTotal += 1;
            var aceUsed = true;
        } else {
            numberTotal += parseInt(array.symbol);
        }

        if (numberTotal <= 11 && aceUsed === true) {
            numberTotal += 10;
        }
    });
    return numberTotal;
}// end symbolAssignerUser function

//createDeckObjects Function
//input - none
//output - returns the deck that it creates which is an array
//function to create all the objects
function createDeckObjects() {
    var theDeck = [];
    possibleCardSymbols.forEach(function (symbol) {
        possibleCardSuit.forEach(function (suit) {
            theDeck.push(createCard(suit, symbol));
        });
    });
    return theDeck;
}

//createCard Function
//input - suit and symbol from individual arrays
//output - an object that contains a suit and symbol
function createCard(suit, symbol) {
    return {
        suit: suit,
        symbol: symbol
    };
}

//shuffle Function
//input - an array that is the created deck
//output - none
// function to shuffle the deck array
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////      CHART       ////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//chart Function
//used to grabbed the chart
function chart () {

    $(function () {

        $('#highChartGraph').highcharts({
            chart: {
                type: 'column',
                backgroundColor: "#D2F8FF",

            },
            title: {
                text: 'Player VS Dealer'
            },
            xAxis: {

                title: {
                    text: "Player/Dealer Wins"
                }
            },
            yAxis: {
                title: {
                    text: "Times Played"
                }
            },
            series: [{
                name: 'Player',
                data: [userNumWins]
            }, {
                name: 'Dealer',
                data: [dealerNumWins]
            }, {
                name: 'Ties',
                data: [numTies]
                }]
        });
    });
}
