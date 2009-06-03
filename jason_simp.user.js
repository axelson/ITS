// ==UserScript==
// @name           Jason SIMP
// @namespace      jaxelson.com
// @description    SIMP Scripts v2
// @include        http://web06.its.hawaii.edu/simp/*
// @include        http://www.hawaii.edu/simp/*
// ==/UserScript==

//13932 SIMP test ticket
addButton();

function addButton() {
	var button = document.createElement("button");
	button.type = "button";
	button.innerHTML = "CopyForMM";
	button.id = "SIMP_button";
	button.style.cursor = "pointer";
	button.addEventListener("click", function(e) { showInfo(); }, false);

	var section = document.getElementById("submit_section");
	section.appendChild(button);
}

function showInfo() {
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
	var ProblemDescription = getValueById("tckt_descr"); // fails if ticket description is read only because instead it has id="tckt_descr_ro"
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

function getValueById(id) {
	console.log("getElementById: id="+ id);
	return document.getElementById(id).value
}

function getBuildingName() {
	var name = "bldg_id";
	var buildingForm = document.getElementsByName(name)[0]
	return buildingForm[buildingForm.selectedIndex].label;
}

function getHelpDeskUserName() {
	var logoutButtonString = document.getElementById("link-logout").firstChild.innerHTML;
	// logoutButtonString now has form "LOGOUT [username]"
	logoutButtonString = String(logoutButtonString.match(/\[.*\]/));
	console.log("testlog");
	return logoutButtonString.match(/[a-z]+/);
}
