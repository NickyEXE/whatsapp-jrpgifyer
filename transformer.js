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

let checkArrows = () => {
  if (currentMessageIndex +1 >= messagesArray.length){
    document.getElementById("forward-arrow").classList.add("deactivated-arrow")
  }
  else{
    document.getElementById("forward-arrow").classList.remove("deactivated-arrow")
  }
  if (currentMessageIndex <= 0){
    document.getElementById("back-arrow").classList.add("deactivated-arrow")
  }
  else {
    document.getElementById("back-arrow").classList.remove("deactivated-arrow")
  }
}

let messageForward = () => {
  if (currentMessageIndex + 1 < messagesArray.length){
    currentMessageIndex ++
    handleMessage(messagesArray[currentMessageIndex])
    checkArrows()
  }
}
let messageBackward = () => {
  if (currentMessageIndex > 0){
    currentMessageIndex --
    handleMessage(messagesArray[currentMessageIndex])
    turnOffAutoReader()
    checkArrows()
  }
}


// createElementByFirstName("nicky")
