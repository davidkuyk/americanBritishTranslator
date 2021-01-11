const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const britishtoAmericanSpelling = require('./british-to-american-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishToAmericanTitles = require("./british-to-american-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  translate(input) {
    console.log('input.text: ' + input.text)
    let tempText = input.text
    let transCount = 0;
    let alreadyCheckedCount = 0;
    let returnObj = {};
    if(tempText == '') {
      return { error: 'No text to translate' }
    }
    if((input.text == undefined) || (input.locale == undefined)) {
      return { error: 'Required field(s) missing' }
    }

    if(input.locale !== 'american-to-british' && input.locale !== 'british-to-american') {
      return { error: 'Invalid value for locale field' }
    }

    if((/\d:\d/.test(tempText)) || (/\d\.\d/.test(tempText))) {
      if (input.locale == "american-to-british") {
        tempText = tempText.replace(/(\d?\d):(\d\d)/, '<span class="highlight">$1.$2</span>')
      }
      if (input.locale == "british-to-american") {
        tempText = tempText.replace(/(\d?\d)\.(\d\d)/, '<span class="highlight">$1:$2</span>')
      }
      transCount +=1;
    }

    

  if (input.locale == 'american-to-british') {

    for(let k=0; k < Object.keys(americanToBritishTitles).length; k++) {
      if(tempText.includes(Object.keys(americanToBritishTitles)[k])) {
        tempText = tempText.replace(Object.keys(americanToBritishTitles)[k], '<span class="highlight">' + americanToBritishTitles[Object.keys(americanToBritishTitles)[k]] + '</span>')
        transCount +=1;
        break;
      }
    }

    for (let ao=0; ao< Object.keys(americanOnly).length; ao++) {
        if (tempText.includes(Object.keys(americanOnly)[ao])) {
            tempText = tempText.replace(Object.keys(americanOnly)[ao], '<span class="highlight">' + americanOnly[Object.keys(americanOnly)[ao]] + '</span>')
            transCount +=1;
          }
      }
  }

  if (input.locale == 'british-to-american') {

    for(let k=0; k < Object.keys(britishToAmericanTitles).length; k++) {
      if(tempText.includes(Object.keys(britishToAmericanTitles)[k])) {
        tempText = tempText.replace(Object.keys(britishToAmericanTitles)[k], '<span class="highlight">' + britishToAmericanTitles[Object.keys(britishToAmericanTitles)[k]] + '</span>')
        transCount +=1;
        break;
      }
    }

    for (let bo=0; bo< Object.keys(britishOnly).length; bo++) {
        if (tempText.includes(Object.keys(britishOnly)[bo])) {
            tempText = tempText.replace(Object.keys(britishOnly)[bo], '<span class="highlight">' + britishOnly[Object.keys(britishOnly)[bo]] + '</span>')
            transCount +=1;
            
          }
      }


  }
    
    tempText = tempText.split(/\b/);
    let translatedText = '';

    switch(input.locale) {
      case "american-to-british":

        for (let i = 0; i < tempText.length; i++) {
          if(alreadyCheckedCount == 0) {
            if (americanOnly.hasOwnProperty(tempText[i].toLowerCase())) {
              if (tempText[i] == tempText[i].toLowerCase()) {
                tempText[i] = '<span class="highlight">' + americanOnly[tempText[i].toLowerCase()] + '</span>';
                transCount +=1;
              } else {
                tempText[i] = '<span class="highlight">' + americanOnly[tempText[i].toLowerCase()].charAt(0).toUpperCase() + americanOnly[tempText[i].toLowerCase()].substring(1) + '</span>';
                transCount +=1;
              }
            }
          }
            if (americanToBritishSpelling.hasOwnProperty(tempText[i].toLowerCase())) {
              if (tempText[i] == tempText[i].toLowerCase()) {
                tempText[i] = '<span class="highlight">' + americanToBritishSpelling[tempText[i].toLowerCase()] + '</span>';
                transCount +=1;
              } else {
                tempText[i] = '<span class="highlight">' + americanToBritishSpelling[tempText[i].toLowerCase()].charAt(0).toUpperCase() + americanToBritishSpelling[tempText[i].toLowerCase()].substring(1) + '</span>';
                transCount +=1;
              }
            }
        } 
        translatedText = tempText.join('').replace(/(\s)([',.?!])/, '$2');
        console.log('translatedText: ' + translatedText)
        break;

      case "british-to-american":
        for (let i = 0; i < tempText.length; i++) {
        
        if(alreadyCheckedCount == 0) {
            if (britishOnly.hasOwnProperty(tempText[i].toLowerCase())) {
              if (tempText[i] == tempText[i].toLowerCase()) {
                tempText[i] = '<span class="highlight">' + britishOnly[tempText[i].toLowerCase()] + '</span>';
                transCount +=1;
              } else {
                tempText[i] = '<span class="highlight">' + britishOnly[tempText[i].toLowerCase()].charAt(0).toUpperCase() + britishOnly[tempText[i].toLowerCase()].substring(1) + '</span>';
                transCount +=1;
              }
            }
          }
        
        if (britishtoAmericanSpelling.hasOwnProperty(tempText[i].toLowerCase())) {
              if (tempText[i] == tempText[i].toLowerCase()) {
                tempText[i] = '<span class="highlight">' + britishtoAmericanSpelling[tempText[i].toLowerCase()] + '</span>';
                transCount +=1;
              } else {
                tempText[i] = '<span class="highlight">' + britishtoAmericanSpelling[tempText[i].toLowerCase()].charAt(0).toUpperCase() + britishtoAmericanSpelling[tempText[i].toLowerCase()].substring(1) + '</span>';
                transCount +=1;
              }
            }
 
      }
      translatedText = tempText.join('').replace(/(\s)([',.?!])/, '$2');
      console.log('translatedText: ' + translatedText)
      break;
   
    }

    if (transCount > 0) {
        returnObj = {
          text: input.text,
          translation: translatedText
        }
    } else {
      returnObj = {
        text: input.text,
        translation: "Everything looks good to me!"
      }
    }

    
    console.log('translation: ' + returnObj.translation);
    return returnObj
  }
  


}

module.exports = Translator;