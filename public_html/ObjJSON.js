var termekek = [
    {
        ID: "1",
        nev: "Jelly Joker",
        ar: "2421 Ft",
        marka: "GEEK & GORGEOUS 101",
    },
    {
        ID: "2",
        nev: "Squalane Cleanser",
        ar: "2690 Ft",
        marka: "THE ORDINARY"
    },
    {
        ID: "3",
        nev: "Micellás víz",
        ar: "1999 Ft",
        marka: "Mixa"
    },
    {
        ID: "4",
        nev: "arcszérum-szalicilsav",
        ar: "1999 Ft",
        marka: "Revox"
    }
];

var termekAdatokJSON = '[{"ID": "1","nev": "Jelly Joker","ar": "2421 Ft","marka": "GEEK & GORGEOUS 101"},{"ID": "2","nev": "Squalane Cleanser","ar": "2690 Ft","marka": "THE ORDINARY"},{"ID": "3","nev": "Micellás víz","ar": "1999 Ft","marka": "Mixa"},{"ID": "4","nev": "arcszérum-szalicilsav","ar": "1999 Ft","marka": "Revox"}]';

$(function () {
    var termekAdatok = JSON.parse(termekAdatokJSON);

    $("#OK").click(ujTermekHozadas);


//console.log(termekAdatok);
    tablaLetrhozasa();
    kiir();
});
function tablaLetrhozasa() {
    $("article").empty();
    $("article").append("<table>");
    $("article table").append("<tr>");
    for (var item in termekek[0]) {
        $("article table tr").append("<th id='" + item + "'>" + item + "</th>");
    }

    for (var i = 0; i < termekek.length; i++) {
        $("article table").append("<tr>");
        for (var item in termekek[i]) {//item ami végig megy a tömbön
            $("article table tr").eq(i + 1).append("<td>" + termekek[i][item] + "</td>");
        }
    }
    $("th").click(rendez);


}
function kiir() {
    for (var i = 1; i < $("article table tr").length; i++) {
        //termekek[i].ID;
        //console.log( termekek[i-1].ID);
        $("article table tr").eq(i).append('<button type="button" id="' + termekek[i - 1].ID + '"class="torloGomb">Töröl</button>',
                '<button type="button" id="' + termekek[i - 1].ID + '"class="modosit">Módosít</button>');

    }
    // console.log(termekek);
    $(".torloGomb").click(termekekTorlese);
    $(".modosit").click(tablaModositasa);
}

function ujTermekHozadas() {
    var ujszemely = {};
    ujszemely.ID = $("#uid").val();
    ujszemely.nev = $("#unev").val();
    ujszemely.ar = $("#uar").val();
    ujszemely.marka = $("#umarka").val();
    termekek.push(ujszemely);
    console.log(ujszemely);
    tablaLetrhozasa();
    kiir();
}

var irany = false;
function rendez() {
    var id = $(this).attr("id");
    console.log(id);
    if (irany) {
        termekek.sort(function (a, b) {
            return Number(a[id] > b[id]) - 0.5;
        });
    } else {
        termekek.sort(function (a, b) {
            return Number(a[id] < b[id]) - 0.5;
        });
    }

    irany = !irany;
    tablaLetrhozasa();
    kiir();
}
//Feketeöves feladatok
function termekekTorlese() {
    var id = $(this).attr("id");
    for (var i = 0; i < termekek.length; i++) {
        if (termekek[i].ID === id) {
            termekek.splice(i, 1);
        }
    }

    tablaLetrhozasa();
    kiir();

}
function tablaModositasa() {
    $("aside").empty("<form>");
    var i = $(this).attr("id");
    $("aside").append("<form>");
    $("aside form").append("<fieldset id='elrejt'>");
    $("aside form fieldset").append('<div><label for="mID">ID</label><input type="number" id="mID" name="mID"></div>');
    $("aside form fieldset").append('<div><label for="mnev">Termék neve</label><input type="text" id="mnev" name="nev"></div>');
    $("aside form fieldset").append('<div><label for="mar">Termék ára</label><input type="number" id="mar" name="ar"></div>');
    $("aside form fieldset").append('<div><label for="mmarka">Márkája</label><input type="text" id="mmarka" name="marka"></div>');
    $("aside form fieldset").append('<div><label for="mAz"></label><input type="hidden" id="mAz" name="mAz" value="mAz"></div>');
    $("aside form fieldset").append('<input type="button" id="mok" name="mok" value="OK">');
    console.log("#mok");
    $("#mok").click(modosit);
    
//    tablaLetrhozasa();
//    kiir();

    function modosit() {
        if ($("#mID").val() != "") {
            console.log(i);
            var id = (i - 1);
            console.log(id);
            termekek[id].ID = $("#mID").val();
            //console.log("modosit");
            termekek[id].nev = $("#mnev").val();
            termekek[id].ar = $("#mar").val();
            termekek[id].marka = $("#mmarka").val();

            //termekek[2].nev.remove();
            $("aside").empty();
        }
        
        tablaLetrhozasa();
        kiir();
    }
}


