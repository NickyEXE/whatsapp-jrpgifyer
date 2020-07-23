let messagesArray = []

let charactersHash = {}
let selectedNode
let currentMessageIndex

function grabMessages(){
  let nodes = [...document.querySelectorAll(".message-in, .message-out")]
  console.log("grabbing nodes", nodes.length)
  // Ensure the first message isn't one with no name
  let checkMessage = (node) => {
    return [...node.querySelector("._274yw").children].length === 3
  }
  let starting_num = nodes.findIndex(checkMessage)
  nodes = nodes.slice(starting_num, nodes.length)

  // turn messages into array of hashes
  let itemToHash = (node) => {
    if (node.querySelector("._274yw")){
      let arr = [...node.querySelector("._274yw").children].map(item => item.innerText)
      let message = node.querySelector("._274yw").querySelector(".copyable-text").firstChild.firstChild.firstChild.innerHTML
      if (arr.length === 2 && node.closest(".message-in")){
        messagesArray.push({name: messagesArray[messagesArray.length -1].name, message: message, time: arr[1]})
      }
      else if (arr.length === 2 && node.closest(".message-out")){
        messagesArray.push({name: "reader", message: message, time: arr[1]})
      }
      else {
        messagesArray.push({name: arr[0], message: message, time: arr[2]})
      }
    }
  }
  nodes.forEach(itemToHash)
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
  "reader": {characterName: "Mar Sanchez", image: "https://i.ytimg.com/vi/ezcFLc0D5P0/maxresdefault.jpg"},
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

let messageForward = () => currentMessageIndex < messagesArray.length && handleMessage(messagesArray[++currentMessageIndex])
let messageBackward = () => currentMessageIndex > 0 && handleMessage(messagesArray[--currentMessageIndex])


// createElementByFirstName("nicky")
function renderApp(){
  document.querySelector("#app").appendChild(document.querySelector("footer"))
  document.querySelector("#app").children[0].remove()

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
}
// When a message is clicked, grab all the messages and set the clicked one as the first one to render
let selectNode = (e) => {
  grabMessages()
  selectedNode = e.target.closest(".message-in, .message-out")
  console.log("messages array", messagesArray)
  currentMessageIndex = messagesArray.findIndex(hash => selectedNode.innerText.includes(hash.time))
  console.log("message index", currentMessageIndex)
  renderApp()
  handleMessage(messagesArray[currentMessageIndex])
}
document.querySelectorAll(".message-in, .message-out").forEach(node => node.addEventListener("click", selectNode))


document.addEventListener("keydown", (e) => {
  e.keyCode === 39 && messageForward();
  e.keyCode === 37 && messageBackward();
})
