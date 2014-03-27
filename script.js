var hashtagPlot = document.getElementById('hashtag-plot');
var scrubBar = document.getElementById('scrub-bar');
var SOTUvideo = document.getElementById('sotu-video');
var videoOffset = 306;
var animationFrame = webkitRequestAnimationFrame(slideScrubBar);


// Pull out all the transcript timestamps for use throughout
var transcript = document.getElementById('sotu-transcript');
var timestamps = extractTimestamps();
function extractTimestamps() {
	var timestamps = [];
	var stampedDivs = transcript.querySelectorAll('div');
	for (var i = 0; i < stampedDivs.length; i++) {
		timestamps[i] = parseInt(stampedDivs[i].id.split('-')[2], 10);
	}

	return timestamps;
}

// Initialize these for loading later, after window.onload
var nation = null;
var statePaths = null;
var stateAbbreviations = [];

// Hardcoded colors for each hashtag, grabbed from the twitter site with https://en.wikipedia.org/wiki/DigitalColor_Meter
var hashtagColors = {
	"energy": "rgb(50,160,44)",
	"jobs": "rgb(255,127,0)",
	"education": "rgb(178,223,138)",
	"fairness": "rgb(252,154,153)",
	"healthcare": "rgb(227,25,27)",
	"defense": "rgb(30,120,180)",
};

////////////////////////////////////////////////////////////////////////////////
// Handling the hashtagPlot and scrubBar

// Run hashtagMousemove every time the mouse moves above the hashtagPlot
hashtagPlot.addEventListener('mousemove', hashtagMousemove, false);

function hashtagMousemove(e) {
	updateScrubBar(e);
	updateVideo(e);
	updateTranscript(e);
	if(animationFrame){
		webkitCancelAnimationFrame(animationFrame);
	}	
}

hashtagPlot.addEventListener('mouseout', playVideo, false);
function playVideo(e) {
	//scrubBar.style.visibility = "hidden";
	SOTUvideo.play();
	//scrubBar.style.left = nearestStamp(fractionScrubbed); 
	//scrubBar.fractionScrubbed = parseInt(scrubBar.style.left, 10)/hashtagPlot.offsetWidth;
	//scrubBar.fractionScrubbed = hashtagPlot.offsetWidth/(SOTUvideo.duration/SOTUvideo.currentTime);
	//scrubBar.style.left = hashtagPlot.offsetWidth - parseInt(SOTUvideo.currentTime, 10);	
	//scrubBar.style.left = hashtagPlot.offsetWidth - scrollToTimestamp(timestamp);
	//scrubBar.fractionScrubbed = SOTUvideo.currentTime/SOTUvideo.duration;
	//scrubBar.style.left = hashtagPlot.offsetWidth - SOTUvideo.currentTime;

	//for (var ff = hashtagPlot.offsetWidth*scrubBar.fractionScrubbed; ff<1200; ff+1){
		//scrubBar.style.left = hashtagPlot.offsetWidth - parseInt(ff, 10);	
		//console.log(ff);
	//}

	//var currenttime = SOTUvideo.currentTime;
	//for(currenttime; currenttime++; currenttime < 1280){
		//scrubBar.fractionScrubbed === currenttime;
		//scrubBar.style.left = currenttime;
	//}

	//if(SOTUvideo.play()){
		//scrubBar.fractionScrubbed = SOTUvideo.currentTime/SOTUvideo.duration;
	//	var fr = scrubBar.fractionScrubbed*hashtagPlot.offsetWidth;
		//scrubBar.style.left = parseInt(fr, 10) + "px";
		//scrubBar.style.left = hashtagPlot.offsetWidth-100;
	//}	
	
	//for (scrubBar.style.left =  hashtagPlot.offsetWidth * (SOTUvideo.currentTime/SOTUvideo.duration)){
	//scrubBar.style.left=100;
	//}
	
	//if(SOTUvideo.play()){
		//var moveScrubBarRight =  hashtagPlot.offsetWidth * (SOTUvideo.currentTime/SOTUvideo.duration);
		//scrubBar.style.left = parseInt(moveScrubBarRight, 10);
		//console.log(scrubBar.style.left);
		//console.log(hashtagPlot.offsetWidth);
		//console.log(SOTUvideo.currentTime);
		//console.log(parseInt(scrubBar.style.left,10));
		//scrubBar.style.left++;
	//}
	//for(var n = parseInt(scrubBar.style.left,10); n < 1280; n++){
		//scrubBar.style.left = parseInt(scrubBar.style.left,10) -1 + "px";
	//}
	//do {
   //scrubBar.style.left = parseInt(scrubBar.style.left,10) + 1;
   //document.write(scrubBar.style.left);
	//} while (parseInt(SOTUvideo.currentTime, 10) < 3900);
	//updateVideo(e);
	//slideScrubBar(slideScrubBar(e));
	slideScrubBar();	
	slideTranscript();	
}

