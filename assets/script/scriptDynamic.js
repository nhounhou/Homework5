$(document).ready(function() {
    $("#currentDay").text(moment().format("dddd MMMM  Do YYYY"));

    //check if there is data in the localStorage
    var hour=7;
    var lsData=localStorage.getItem("schedule");
    var dataStorage={
        hour: [],
        task: []
    };
    
    console.log(lsData);
    if (!(lsData===null)) {
        console.log("Data in localStorage");
        dataStorage=JSON.parse(lsData);
        console.log(dataStorage.hour.length);
        generateSchedule(dataStorage.hour.length);
    } else {
        console.log("No Data in localStorage");
        generateSchedule(0);
    };
    generateBtn();

    function generateSchedule(index) {
        var varLength=0;
        if (index===0){
            varLength=11;
            hour=7;
        } else {
            varLength=index;
            var spacePos=dataStorage.hour[0].indexOf(" ");
            console.log("Pos:"+spacePos);
            console.log("LS:"+dataStorage.hour[0]);
            console.log(dataStorage.hour[0].substring(0,spacePos));
            hour=parseInt(dataStorage.hour[0].substring(0,spacePos));
            hour--;
            console.log("hour:"+hour);
            if (dataStorage.hour[0].substring(spacePos+1),dataStorage.hour[0].length-spacePos==="PM") {
                hour=hour+11;
            };
            console.log("start hour:"+hour);
        };

        var divTag=$("<div>");
        divTag.addClass("row");
        $(".container").append(divTag);

        //create the schedule of the day for 10 hours starting at 8AM
        for (var i=0;i<varLength;i++) {
            hour++;
            var hourNow=parseInt(moment().format("HH"));
            var hourToDisplay=0;
            if (hourNow===hour){
                var colorHour="present";
            } else if (hourNow>hour) {
                var colorHour="past";
            } else {
                var colorHour="future";
            };
            console.log(hour);
            var partOfDay="AM";
            hourToDisplay=hour;
            if (hour>11) {
                if (hour>12) {
                    hourToDisplay=hourToDisplay-12;
                };
                partOfDay="PM";
            };
            console.log(hourToDisplay);
            var rowTag=$(".row");
            var divTag=$("<div>");
            divTag.addClass("col-md-1 hour");
            divTag.text(hourToDisplay.toString()+" "+partOfDay);
            rowTag.append(divTag);

            var divTag=$("<div>");
            var txtTag=$("<textarea>");
            divTag.addClass("col-md-10 description "+colorHour);
            divTag.attr("data-value",hourToDisplay.toString()+" "+partOfDay);
            txtTag.attr("id","txtArea");
            divTag.append(txtTag);
            rowTag.append(divTag);

            var divTag=$("<div>");
            var iTag=$("<i>");
            divTag.addClass("col-md-1 lock saveBtn");
            iTag.addClass("fas fa-lock fa-2x");
            divTag.append(iTag);
            rowTag.append(divTag);

            dataStorage.hour[i]=hourToDisplay.toString()+" "+partOfDay;
            dataStorage.task[i]="";
        };
        localStorage.setItem("schedule",JSON.stringify(dataStorage));
    };

    function generateBtn(){
        // Generating dynamically Button in the header
        var divTag=$("<div>");
        divTag.addClass("col-md-4");
        divTag.append($("<p>"));
        $(".jumbotron").append(divTag);

        var divTag=$("<div>");
        var iTag=$("<i>");
        divTag.addClass("col-md-4");
        divTag.attr("style","display: inline;");
        iTag.addClass("fas fa-calendar-plus fa-3x");
        iTag.attr("id","iconeHour");
        divTag.append(iTag);
        $(".jumbotron").append(divTag);

        var divTag=$("<div>");
        var iTag=$("<i>");
        divTag.addClass("col-md-4 float-right");
        divTag.attr("style","display: inline;")
        iTag.addClass("fas fa-user-cog fa-3x");
        iTag.attr("id","iconeSetting");
        divTag.append(iTag);
        $(".jumbotron").append(divTag);

        //Creating the different FORM, display will be set to none, so the FORM will be hidden at start/refresh
        //FORM for Task Event
        var formTask=$("<div>");
        formTask.addClass("myForm");
        formTask.attr("style","display: none;");
        formTask.append($("<label>").text("Select hour"));
        formTask.append($("<br/>"));
        formTask.append($("<select>").attr("id","cmbHour"));
        formTask.append($("<br/>"));
        formTask.append($("<label>").text("Input your Task"));
        formTask.append($("<br/>"));
        formTask.append($("<textarea>").attr("id","txtTask"));
        formTask.append($("<br/>"));
        var btnSubmit=$("<input>");
        btnSubmit.attr("id","btnSubmit");
        btnSubmit.attr("type","submit");
        btnSubmit.attr("value","Submit");
        formTask.append(btnSubmit);
        var btnCancel=$("<input>");
        btnCancel.attr("id","btnCancel");
        btnCancel.attr("type","reset");
        btnCancel.attr("value","Cancel");
        formTask.append(btnCancel);
        formTask.append($("<p>"));
        $(".container").prepend(formTask);

        //FORM for setting hours
        var formTask=$("<div>");
        formTask.attr("id","mySetting");
        formTask.attr("style","display: none;");
        var pTag=$("<p>");
        pTag.attr("id","beforePlus");
        pTag.addClass("fas fa-plus-square fa-2x");
        formTask.append(pTag);
        var pTag=$("<p>");
        pTag.attr("id","beforeMinus");
        pTag.addClass("fas fa-minus-square fa-2x");
        formTask.append(pTag);
        formTask.append($("<br/>"));
        formTask.append($("<label>").text("Start Hour: "));
        formTask.append($("<label>").attr("id","firstHour"));
        formTask.append($("<br/>"));
        formTask.append($("<label>").text("Last  Hour: "));
        formTask.append($("<label>").attr("id","lastHour"));
        formTask.append($("<br/>"));
        var pTag=$("<p>");
        pTag.attr("id","afterPlus");
        pTag.addClass("far fa-plus-square fa-2x");
        formTask.append(pTag);
        var pTag=$("<p>");
        pTag.attr("id","afterMinus");
        pTag.addClass("far fa-minus-square fa-2x");
        formTask.append(pTag);
        formTask.append($("<br/>"));
        var btnCancel=$("<input>");
        btnCancel.attr("id","btnReset");
        btnCancel.attr("type","reset");
        btnCancel.attr("value","Cancel");
        formTask.append(btnCancel);
        $(".container").prepend(formTask);
    };
});