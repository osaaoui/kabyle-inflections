/*function racine(awal){
  //var awal="kecmegh";
  var tab=[];
  var voy=['a', 'e', 'i', 'u'];
  var pref_third_person=['i', 'y', 't'];
  var exclude_words=["yemma"];
  var count={};
  var wis_sin= awal[1];
  var wis_krad= awal[2];
  
  console.log(awal);
  
  if(awal[awal.length -1]=='γ' && (awal[awal.length - 2] =='e') || (awal[awal.length - 2] =='i')){
    console.log("First person singular");
    
  }else if(awal[0]=='t' && (awal[awal.length - 1] =='ḍ') && (awal[awal.length - 2] =='e')){
    console.log("second person singular");
    
    
  }else if((awal[0]=='y' || awal[0]=='t') && (awal[awal.length -1]!='n')){
      console.log("third person singular: yelmed/ telmed")    
  }else if((awal[0]=='i') && (awal[awal.length -1]!='n')){
    if((voy.includes(wis_sin)== false) && (voy.includes(wis_krad)== false)){
      console.log("third person singular: ilmed")
    }else if(wis_sin == wis_krad){
      console.log("third person singular: iddem");
    }
  }
  
  
  
  for(let i=0; i < awal.length; i++){
    if(voy.includes(awal[i]) === false){
      tab.push(awal[i]);
    }
  }
 // console.log(tab);
  tab.forEach(function (el){
   // console.log(el);
    if(el in count){
      count[el] += 1;
    }else{
      count[el] = 1;
    }
  })
  
  for(var i in count){
    console.log(count[i]);
    if(count[i] > 1){
      //console.log("there is a repeated letter ");
    }
  }
  
  console.log(count);
}*/

/*
Detect double chars: 
var word= "beddl"
var count={}
var positions ={}
for(let letter of word){
  if(count[letter]){
    count[letter] += 1
    positions[letter] = word.indexOf(letter)
  }else{
    count[letter] = 1
  }
}
*/
function remove_vowels(awal) {
  var tab = [];
  var voy = ["a", "e", "i", "u"];

  for (let i = 0; i < awal.length; i++) {
    if (voy.includes(awal[i]) === false) {
      tab.push(awal[i]);
    }
  }
  return tab;
}
function repeatedLetter(awal) {
  var repeated = false;
  var count = {};
  var tab = remove_vowels(awal);

  tab.forEach(function (el) {
    //console.log(el);
    if (el in count) {
      count[el] += 1;
    } else {
      count[el] = 1;
    }
  });

  for (var i in count) {
    //console.log(count[i]);
    if (count[i] > 1) {
      repeated = true;
    }
  }
  return repeated;
}

function verb_type(verb) {
  var verb1 = "yelmed";
  var schema1 = "R1R2eR3";
  return repeatedLetter(verb);
}

function forme_verbale(awal) {
  var tab = remove_vowels(awal);
  var racine = tab.join("");
  //console.log(racine);
  return racine;
}

function infinitive(awal) {
  var voy = ["a", "e", "i", "u"];

  var inf = "";
  var racine = forme_verbale(awal);
  var last_char = racine[racine.length - 1];
  //console.log(voy.includes(racine[racine.length -1]) === false)
  // inf = racine.slice(1);
  // if(verb_type(awal) === false){
  if (racine[0] == "y" && voy.includes(last_char) === false) {
    inf = racine.slice(1);
    //console.log(typeof(inf));
    // console.log(inf);
  }
  // }
  return inf;
}

//console.log(infinitive("yelmed"));



/*function to check if verb form is 2nd person sing
3.1. first check if the fist char is i/y/t + e:
    if yes: 
        then we have a 3rd pers. sing form. ex. i/yebleγ
        a. strip the first 2 chars:  i/yebleγ => bleγ
        b. return the form
        c. end*/
function isThirdPersonSingular(form) {
  var isThirdPersonSing = false;
  var firstChar= form.charAt(0);
  var lastChar = form.charAt(form.length - 1);
  if ((firstChar === "i") || (firstChar === "y") || (firstChar === "t" && lastChar !== 'm')){
    console.log("2nd Person Singular form");
    isThirdPersonSing = true;
    stripThirdPersonSingInflection(form, firstChar);
  }else{
    console.log("Not 2nd Person Singular form");
  }
  return isThirdPersonSing;
}

function stripThirdPersonSingInflection(form, firstChar){
  var strippedForm= "";
  if(firstChar === 'i'){
    strippedForm = form.substr(1,);
  }else{
    strippedForm = form.substr(2,);
  }
 
  return strippedForm;
}


