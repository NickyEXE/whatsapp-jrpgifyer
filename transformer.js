const nameHash = {
  "carla": {characterName: "Tilly Scorch-the-Earth Schleppen", image: "https://64.media.tumblr.com/e33a94ae45041d7b3530098789d2d996/tumblr_o8ve2qTnAG1vsv40mo1_1280.jpg"},
  "nicky": {characterName: "Mar Sanchez", image: "https://i.ytimg.com/vi/ezcFLc0D5P0/maxresdefault.jpg"},
  "grace": {characterName: "Alarielle Silvertongue", image: "https://i.imgur.com/OmnlJb7.jpg" },
  "carolin": {characterName: "Quarthiel Silvereye", image: "https://i.imgur.com/yZkpDwi.jpg" },
  "maximilian": {characterName: "Manack Nightdigger", image: "https://i.imgur.com/puZ0eJ7.jpg"},
  "andy": {characterName: "Game Master", image: "https://cdnb.artstation.com/p/assets/images/images/013/400/025/large/antonio-j-manzanedo-red-dragon-manzanedo3.jpg?1539429909"}
}

const createElementByFirstName = (name) => {
  let div = document.createElement("div")
  div.classList.add("player")
  div.innerHTML = `<header class="character-name">${nameHash[name].characterName}</header>
  <div class="player-card" id="reader">
    <img src="${nameHash[name].image}"><div class="message"></div>
  </div>
  `
  document.querySelector(".jrpg-main").appendChild(div)
}

let grabElementFromName = (name) => {
  return document.getElementById(name.split(" ")[0].toLowerCase())
}

handleNonSelectedBox = (element) => {
  element.classList.remove("selected")
  element.dataset.tilDeletion && element.dataset.tilDeletion --
  if (element.dataset.tilDeletion < 0){element.querySelector(".message").innerHTML = ""}
}

let handleMessage = (message) => {
  [...document.querySelectorAll(".player-card")].forEach(handleNonSelectedBox)
  let selectedDiv = grabElementFromName(message.name)
  selectedDiv.classList.add("selected");
  selectedDiv.dataset.tilDeletion = 3
  selectedDiv.querySelector(".message").innerHTML = message.message
}

handleMessage(messagesArray[currentMessageIndex])
let messageForward = () => currentMessageIndex < messagesArray.length && handleMessage(messagesArray[++currentMessageIndex])
let messageBackward = () => currentMessageIndex > 0 && handleMessage(messagesArray[--currentMessageIndex])

document.addEventListener("keydown", (e) => {
  console.log(e.keyCode)
  e.keyCode === 39 && messageForward();
  e.keyCode === 37 && messageBackward();
})

createElementByFirstName("nicky")
