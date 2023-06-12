//-------------------------------------HELPERS----------------------------------//
//this function creates the date from the inputs and also calculates currect age
function getDateAndAge(day,month,year){
  let today = new Date()
  let birthDate = new Date(year,month-1,day)
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return  [birthDate,age]
}

//Date validator function
function isValidDate(dateString) {
  var date = new Date(dateString);
  return !isNaN(date);
}

//generates unique id
function generateId(){
  let range = dataSheet.getRange(2, 1, dataSheet.getLastRow()); // startRow, startColumn, numRows
  let values = range.getValues(); // Returns a 2D array with values in the range
  let newId = Math.floor(1000 + Math.random() * 9000);
  let i = 0
  for(i;i<values.length;i++){
    if(newId==values[i][0]){
      newId = Math.floor(1000 + Math.random() * 9000);
      i=-1
    }
  }
  return newId
}

//checks that input cells are unselected before running a script in Form sheet
function checkInputsAreUnselectedForm(){
  let activeCell = shUserForm.getActiveCell().getA1Notation()
  if(activeCell=="D11"|| activeCell=="D13"|| activeCell=="G13"|| activeCell=="J13"|| activeCell=="D16"|| activeCell=="D7"){
    ui.alert("You must unselect the current cell before hitting the button")
    return false
  }

  return true
}

//checks that input cells are unselected before running a script in Event Configuration
function checkInputsAreUnselectedEventConfif(){
  let activeCell = eventConfig.getActiveCell().getA1Notation()
  if(activeCell=="D7"||activeCell=="D9"||activeCell=="D11"|| activeCell=="G9"|| activeCell=="G10"|| activeCell=="G11"|| activeCell=="G12"|| activeCell=="G13"|| activeCell=="G14"|| activeCell=="G15"|| activeCell=="G16"|| activeCell=="G17"){
    ui.alert("You must unselect the current cell before hitting the button")
    return false
  }

  return true
}

//////////////////////////////////////////////////////////////////////////////
//VALIDATE DATA //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
function validateDataForm(){

   let validationInfo = [["D11","You must enter a name"],["D13","You must enter a day"],["G13","You must enter a month"],["J13","You must enter a title on the event config tab"]]

    for (let i = 0; i < validationInfo.length; i++){
    let el = validationInfo[i];
    //validate month
    if(shUserForm.getRange(el[0]).isBlank()==true){
      ui.alert(el[1])
      shUserForm.getRange(el[0]).activate();
      shUserForm.getRange(el[0]).setBackground("#FF0000");
      return false;
    }
  }

  return true
}

function validateDataEvents(){

  let validationInfo = [["D7","You must enter a start hours on the event config tab"],["D9","You must enter the event duration on the event config tab"],["D11","You must enter a color on the event config tab"],["D13","You must enter a title on the event config tab"],["G9","Missing information on event tab"],["G10","Missing information on event tab"],["G11","Missing information on event tab"],["G12","Missing information on event tab"],["G13","Missing information on event tab"],["G14","Missing information on event tab"],["G15","Missing information on event tab"],["G16","Missing information on event tab"],["G17","Missing information on event tab"]]

  for (let i = 0; i < validationInfo.length; i++){
    let el = validationInfo[i];
    //validate month
    if(eventConfig.getRange(el[0]).isBlank()==true){
      ui.alert(el[1])
      eventConfig.getRange(el[0]).activate();
      eventConfig.getRange(el[0]).setBackground("#FF0000");
      return false;
    }
  }

  //check maximun five reminders
  let numberOfReminders = 0
  let eventConfigList = ["G9","G10","G11","G12","G13","G14","G15","G16","G17"]
  eventConfigList.forEach((el)=>{
  if(eventConfig.getRange(el).getValue()=="Yes"){
    numberOfReminders +=1
  }
  })

  if(numberOfReminders>5){
    ui.alert("You can only select five reminders at most on the event configuration tab")
    eventConfig.getRange("F7").setBackground("#FF0000");
    return false
  }
  
  return true;
}


//THIS FUNCTION UPDATES THE AGE FIELD OF "Birthday List" EVERY TIME A USER OPENS THE PROJECT

function onOpen(e){
  let values = dataSheet.getDataRange().getValues();
  i=1
  for (i;i<values.length;i++){
    let birtdayDate = values[i][2];
    birtdayDate = new Date(birtdayDate)

    let [birthDate,age]= getDateAndAge(birtdayDate.getDate(),birtdayDate.getMonth(),birtdayDate.getFullYear())

    if(Number(values[i][3]!=Number(age))){
      dataSheet.getRange(i+1,4).setValue(age);
    }
  }
}