function slideScrubBar() {
	// A function to make the scrubBar slide to right when video is playing
	//var animationFrame = webkitRequestAnimationFrame(slideScrubBar);
	var moveScrubBarRight =  hashtagPlot.offsetWidth * (SOTUvideo.currentTime/SOTUvideo.duration);
	scrubBar.style.left = parseInt(moveScrubBarRight, 10);
	//console.log(scrubBar.style.left);
	//console.log(parseInt(scrubBar.style.left,10));
		
	
	if (SOTUvideo.currentTime == 3917){
		webkitCancelAnimationFrame(animationFrame);
	}
	//examples:
	//transcript.scrollTop = document.getElementById('transcript-time-' + timestamps[10]).offsetTop
	//document.getElementById('transcript-time-' + timestamps[10]).offsetTop
	//transcript.scrollTop = document.getElementById('transcript-time-' + timestamps[10]).offsetTop
}

function slideTranscript(){
	var animationFrame = webkitRequestAnimationFrame(slideTranscript);

	var CurrentVideoTimeNumber = parseInt(SOTUvideo.currentTime, 10);
	var timestamps = [];
	var stampedDivs = transcript.querySelectorAll('div');
	for (var i = 0; i < stampedDivs.length; i++) {
		timestamps[i] = parseInt(stampedDivs[i].id.split('-')[2], 10);
	//}
	//for(var i = 0; i < timestamps.length; i++){
		
		if(timestamps[i] >= CurrentVideoTimeNumber && timestamps[i-1] <= CurrentVideoTimeNumber){
			//timestamps[i] == CurrentVideoTimeNumber;
		//if((CurrentVideoTimeNumber - timestamps[i]) >= 0 && (CurrentVideoTimeNumber - timestamps[i-1]) <= 0){
			//timestamps[i] == CurrentVideoTimeNumber;
		// console.log(timestamps[n]);
			//var currentStamp = timestamps[n];
			transcript.scrollTop = document.getElementById('transcript-time-' + timestamps[i]).offsetTop;
			document.getElementById('transcript-time-' + timestamps[i]).style.backgroundColor = 'rgb(255,0,0)';
		}
	}
}

function updateScrubBar(e) {
	// A function to make the scrubBar follow the mouse

	//scrubBar.style.visibility = 'visible';
	scrubBar.style.left = e.clientX - position(hashtagPlot).x; // e.clientX is the mouse position

	scrubBar.fractionScrubbed = parseInt(scrubBar.style.left, 10)/hashtagPlot.offsetWidth;


}

function updateVideo(e) {
	SOTUvideo.currentTime = SOTUvideo.duration * scrubBar.fractionScrubbed;
}

////////////////////////////////////////////////////////////////////////////////
// Handling the scrolling transcript

function clickTranscript(e) {
    e = e || window.event;
    e = e.target || e.srcElement;
    if (e.nodeName === 'P') {
      //alert(e.parentNode.id);
      var clickedDivId = e.parentNode;
      //alert(clickedDivId.id.split("-")[2]);
      SOTUvideo.currentTime = clickedDivId.id.split("-")[2] - 306;
      // slideScrubBar();
			SOTUvideo.play();
    }
}

/*transcript.addEventListener('click', hashtagClick, false);
function hashtagClick(e) {	
	var clickedDiv = document.getElementsByTagName('div'); 
	//var stampedDivs = transcript.querySelectorAll('div');
	console.log(clickedDiv.id); // Always true
	console.log(clickedDiv.id.split("-")[2]);
  
	//console.log(this.clickedDiv);
	var timestamps = [];
	var stampedDivs = transcript.querySelectorAll('div');
	for (var i = 0; i < stampedDivs.length; i++) {
		timestamps[i] = parseInt(stampedDivs[i].id.split('-')[2], 10);
		if (parseInt(clickedDiv.id.split("-")[2], 10) == timestamps[i]){
			SOTUvideo.currentTime = parseInt(clickedDiv.id.split("-")[2], 10);
			slideScrubBar();
			SOTUvideo.play();
		}
	}	
	//updateTranscript(e);
	//webkitCancelAnimationFrame(animationFrame);
}
*/

function updateTranscript(e) {
	scrollToTimestamp(nearestStamp(scrubBar.fractionScrubbed));
}

function scrollToTimestamp(timestamp) {
	var target = transcript.querySelector('#transcript-time-' + timestamp);
	// document.getElementById('sotu-transcript').scrollTop = target.offsetTop;
}

