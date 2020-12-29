$(document).ready(function() {
    $("#currentDay").text(moment().format("dddd MMMM  Do YYYY"));
    
    var hours=[];
    var hourArray=[];

    $(".hour").each(function(index,element){
        //CallBack function to set the color in the scheduler page

        //getting hour from the scheduler page => time1
        var space=$(element).text().indexOf(" ");
        var hourString=$(element).text().slice(0,space);
        var hourSpan=$(element).text().slice(space+1,$(element).text().length);
        // console.log(hourSpan);
        if (hourSpan==="AM") {
            hourString=hourString+":00:00";
        } else if (hourString==="12") {
            hourString=hourString+":00:00";
        } else {
            var convHour=parseInt(hourString)+12;
            hourString=convHour.toString()+":00:00";
        };
        hourArray.push(hourString);
        // console.log(hourArray);
        var time1=moment(hourArray[index],"hh:mm:ss").format("HH");

        //getting current time hour => time2
        var time2=moment().format("HH");
        // console.log("time2:"+time2);
        // building the array of hours for the comboBox
        hours.push($(element).text());

        // console.log($(element).next());
        //comparing time1 and time2 to apply color code
        // console.log($(element).text());
        // console.log("time1:"+time1+"-time2:"+time2);
        if (time1 === time2) {
            // present hour display in red
            $(element).next().addClass("present");
            $(element).next().removeClass("past");
            $(element).next().removeClass("future");
            // console.log("present");
            // $(element).next().attr("style","background-color: #ff6961;");
        } else if (time1 < time2) {
            // past hour display in grey
            $(element).next().addClass("past");
            $(element).next().removeClass("present");
            $(element).next().removeClass("future");
            // console.log("past");
            // $(element).next().attr("style","background-color:  #d3d3d3;");
        } else {
            // future hour display in green
            $(element).next().addClass("future");
            $(element).next().removeClass("past");
            $(element).next().removeClass("present");
            // console.log("future");
            // $(element).next().attr("style","background-color: #77dd77;");
        };

        $(element).next().attr("data-value",$(element).text());
        
        // load the data from the localStorage into the scheduler
        // console.log("before localStorage load:"+$(element).text());
        var lsText=localStorage.getItem($(element).text());
        // Check if the localStorage exist for each hour of the scheduler
        // if exist then display on the page
        if (!(lsText === null)){
            // console.log(lsText);
            $(element).next().children().val(lsText);
        };
    });

    // managing form to input task
    // creating the list of hour for the combobox
    for (i=0;i<hours.length;i++){
        var optTag=$("<option>");
        optTag.text(hours[i]);
        optTag.attr("value",hours[i]);
        $("#comboBoxHour").append(optTag);
    };

    $("#comboBoxHour").change(function(){
        var textValue=localStorage.getItem($("#comboBoxHour").val());
        console.log($("#comboBoxHour").val()+"-"+textValue);
        $("#txtTask").val(textValue);
    });

    // click on Submit button from the Event FORM
    $("#btnSubmit").click(function(){
        console.log("submitted");
        // hide the form
        $(".myForm").attr("style","display: none;");

        // update the scheduler
        // console.log($("#comboBoxHour").val());
        // console.log($("#txtTask").val());
        // get the hour seelcted and the Task event
        var cmbValue=$("#comboBoxHour").val();
        var txtTask=$("#txtTask").val();
        var selectHour=$(".hour");

        // console.log("selected "+selectHour);
        // get all hours from the scheduler
        selectHour.each(function(i,item){
            // get the hour that was selected in the FORM and update the textArea element
            if ($(item).text() === cmbValue){
                $(item).next().children().val(txtTask);
            };
        });

        // save in the localStorage
        localStorage.setItem(cmbValue,txtTask);
    });

    $("#btnCancel").click(function(){
        // hide the form
        $(".myForm").attr("style","display: none;");        
    });

    $("#btnReset").click(function(){
        // hide the form
        $("#mySetting").attr("style","display: none;");        
    });

    $("i").click(function(){
        // get click on the lock icon to make the textarea readonly

        // console.log($(this).parent().parent().prev().children())
        //                 ^      ^       ^        ^       ^
        //                 |      |       |        |       |
        //   icone <-------|      |       |        |       |
        //   p tag <--------------|       |        |       |
        //   div class=select <-----------|        |       |
        //   previous sibling div class=task <-----|       |
        //   child textarea <------------------------------|
        $(this).parent().parent().prev().children().attr("readonly","readonly");

        //save data to localStorage
        var slData={
            key:"",
            text:""
        };
        slData.key=$(this).parent().parent().prev().attr("data-value");
        slData.text=$(this).parent().parent().prev().children().val();
        // console.log(slData);
        localStorage.setItem(slData.key,slData.text);
    });

    // click on the setting Button to add or delete hours from the scheduler
    $(".fa-users-cog").click(function(){
        // console.log("first hour:"+moment(hourArray[0],"hh:mm:ss").format("h A"));
        // console.log("last  hour:"+moment(hourArray[hourArray.length-1],"hh:mm:ss").format("h A"));
        $("#firstHour").text(moment(hourArray[0],"hh:mm:ss").format("h A"));
        $("#lastHour").text(moment(hourArray[hourArray.length-1],"hh:mm:ss").format("h A"));
        $("#mySetting").attr("style","display: block;");
    });

    // click on Add Event icone to display FORM
    $(".fa-calendar-plus").click(function(){
        $(".myForm").attr("style","display: block;");
        var textValue=localStorage.getItem($("#comboBoxHour").val());
        console.log($("#comboBoxHour").val()+"-"+textValue);
        $("#txtTask").val(textValue);
    });

    var rowTag=$(".row");

    // adding dynamically one row a the top of the Scheduler
    function addBeforeRow(hourName){
        console.log("add row "+hourName);

        var nowTime=moment().format("HH");
        var hourString=moment(hourName,"hh:mm:ss").format("HH");
        var intHour=parseInt(hourString);

        if (intHour>=1) {
            intHour--;
        } else {
            intHour=0;
        };

        if (intHour>12) {
            intHour=intHour-12
            hourString=intHour.toString();
            hourString=hourString+" PM";
        } else {
            hourString=intHour.toString();
            hourString=hourString+" AM";
        };

        hourArray.unshift(intHour.toString()+":00:00");

        // CREATING THE <DIV> for the lock icon
        var divTag=$("<div>");
        divTag.addClass("col-md-1 border rounded select");
        var pTag=$("<p>");
        var iTag=$("<i>");
        iTag.addClass("fas fa-lock saveBtn");
        pTag.append(iTag);
        divTag.append(pTag);
        rowTag.prepend(divTag);

        // Creating the <div> for the Task Event column
        var divTag=$("<div>");
        // divTag.addClass("col-md-10 border task");
        if (intHour>nowTime) {
            divTag.addClass("col-md-10 border task future");
        } else if (intHour<nowTime) {
            divTag.addClass("col-md-10 border task past");
        } else {
            divTag.addClass("col-md-10 border task present");
        };
        divTag.attr("data-value",hourString);
        var textAreaTag=$("<textarea>");
        textAreaTag.addClass("description")
        divTag.append(textAreaTag);
        rowTag.prepend(divTag);

        // Creating the <div> for the hour 
        var divTag=$("<div>");
        divTag.addClass("col-md-1 hour");
        divTag.text(hourString);
        rowTag.prepend(divTag);

        $("#mySetting").attr("style","display: none;");
    };

    function removeRow(index) {
        $(".hour").each(function(i,item){
            if (i===index) {
                console.log("removing element "+$(item).text());
                console.log("index "+i+"-"+index);
            };
        });
        $("#mySetting").attr("style","display: none;");
    };

    // Add/Remove hours event click
    
    // console.log("before Click Event");
    $("#beforePlus").click(function(){
        addBeforeRow(hourArray[0]);
    });
    
    $("#beforeMinus").click(function(){
        removeRow(0);
    });
        
    $("#afterPlus").click(function(){
        addAfterRow(hourArray[hourArray.length-1]);
    });
        
    $("#afterMinus").click(function(){
        removeRow(hourArray.length-1);
    });
    // console.log("after Click Event");

});
