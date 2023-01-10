let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

function getSeatNumber(){
  let ui = SpreadsheetApp.getUi();
  let title = 'Where are you?';
  let message = 'Please Input your seat Number.'
  let res = ui.prompt(title, message, ui.ButtonSet.OK_CANCEL);
  let resBtn = res.getSelectedButton();
  if(resBtn == ui.Button.OK){
    return res.getResponseText();
  }else{
    return 9999;
  }
}

function getCell(seatNumber){
  if(seatNumber==9999)
    return "S50"
  let regex = new RegExp(seatNumber, "i");
  let seats = sheet.getRange("A1:T11").getValues();
  let alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  for (let i = 0; i < seats.length; i++)
    for (let j = 0; j < seats[i].length; j++)
        if (seats[i][j].toString().match(regex))
          return alphabets[j] + (i+2);
}

function done() {
  sheet.getRange(getCell(getSeatNumber())).setBackground("green");
}

function help() {
  sheet.getRange(getCell(getSeatNumber())).setBackground("orange");
}

function reset() {
  sheet.getRange(getCell(getSeatNumber())).setBackground("white");
}

function clearAll(){
  for (let i = 1; i <= 22; i++)
    sheet.getRange(getCell(i)).setBackground("white");
}
