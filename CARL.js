// This was important for reading with ENTER: http://stackoverflow.com/questions/905222/enter-key-press-event-in-javascript

function readText() {
	//Read text. Split text into array and process it. Clear text entry form.
	var inText = document.getElementById("inText").value;
	document.getElementById("thisForm").reset();
	processText(inText);
}

function handleQuestion() {
	//Deal with user asking a question

	return "I don't know...";
}

function handleNo() {
	//Deal with no-type answers from user

	return "Why not?";
}

function handleYes() {
	//Deal with yes-type answers from user

	return "Oh yeah?";
}

function handleBecause() {
	//Deal with "because" answers

	var response1 = ["Ah, yes. ", "Hmmm. ", "I see. ", "Gotcha. "];
	var response2 = ["Can you elaborate?", "Care to tell me more?"];

	var rChoice1 = Math.floor(Math.random() * response1.length);
	var rChoice2 = Math.floor(Math.random() * response2.length);

	var prompt = response1[rChoice1] + response2[rChoice2];

	return prompt;
}

function handleThanks() {
	//In case the user is polite...

	var urWelcome = ["You are very welcome.", "You're quite welcome.", "No probs!"];

	var welcome = urWelcome[Math.floor(Math.random() * urWelcome.length)];
	return welcome;
}

function handleBad() {
	//Deal with negative responses

	return "I'm sorry to hear that."
}

function handleGood() {
	//Deal with positive responses

	return "That's good to hear."
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

	var headerList = ["Golly. ", "Gee. ", "Goodness me. ", "Oh my. ", "Golly gee. ", "Oh me oh my. ", "Hmmm. ", "Goodness gracious. ", "Well I'll be. ", "Gee willikers!", ''];
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
	var becauseAnswer = false;
	var thanksAnswer = false;
	var badAnswer = false;
	var goodAnswer = false;

	var negList = ["bad", "sad", "unhappy", "terrible", "blegh", "meh"];
	var posList = ["good", "well", "happy", "great", "excellent"];

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

	//Look for "because" answers
	for (var m = 0; m < txtEdit.length; m++) {
		if (txtEdit[m].toLowerCase() == "because") {
			becauseAnswer = true;
			break;
		}
	}

	//Look to see if user thanks CARL
	for (var n = 0; n < txtEdit.length; n++) {
		if (txtEdit[n].toLowerCase() == "thanks" || txtEdit[n].toLowerCase() == "thank") {
			thanksAnswer = true;
			break;
		}
	}


	//Look for negative responses
	for (var o = 0; o < txtEdit.length; o++) {
		var neg;
		for (neg in negList) {
			if (txtEdit[o].toLowerCase() == negList[neg]) {
				badAnswer = true;
				var not1 = "";
				var not2 = "";
				if (o >= 2) {
					not1 = txtEdit[o-2].toLowerCase();
				}
				if (o >= 1) {
					not2 = txtEdit[o-1].toLowerCase();
				}
				if (not1 == "not" || not2 == "not") {
					badAnswer = false;
					goodAnswer = true;
				}
				break;
			}
		}
	}

	//Look for positive responses
	for (var p = 0; p < txtEdit.length; p++) {
		var pos;
		for (pos in posList) {
			if (txtEdit[p].toLowerCase() == posList[pos]) {
				goodAnswer = true;
				//Look for negation
				var not3 = "";
				var not4 = "";
				if (p >= 2) {
					not3 = txtEdit[p-2].toLowerCase();
				}
				if (p >= 1) {
					not4 = txtEdit[p-1].toLowerCase();
				}
				if (not3 == "not" || not4 == "not") {
					goodAnswer = false;
					badAnswer = true;
				}
				break;
			}
		}
	}

	//Pick appropriate response type
	if (txtEdit[txtEdit.length-1].endsWith("?")) {
		endText = handleQuestion();
	}
	else if (badAnswer) {
		endText = handleBad();
	}
	else if (goodAnswer) {
		endText	 = handleGood();
	}
	else if (noAnswer) {
		endText = handleNo();
	}
	else if (thanksAnswer) {
		endText = handleThanks();
	}
	else if (becauseAnswer) {
		endText = handleBecause();
	}
	else if (yesAnswer) {
		endText = handleYes();
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