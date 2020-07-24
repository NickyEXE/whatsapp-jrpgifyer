let firstPreviousSiblingWithFunc = (node, func) => {
  let sibling = node.previousElementSibling;
  while (sibling){
    if (func(sibling)){return sibling}
    sibling = sibling.previousElementSibling
  }
}

let doesMessageHavePlayerName = (node) => {
  return [...node.querySelector("._274yw").children].length === 3
}

function hashCode(s) {
  let h;
  for(let i = 0; i < s.length; i++)
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;

  return h;
}
let messagesArray = []

let charactersHash = {}
let selectedNode
let currentMessageIndex
let memoizedMessages = {}

let memoizeAndStoreMessage = (name, message, time) => {
  let hashedString = hashCode(message + time + name)
  if (!memoizedMessages[hashedString]){
    memoizedMessages[hashedString] = true
    messagesArray.push({name: name, message: message, time: time})
  }
}

// This class is a convenient common parent of each message in the current WhatsApp UI thats a child of both .message-in and .message-out
const selectMessageNode = (node) => node.querySelector("._274yw")

let createMessageFromNode = (node) => {
  if (selectMessageNode(node)){
    let arr = [...selectMessageNode(node).children].map(item => item.innerText)
    let message = selectMessageNode(node).querySelector(".copyable-text").firstChild.firstChild.firstChild.innerHTML
    let name, time
    // If this message doesnt have a name, and its not from the user (because its part of a string of continuous messages from anotherp erson)
    if (arr.length === 2 && node.closest(".message-in")){
      let nearestNodeWithName = firstPreviousSiblingWithFunc(node, doesMessageHavePlayerName)
      name = selectMessageNode(nearestNodeWithName).firstChild.innerText
      time = arr[1]
    }
    // If this message is from the user
    else if (arr.length === 2 && node.closest(".message-out")){
      name = "reader"
      time = arr[1]
    }
    else {
      name = arr[0]
      time = arr[2]
    }
    memoizeAndStoreMessage(name, message, time)
  }
}

function grabMessages(){
  let nodes = [...document.querySelectorAll(".message-in, .message-out")]
  console.log("grabbing nodes", nodes.length)
  // Ensure the first message isnt one with no name, as the names for those are found recursively going backwards through nearestNodeWithName
  let starting_num = nodes.findIndex(doesMessageHavePlayerName)
  nodes = nodes.slice(starting_num, nodes.length)
  nodes.forEach(createMessageFromNode)
  // This code is unnecessary, cut and test:
  let objInHash = (obj) => {
    let nam = obj.name
    charactersHash[nam] = 1
  }
  messagesArray.forEach(objInHash)
}
const nameHash = {
  "carla": {characterName: "Tilly Scorch-the-Earth Schleppen", image: "https://64.media.tumblr.com/e33a94ae45041d7b3530098789d2d996/tumblr_o8ve2qTnAG1vsv40mo1_1280.jpg"},
  "nicky": {characterName: "Mar Sanchez", image: "https://i.ytimg.com/vi/ezcFLc0D5P0/maxresdefault.jpg"},
  "grace": {characterName: "Alarielle Silvertongue", image: "https://i.imgur.com/OmnlJb7.jpg" },
  "carolin": {characterName: "Quarthiel Silvereye", image: "https://i.imgur.com/yZkpDwi.jpg" },
  "maximilian": {characterName: "Manack Nightdigger", image: "https://i.imgur.com/puZ0eJ7.jpg"},
  "andy": {characterName: "Game Master", image: "https://cdnb.artstation.com/p/assets/images/images/013/400/025/large/antonio-j-manzanedo-red-dragon-manzanedo3.jpg?1539429909"},
  "max": {characterName: "Manack Nightdigger", image: "https://i.imgur.com/puZ0eJ7.jpg"},
}

function setReaderByFirstName(name){
  if (nameHash[name]){
    nameHash["reader"] = nameHash[name]
  }
  else{
    console.log("Please enter one of the following without quotes:", nameHash.keys)
  }
}

