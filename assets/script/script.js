$(document).ready(function() {
    $("#currentDay").text(moment().format("dddd MMMM  Do YYYY"));
    
    var hours=[];
    $(".hour").each(function(index,element){
        //CallBack function to set the color in the scheduler page

        //getting hour from the scheduler page => time1
        var hourArray=["9:00:00","10:00:00","11:00:00","12:00:00","13:00:00","14:00:00","15:00:00","16:00:00","17:00:00","18:00:00"]
        var time1=moment(hourArray[index],"hh:mm:ss").format("HH");
        // console.log("array:"+hourArray[index]);
        // console.log(time1);
        //getting current time hour => time2
        var time2=moment().format("HH");

        // building the array of hours for the comboBox
        hours.push($(element).text());

        // console.log($(element).next());
        //comparing time1 and time2 to apply color code
        // console.log($(element).text());
        console.log("time1:"+time1+"-time2:"+time2);
        // if (time1.isBefore(time2)){
        //     console.log("time1 before time2");
        // } else if (time2.isBefore(time1)){
        //     console.log("time1 after time2");
        // } else {
        //     console.log("time1 = time2");
        // };

        if (time1 === time2) {
            // present hour display in red
            // $(element).next().addClass("present");
            console.log("present");
            $(element).next().attr("style","background-color: #ff6961;");
        } else if (time1 < time2) {
            // past hour display in grey
            // $(element).next().addClass("past");
            console.log("past");
            $(element).next().attr("style","background-color:  #d3d3d3;");
        } else {
            // future hour display in green
            // $(element).next().addClass("future");
            console.log("future");
            $(element).next().attr("style","background-color: #77dd77;");
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
    for (i=0;i<hours.length;i++){
        var optTag=$("<option>");
        optTag.text(hours[i]);
        optTag.attr("value",hours[i]);
        $("#comboBoxHour").append(optTag);
    };

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

    $(".fa-calendar-plus").click(function(){
        $(".myForm").attr("style","display: block;");
    });

    $("#btnSubmit").click(function(){
        console.log("submitted");
        // hide the form
        $(".myForm").attr("style","display: none;");

        // update the scheduler
        // console.log($("#comboBoxHour").val());
        // console.log($("#txtTask").val());
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
});