//function to check if verb form is 1st person sing
function isFirstPersonSingular(form) {
  var isFirstPersonSing = false;
  var secondChar = form.charAt(1);
  var lastChar = form.charAt(form.length - 1);
  if (secondChar === "e" && lastChar === "γ") {
    isFirstPersonSing = true;
  }
  return isFirstPersonSing;
}

//function to remove last 2 chars if isFirstPersonSing is true: belγeγ => belγ
function stripFirstPersSingInflection(form) {
  var strippedForm = form.substr(0, form.length - 2);
  if (strippedForm.length == 4) {
    //Verb belongs to the first schema: R1R2eR3
    return lmedBaseForm(strippedForm);
  } else if (
    strippedForm.length == 5 &&
    strippedForm.charAt(2) === strippedForm.charAt(3)
  ) {
    return beddelBaseForm(strippedForm);
  }
}
//return base form of the verb
function lmedBaseForm(strippedForm) {
  var lemma = strippedForm.replace(/[aeiou]/gi, "");
  return lemma.substr(0, 2) + "e" + lemma[lemma.length - 1];
}

function beddelBaseForm(strippedForm) {
  //var lemma = strippedForm.replace(/[aeiou]/gi, "");
  return strippedForm.substr(0, 4) + "e" + strippedForm.substr(-1);
}

function isSecondPersonSingular(form){
  var isSecondPersonSing = false;
  var firstChar= form.charAt(0);
  var lastChar = form.charAt(form.length - 1);
  if ((firstChar === "i") || (firstChar === "ḍ")){
    console.log("2nd Person Singular form");
    isSecondPersonSing = true;
    stripSecondPersonSingInflection(form);
  }else{
    console.log("Not 2nd Person Singular form");
  }
  return isSecondPersonSing;
}

function stripSecondPersonSingInflection(form){
  var strippedForm= "";
  
    strippedForm = form.substr(1, form.length -3);
    strippedForm = forme_verbale(strippedForm);
    strippedForm= strippedForm.slice(0, 2) + 'e' + strippedForm.slice(-1);
  return strippedForm;
}

function isFirstPersonPlural(form){
  var isFirstPersonPlur = false;
  var firstChar= form.charAt(0);
  var secondChar = form.charAt(1);
  if ((firstChar === "n") && (secondChar === "e")){
    console.log("1st person plural");
    isFirstPersonPlur = true;
    firstPersonPluralInflection(form);
  }else{
    console.log("Not 1st person plural");
  }
  return isFirstPersonPlur;
}

// Example: nekcem    strip the first 2 letters = kcem
function stripFirstPersonPluralInflection(form){
  var strippedForm= "";
    strippedForm = form.substr(2,);
  return strippedForm;
}

//2nd person plural
function isSecondPersonPlural(form){
  var isSecondPersonPlur = false;
  var firstChar= form.charAt(0);
  var lastChars = form.slice(form.length -3,);
  var lastTwoLetters = lastChars.slice(-2,);
  if ((firstChar === "t") && (lastTwoLetters == "em" ||lastTwoLetters =="mt")){
    console.log("2nd person plural");
    isSecondPersonPlur = true;
    firstPersonPluralInflection(form);
  }else{
    console.log("Not 2nd person plural");
  }
  return isSecondPersonPlur;
}

// Example: tkecmem/t trewlem/t    strip the first 2 letters = kcem
function stripSecondPersonPluralInflection(form){
  var strippedForm= "";
    strippedForm = form.slice(1,-2);
    strippedForm = forme_verbale(strippedForm);
    strippedForm= strippedForm.slice(0, 2) + 'e' + strippedForm.slice(-1);
  return strippedForm;
}

//Third person plural  : kecmen
function isThirdPersonPlural(form){
  var isThirdPersonPlur = false;
  var lastTwoLetters = lastChars.slice(-2);
  var lastThreeLetters = lastChars.slice(-3);
  if (lastTwoLetters === "en" && lastThreeLetters == "ent"){
    console.log("3rd person plural");
    isThirdPersonPlur = true;
    stripThirdPersonPluralInflection(form);
  }else{
    console.log("Not 3rd person plural");
  }
  return isThirdPersonPlur;
}

// Example: //kecmen/t    strip the last 2 letters = kecm
function stripThirdPersonPluralInflection(form){
  var strippedForm= "";
    strippedForm = form.slice(0,-2);
    strippedForm = forme_verbale(strippedForm);
    strippedForm= strippedForm.slice(0, 2) + 'e' + strippedForm.slice(-1);
  return strippedForm;
}


//if (isFirstPersonSingular("rewleγ")) {
  //console.log(stripFirstPersSingInflection("rewleγ")); // rwel
//}



/*if(isThirdPersonSingular('yerwel')){
  console.log(stripThirdPersonSingInflection('yerwel', 'y'));
}*/

console.log(stripThirdPersonPluralInflection('le3ben'));
