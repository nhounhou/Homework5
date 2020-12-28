# Homework5
Third-Party APIs: Work Day Scheduler

# Table of Contents
- [Homework Presentation](#homework-presentation)
- [Aceptance Criteria](#acceptance-criteria)
- [Repository Structure](#repository-structure)
- [Links](#links)
- [Tool Page](#tool-page)
- [Improvements](#improvements)


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
[Repository Folder](https://github.com/nhounhou/Homework5)

[Daily Scheduler](https://nhounhou.github.io/Homework5)

# Tool Page
![tool](/assets/images/Tool-Page.jpg)

# Improvements
I added a `form` that is hidden at the start of the scheduler.
It become visible after clicking on the add event  ![calendar plus](/assets/images/calendar-plus.jpg).
Where you can choose directly the hour and put in the event to be logged in.
Once the `submit` button is clicked, it works as if the lock `button` has been clicked.
![Event Form](/assets/images/Event-Form.jpg)