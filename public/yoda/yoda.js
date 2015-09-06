
// this is spin.js
var opts = {
    lines: 20, // The number of lines to draw
    length: 15, // The length of each line
    width: 6, // The line thickness
    radius: 20, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    color: '#006400', // #rgb or #rrggbb
    speed: 1.2, // Rounds per second
    trail: 50, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 25, // Top position relative to parent in px
    left: 25 // Left position relative to parent in px
};

// jquery
$("#convertBtn").click(function(){
    // check to see if the textarea is empty or not
    // if it is then the box turns red and has a message
    if (document.getElementById("userTextEntered").value=='') {
        document.getElementById("userTextEntered").style.backgroundColor = 'red';
        document.getElementById("userTextEntered").innerHTML = "You must enter text here";
    } else {
        // here the code grabs the string in the textarea
        document.getElementById("userTextEntered").style.backgroundColor = 'white';

        // the string is run through the addPluses function
        var result = addPluses(document.getElementById("userTextEntered").value);

        // variables for the API
        var theUrl = "https://yoda.p.mashape.com/yoda?sentence=" + result;
        var theKey = "ZpMtsjR98WmshEfAm8ywcmq5o4Osp1QtMcxjsn70UJR79HgQtO";

        // the yoda api is contacted and the string is sent to it
        // if successful then the whatAPIReturns function will be called
        // this also has a function used in beforeSend that loads a spinning loading sign
        // and disappears when there is a successful return from the API (courtesy of spin.js)
        $.ajax({
            url: theUrl,
            headers: {"X-Mashape-Key": theKey},
            beforeSend: function () {
                var target = document.getElementById("loadingIcon");
                new Spinner(opts).spin(target);
            },
            success: whatAPIReturns
        });
    }
});

// The whatAPIReturns function
// used to return what api modified and put it back into the html code
function whatAPIReturns (input) {
    document.getElementById("loadingIcon").innerHTML = "";
    document.getElementById("bubbleText").innerHTML = input;
}

// The addPluses function
// used to get ride of white spaces in the input string and
// replace them with plus signs
function addPluses (input) {
    for (var i = 0; i < input.length; i++) {
        input = input.replace(" ", "+");
    }
    return input;
}

