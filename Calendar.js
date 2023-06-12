
//Adds yearly event with reminders
function createYearlyEventWithReminders(name,date,description) {
  DURATION = Number(eventConfig.getRange("D9").getValue()/60)||1
  COLOR = eventConfig.getRange("D11").getValue()||"7"
  STARTHOUR = Number(eventConfig.getRange("D7").getValue().split(":")[0])||"10"
  TITLE = eventConfig.getRange("D13").getValue()||"Birthday of"

  //we store the keys as numbers so we can use then to figure out when to put the reminder
  REMINDERS = {
  "0.042":eventConfig.getRange("G9").getValue()=="Yes"?true:false,
  "0.33333333333333333333333333333333":eventConfig.getRange("G10").getValue()=="Yes"?true:false,
  "1":eventConfig.getRange("G11").getValue()=="Yes"?true:false,
  "2":eventConfig.getRange("G12").getValue()=="Yes"?true:false,
  "3":eventConfig.getRange("G13").getValue()=="Yes"?true:false,
  "4":eventConfig.getRange("G14").getValue()=="Yes"?true:false,
  "5":eventConfig.getRange("G15").getValue()=="Yes"?true:false,
  "6":eventConfig.getRange("G16").getValue()=="Yes"?true:false,
  "7":eventConfig.getRange("G17").getValue()=="Yes"?true:false,
}
  

  //check all variables are set and values are correct
  
  // Define the start and end times for the event.
  let startTime = new Date(date);
  startTime.setFullYear(new Date().getFullYear())
  startTime.setHours(STARTHOUR);
  let endTime = new Date(date);
  endTime.setHours(startTime.getHours() + DURATION); // Event lasts for 1 hour
  endTime.setFullYear(startTime.getFullYear())
  
  // Define the event series (recurrence).
  let recurrence = CalendarApp.newRecurrence().addYearlyRule();
    
  // Get the calendar
  let calendar = CalendarApp.getDefaultCalendar();
  //CreateEventSeries
  let title= TITLE + " "+ name;
  let eventSeries = calendar.createEventSeries(title, startTime, endTime, recurrence);
  eventSeries.setDescription(description)
  eventSeries.setColor(COLOR);
  
  // Set the reminders for the event series.
  Object.entries(REMINDERS).forEach((el)=>{
    console.log(Number(el[0]),el[1])
    if(el[1]){
       try{
        eventSeries.addEmailReminder(el[0] * 24 * 60) 
    }catch(e){
      console.log(e)
    }
    }
   
     
  })


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
