# Homework5
Third-Party APIs: Work Day Scheduler

# Table of Contents
- [Homework Presentation](#homework-presentation)
- [Aceptance Criteria](#acceptance-criteria)
- [Repository Structure](#repository-structure)
- [Links](#links)
- [Tool Page](#tool-page)
- [Improvements](#improvements)
    - [Form Task](#form-task)
    - [Form Setting](#form-setting)
    - [Dynamic Setting](#dynamic-setting)
- [Credits](#credits)


# Homework Presentation
Create a simple calendar application that allows a user to save events for each hour of the day by modifying starter code. This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.

# Acceptance Criteria
- [GIVEN I am using a daily planner to create a schedule]
- [WHEN I open the planner]
- [THEN the current day is displayed at the top of the calendar]
- [WHEN I scroll down]
- [THEN I am presented with time blocks for standard business hours]
- [WHEN I view the time blocks for that day]
- [THEN each time block is color-coded to indicate whether it is in the past, present, or future]
- [WHEN I click into a time block]
- [THEN I can enter an event]
- [WHEN I click the save button for that time block]
- [THEN the text for that event is saved in local storage]
- [WHEN I refresh the page]
- [THEN the saved events persist]

# Repository Structure
The **INDEX.HTML** and the **README.MD** files are at the root of the folder.
All others files are in the **ASSETS** folder which contains a folder for each type of files
- SCRIPT: JavaScript file
- STYLE: CSS file
- Images: screen shot

# Links
[Repository Folder](https://github.com/nhounhou/WorkDayScheduler)

[Daily Scheduler](https://nhounhou.github.io/WorkDayScheduler)

# Tool Page
![tool](/assets/images/Tool-Page.jpg)

# Improvements
## Form Task
I added a `form` that is hidden at the start of the scheduler.
It become visible after clicking on the add event  ![calendar plus](/assets/images/calendar-plus.jpg).

Where you can choose directly the hour and put in the event to be logged in.
And when an hour is selected, the task already saved will be displayed in the textArea of the form.

Once the `submit` button is clicked, it works as if the lock `button` has been clicked.
![Event Form](/assets/images/Event-Form.jpg)

## Form Setting
By clicking on this icon,
![Setting Icon](/assets/images/setting-icone.jpg), the Setting Form will be displayed.

![Setting Form](/assets/images/setting-form.jpg)

This will add/remove dynamically hour at the start or the end of the current day.

Though, this idea was abandonned because the add/removed hour were not kept when the webpage is refreshed.
Keeping it, will mean that the logic of the tool would have to be redone.
By creating the body of the tool base on the data saved on the `localStorage` of the browser. Which mean also that at the first start there would be no data displayed.

I left the code of the form in the `script.js` file if I was to come back to finish that part. As well as the code in the `index.html` and `style.css` files.

The first function `addBeforeRow` has been coded, which add the entire row at the top of the schedule.
The other 2 functions `addAfterRow` and `removeRow` haven't been coded yet.
The `addAfterRow` function is the same as the `addBeforeRow` function, except that it will use the `.append()` instead of the `.prepend()` and also the sequence of adding each `<div>` element is reverse.

<<<<<<< HEAD
cf [next point](#dynamic-setting)

## Dynamic Setting
You will see 3 other files `indexDynamic.html`, `scriptDynamic.js` and `styleDynamic.css` in their respective folder.
This the same Work Day Scheduler but with all the elements created dynamically with the JQuery commands. The only line that have been added to the `indexDynamic.html` file are the links to the Javascript file and the CSS file.

In this version I did coded feature that add/remove hour from the scheduler dynamically.
=======
Another improvement would be to dynamically create the schedule rows. That way it would be easier to extend/reduce the work day hours and save them in the `localStorage`. The display function would have to be updated to be able to display the hours accordingly. If no data were to be present in the `localStorage` then the default hours would be 9AM until 6PM.
>>>>>>> cf04e7e58e32a015bc362fd23b815dfffc5c4a0d

# Credits
- [JavaScript Date and Time Library](https://momentjs.com/)
- [BootStrap](https://getbootstrap.com/)
- [FontAwesome for the icons](https://fontawesome.com)
- [JQuery v3.2.1](https://jquery.org)