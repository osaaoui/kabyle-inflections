
"use strict";


/*
input: inflected form, for example: nekcem, beddleγ, etc 
first we need to determine the type of verb the form belongs to:
a. type lmed
b. type beddel
c. type cfu
...
To be able to identify the verb type, we need to analyse the inflections of the verb
starting with the 1st person singular inflections up to the 3rd personal plural
we do this for the aoriste form, then the preterit.

  
*/
const _enums={
    LMED: "lmed",
    BEDDEL: "beddel",
    CFU: "cfu",
    QADER: "qader",
    CUDD: "cudd",
    NUDDEM: "nuddem",
    ZUGHER: "zugher",
    DDEM: "ddem",
    MMET: "mmet",
    TTED: "tted",
    DDER: "dder",
    DEGDEG: "degdeg",
    FSI:"fsi",
    SBERBER:"sberber",
    SMGLEZ: "smeglez",
    GHIL :"ghil",
    CIR:"cir",
    QIM:"qim",
    AFEG: "afeg",
    WALI:"wali",
    SEW:"sew",
    IKSIN:"iksin",
    ARU:"aru",
    IZID:"izid"

};
const _inflections={
    FIRSTPERSSING: "firstPersSing",
    SECONDPERSSING: "secondPersSing",
    THIRDPERSSING: "thirdPersSing",
    //THIRDPERSSINGFEM: "thirdPersSingFem",
    FIRSTPERSPLUR: "firstPersPlur",
    SECONDPERSPLUR: "secondPersPlur",
    THIRDPERSPLUR: "thirdPersPlur",
    //THIRDPERSPLURFEM: "thirdPersPlurFem",
    
};

