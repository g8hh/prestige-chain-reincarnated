let modInfo = {
	name: "Prestige Chain Reincarnated",
	id: "prestige_chain_reincarnated",
	author: "pg132",
	pointsName: "Life Points",
	modFiles: ["layers.js", "tree.js"],
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.001",
	name: "Respecced Reincarnation",
}


var forceEndgame = false
function isEndgame() {
	if (forceEndgame) return true
	return false
}

let changelog = `<h1>Changelog:</h1><br>
	<br><h2 style='color: #DDDD00'>Endgame:</h2><br>
		Reaching the endgame screen (updated at least as of v0.001)<br><br>
	<br><h2 style='color: #00CC00'>Notes</h2><br>
		- Versions will be vA.B.C<br>
		- A will be big releases.<br>
		- B will be each content patch.<br>
		- C will be small patches without content (bug/wording fixes).<br><br><br>

	<br><h3 style='color: #CC0000'>v0.001</h3><br>
		- Various changes to make the game "playable".<br>
	`

let winText = `Congratulations! You have reached the end of this patch! More content is to come...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything",]

function getStartPoints(){
    	return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	toggleKeys: false,
	undulating: false,
	lastSave: new Date().getTime(),
	arrowHotkeys: true,
	modTab: false,
	lastLettersPressed: [],
	targetWord: "johnson",
	wordsSpelled: 0,
	currentTime: new Date().getTime(),
	showBuiltInSaves: false,
	dev: {},
	spaceBarPauses: false,
	paused: false,
	shiftAlias: false,
	controlAlias: false,
}}

function getLastSaveDisplay(a){
	return "Last save was: " + formatTime((new Date().getTime()-player.lastSave)/1000, a) + " ago. "
}

// Display extra things at the top of the page
var displayThings = [
	function(){
		list1 = []
		if (shiftDown) list1 = list1.concat("S")
		if (controlDown) list1 = list1.concat("C")
		if (player.undulating) list1 = list1.concat("U")
		if (!player.arrowHotkeys) list1 = list1.concat("¬A")
		if (!player.spaceBarPauses) list1 = list1.concat("¬P")
		
		let end = ""
		if (list1.length > 0) end = "(" + combineStrings(list1) + ")"
		let saveFinal = getLastSaveDisplay() + end

		let len = pastTickTimes.length
		if (len <= 3) return saveFinal
		let a = 0
		for (i = 0; i < len; i++){
			a += pastTickTimes[i]
		}

		let val = Math.round(a/len)
		let p1 = ""
		let p2 = ""
		if (val > 50) {
			p1 = "<bdi style='color: #CC0000'>"
			p2 = "</bdi>"
		}

		let msptFinal = " ms/tick = " + p1 + formatWhole(val) + p2
		return saveFinal + msptFinal
	}, 
	function(){
		if (paused || player.paused) return "<bdi style='color:#CC0033'>THE GAME IS PAUSED</bdi>"
		if (player.keepGoing) return makeBlue("You are past endgame,<br>and the game might not be balanced here.")
	},
]

var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return 1 // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

var controlDown = false
var shiftDown = false
var logKeyCode = false

function hasSpelledWord(word){
	let l = word.length
	if (l > 25) {
		console.log("nopers")
		return false
	}
	for (i = 0; i < l; i++){
		let id = 25 - l + i
		let is = player.lastLettersPressed[id]
		let shouldbe = word[i]
		if (is != shouldbe) return false
	}
	return true
} 

function getLetterFromNum(x){
	return {
		32: " ",
		65: "a",
		66: "b",
		67: "c",
		68: "d",
		69: "e",
		70: "f",
		71: "g",
		72: "h",
		73: "i",
		74: "j",
		75: "k",
		76: "l",
		77: "m",
		78: "n",
		79: "o",
		80: "p",
		81: "q",
		82: "r",
		83: "s",
		84: "t",
		85: "u",
		86: "v",
		87: "w",
		88: "x",
		89: "y",
		90: "z",
	}[x]
}

window.addEventListener('keydown', function(event) {
	code = event.keyCode
	if (player.toggleKeys) {
		if (code == 16) shiftDown = !shiftDown;
		if (code == 17) controlDown = !controlDown;
	} else {
		if (code == 16) shiftDown = true;
		if (code == 17) controlDown = true;
	}
	if (logKeyCode) console.log(code)
	if ((code >= 65 && code <= 90) || code == 32) {
		player.lastLettersPressed.push(getLetterFromNum(code))
		let l = player.lastLettersPressed.length
		if (l > 25) {
			player.lastLettersPressed = player.lastLettersPressed.slice(l-25,)
		}
	}
	//65 to 90 are a to z
}, false);

window.addEventListener('keyup', function(event) {
	if (player != undefined && player.toggleKeys) return 
	if (event.keyCode == 16) shiftDown = false;
	if (event.keyCode == 17) controlDown = false;
}, false);

function toggleShift(){
	shiftDown = !shiftDown
}

function toggleControl(){
	controlDown = !controlDown
}

function toggleUndulating(){
	player.undulating = !player.undulating
}

function toggleArrowHotkeys(){
	player.arrowHotkeys = !player.arrowHotkeys
}