function nearestStamp(fractionScrubbed) {
	// Figure out what the closest timestamp we have is to the current amount of scrubbing
	var timestampEquivalent = fractionScrubbed * SOTUvideo.duration + videoOffset; // IF we had a timestamp, what would it be?
	for (var i = 1; i < timestamps.length - 1; i++) {
 		if ( timestamps[i] > timestampEquivalent ) { // Find the first timestamp our guess is greater than
 			return timestamps[i-1];
		}
	}
	return timestamps[timestamps.length - 1];
}


////////////////////////////////////////////////////////////////////////////////
// Adding the nav functionality for the video

var hashtagNav = document.getElementsByTagName('li');
for (var i = 0; i < hashtagNav.length; i++) {
	hashtagNav[i].addEventListener('click', navClick, false);
}

function navClick(e) {
	var timestamp = parseInt(this.getAttribute('data-timestamp'), 10);
	scrubBar.fractionScrubbed = (timestamp-videoOffset)/SOTUvideo.duration;
	updateVideo(e);
	updateTranscript(e);
}


////////////////////////////////////////////////////////////////////////////////
// Adding the map coloring functionality

window.onload = function () {
	// We have to make sure that we have the nation and the states 
	// But because of the size and loading time of the SVG, we have to attach it to an event handler for window.onload to make sure it's fully loaded 
	nation = document.getElementsByTagName('object')[0].contentDocument.getElementsByTagName('svg')[0];
	statePaths = nation.querySelectorAll('.state');
	
	// Go through and get all the state abbreviations used
	//stateAbbreviations = [];
	for (var i = 0; i < statePaths.length; i++ ) {
		if (statePaths[i].id.length == 2) {
			stateAbbreviations.push(statePaths[i].id);
		}
	}

	recolorNation(dominantHashtagAt(SOTUvideo.currentTime)); // This is where the action happens: recolor the states for the current time of the video.
};

// Set up the video so that the chart is updated and the nation recolored every time the time changes
document.getElementById('sotu-video').addEventListener("timeupdate", updatePage);
function updatePage() {
	var dominantHashtag = dominantHashtagAt(SOTUvideo.currentTime);
	recolorNation(dominantHashtag);
	updateChart();
}

function dominantHashtagAt(time) {
	// A function to figure out the dominant hashtag at a given time

	// Hardcoded by looking at the plot--
	var dominantHashtags = [
		[1266, 'energy'],
		[1615, 'jobs'],
		[1861, 'education'],
		[2124, 'fairness'],
		[2681, 'healthcare'],
		[3592, 'defense']
	];


	// Go backwards through the hashtags looking for the first which predates the time we're looking for
	var dominantHashtag = null;
	for ( var j = dominantHashtags.length - 1; j >= 0; j-- ) {
		var timestamp = dominantHashtags[j][0];
		var hashtag = dominantHashtags[j][1];
		timestamp -= videoOffset;

		if (time > timestamp) {
			return hashtag;
		}
	}

	// Otherwise, if going backwards hasn't found one that's before the time we're looking for, return the first
	return dominantHashtags[0][1];
}


function recolorNation(hashtag) {
	// A function to go through every state and color it correctly for a given hashtag
	for ( var k = 0; k < stateAbbreviations.length; k++ ) {
		var stateAbbreviation = stateAbbreviations[k];
		var state = nation.getElementById(stateAbbreviation);
		colorState(state, getIntervalAt(SOTUvideo.currentTime), hashtag);
	}
}

function getIntervalAt(seconds) {
	// A function to get the nearest Interval we have from twitter for a given time
	return UTCtoNearestAvailableIntervalData(videoTimeToUTC(seconds));
}

function UTCtoNearestAvailableIntervalData(UTCdate) {
	// Go from a UTC date/time to the nearest available Interval we have from twitter

	// Get all the tweetIntervals from the tweetValues we loaded from values.json
	var tweetIntervals = Object.keys(tweetValues);
	for (var i = 0; i < tweetIntervals.length; i++) {
		// Tweets are indexed by interval (e.g. 2014-01-29 02:15:::2014-01-29 02:15), and we just want the start of the interval
		var tweetIntervalStart = new Date(tweetIntervals[i].split(':::')[0]);
		// As we go through, check if the time we just converted is after the time we're looking fo
		if (UTCdate < tweetIntervalStart) {
			return tweetValues[tweetIntervals[i-1]];
		}
	}
}

