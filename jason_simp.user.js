// ==UserScript==
// @name           Jason SIMP
// @namespace      jaxelson.com
// @description    SIMP Scripts v2.00
// @include        http://web06.its.hawaii.edu/simp/*
// @include        http://www.hawaii.edu/simp/*
// ==/UserScript==

// Globals
var SEARCH_BOX_ID = "search_str";

//13932 SIMP test ticket


if(window.location.href.search("tckt_id=") == -1) {
       //addSearchOptions();
} else {
       addMMButton();
}

// Functions

// Add button to copy information to paste into Meeting Maker (MM) job
function addMMButton() {
       var button = document.createElement("button");
       button.type = "button";
       button.innerHTML = "CopyForMM";
       button.id = "SIMP_button";
       button.style.cursor = "pointer";
       button.addEventListener("click", function(e) { showMMInfo(); }, false);

       var section = document.getElementById("submit_section");
       section.appendChild(button);
}

// Add extra search options to SIMP main page
function addSearchOptions() {
       console.log("addSearchOptions: enter");

       var searchOptions=document.createElement("select");
       searchOptions.id="quickAdvancedSearchDropDown";
       searchOptions.addEventListener("change", doQuickAdvancedSearch, true);
       searchOptions.options[0] = new Option("Select an advanced option", "");
       searchOptions.options[1] = new Option("Ticket Number", "TicketNumber");
       searchOptions.options[2] = new Option("Customer UH Username",
"CustomerUHUsername");
       searchOptions.options[3] = new Option("Last Name", "LastName");
       searchOptions.options[4] = new Option("First Name", "FirstName");
       searchOptions.options[5] = new Option("ITS Username", "ITSUsername");
       document.getElementById("tcktFilterFrm").appendChild(searchOptions);
}

// Add radio buttons to choose search type
function doQuickAdvancedSearch(e) {
   var searchType = e.target.value;
   console.log("doQuickAdvancedSearch("+ searchType +")");
   var searchStr = "?cmd=search"
                  +"&clear=true"
                  +"&advanced=true";
   switch(searchType) {
       case "TicketNumber":
           searchStr = "index.php?cmd=retrieveTTicket&tckt_id="
           break;
       case "CustomerUHUsername":
           searchStr += "&filterCustomerUsername=";
           break;
       case "LastName":
           searchStr += "&filterCustomerLast=";
           break;
       case "FirstName":
           searchStr += "&filterCustomerFirst=";
           break;
       case "ITSUsername":
           searchStr += "&filterCreatedUsername=";
           break;
       default:
           fatalError("doSearch error, searchType not expected
(searchType="+ searchType +")");
   }

   searchStr += getValueById(SEARCH_BOX_ID);

   window.location.href = searchStr;
}


// Show the Meeting Maker information
function showMMInfo() {
       console.log("showMMInfo: Enter function");
       //*
       var text="";

       // Fill variables relating to all ticket fields
       var TicketNumber = getValueById("tckt_id");
       var UHUsername = getValueById("ppl_uhusername");
       var PhoneNumber = getValueById("ppl_ofc_phone");
       var FirstName = getValueById("ppl_name_first");
       var LastName = getValueById("ppl_name_last");
       var Building = getBuildingName();
       var RoomNumber = getValueById("ppl_room_num");
       var ProblemDescription = getTicketDescription();
       var ProblemSolution = getProblemSolution();
       var HelpDeskUserName = getHelpDeskUserName();

       //*/
       text += "Username: " + UHUsername;
       text += "\nName: " + FirstName + " " + LastName;
       text += "\nTicket: " + TicketNumber;
       text += "\nPhone: " + PhoneNumber;
       text += "\nBuilding: " + Building + " room " + RoomNumber;
       text += "\n\n";
       text += "***************************\n";
       text += "* Problem Description *\n";
       text += "***************************\n";
       text += ProblemDescription;
       text += "\n\n\n";
       text += "************************\n";
       text += "* Problem Solution *\n";
       text += "************************\n";
       text += ProblemSolution;
       text += "\n\n";
       text += "This Meeting Maker job was posted by "+ HelpDeskUserName;
               text += " on "+ Date();

       alert(text);
}

// Get the raw text of the Problem Solution
function getProblemSolution() {
       var text="\n";
       var tckt_history = document.getElementById("tckt_history_section").childNodes;
       for(var i=tckt_history.length-2; i>=5 ;i-=2) {
               //console.log("info: "+
tckt_history[i].childNodes[5].childNodes[1].textContent);
               text += getFormattedEntry(tckt_history[i].childNodes);
               text += "\n\n";
       }

       return text;
       function getFormattedEntry(div) {
               console.log("getFormattedEntry: div "+ div);
               var description = div[1].textContent;
               var author = div[3].textContent;
               var time = div[5].textContent;
               time = time.slice(3);   //Remove "on " from start of string

               return time + " " + author + "\n" + description;
       }
}

// Get the DOM value by the elements id
function getValueById(id) {
       console.log("getElementById: id="+ id);
       return document.getElementById(id).value
}

function getBuildingName() {
       var name = "bldg_id";
       var buildingForm = document.getElementsByName(name)[0]
       return buildingForm[buildingForm.selectedIndex].label;
}

// Get the username of the help desk user pasting the job
function getHelpDeskUserName() {
       var logoutButtonString =
document.getElementById("link-logout").firstChild.innerHTML;
       // logoutButtonString now has form "LOGOUT [username]"
       logoutButtonString = String(logoutButtonString.match(/\[.*\]/));
       return logoutButtonString.match(/[a-z]+/);
}

// Get the text of the SIMP ticket description field
function getTicketDescription() {
       console.log("getTicketDescription:");
       var id="";

       // If Ticket Description is read-only element is called tckt_descr_ro
otherwise called tckt_descr
       if( document.getElementById("tckt_descr") ) {
               return document.getElementById("tckt_descr").value;
       } else {
               return document.getElementById("tckt_descr_ro").innerHTML;
       }
}

function fatalError(messageInfo) {
       alert("An error has occured in the Greasemonkey script running on
this page. If this is causing a problem, disable the script by
clicking on the brown monkey in the lower right-hand corner of the
browser. More information is below.\n\n"+ messageInfo);
}
