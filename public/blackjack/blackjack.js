////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////     BLACKJACK     ///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// declared variables
var possibleCardSymbols = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];
//var possibleCardSymbols = ["2","3","4","ace","ace","ace","ace","ace","10","jack", "queen", "king", "ace"];
var possibleCardSuit = ["spades", "hearts", "clubs", "diamonds"];
var deck = [];
var userHandArray = [];
var dealerHandArray = [];
var userNumWins = 0;
var dealerNumWins = 0;
var numTies = 0;
var dHand = 0;
var uHand = 0;

//jquery
//This hides the hit and stay buttons and the table for the beginning
//until the user clicks the play blackjack button
$("#hitButton").hide();
$("#stayButton").hide();
document.getElementById("tableBlackJack").style.display = "none";
//--------------------------------------------FUNCTIONS---------------------------------------------------//

//blackJackGame function that correlates to the html button to start a game
// no inputs or outputs
function blackJackGame ()
{

    //jquery
    //This hides the play again button
    $("#btnPlayBlackjack").hide();
    $("#hitButton").show();
    $("#stayButton").show();

    document.getElementById("userHand").innerHTML = "<p style='padding: 10px; display: inline'>Your Hand</p>";
    document.getElementById("dealerHand").innerHTML = "<p style='padding: 10px; display: inline'>Dealer's Hand</p>";
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

    // check to see if the user got 21 after receiving the first two cards
    // if they did then run finalResults Function
    uHand = symbolAssigner(userHandArray);
    if (uHand === 21) {
        dHand = dealerHand();
        if (dHand === 21) {
            matchObjectToCardDealer(dealerHandArray[1].symbol + "_of_" + dealerHandArray[1].suit);
        }
        finalResults(uHand, dHand);

        //jquery
        //This hides the hit and stay buttons
        $("#hitButton").hide();
        $("#stayButton").hide();
    }
}// End blackJackGame function

//resetTable Function
//resets everything on the table in order to play again
//output - return a shuffled deck
function resetTable () {
    console.clear();
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
}// End resetTable Function

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
    document.getElementById("userHandCards").style.padding = 10 + "px";
}//End matchObjectToCardUser Function

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
    document.getElementById("dealerHandCards").style.padding = 10 + "px";

}//End matchObjectToCardDealer Function

//userHandHit Function
//input - none
//output - returns the userHandArray
//This function is called when the user clicks the "HIT" button in the html
//used for matching suit and number to their picture as they are drawn
function userHandHit() {
    var poppedCard = deck.pop();
    userHandArray.push(poppedCard);
    matchObjectToCardUser(poppedCard.symbol + "_of_" + poppedCard.suit);

    // Check to see if user went over 21 or has 21
    // finalResultsUserLoss is run if over 21 and finalResults is run if user has 21
    uHand = symbolAssigner(userHandArray);
    if (uHand > 21) {
        finalResultsUserLoss(uHand);
    } else if (uHand === 21) {
        //jquery
        //This hides the hit and stay buttons
        $("#hitButton").hide();
        $("#stayButton").hide();
        finalResults(uHand, dealerHand());
    }
}// End userHandHit Function

//userHandStay Function
//input - none
//output - none, other than using other functions to write strings to the html
//This function is called when the user clicks the "STAY" button in the html
//used for matching suit and number to their picture as they are drawn
function userHandStay () {
    //jquery
    //This hides the hit and stay buttons
    $("#hitButton").hide();
    $("#stayButton").hide();
    dHand = dealerHand();
    uHand = symbolAssigner(userHandArray);

    console.log("Dealer Total: " + dHand);
    console.log("User Total: " + uHand);
    //This reveals the dealers second card
    //matchObjectToCardDealer(dealerHandArray[1].symbol + "_of_" + dealerHandArray[1].suit);

    //call the finalResults function to see who won
    finalResults(uHand, dHand);
}// End userHandStay Function

//finalResultsUserLoss Function
//inputs - the userHand array
//outputs - none, other than writing strings to html page
function finalResultsUserLoss(userTot) {
    document.getElementById("userHand").innerHTML = "<p style='padding: 10px; display: inline'>Your Hand Total: </p>" + userTot;
    if (userTot > 21) {
        document.getElementById("whoWon").innerHTML = "<h1 style='padding: 10px; display: inline'>You BUSTED!!!</h1>";
        dealerNumWins++;
    }

    //Hide Hit and Stay button
    $("#hitButton").hide();
    $("#stayButton").hide();
    //document.getElementById("hitButton").innerHTML = " ";
    //document.getElementById("stayButton").innerHTML = " ";

    //display message on how to play again
    document.getElementById("toPlayAgain").innerHTML = "<br><p style='padding: 10px; display: inline'>To play again, click the button below</p>";

    //document.getElementById("btnPlayBlackjack").innerHTML = "<a>Click here to play Blackjack</a>";

    //jquery
    //This shows the play again button
    $("#btnPlayBlackjack").show();

    //this shows and updates the chart and that the dealer won the game
    dealerNumWins++;
    chart();
}//End finalResultsUserLoss Function

