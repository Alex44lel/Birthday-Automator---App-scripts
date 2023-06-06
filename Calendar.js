//Ha customizar: Reminders, hora de inicio, duración, color, título

//Adds yearly event with reminders
function createYearlyEventWithReminders(name,date,description) {
    // Define the start and end times for the event.
    let startTime = new Date(date);
    startTime.setHours(8);
    let endTime = new Date(date);
    endTime.setHours(startTime.getHours() + 1); // Event lasts for 1 hour
    
    // Define the event series (recurrence).
    let recurrence = CalendarApp.newRecurrence().addYearlyRule();
      
    // Get the calendar
    let calendar = CalendarApp.getDefaultCalendar();
    //CreateEventSeries
    let title= "Birthday of " + name;
    let eventSeries = calendar.createEventSeries(title, startTime, endTime, recurrence);
    eventSeries.setDescription(description)
    eventSeries.setColor("7");
    
    // Set the reminders for the event series.
    eventSeries.addEmailReminder(60) //same day
    eventSeries.addEmailReminder(1 * 24 * 60) //one day before
    eventSeries.addEmailReminder(5 * 24 * 60) //5 days before
  
    return eventSeries.getId()
  }
  
  //Deletes yearly event
  function deleteEventFromCalendar(googleCalendarId){
    Logger.log(googleCalendarId);
    var calendar = CalendarApp.getDefaultCalendar();
    var eventSeries = calendar.getEventSeriesById(googleCalendarId);
    // Delete the event series.
    eventSeries.deleteEventSeries();
  
  }
  