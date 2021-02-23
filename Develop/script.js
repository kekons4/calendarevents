// Query selectors
var currentDayEl = $("#currentDay");
var container = $(".container");

// Todays Date
var today = moment().format("dddd, MMMM Do YYYY");

// Calender of the day
var day = moment().startOf('day');

var savedData = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
if (localStorage.getItem("calItems") === null) {
    savedData = localStorage.setItem("calItems", JSON.stringify(savedData));
} else {
    savedData = localStorage.getItem("calItems");
}
console.log(savedData);


var calender = function () {
    for (let i = 0; i < 9; i++) {
        var parsed = savedData.split(",")[i];

        var timeBlock = $("<div></div>");
        timeBlock.addClass("timeblock row");

        var hour = $("<div></div>");
        hour.addClass("hour");
        timeBlock.append(hour);

        var description = $("<div></div>");
        description.addClass("textarea present description");
        var textArea = $("<textarea id='test' placeholder='Enter Description...'></textarea>");
        if (savedData !== null) {
            textArea.text(parsed);
        } else {
            textArea.text("");
        }
        textArea.attr("data-value", i);
        description.append(textArea);
        timeBlock.append(description);

        var saveBtn = $("<div></div>");
        saveBtn.addClass("saveBtn");
        saveBtn.append("<i id='save' class='fa fa-save'></i>");
        timeBlock.append(saveBtn);

        // Push timeBlock to calender
        container.append(timeBlock);
    }
    return container.children();
}

function main() {
    // Sets the Date on the Header
    currentDayEl.text(today);
    calender();
    // auto generates html for the calender
    // for (let i = 0; i < 9; i++) {
    //     var timeBlock = $("<div></div>");
    //     timeBlock.addClass("timeblock row");

    //     var hour = $("<div></div>");
    //     hour.addClass("hour");
    //     timeBlock.append(hour);

    //     var description = $("<div></div>");
    //     description.addClass("textarea present description");
    //     var textArea = $("<textarea id='test' placeholder='Enter Description...'></textarea>");
    //     textArea.text(calender[i]);
    //     textArea.attr("data-value", i);
    //     description.append(textArea);
    //     timeBlock.append(description);

    //     var saveBtn = $("<div></div>");
    //     saveBtn.addClass("saveBtn");
    //     saveBtn.append("<i id='save' class='fa fa-save'></i>");
    //     timeBlock.append(saveBtn);

    //     // Push timeBlock to calender
    //     container.append(timeBlock);
    // }

    // variables that work with putting correct time for each time slot
    var hour = 9;
    var afternoon = 1;

    // auto generates the correct 
    for (let i = 0; i < container.children().length; i++) {
        if (hour > 12) {
            container.children().eq(i).children().eq(0).text(afternoon + "pm");
            afternoon++;
        } else {
            if (hour === 12) {
                container.children().eq(i).children().eq(0).text(hour + "pm");
                hour++;
            } else {
                container.children().eq(i).children().eq(0).text(hour + "am");
                hour++;
            }
        }
    }


}

container.on("click", "#save", function (event) {
    var newArr = JSON.parse(savedData.split(","));
    var index = $(event.target).parent().parent().children().eq(1).children().attr("data-value");
    var text = $(event.target).parent().parent().children().eq(1).children().val();
    console.log(text);
    console.log(JSON.parse(savedData)[index]);
    newArr[index] = text;
    localStorage.setItem("calItems", newArr);
    console.log(localStorage.getItem("calItems"));
});

main();