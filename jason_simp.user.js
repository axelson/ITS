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
function doQuickAdvancedSearch(e) {
	alert("doQuickAdvancedSearch("+e.target.value+")");
	//window.location.href = "?cmd=retrieveTTicket&tckt_id=108315";
	//http://www.hawaii.edu/simp/
	doSearch(e.target.value);
}

/*POST http://www.hawaii.edu/simp/?cmd=search&advanced=true
Load Flags[LOAD_DOCUMENT_URI  LOAD_INITIAL_DOCUMENT_URI  ] Content Size[-1] Mime Type[text/html]
   Request Headers:
      Host[www.hawaii.edu]
      User-Agent[Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.0.10) Gecko/2009042316 Firefox/3.0.10 (.NET CLR 3.5.30729)]
*/
//Accept[text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8]
/*Accept-Language[en-us,en;q=0.5]
      Accept-Encoding[gzip,deflate]
      Accept-Charset[ISO-8859-1,utf-8;q=0.7,*;q=0.7]
      Keep-Alive[300]
      Connection[keep-alive]
      Referer[http://www.hawaii.edu/simp/?cmd=search&advanced=true]
      Cookie[PHPSESSID=8d7e8a98c5296a7f0cdb5705afcbe60d; its-hdwiki_pUserID=6; its-hdwiki_pUserName=Axelson]
   Post Data:
      clear[true]
      advanced[true]
      ticket_id[]
      search_str[]
      filterPhrase[]
      filterWord1[]
      filterWord2[]
      filterWord3[]
      filterNot[]
      filterDate1[]
      filterDate2[]
      filterCreatedUsername[]
      filterAssignedToIndividual[]
      filterAssignedToGroup[]
      filterCustomerUsername[axelson]
      filterCustomerFirst[]
      filterCustomerLast[]
      filterCustomerPhone[]
      filterCustomerDepartment[1]
      filterCustomerCampus[1]
      filterCustomerBuilding[1]
      filterCustomerNotes[]
      tckt_type_id[1]
      tckt_cat1_id[-1]
      tckt_cat2_id[-1]
      tckt_cat3_id[-1]
      cmd[search]
      get_cache[false]
   Response Headers:
      Date[Fri, 05 Jun 2009 20:04:19 GMT]
      Server[Apache/2.2.11 (Unix) mod_ssl/2.2.11 OpenSSL/0.9.7d Resin/3.1.8 PHP/5.2.6]
      X-Powered-By[PHP/5.2.6]
      Expires[Thu, 19 Nov 1981 08:52:00 GMT]
      Cache-Control[no-store, no-cache, must-revalidate, post-check=0, pre-check=0]
      Pragma[no-cache]
      Keep-Alive[timeout=15, max=100]
      Connection[Keep-Alive]
      Transfer-Encoding[chunked]
      Content-Type[text/html]


      */
      //Cookie[PHPSESSID=8d7e8a98c5296a7f0cdb5705afcbe60d; its-hdwiki_pUserID=6; its-hdwiki_pUserName=Axelson]

function doSearch(searchType) {
    alert("in doSearch, searching for" + searchType);
    switch(searchType) {
	case "TicketNumber": 
	    var TicketNumber = getValueById("search_str");
	    break;
	case "CustomerUHUsername": 
	    var CustomerUHUsername = getValueById("search_str");
	    break;
	case "LastName": 
	    var LastName = getValueById("search_str");
	    break;
	case "FirstName": 
	    var FirstName = getValueById("search_str");
	    break;
	case "ITSUsername": 
	    var ITSUsername = getValueById("search_str");
	    break;
	default:
	    alert("doSearch error, searchType not expected (searchType="+ searchType +")");
    }
    var searchStr = "clear=true"
		   +"&advanced=true"
		   +"&ticket_id="+ TicketNumber
		   +"&search_str="
		   +"&filterPhrase="
		   +"&filterWord1="
		   +"&filterWord2="
		   +"&filterWord3="
		   +"&filterNot="
		   +"&filterDate1="
		   +"&filterDate2="
		   +"&filterCreatedUsername="
		   +"&filterAssignedToIndividual="
		   +"&filterAssignedToGroup="
		   +"&filterCustomerUsername="+ CustomerUHUsername
		   +"&filterCustomerFirst="
		   +"&filterCustomerLast="
		   +"&filterCustomerPhone="
		   +"&filterCustomerDepartment=1"
		   +"&filterCustomerCampus=1"
		   +"&filterCustomerBuilding=1"
		   +"&filterCustomerNotes="
		   +"&tckt_type_id=1"
		   +"&tckt_cat1_id=-1"
		   +"&tckt_cat2_id=-1"
		   +"&tckt_cat3_id=-1"
		   +"&cmd=search"
		   +"&get_cache=false";
    alert("searchStr is "+ searchStr);
}

function doSearchOriginal() {
GM_xmlhttpRequest( { method:'POST'
            , url:'https:www.blah.com/posthere/post.jsp?targetPage=yes.jsp'
            , data:'Name1=&NameIndex='+rtIx+'&NameNumber=&x=3&y=1'
            , ctxtIx:ctxtIx
            , cookies:cookies
            , rtIx:rtIx
            , headers:{ 'Content-type':'application/x-www-form-urlencoded'
                      , 'Host':'www.hertz.com'
                      ,
'Accept':'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,tex t/plain;q=0.8,image/png,*/*;q=0.5'
                      , 'Accept-Language':'en-us,en;q=0.5'
                      , 'Accept-Encoding':'gzip,deflate'
                      , 'Accept-Charset':'ISO-8859-1,utf-8;q=0.7,*;q=0.7'
                      , 'Keep-Alive':'300'
                      , 'Connection':'keep-alive'
                      ,
'Referer':'https:www.blah.com/posthere/post.jsp?targetPage=other.jsp'
                      , 'Cookie':cookies
                      , 'User-Agent':'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.0.1) Gecko/20060111 Firefox/1.5.0.2'
                      }
            , onload: onLoadPost
        } );
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

