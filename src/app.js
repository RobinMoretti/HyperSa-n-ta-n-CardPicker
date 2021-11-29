import axios from 'axios';

import './sass/style.scss'
import cardsCSV from './cards.csv';

import Card from "./Card";
import Drawer from "./Drawer";
import Deck from "./Deck";

//--------------------------------------------------------------------------------------//
//                                                                                      //
//                                      CARD INIT                                       //
//                                                                                      //
//--------------------------------------------------------------------------------------//

// init all cards objects

const cardRow = cardsCSV[0];
let cardPileNames = Object.keys(cardRow);

let cardsPile = {};
let junkCardsPile = {};

cardPileNames.forEach(cardPileName => {
	cardsPile[cardPileName] = [];
})

cardsCSV.forEach(row =>{
	let columsName =  Object.keys(row);
	columsName.forEach(columnName => {
		if(columnName && row[columnName].length){
			cardsPile[columnName].push(new Card(columnName, row[columnName]));
		}
	})
})


//--------------------------------------------------------------------------------------//
//                                                                                      //
//                                  DISPLAY ALL DECKS                                   //
//                                                                                      //
//--------------------------------------------------------------------------------------//
let decks = [];

for (let cardsDeck in cardsPile) {
	decks.push(new Deck(cardsPile[cardsDeck], cardsDeck));
}

let junkRevealedCardsButton = document.getElementById("junk-revealed-cards");
junkRevealedCardsButton.addEventListener("click", ()=>{
	decks.forEach(deck => {
		deck.junkRevealedCards();
	})
});







//  **************************************************************************************

let cards = document.querySelectorAll(".card");

cards.forEach(card => {
	card.addEventListener("click", () =>{
		toggleCard(card);
	})
});


function toggleCard(card){
	card.classList.toggle("displayed");
}


// let newSetButton = document.getElementById("pick-new-set-button");
// newSetButton.addEventListener('click', pickNewCard)
// function pickNewCard(){
// 	cards.forEach(card => {
// 		card.classList.remove("displayed");
// 	});
// }


//                                      BIDOUILLE                                       //

searchVideos("chrismas").then((result)=>{
	var videoIndex = Math.floor(Math.random() * 3);
	
	displayVideo(document.body, result[videoIndex].id.videoId);
})

let iframes = document.getElementsByTagName('iframe');

for (let i = 0; i < iframes.length; i++) {
	const iframe = iframes[i];	
	iframe.setAttribute("src", iframe.getAttribute('src') + "&origin=" + process.env.URL);	
}

function searchVideos(query){
	let config = {
		params: {
			key: "AIzaSyCrgbC7uncssjZ4kw1uYLDXeugVza2OE2M",
			q: query,
		}
	}
	
	return new Promise((resolve, reject) => {
		axios.get('https://www.googleapis.com/youtube/v3/search', config)
		.then(function (response) {
			resolve(response.data.items);
		})
		.catch(function (error) {
			reject(error);
		});
	});
}


function displayVideo(parentElement, videoId){
	// if(parentElement.querySelector("iframe")){
	// 	parentElement.removeChild(parentElement.querySelector("iframe"));
	// }

	// var iframe = `<iframe title='YouTube video player' type=\"text/html\" width='640' height='390' src='http://www.youtube.com/embed/${videoId}' frameborder='0' allowFullScreen></iframe>`;
	// 	parentElement.innerHTML += iframe;
}

	// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	// // 3. This function creates an <iframe> (and YouTube player)
	// //    after the API code downloads.
var player;
setTimeout(() => {
	// onYouTubeIframeAPIReady()
}, 2000);

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '100%',
		width: '100%',
		playerVars: {
		  rel: 0,
		  controls: 0,
		  showinfo: 0,
		  autoplay: 1,
		  modestbranding: 1
		},
		videoId: 'M7lc1UVf-VE',
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

function onPlayerReady(event) {
	event.target.mute();
	event.target.playVideo();
}


var done = false;

function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING && !done) {
		setTimeout(stopVideo, 6000);
		done = true;
	}
}
function stopVideo() {
	player.stopVideo();
}
	