function videoTimeToUTC(seconds){
	// From a certain number of seconds after the SOTU started, get the absolute time in UTC
	var SOTUstart = new Date(2014, 0, 28, 21, 15, 0); // the date of the SOTH
	UTCOffset = 5*60*60; // in seconds
	return new Date(SOTUstart.getTime() + 1000*(UTCOffset + seconds)); // *1000 b/c Date expects milliseconds
}

function colorState(statePath, interval, hashtag) {
	// A function to color a given state, at a given interval, for a given hashtag
	statePath.style.opacity = 0.1; // Default to 10% opacity
	statePath.style.fill = hashtagColors[hashtag]; // Figure out what color we should use

	if (Object.keys(interval).indexOf(statePath.id) != -1) { // If a state was sufficiently engaged in this interval to have data
		var range = engagementRange(interval, hashtag); // Figure out the max and min of engagement overall so we can color proportionally
		var stateEngagements = interval[statePath.id]; // And then pull out this one state's engagements with different hashtags

		for (var i = 0; i < stateEngagements.length; i++) { // Iterate over the hashtags
			if ( stateEngagements[i][0] == '#' + hashtag ) { // And when we find the one we're coloring for
				var myEngagement = parseFloat(stateEngagements[i][1], 10);
				var newOpacity = interpolate(myEngagement, range, [0.1,1]);
				statePath.style.opacity = newOpacity; // set the opacity to be proportional to our state's relative engagement
				return; // and stop iterating
			}
		}
	}
}

function engagementRange(interval, hashtag) {
	// A function getting the min (range[0]) and max (range[1]) engagement for a given hashtag in a given interval across the country
	var range = [0,0];
	for ( var state in interval ) {
		var stateData = interval[state];
		for ( var i = 0; i < stateData.length; i++ ) {
			if ('#' + hashtag == stateData[i][0]) {
				var frequency = stateData[i][1];
				range[0] = Math.min(range[0], frequency);
				range[1] = Math.max(range[1], frequency);
			}
		}
	}

	return range;
}

function updateChart() {
	// Now that we have all the needed data, actually redraw the chart

	var currentInterval = getIntervalAt(SOTUvideo.currentTime);
	var numbers = document.querySelectorAll('#hashtag-chart li div.bar'); // Get all the bar chart divs

	var rawTotals = {};
	for (var i = 0; i < numbers.length; i++) {
		// Total engagement for a given hashtag across the nation
		rawTotals[numbers[i].id] = getTotalEngagement(currentInterval, numbers[i].id);
	}

	// Figure out the range of engagement
	var maxEngagement = 0;
	var totalEngagement = 0;
	for ( var eachHashtag in rawTotals ) {
		maxEngagement = Math.max(maxEngagement, rawTotals[eachHashtag]);
		totalEngagement += rawTotals[eachHashtag];
	}

	// For each hashtag, calculate how to scale the bars so that the largest is '1'
	for (var hashtag in rawTotals) {
		var newWidth = interpolate(rawTotals[hashtag], [0, maxEngagement], [0,1])*65 + '%';
		var bar = document.querySelector('li div#' + hashtag);
		bar.style.width = newWidth;

		// Color the dominant hashtag, make the rest gray
		var sibling = null; // Holds the text next to each bar
		if (hashtag == dominantHashtagAt(SOTUvideo.currentTime)) {
			bar.style.backgroundColor = hashtagColors[hashtag];
			sibling = bar.parentNode.getElementsByClassName('hashtag')[0];
			sibling.style.color = hashtagColors[hashtag];
		}
		else {
			sibling = bar.parentNode.getElementsByClassName('hashtag')[0];
			sibling.style.color = '#d3d3d3';
			bar.style.backgroundColor = '#d3d3d3';
		}

	}
}


function getTotalEngagement(interval, hashtag) {
	// A function to sum up total engagement so we can plot things proportionally
	var sum = 0;
	for ( var state in interval ) {
		var stateData = interval[state];
		for ( var i = 0; i < stateData.length; i++ ) {
			if ('#' + hashtag == stateData[i][0]) {
				sum += stateData[i][1];
			}
		}
	}

	return sum;
}


////////////////////////////////////////////////////////////////////////////////
// Utility functions

function position(element) {
	// A function which takes an element and returns a dictionary with its x and y position
    for (var lx=0, ly=0;
         element !== null;
         lx += element.offsetLeft, ly += element.offsetTop, element = element.offsetParent);

    return {x: lx, y: ly};
}

function interpolate(value, from, to) {
	// A function that lets us scale a value from one scale to another-- e.g. 5 : [0, 10] to 0.5 for [0, 1]
	var fromSpread = from[1] - from[0];
	var toSpread = to[1] - to[0];
	
	var ratio = toSpread/fromSpread;

	return (value - from[0])*ratio + to[0];
}