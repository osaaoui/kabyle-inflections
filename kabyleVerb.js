
"use strict";

const verbForms = require("./verbType");



/**
 * Javascript inflector
 *
 * @author Omar Saaoui
 * @Date 2021-02-01
 */

var _Inflector = {
  uncountableWords: [],

  pluralRules: [],

  singularRules: [],

  /*
    Remove all vowels from the radical to get the root of the word
    Example:  remove_vowels("kcem") => kcm  
    */
  remove_vowels: function (awal) {
    var tab = [];
    var voy = ["a", "e", "i", "u"];

    for (let i = 0; i < awal.length; i++) {
      if (voy.includes(awal[i]) === false) {
        tab.push(awal[i]);
      }
    }
    return tab;
  },

  /*
    Return the root of the word
    */

  forme_verbale: function (awal) {
    var tab = this.remove_vowels(awal);
    var racine = tab.join("");
    console.log(racine);
    return racine;
  },

  verb_type: function (char1, char2) {
    var typeBeddel = false;
    if (char1 === char2) {
      console.log("Verb type 2: model beddel");
      typeBeddel = true;
    }
    return typeBeddel;
  },
// fpsForm: First person singular form
  fpsForm: function(form){

  },

  tawwurt: function (form) {
    //var verbType = false;
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

    var checks= verbForms.checkInflections(form);
    if(checks.isFirst){
      if(checks.verbType === "lmed"){
        return this.stripFirstPersSingTypeLmed(form);
      }else if(checks.verbType === "beddel"){
       return this.stripFirstPersSingTypeBeddel(form);
      }else if(checks.verbType === "cfu"){
        return this.stripFirstPersSingTypeCfu(form);
       }

    }else if(checks.isSecond){
      if(checks.secondVerbType === "lmed"){
        return this.stripSecondPersonSingInflection(form);
      }else if(checks.secondVerbType === "beddel"){
       return this.stripSecondPersonSingInflection(form);
      }else if(checks.secondVerbType === "cfu"){
        return this.stripSecondPersonSingInflection(form);
       }
    
    
      }else if(checks.isThird){
        if(checks.thirdVerbType === "lmed"){
          return this.stripThirdPersonSingInflection(form);
        }else if(checks.thirdVerbType === "beddel"){
         return this.stripThirdPersonSingInflection(form);
        }else if(checks.thirdVerbType === "cfu"){
          return this.stripThirdPersonSingInflection(form);
         }
      
      
        }
    /*if (secondChar === "e" && lastChar === "γ") {
      verbType = this.verb_type(thirdChar, fourthChar); //beddleγ
      return this.isFirstPersonSingular(form, verbType);


    } else if (firstChar === "t" && lastChar === "ḍ") {
      verbType = this.verb_type(fourthChar, fifththChar); //tbeddleḍ
      return this.isSecondPersonSingular(form, verbType);


    } else if (firstChar === "i" ||firstChar === "y" ||(firstChar === "t" && beforeLastChar === "e" && lastChar !== "m")) {
      verbType = this.verb_type(fourthChar, fifththChar); //tbeddel /ibeddel
      return this.isThirdPersonSingular(form, firstChar, verbType);
    } else if (firstChar === "n" && secondChar === "e" && fourthChar !== fifththChar) {
      //nbeddel
      console.log("first person plural type lmed");
      return this.isFirstPersonPlural(form, verbType);
    } else if (firstChar === "n" && fourthChar === fifththChar) {
      console.log("first person plural type beddel");
      verbType = true;
      return this.isFirstPersonPlural(form, verbType);

      // isSecondPersonPlural: tkecmen/t  tbeddlem/t
    } else if (firstChar === "t" &&(lastTwoLetters == "em" || lastTwoLetters == "mt")) {
      verbType = this.verb_type(fourthChar, fifththChar);
      return this.isSecondPersonPlural(form, lastTwoLetters, verbType);
    } else if (lastTwoLettersAbs === "en" || lastThreeLetters == "ent") {
      verbType = this.verb_type(thirdChar, fourthChar); //beddlen
      return this.isThirdPersonPlural(form, lastTwoLettersAbs, verbType);
    }*/
  },

  //function to check if verb form is 1st person sing
  isFirstPersonSingular: function (form, verbType) {
    var isFirstPersonSing = false;
    if (verbType) {
      console.log("verbtype first call: " + verbType);
      return this.stripFirstPersSingTypeBeddel(form);
    } else {
      return this.stripFirstPersSingTypeLmed(form);
    }
  },

  //function to remove last 2 chars if isFirstPersonSing is true: belγeγ => belγ
  stripFirstPersSingTypeLmed: function (form) {
    var strippedForm = form.substr(0, form.length - 2);
    if (strippedForm.length == 4) {
      //Verb belongs to the first schema: R1R2eR3
      return this.lmedBaseForm(strippedForm);
    } else if (
      strippedForm.length == 5 &&
      strippedForm.charAt(2) === strippedForm.charAt(3)
    ) {
      return this.beddelBaseForm(strippedForm);
    }
  },
  //return base form of the verb
  lmedBaseForm: function (strippedForm) {
    var lemma = strippedForm.replace(/[aeiou]/gi, "");
    lemma = lemma.substr(0, 2) + "e" + lemma[lemma.length - 1];
    console.log("1st singular form: " + lemma);
    return lemma;
  },

  beddelBaseForm: function (strippedForm) {
    //var lemma = strippedForm.replace(/[aeiou]/gi, "");
    return strippedForm.substr(0, 4) + "e" + strippedForm.substr(-1);
  },

  //beddleγ
  stripFirstPersSingTypeBeddel: function (form) {
    var stripppedForm = form.slice(0, 5); // beddl
    stripppedForm = stripppedForm.slice(0, 4) + "e" + stripppedForm.slice(-1); //beddel
    console.log("type beddel / 1st singular form: " + stripppedForm);
    return stripppedForm;
  },

  stripFirstPersSingTypeCfu: function(form){
    console.log("First person singular. Type: cfu");
  },

  isSecondPersonSingular: function (form, verbType) {
    return this.stripSecondPersonSingInflection(form, verbType);
  },

  stripSecondPersonSingInflection: function (form, verbType) {
    var strippedForm = "";

    strippedForm = form.substr(1, form.length - 3);
    strippedForm = this.forme_verbale(strippedForm);
    console.log("verbType " + verbType);
    if (verbType) {
      strippedForm =
        strippedForm.slice(0, 1) +
        "e" +
        strippedForm.slice(1, 3) +
        "e" +
        strippedForm.slice(-1);
    } else {
      strippedForm = strippedForm.slice(0, 2) + "e" + strippedForm.slice(-1);
      console.log("2nd singular form: " + strippedForm);
    }

    return strippedForm;
  },

  /*function to check if verb form is 3rd person sing
3.1. first check if the fist char is i/y/t + e:
    if yes: 
        then we have a 3rd pers. sing form. ex. i/yebleγ
        a. strip the first 2 chars:  i/yebleγ => bleγ
        b. return the form
        c. end*/
  isThirdPersonSingular: function (form, firstChar, verbType) {
    return this.stripThirdPersonSingInflection(form, firstChar, verbType);
  },

  stripThirdPersonSingInflection: function (form, firstChar, verbType) {
    var strippedForm = "";
    if (verbType) {
      strippedForm = form.slice(1);
    } else {
      if (firstChar === "i") {
        strippedForm = form.substr(1);
        console.log("3rd masculine singular form: " + strippedForm);
      } else {
        strippedForm = form.substr(2);
        console.log("3rd feminine singular form: " + strippedForm);
      }
    }
    return strippedForm;
  },

  ////nbeddel   / nekcem
  isFirstPersonPlural: function (form, verbType) {
    return this.stripFirstPersonPluralInflection(form, verbType);
  },

  // Example: nekcem    strip the first 2 letters = kcem
  stripFirstPersonPluralInflection: function (form, verbType) {
    var strippedForm = "";
    if (verbType) {
      strippedForm = form.slice(1);
      console.log("1st person plural: " + strippedForm);
    } else {
      strippedForm = form.substr(2);
      console.log("1st person plural: " + strippedForm);
    }

    return strippedForm;
  },

  //2nd person plural
  isSecondPersonPlural: function (form, lastTwoLetters, verbType) {
    return this.stripSecondPersonPluralInflection(
      form,
      lastTwoLetters,
      verbType
    );
  },

  // Example: tkecmem/t trewlem/t    strip the first 2 letters = kcem
  stripSecondPersonPluralInflection: function (form, lastTwoLetters, verbType) {
    var strippedForm = "";
    if (verbType) {
      lastTwoLetters === "em"
        ? (strippedForm = form.slice(1, -2))
        : (strippedForm = form.slice(1, -3));
      strippedForm = strippedForm.slice(0, -1) + "e" + strippedForm.slice(-1);
      console.log("2nd person plural: " + strippedForm);
    } else {
      strippedForm = form.slice(1, -2);
      strippedForm = this.forme_verbale(strippedForm);
      strippedForm = strippedForm.slice(0, 2) + "e" + strippedForm.slice(-1);
      console.log("2nd person plural: " + strippedForm);
    }
    return strippedForm;
  },

  //Third person plural  : kecmen
  isThirdPersonPlural: function (form, lastTwoLettersAbs, verbType) {
    
      return this.stripThirdPersonPluralInflection(form, lastTwoLettersAbs, verbType);
    
  },

  // Example: //kecmen/t    strip the last 2 letters = kecm
  stripThirdPersonPluralInflection: function (form, lastTwoLettersAbs, verbType) {
    var strippedForm="";
    var intermedForm="";
    if(verbType){
      if(lastTwoLettersAbs ==="en"){
        intermedForm= form.slice(0, -2);
        strippedForm= intermedForm .slice(0,-1);
        strippedForm = strippedForm + 'e' + intermedForm.slice(-1);
        console.log("3r person plural masculine: " + strippedForm);
      }else{
        intermedForm= form.slice(0, -3);
        strippedForm= intermedForm .slice(0,-1);
        strippedForm = strippedForm + 'e' + intermedForm.slice(-1);
        console.log("3r person plural feminine: " + strippedForm);
      }
    }else{
      console.log("Verb type: lmed");
      if(lastTwoLettersAbs ==="en"){
        intermedForm= form.slice(0, -2);
        strippedForm = intermedForm.slice(0,1) + intermedForm.slice(2,3)+"e" + intermedForm.slice(-1);
        
        console.log("3r person plural masculine: " + strippedForm);
      }else{
        intermedForm= form.slice(0, -3);
        strippedForm = intermedForm.slice(0,1) + intermedForm.slice(2,3)+"e" + intermedForm.slice(-1);
        console.log("3r person plural feminine: " + strippedForm);
      }

    }
    return strippedForm;
  },
  // Anaḍ ussid: aoriste intensif: for example lemmed = lmed
  ussid: function (form) {
    var form_length = form.length; //6
    var secondChar = form.charAt(1); // e
    var thirdChar = form.charAt(2); //m
    var fourthChar = form.charAt(3); //m
    var fifthChar = form.charAt(4); //e
    if (
      form_length === 6 &&
      secondChar === "e" &&
      fifthChar == "e" &&
      thirdChar === fourthChar
    ) {
      this.stripUssidForm(form, thirdChar);
    } else {
      return this.aherfi(form);
    }
  },

  stripUssidForm: function (form, char) {
    switch (char) {
      case "č":
        char = "c";
        break;
      case "g":
        char = "w";
        break;
    }

    var strippedForm =
      form.charAt(0) + char + "e" + form.charAt(form.length - 1);
    console.log("Ussid: aoriste intensif: " + strippedForm);
    return strippedForm;
  },

  //Anaḍ aherfi: impératif    lemdem/t = lmed
  aherfi: function (form) {
    var secondChar = form.charAt(1);
    var lastChars = form.slice(form.length - 3);
    var lastTwoLetters = lastChars.slice(-2);
    if (
      secondChar === "e" &&
      (lastTwoLetters == "em" || lastTwoLetters == "mt")
    ) {
      this.stripAherfiForm(form);
    }
  },

  stripAherfiForm: function (form) {
    var strippedForm = form.slice(0, 4);
    strippedForm =
      strippedForm.charAt(0) +
      strippedForm.charAt(2) +
      "e" +
      strippedForm.charAt(3);
    console.log("Anaḍ aherfi: impératif: " + strippedForm);
  },

  /* ************************ Second type of verbs: model beddel ************************* 
  type 1: beddel
beddleγ                          --(e)γ 
tbeddleḍ                         t(e) ---(e)ḍ
ibeddel                          i/y(e)-----
tbeddel                          t(e)-----
nbeddel                          n(e)------
tbeddlem/t                       t(e)----(e)m/t 
beddlen/t                        ---(e)n/t
  */
};

if (typeof exports === "object" && typeof module === "object") {
  module.exports = _Inflector;
} else if (typeof define === "function" && define.amd) {
  define([], function () {
    return _Inflector;
  });
} else {
  window.Inflector = _Inflector;
}
