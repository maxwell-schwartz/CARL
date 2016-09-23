// This was important for reading with ENTER: http://stackoverflow.com/questions/905222/enter-key-press-event-in-javascript

function readText() {
	//Read text. Split text into array and process it. Clear text entry form.
	var inText = document.getElementById("inText").value;
	document.getElementById("thisForm").reset();
	processText(inText);
}

function handleQuestion(txt) {
	//Deal with user asking a question

	return "I don't know...";
}

function handleNo(txt) {
	//Deal with no-type answers from user

	return "Why not?";
}

function handleYes(txt) {
	//Deal with yes-type answers from user

	return "Oh yeah?";
}

function handlePronouns(txt) {
	//Switch "me", and "I" (I'm, I'll, etc) with "you" and vice versa.
	//To-be verbs need to be switched as well

	//Determine if "you" is changed to "I" or "me"
	var iYou = false;

	//Determine if "are" is changed to "am"
	var thirdP = true;

	for (var i = 0; i < txt.length; i++) {
		var word = txt[i].toLowerCase();

		switch(word) {
			case "i":
				txt[i] = "you";
				iYou = true;
				thirdP = false;
				break;

			//Can't handle "ill" because that's a different word
			case "i'll":
				txt[i] = "you'll"
				iYou = true;
				break;

			case "i'm":
				txt[i] = "you're"
				iYou = true;
				break;

			case "im":
				txt[i] = "you're"
				iYou = true;
				break;

			case "i've":
				txt[i] = "you've"
				iYou = true;
				break;

			case "ive":
				txt[i] = "you've"
				iYou = true;
				break;

			case "me":
				txt[i] = "you";
				break;

			case "my":
				txt[i] = "your";
				break;

			case "mine":
				txt[i] = "yours";
				break;

			case "you":
				if (iYou) {
					txt[i] = "me";
				}
				else {
					txt[i] = "I";
				}
				thirdP = false;
				break;

			case "you're":
				txt[i] = "I'm";
				break;

			case "youre":
				txt[i] = "I'm";
				break;

			case "you'll":
				txt[i] = "I'll";
				break;

			case "youll":
				txt[i] = "I'll";
				break;

			case "you've":
				txt[i] = "I've";
				break;

			case "youve":
				txt[i] = "I've";
				break;

			case "your":
				txt[i] = "my";
				break;

			case "yours":
				txt[i] = "mine";
				break;

			case "he":
				iYou = true;
				thirdP = true;
				break;

			case "she":
				iYou = true;
				thirdP = true;
				break;

			case "they":
				iYou = true;
				thirdP = true;
				break;

			//This fixes weird clause issues (e.g. "I think that you...")
			//It messes up when "that" is a pronoun though
			case "that":
				iYou = false;
				break;

			//In case user addresses CARL by name
			case "carl":
				txt[i] = "";
				break;

			case "am":
				txt[i] = "are";
				break;

			case "are":
				if (!(thirdP)) {
					txt[i] = "am";
				}
				break;

			case "aren't":
				if (!(thirdP)) {
					txt[i] = "am not";
				}
				break;

			case "arent":
				if (!(thirdP)) {
					txt[i] = "am not";
				}
				break;

			case "was":
				if (!(thirdP)) {
					txt[i] = "were";
				}
				break;

			case "were":
				if (!(thirdP)) {
					txt[i] = "was";
				}
				break;
		}
	}

	var fullText = createHeader();
	
	if (txt[0] != "I") {
		txt[0] = txt[0].toLowerCase();
	}

	for (var w = 0; w < txt.length-1; w++) {
		fullText += txt[w];
		fullText += " ";
	}

	fullText += txt[txt.length-1] + "?";

	return fullText;
}

function createHeader() {
	//Create lead-in to response

	var headerList = ["Golly. ", "Gee. ", "Goodness me. ", "Oh my. ", "Golly gee. ", "Oh me oh my. ", "Hmmm. ", "Goodness gracious. ", "Well I'll be. ", ''];
	var qList = ["Why do you think that ", "Any idea why ", "Why do you believe that ", "Why do you feel that ", "Any theories as to why ", "What makes you say that ", "Can you explain why "];

	var hChoice = Math.floor(Math.random() * headerList.length);
	var qChoice = Math.floor(Math.random() * qList.length);

	var header = headerList[hChoice] + qList[qChoice];

	return header;
}

function processText(txt) {
	//Take only first sentence from user.
	//Determine type of user input

	var endText;
	var noAnswer = false;
	var yesAnswer = false;

	var noList = ["no", "nah", "not", "nothing", "don't", "dont"];
	var yesList = ["yes", "yeah", "yea"];

	var txtList = txt.split(" ");
	var txtEdit = txt.split(" ");

	//Trim to single sentence
	for (var j = 0; j < txtList.length; j++) {
		var word = txtList[j];
		if (word.endsWith(".") || word.endsWith("?") || word.endsWith("!")) {
			txtEdit = txtList.slice(0, j+1);
			break;
		}
	}

	//Remove "." or "!"
	if (txtEdit[txtEdit.length-1].endsWith(".") || txtEdit[txtEdit.length-1].endsWith("!")) {
		txtEdit[txtEdit.length-1] = txtEdit[txtEdit.length-1].slice(0, -1);
	}

	//Look for no-type answers
	//This is done after splitting and trimming
	//If it were done before (using startsWith), "now" would trigger it
	//Also, "no." wouldn't because of the "."
	for (var k = 0; k < noList.length; k++) {
		if (txtEdit[0].toLowerCase() == noList[k]) {
			noAnswer = true;
			break;
		}
	}

	//Look for yes-type answers
	for (var l = 0; l < yesList.length; l++) {
		if (txtEdit[0].toLowerCase() == yesList[l]) {
			yesAnswer = true;
			break;
		}
	}

	//Pick appropriate response type
	if (noAnswer) {
		endText = handleNo();
	}
	else if (yesAnswer) {
		endText = handleYes();
	}
	else if (txtEdit[txtEdit.length-1].endsWith("?")) {
		endText = handleQuestion(txtEdit);
	}
	else {
		endText = handlePronouns(txtEdit);
	}

	outputText(endText);

}

function outputText(txt) {
	//Output text to page.
	document.getElementById("outText").innerHTML = txt;
}