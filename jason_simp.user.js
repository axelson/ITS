// ==UserScript==
// @name           Jason SIMP
// @namespace      jaxelson.com
// @description    SIMP Scripts v1.01
// @include        http://web06.its.hawaii.edu/simp/*
// @include        http://www.hawaii.edu/simp/*
// ==/UserScript==

//13932 SIMP test ticket
if(window.location.href.search("tckt_id=") == -1) {
	addSearchOptions();
} else {
	addMMButton();
}

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

function addSearchOptions() {
	console.log("addSearchOptions: enter");

	var searchOptions=document.createElement("select");
	searchOptions.id="quickAdvancedSearchDropDown";
	searchOptions.addEventListener("change", doQuickAdvancedSearch, true);
	searchOptions.options[0] = new Option("Select an advanced option", "");
	searchOptions.options[1] = new Option("Ticket Number", "TicketNumber");
	searchOptions.options[2] = new Option("Customer UH Username", "CustomerUHUsername");
	searchOptions.options[3] = new Option("Last Name", "LastName");
	searchOptions.options[4] = new Option("First Name", "FirstName");
	searchOptions.options[5] = new Option("ITS Username", "ITSUsername");
	document.getElementById("tcktFilterFrm").appendChild(searchOptions);
}

// Add radio buttons to choose search type
function doQuickAdvancedSearch() {
	alert("doQuickAdvancedSearch()");
//	alert(getValueById("search_str"));
}

// Show the Meeting Maker information
function showMMInfo() {
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
	var history = document.getElementById("tckt_history_section").childNodes;
	for(var i=history.length-2; i>=3 ;i-=2) {
		text += getFormattedEntry(history[i].childNodes);
		text += "\n\n";
	}

	return text;
	function getFormattedEntry(div) {
		var description = div[1].textContent;
		var author = div[3].textContent;
		var time = div[5].textContent;
		time = time.slice(3);	//Remove "on " from start of string

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
	var logoutButtonString = document.getElementById("link-logout").firstChild.innerHTML;
	// logoutButtonString now has form "LOGOUT [username]"
	logoutButtonString = String(logoutButtonString.match(/\[.*\]/));
	console.log("testlog");
	return logoutButtonString.match(/[a-z]+/);
}

// Get the text of the SIMP ticket description field
function getTicketDescription() {
	console.log("getTicketDescription:");
	var id="";

	// If Ticket Description is read-only element is called tckt_descr_ro otherwise called tckt_descr
	if( document.getElementById("tckt_descr") ) {
		return document.getElementById("tckt_descr").value;
	} else {
		return document.getElementById("tckt_descr_ro").innerHTML;
	}
}

