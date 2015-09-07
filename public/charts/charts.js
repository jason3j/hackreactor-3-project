
//Defined variables

var genOnePokemonNames = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise",
    "Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate",
    "Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran-f","Nidorina","Nidoqueen",
    "Nidoran-m","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat",
    "Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian",
    "Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam",
    "Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem",
    "Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetchd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk",
    "Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode",
    "Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon",
    "Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr-mime","Scyther","Jynx",
    "Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon",
    "Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres",
    "Dratini","Dragonair","Dragonite","Mewtwo","Mew"];

var poke1;
var poke2;

// The following populates the drop down list for the first pokémon list
var sel1 = document.getElementById('dropdownList1');
var fragment1 = document.createDocumentFragment();
genOnePokemonNames.forEach(function(genOneNames) {
    var opt = document.createElement('option');
    opt.innerHTML = genOneNames;
    opt.value = genOneNames.toLocaleLowerCase();
    opt.id = "theyPickOne";
    fragment1.appendChild(opt);
});
sel1.appendChild(fragment1);

// The following populates the drop down list for the second pokémon list
var sel2 = document.getElementById('dropdownList2');
var fragment2 = document.createDocumentFragment();
genOnePokemonNames.forEach(function(genOneNames) {
    var opt = document.createElement('option');
    opt.innerHTML = genOneNames;
    opt.value = genOneNames.toLocaleLowerCase();
    opt.id = "theyPickTwo";
    fragment2.appendChild(opt);
});
sel2.appendChild(fragment2);

// This disables the second dropdown list button
$("#dropdownMenu2").prop("disabled", true);
// This disables the compare button
$("#compareBtn").prop("disabled", true);

// jquery
// this function is used to call the pokémon api for the first dropdown list
$("#dropdownList1").click(function(){
    // This gets the lowercase name of the chosen pokémon and adds it to the url
    var text = $(event.target).text();
    document.getElementById("chosenOne").innerHTML = text;
    var result1 = document.getElementById("chosenOne").textContent.toLocaleLowerCase();
    var theUrlFirst = "https://phalt-pokeapi.p.mashape.com/pokemon/" + result1 + "/";
    var theKey = "ZpMtsjR98WmshEfAm8ywcmq5o4Osp1QtMcxjsn70UJR79HgQtO";
    // This enables the second dropdown list button
    $("#dropdownMenu2").prop("disabled", false);
    // Here is the ajax call for the api
    $.ajax({
        url: theUrlFirst,
        headers: {"X-Mashape-Key": theKey},
        success: function (input) {
            // On success of the ajax call, a picture of the pokemon is shown
            // and all the data of the first picked pokémon is saved into a variable
            document.getElementById("pokemonPictureOne").innerHTML = "";
            var picNumber = input["pkdx_id"];
            var pictureOne = document.createElement("img");
            pictureOne.src = "../Pictures/PokemonPics/" + picNumber + ".png";
            document.getElementById("pokemonPictureOne").appendChild(pictureOne);
            poke1 = input;
        }
    });
});

// jquery
// this function is used to call the pokémon api for the second dropdown list
$("#dropdownList2").click(function(){
    // This gets the lowercase name of the chosen pokémon and adds it to the url
    var textTwo = $(event.target).text();
    document.getElementById("chosenTwo").innerHTML = textTwo;
    var result2 = document.getElementById("chosenTwo").textContent.toLocaleLowerCase();
    var theUrlSecond = "https://phalt-pokeapi.p.mashape.com/pokemon/" + result2 + "/";
    var theKey = "ZpMtsjR98WmshEfAm8ywcmq5o4Osp1QtMcxjsn70UJR79HgQtO";
    // Here is the ajax call for the api
    $.ajax({
        url: theUrlSecond,
        headers: {"X-Mashape-Key": theKey},
        success: function (input) {
            // On success of the ajax call, a picture of the pokemon is shown
            // and all the data of the second picked pokémon is saved into a variable
            document.getElementById("pokemonPictureTwo").innerHTML = "";
            var picNumber = input["pkdx_id"];
            var pictureTwo = document.createElement("img");
            pictureTwo.src = "../Pictures/PokemonPics/" + picNumber + ".png";
            document.getElementById("pokemonPictureTwo").appendChild(pictureTwo);
            poke2 = input;
            // The compare button is enabled once that api returns with data
            $("#compareBtn").prop("disabled", false);
        }
    });
});

// jquery
// This function is called when the compare button is clicked
$("#compareBtn").click(function () {
    combinedGraphs(poke1, poke2);
});

// The following is the code for the highcharts graphs that are
// used once the pokémon have been picked
function combinedGraphs (pokemonOne, pokemonTwo) {
    document.getElementById("pokemonChartCombined").innerHTML = "";

    $(function () {
        $('#pokemonChartCombined').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: pokemonOne["name"] + " VS " + pokemonTwo["name"]
            },
            xAxis: {
                categories: [pokemonOne["name"], pokemonTwo["name"]]
            },
            yAxis: {
                title: {
                    text: ' '
                }
            },
            series: [{
                name: 'Attack',
                data: [pokemonOne["attack"], pokemonTwo["attack"]]
            }, {
                name: 'Defense',
                data: [pokemonOne["defense"], pokemonTwo["defense"]]
            }, {
                name: 'Speed',
                data: [pokemonOne["speed"], pokemonTwo["speed"]]
            }, {
                name: 'Special Attack',
                data: [pokemonOne["sp_atk"], pokemonTwo["sp_atk"]]
            }, {
                name: 'Special Defense',
                data: [pokemonOne["sp_def"], pokemonTwo["sp_def"]]
            }, {
                name: 'HP',
                data: [pokemonOne["hp"], pokemonTwo["hp"]]
            }]
        });
    });
}