var _VerbType={


checkInflections: function(form){
   
    var firstChar = form.charAt(0);
    var secondChar = form.charAt(1);
    var thirdChar = form.charAt(2);
    var fourthChar = form.charAt(3);
    var fifththChar = form.charAt(4);
    var lastChars = form.slice(form.length - 3);
    var beforeLastChar = form.charAt(form.length - 2);
    var lastTwoLetters = lastChars.slice(-2);
    var lastChar = form.charAt(form.length - 1);
    var lastTwoLettersAbs = form.slice(-2);
    var lastThreeLetters = form.slice(-3);

    
    const {isFirst, firstInflection, verbType}=this.isFirstPersSing(form);
    const {isSecond, secondInflection, secondVerbType}=this.isSecondPersSing(form);
    const {isThird, thirdInflection, thirdVerbType}=this.isThirdPersSing(form);
    const {isFirstPlur, firstPlurInflection, firstPlurVerbType}=this.isFirstPersPlur(form);
    const {isSecondPlur, secondPlurInflection, secondPlurVerbType}=this.isSecondPersPlur(form);
    const {isThirdPlur, ThirdPlurInflection, ThirdPlurVerbType}=this.isThirdPersPlur(form);

    if(isFirst){
        console.log("Form: 1st person singular");
        console.log("Type:" + verbType);
        return {
            isFirst,
            firstInflection,
            verbType
        }
        
    }if (isSecond){
        console.log("Form: 2nd person singular");
        console.log("Type:" + secondVerbType);
        return {
            isSecond,
            secondInflection,
            secondVerbType
        }
    }if(isThird){
        console.log("Form: 3rd person singular");
        console.log("Type:" + thirdVerbType);
        return {
            isThird,
            thirdInflection,
            thirdVerbType
        }
    }if(isFirstPlur){
        console.log("Form: 1st person plural");
        console.log("Type:" + firstPlurVerbType);
        return {
            isFirstPlur,
            firstPlurInflection,
            firstPlurVerbType
        }
    }if(isSecondPlur){
        console.log("Form: 2nd person plural");
        console.log("Type:" + secondPlurVerbType);
        return {
            isSecondPlur,
            secondPlurInflection,
            secondPlurVerbType
        }
    }if(isThirdPlur){
        console.log("Form: 3rd person plural");
        console.log("Type:" + ThirdPlurVerbType);
        return {
            isThirdPlur,
            ThirdPlurInflection,
            ThirdPlurVerbType
        }
    }
    
},

isFirstPersSing: function(form){
    var isFirst= false;
    var verbType;
    var inflection= _inflections.FIRSTPERSSING;
    var secondChar = form.charAt(1);
    var thirdChar = form.charAt(2);
    var fourthChar = form.charAt(3);
    var beforeLastChar = form.charAt(form.length - 2);
    var lastChar = form.charAt(form.length - 1);

    if (secondChar === "e" && lastChar === "γ" && (thirdChar !== fourthChar)) { // type : lemdeγ
        verbType = _enums.LMED;
        isFirst = true;
    }else if(secondChar === "e" && lastChar === "γ" && (thirdChar === fourthChar)){ //type: beddleγ
        verbType = _enums.BEDDEL;
        isFirst = true;
    }else if(beforeLastChar ==="i" && lastChar === "γ"){  //type: cfiγ
        verbType = _enums.CFU;
        isFirst = true;
    }

    return {
        isFirst,
        inflection,
        verbType
        
    }
},


isSecondPersSing: function(form){
    var isSecond= false;
    var secondVerbType;
    var secondInflection = _inflections.SECONDPERSSING;
    var firstChar = form.charAt(0);
    var fourthChar = form.charAt(3);
    var fifththChar = form.charAt(4);
    var beforeLastChar = form.charAt(form.length - 2);
    var lastChar = form.charAt(form.length - 1);
    if (firstChar === "t" && lastChar === "ḍ" && beforeLastChar !== "i" && (fourthChar !== fifththChar) ) { //tlemdeḍ
        isSecond=true;
        secondVerbType=_enums.LMED;
       
    }else if (firstChar === "t" && lastChar === "ḍ" && (fourthChar === fifththChar)){ //tbeddleḍ
        isSecond=true;
        secondVerbType=_enums.BEDDEL;
    }else if (firstChar === "t" && lastChar === "ḍ" && beforeLastChar === "i"){ //tecfiḍ
        isSecond=true;
        secondVerbType=_enums.CFU;
    }

    return {
        isSecond,
        secondInflection,
        secondVerbType
      
    }
},

isThirdPersSing: function(form){
    var isThird= false;
    var thirdVerbType;
    var thirdInflection = _inflections.THIRDPERSSING;
    var firstChar = form.charAt(0);
    var fourthChar = form.charAt(3);
    var fifththChar = form.charAt(4);
    var lastChar = form.charAt(form.length - 1);
    var beforeLastChar = form.charAt(form.length - 2);

    var formLength= form.length;

    if ((firstChar === "i" ||firstChar === "y" || firstChar === "t") && (fourthChar !== fifththChar) && (lastChar !== "ḍ" && lastChar !== "a") && (beforeLastChar ==="e" && formLength <=6)) {// i/y/telmed
        isThird=true;
        thirdVerbType=_enums.LMED;
        
    }else if((firstChar === "i" ||firstChar === "y" || firstChar === "t") && (fourthChar === fifththChar) && (lastChar !== "ḍ" && lastChar !== "a") && (formLength <=7)){//tbeddel /ibeddel
        isThird=true;
        thirdVerbType=_enums.BEDDEL;
    }else if((firstChar === "i" ||firstChar === "y" || firstChar === "t") && (fourthChar !== fifththChar) && (lastChar ==="a") && (formLength <= 5)){ //i/y/tecfa
        isThird=true;
        thirdVerbType=_enums.CFU;
    }

    return {
        isThird,
        thirdInflection,
        thirdVerbType
      
    }
},

isFirstPersPlur: function(form){
    var isFirstPlur= false;
    var firstPlurVerbType;
    var firstPlurInflection = _inflections.FIRSTPERSPLUR;
    var firstChar = form.charAt(0);
    var secondChar = form.charAt(1);
    var fourthChar = form.charAt(3);
    var fifththChar = form.charAt(4);
    var beforeLastChar = form.charAt(form.length - 2);
    var lastChar = form.charAt(form.length - 1);

    if ((firstChar === "n" && secondChar === "e") && (fourthChar !== fifththChar) && (lastChar !== "a")) { // nelmed
        isFirstPlur=true;
        firstPlurVerbType=_enums.LMED;
       
    }else if((firstChar === "n" && beforeLastChar === "e") && (fourthChar === fifththChar)){//nbeddel
        isFirstPlur=true;
        firstPlurVerbType=_enums.BEDDEL;
    }else if((firstChar ==="n" && secondChar === "e") && lastChar === "a"){ //necfa
        isFirstPlur=true;
        firstPlurVerbType=_enums.CFU;
    }
    return {
    isFirstPlur,
    firstPlurInflection,
    firstPlurVerbType
    }
    
},

isSecondPersPlur:function(form){
    var isSecondPlur=false;
    var secondPlurVerbType;
    var secondPlurInflection = _inflections.SECONDPERSPLUR;

    var firstChar = form.charAt(0);
    var secondChar = form.charAt(1);
    var fourthChar = form.charAt(3);
    var fifththChar = form.charAt(4);
    var lastChars = form.slice(form.length - 3);
    var lastTwoLetters = lastChars.slice(-2);

    var formLength= form.length;

    if ((firstChar === "t" && secondChar !== "e") && (lastTwoLetters == "em" || lastTwoLetters == "mt") && (fourthChar !== fifththChar)) {//tkecmem/t
        isSecondPlur=true;
        secondPlurVerbType=_enums.LMED;
    }else if (firstChar === "t" &&(lastTwoLetters == "em" || lastTwoLetters == "mt") && (fourthChar === fifththChar)){//tbeddlem/t
        isSecondPlur=true;
        secondPlurVerbType=_enums.BEDDEL;
    }else if ((firstChar === "t" && secondChar === "e") &&(lastTwoLetters == "am" || lastTwoLetters == "mt")  && (formLength >=6 )){//tecfam/t
        isSecondPlur=true;
        secondPlurVerbType=_enums.CFU;
    }
    return{
        isSecondPlur,
        secondPlurInflection,
        secondPlurVerbType

    }
            
},

isThirdPersPlur: function(form){

    var isThirdPlur=false;
    var ThirdPlurVerbType;
    var ThirdPlurInflection= _enums.THIRDPERSPLUR;

    var thirdChar = form.charAt(2);
    var fourthChar = form.charAt(3);
    var lastChars = form.slice(form.length - 3);
    var lastTwoLettersAbs = form.slice(-2);
    var lastThreeLetters = form.slice(-3);
    var formLength= form.length;

    if ((lastTwoLettersAbs === "en" || lastThreeLetters == "ent") && (thirdChar !== fourthChar)) { // lemden/t
        console.log("inside type lmed");
        isThirdPlur=true;
        ThirdPlurVerbType=_enums.LMED;
        
    }else if((lastTwoLettersAbs === "en" || lastThreeLetters == "ent") && (thirdChar === fourthChar)){ // beddlen/t
        console.log("inside type beddel");
        isThirdPlur=true;
        ThirdPlurVerbType=_enums.BEDDEL;

    }else if(lastTwoLettersAbs === "an" || lastThreeLetters == "ant" && (formLength <= 5)){ //cfan/t
        console.log("inside type cfu");
        isThirdPlur=true;
        ThirdPlurVerbType=_enums.CFU;

    }

    return {
        isThirdPlur,
        ThirdPlurInflection,
        ThirdPlurVerbType
    }
},

};


if (typeof exports === "object" && typeof module === "object") {
    module.exports = _VerbType;
  } else if (typeof define === "function" && define.amd) {
    define([], function () {
      return _VerbType;
    });
  } else {
    window.VerbType = _VerbType;
  }
  