const createElementByFirstName = (name) => {
  let div = document.createElement("div")
  div.classList.add("player")
  div.classList.add("selected")
  div.innerHTML = `<header class="character-name">${nameHash[name].characterName}</header>
  <div class="player-card" id=${name}>
    <img src="${nameHash[name].image}"><div class="message"></div>
  </div>`
  document.querySelector(".jrpg-main").appendChild(div)
  return div.children[1]
}

let grabOrCreateElementFromName = (name) => {
  let firstName = name.split(" ")[0].toLowerCase()
  if (document.getElementById(firstName)){
    return document.getElementById(firstName)
  }
  else {
    return createElementByFirstName(firstName)
  }
}

let handleNonSelectedBox = (element) => {
  element.classList.remove("selected")
  element.dataset.tilDeletion && element.dataset.tilDeletion --
  if (element.dataset.tilDeletion < 0){element.querySelector(".message").innerHTML = ""}
}

let handleMessage = (message) => {
  [...document.querySelectorAll(".player-card")].forEach(handleNonSelectedBox)
  let selectedDiv = grabOrCreateElementFromName(message.name)
  selectedDiv.classList.add("selected");
  selectedDiv.dataset.tilDeletion = 3
  selectedDiv.querySelector(".message").innerHTML = message.message
}

let messageForward = () => currentMessageIndex + 1 < messagesArray.length && handleMessage(messagesArray[++currentMessageIndex])
let messageBackward = () => currentMessageIndex > 0 && handleMessage(messagesArray[--currentMessageIndex])


// createElementByFirstName("nicky")
function renderApp(){
  document.querySelector("#app").appendChild(document.querySelector("footer"))
  document.querySelector("#app").children[0].style.display = "none"

  let main = document.createElement("main")
  main.innerHTML = `<div class="jrpg-main">
  </div>`

  document.querySelector("#app").appendChild(main)


  let style = document.createElement("style")
  style.innerHTML = `.jrpg-main {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: black;
    background-image: url(https://i.imgur.com/TuTeXwS.jpg);
    color: #747474;
    font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
    font-size: .9em;
    height: 100vh;
    padding: 3em;
  }

  .jrpg-main .player {
    width: 45%;
    margin-top: 1.5em;
  }

  .player-card {
    display: flex;
    background-color: #272727;
    border-radius: 0.5em;
    padding: 1em;
    border-style: solid;
    border-width: 2px;
    border-color: white;
    overflow: scroll;
    max-height: 20vh;
  }

  .character-name{
    color: white;
  }

  .player-card.selected {
    background-color: #db9559;
    color: black;
  }

  .player:nth-child(even) .player-card {
    flex-direction: row-reverse;
  }

  .player:nth-child(even) {
    padding-right: 0em;
    text-align: right;
  }

  .player:nth-child(odd) {
    padding-left: 0em;
  }

  .player:nth-child(odd) .player-card .message{
    padding-left: .9em;
  }

  .player:nth-child(even) .player-card .message{
    padding-right: .9em;
  }

  .player-card img {
    width: 20vh;
    height: 20vh;
    object-fit: cover;
    object-position: 50% 0%;
  }
  `

  document.head.appendChild(style)
  document.querySelector("footer").querySelector(".copyable-area").style.backgroundColor = "black"
  document.querySelector("footer").querySelector(".copyable-area").style.fontFamily = `"Palatino Linotype", "Book Antiqua", Palatino, serif`
}
// When a message is clicked, grab all the messages and set the clicked one as the first one to render
let selectNode = (node) => {
  setReaderByFirstName("nicky")
  grabMessages()
  currentMessageIndex = messagesArray.findIndex(hash => node.innerText.includes(hash.time))
  renderApp()
  handleMessage(messagesArray[currentMessageIndex])
}

const handleUserMessageClick = (e) => {
  if (e.target.closest(".message-in, .message-out")){
    selectNode(e.target.closest(".message-in, .message-out"))
  }
}

document.addEventListener("click", handleUserMessageClick)

document.addEventListener("keydown", (e) => {
  e.keyCode === 39 && messageForward();
  e.keyCode === 37 && messageBackward();
})
