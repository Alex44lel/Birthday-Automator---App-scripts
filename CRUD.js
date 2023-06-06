//Global variables
const myGoggleSheet = SpreadsheetApp.getActive();
const shUserForm = myGoggleSheet.getSheetByName("Form");
const dataSheet = myGoggleSheet.getSheetByName("Birthday List");
const ui = SpreadsheetApp.getUi(); //creates instance of the user interface to show the alert

//////////////////////////////////////////////////////////////////////////////
//SUBMIT RECORD //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//Function to submit data to birthday database and also to modify it depending on parameter
function submitData(rowToModify=false){
   if(!checkInputsAreUnselected()){
    return
   }

  if(validateData() == true){

    let row = dataSheet.getLastRow() + 1; //get next blanck row
    
    if(rowToModify){
    row = rowToModify
    }
    //Transfer data
    [birthDate,age]= getDateAndAge(shUserForm.getRange("D13").getValue(),shUserForm.getRange("G13").getValue(),shUserForm.getRange("J13").getValue())

    //if we are modifiying we do not change it
    if(!rowToModify){
    dataSheet.getRange(row,1).setValue(generateId()); //BirthDayId

    }
    let googleCalendarId = createYearlyEventWithReminders(shUserForm.getRange("D11").getValue(),birthDate,shUserForm.getRange("D17").getValue())
    dataSheet.getRange(row,2).setValue(shUserForm.getRange("D11").getValue()); //Name
    dataSheet.getRange(row,3).setValue(birthDate); //Date
    dataSheet.getRange(row,4).setValue(age); //Age
    dataSheet.getRange(row,5).setValue(shUserForm.getRange("D16").getValue()); //Description
    dataSheet.getRange(row,6).setValue(googleCalendarId); //Google Calendar ID

    

    if(rowToModify){
      ui.alert("Record has been succesfully modified!")
    }
    else{
      ui.alert("Birthday has been succesfully saved!")
      clearForm(shUserForm);
      
    }


  }

}

//////////////////////////////////////////////////////////////////////////////
//SEARCH RECORD //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//Function to search a record by the birthdayId. it can either just search the row or put it on the ui
function searchRecordById(onlyRow=false){
  if(!checkInputsAreUnselected()){
    return
  }
  let str = shUserForm.getRange("D7").getValue();
  //get multidimensional array of all sheet
  let values = dataSheet.getDataRange().getValues();
  let valueFound = false;

  for (let i = 0; i<values.length;i++){
    let rowValue =  values[i]

    if(rowValue[0]==str){
        if(onlyRow){
          return i+1
        }
        shUserForm.getRange("D11").setValue(rowValue[1]) //name
        console.log(rowValue[2].getDate());
        console.log(rowValue[2].getFullYear());
        console.log(rowValue[2].getMonth()+1);
        
        shUserForm.getRange("D13").setValue(rowValue[2].getDate()) //day
        shUserForm.getRange("G13").setValue(rowValue[2].getMonth()+1) //month
        shUserForm.getRange("J13").setValue(rowValue[2].getFullYear()) //year
        

        shUserForm.getRange("D17").setValue(rowValue[5]) //description

        valueFound=true

        return true
    }
  }
  if(!valueFound){
    ui.alert("This person is not in the birthday list")
  }

}


//////////////////////////////////////////////////////////////////////////////
//MODIFY RECORD //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

function modifyRecord(){
  let response = ui.alert("Modify","Do you want to modify the record?", ui.ButtonSet.YES_NO)
  if(response == ui.Button.NO){
    return
  }
  //user wants to modify. All errors are handle inside both of the following functions
  rowToModify = searchRecordById(true);
  if(rowToModify){
    submitData(rowToModify)
  }
}

//////////////////////////////////////////////////////////////////////////////
//DELETE RECORD //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

function deleteRecord(){
  let response = ui.alert("Delete","Do you want to delete the record?", ui.ButtonSet.YES_NO)
  if(response == ui.Button.NO){
    return
  }
  //user wants to modify. All errors are handle inside both of the following functions
  rowToDelete = searchRecordById(true);
  if(rowToDelete){
    //delete it from calendar
    googleCalendarEventId = dataSheet.getRange(rowToDelete,6).getValue();
    deleteEventFromCalendar(googleCalendarEventId)
    //delete from sheets
    dataSheet.deleteRow(rowToDelete);
    clearForm();

  }
 
}

//////////////////////////////////////////////////////////////////////////////
//CLEAR FORM /////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

function clearForm(){
  shUserForm.getRange("D7").setValue("").setBackground("#efefef")
  shUserForm.getRange("D11").setValue("").setBackground("#efefef")
  shUserForm.getRange("D13").setValue("").setBackground("#efefef")
  shUserForm.getRange("G13").setValue("").setBackground("#efefef")
  shUserForm.getRange("J13").setValue("").setBackground("#efefef")
  shUserForm.getRange("D16").setValue("").setBackground("#efefef")
  
}








