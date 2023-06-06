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
    let newId = Math.floor(10000 + Math.random() * 90000);
    let i = 0
    for(i;i<values.length;i++){
      if(newId==values[i][0]){
        newId = Math.floor(10000 + Math.random() * 90000);
        i=-1
      }
    }
    return newId
  }
  
  //checks that input cells are unselected before running a script
  function checkInputsAreUnselected(){
    let activeCell = shUserForm.getActiveCell().getA1Notation()
  
    console.log(activeCell);
    if(activeCell=="D11"|| activeCell=="D13"|| activeCell=="G13"|| activeCell=="J13"|| activeCell=="D16"|| activeCell=="D7"){
      ui.alert("You must unselect the current cell before hitting the button")
      return false
    }
  
    return true
  }
  
  //////////////////////////////////////////////////////////////////////////////
  //VALIDATE DATA //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  function validateData(){
    //validate Name
    if(shUserForm.getRange("D11").isBlank()==true){
      ui.alert("You must enter a name")
      shUserForm.getRange("D11").activate();
      shUserForm.getRange("D11").setBackground("#FF0000");
      return false
    }
    //validate day
    if(shUserForm.getRange("D13").isBlank()==true){
      ui.alert("You must enter a day")
      shUserForm.getRange("D13").activate();
      shUserForm.getRange("D13").setBackground("#FF0000");
      return false
    }
  
    //validate month
    if(shUserForm.getRange("G13").isBlank()==true){
      ui.alert("You must enter a month")
      shUserForm.getRange("G13").activate();
      shUserForm.getRange("G13").setBackground("#FF0000");
      return false
    }
  
    //validate year
    if(shUserForm.getRange("J13").isBlank()==true){
      ui.alert("You must enter a year")
      shUserForm.getRange("J13").activate();
      shUserForm.getRange("J13").setBackground("#FF0000");
      return false
    }
  
  
    return true
  }
  
  