//finalResults Function
//inputs - the userHand array and the dealerHand array
//outputs - none other than writing strings to html page
function finalResults (userTot, dealerTot) {
    document.getElementById("userHand").innerHTML = "<p style='padding: 10px; display: inline'>Your Hand Total: </p>" + userTot;
    document.getElementById("dealerHand").innerHTML = "<p style='padding: 10px; display: inline'>Dealer's Hand Total: </p>" + dealerTot;

    //Use logic to compare the user and dealer totals to see who won
    //see if user busted
    if (userTot > 21) {
        document.getElementById("whoWon").innerHTML = "<h1 style='padding: 10px; display: inline'>You BUSTED!!!</h1>";
        dealerNumWins++;
    } else if (dealerTot !== 21 && userTot === 21) {
        document.getElementById("whoWon").innerHTML = "<h1 style='padding: 10px; display: inline'>You win with a 21. BLACKJACK!!!</h1>";
        userNumWins++;
    }  else if (dealerTot > 21) {
        document.getElementById("whoWon").innerHTML = "<h1 style='padding: 10px; display: inline'>Dealer Busted! You Win!</h1>";
        userNumWins++;
    } else if (dealerTot === 21 && userTot < 21) {
        document.getElementById("whoWon").innerHTML = "<h1 style='padding: 10px; display: inline'>Dealer wins with a 21...</h1>";
        dealerNumWins++;
    } else if (dealerTot < userTot) {
        document.getElementById("whoWon").innerHTML = "<h1 style='padding: 10px; display: inline'>You beat the dealer!!!</h1>";
        userNumWins++;
    } else if (dealerTot === userTot) {
        document.getElementById("whoWon").innerHTML = "<h1 style='padding: 10px; display: inline'>Tie</h1>";
        numTies++;
    } else if (dealerTot > userTot) {
        document.getElementById("whoWon").innerHTML = "<h1 style='padding: 10px; display: inline'>The Dealer won...</h1>";
        dealerNumWins++;
    }

    //display message on how to play again
    document.getElementById("toPlayAgain").innerHTML = "<p style='padding: 10px; display: inline'>To play again, click the button below</p>";

    //document.getElementById("btnPlayBlackjack").innerHTML = "<a>Click here to play Blackjack</a>";

    //jquery
    //This shows the play again button
    $("#btnPlayBlackjack").show();

    //this shows and updates the chart
    chart();
}//End finalResults Function

//dealerHand Function
//input - none
//output - returns total of dealer hand for final calculation
function dealerHand () {
    //this count is two and then passed into dealerHand
    //so then the correct cards can be show after the ones that have already been drawn
    var count = 2;

    //Show the dealers second card
    matchObjectToCardDealer(dealerHandArray[1].symbol + "_of_" + dealerHandArray[1].suit);

    //do this loop until dealerTotal is 17 or higher
    do {
        var dealerTotal = 0;

        dealerTotal = symbolAssigner(dealerHandArray);

        if (dealerTotal < 17) {
            dealerHandArray.push(deck.pop());
            matchObjectToCardDealer(dealerHandArray[count].symbol + "_of_" + dealerHandArray[count].suit);
        }
        count++;
    } while (dealerTotal < 17);
    return dealerTotal;
}// End dealerHand Function

//symbolAssigner Function
//input - an array of objects
//output - total number for the dealer of users hand
//this function also matches symbols to the number they need and
//preforms logic for Aces
function symbolAssigner(array) {
    var numberTotal = 0;
    var numAcesUsed = 0;
    array.forEach(function (array) {
        if (array.symbol === "king" ||
            array.symbol === "queen" ||
            array.symbol === "jack") {
            numberTotal += 10;
        } else if (array.symbol === "ace") {
            numberTotal += 11;
            numAcesUsed++;
        } else {
            numberTotal += parseInt(array.symbol);
        }
    });
    if (numberTotal <= 11 && numAcesUsed === 1) {
        numberTotal += 10;
    }

    if (numberTotal > 21 && numAcesUsed === 1) {
        numberTotal -= 10;
    } else if (numberTotal > 21 && numAcesUsed === 2) {
        numberTotal -= 10;
        if (numberTotal > 21) {
            numberTotal -= 10;
        }
    } else if (numberTotal > 21 && numAcesUsed === 3) {
        numberTotal -= 10;
        if (numberTotal > 21) {
            numberTotal -= 10;
            if (numberTotal > 21) {
                numberTotal -= 10;
            }
        }
    } else if (numberTotal > 21 && numAcesUsed === 4) {
        numberTotal -= 10;
        if (numberTotal > 21) {
            numberTotal -= 10;
            if (numberTotal > 21) {
                numberTotal -= 10;
                if (numberTotal > 21) {
                    numberTotal -= 10;
                }
            }
        }
    }
    return numberTotal;
}// End symbolAssignerUser function

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
}//End createDeckObjects Function

//createCard Function
//input - suit and symbol from individual arrays
//output - an object that contains a suit and symbol
function createCard(suit, symbol) {
    return {
        suit: suit,
        symbol: symbol
    };
}// End createCard Function

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
}//End shuffle Function


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
                backgroundColor: "#D2F8FF"
            },
            title: {
                text: 'Player VS Dealer'
            },
            xAxis: {
                categories: [""]
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
}//End chart Function