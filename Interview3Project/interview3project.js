
//this calls the random fact api right when the page is loaded
$().ready(function() {
    $.ajax({
        url: "https://numbersapi.p.mashape.com/random/trivia?fragment=true&json=true&max=1000&min=0",
        headers: {"X-Mashape-Key": "ZpMtsjR98WmshEfAm8ywcmq5o4Osp1QtMcxjsn70UJR79HgQtO"},
        success: randomAPIReturn
    });
});

//this calls the random fact api when the randomBtn is clicked
$("#randomBtn").click(function() {
    $.ajax({
        url: "https://numbersapi.p.mashape.com/random/trivia?fragment=true&json=true&max=1000&min=0",
        headers: {"X-Mashape-Key": "ZpMtsjR98WmshEfAm8ywcmq5o4Osp1QtMcxjsn70UJR79HgQtO"},
        success: randomAPIReturn
    });
});

//randomAPIReturn functions
//input - the success of the numbersapi.com api
//output - writes the random fact to the html page
function randomAPIReturn(input) {
    document.getElementById("randomFact").innerHTML = "Random Fact for the number " + input["number"] + ": "
        + input["text"] + ". -- Powered by " + "<a href=\"https://www.mashape.com/divad12/numbers-1\">NUMBERSAPI</a> ";
}