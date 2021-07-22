var express = require("express");
var bodyParser = require("body-parser");

var allGroups = require("./json");
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/public"));
app.get("/", function (req, res) {
    res.render("index.ejs", {
        text: allGroups
    });
});
app.get("/form", function (req, res) {
    res.render("form.ejs");
});

app.post("/results", function (req, res) {
    var searched_subjects = [

    ];
    var searched_subjects_noresult = [{
        "Sl.No": "401",
        Subject: "Sorry Course Not Found,",
        "Faculty name": "NA",
        Slot: "NA",
        "Whatsapp Link": "NA",
        Telegram: "",
    }, ];
    // console.log(req.body.subject);
    allGroups.forEach((element) => {
        var subject = element.Subject.toLowerCase();
        var teacher = element["Faculty name"].toLowerCase();
        var slot = element["Slot"].toLowerCase();
        var search = req.body.subject.toLowerCase();
        // console.log(subject);
        // console.log(search);
        // console.log(subject.includes(search));
        if (
            subject.includes(search) ||
            teacher.includes(search) ||
            slot.includes(search)
        ) {
            searched_subjects.unshift(element);
            // console.log("%%%%%%%%%%%%%%%%%%%%%%");
        }
    });
    console.log(searched_subjects);
    if (searched_subjects.length === 0) {
        res.render("index.ejs", {
            text: searched_subjects_noresult,
        });
    } else {
        res.render("index.ejs", {
            text: searched_subjects,
        });
    }

});

app.listen(process.env.PORT || 8000, function () {
    console.log("SERVER 8000 HAS STARTED");
});
