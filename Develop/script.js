// Query selectors
var currentDayEl = $("#currentDay");
var container = $(".container");

// Todays Date
var today = moment().format("dddd, MMMM Do YYYY");

// Calender of the day
var day = moment().startOf('day');

// initializes cookie
var savedData = ["", "", "", "", "", "", "", "", ""];
if (localStorage.getItem("calItems") === null) {
    localStorage.setItem("calItems", JSON.stringify(savedData));
    savedData = JSON.parse(localStorage.getItem("calItems").split(","));
} else {
    savedData = localStorage.getItem("calItems");
    savedData = JSON.parse(savedData.split(","));
}
// console.log(savedData);

// generates html for each time block in the calender
var calender = function () {
    for (let i = 0; i < 9; i++) {
        // Create Time Block
        var timeBlock = $("<div></div>");
        timeBlock.addClass("timeblock row");

        // creates the hour element
        var hour = $("<div></div>");
        hour.addClass("hour");
        timeBlock.append(hour);

        // creates the description element
        var description = $("<div></div>");
        description.addClass("textarea description");
        description.attr("data-time", 9+i)
        // creates the textarea and appends it into the description
        var textArea = $("<textarea id='test' placeholder='Enter Description...'></textarea>");
        // checks if the cookies are empty or not
        if (savedData !== null) {
            textArea.text(savedData[i]);
        } else {
            textArea.text("");
        }
        textArea.attr("data-value", i);
        description.append(textArea);
        timeBlock.append(description);

        // creates the save the button
        var saveBtn = $("<div></div>");
        saveBtn.addClass("saveBtn");
        saveBtn.append("<i id='save' class='fa fa-save'></i>");
        timeBlock.append(saveBtn);

        // Push timeBlock to container
        container.append(timeBlock);
    }
}

// Main function
function main() {
    // Sets the Date on the Header
    currentDayEl.text(today);
    calender();

    // variables that work with putting correct time for each time slot
    var hour = 9;
    var afternoon = 1;
    var time = Number.parseInt(moment().format('H'));

    // auto generates the correct color coding for the time block
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

        // grabs the data-time value attribute
        var dataTime = Number.parseInt(container.children().eq(i).children().eq(1).attr("data-time"));

        //Determines which timeBlock is what color
        if(time < dataTime) {
            container.children().eq(i).children().eq(1).addClass("future")
        } else if(time === dataTime) {
            container.children().eq(i).children().eq(1).addClass("present")
        } else {
            container.children().eq(i).children().eq(1).addClass("past")
        }
    }


}

// captures the event.target of the save button in the time block in .container
// takes the text that user entered and saves it into the cookie for persistent storage
container.on("click", "#save", function (event) {
    var newArr = savedData;
    var index = $(event.target).parent().parent().children().eq(1).children().attr("data-value");
    var text = $(event.target).parent().parent().children().eq(1).children().val();
    console.log(text);
    console.log(savedData[index]);
    newArr[index] = text;
    localStorage.setItem("calItems", JSON.stringify(newArr));
    console.log(localStorage.getItem("calItems"));
});

main();