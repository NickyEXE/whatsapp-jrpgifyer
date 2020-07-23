nameHash = {
  "carla": "Tilly Scorch-the-Earth Schleppen",
  "nicky": "Mar Sanchez",
  "grace": "Alarielle Silvertongue",
  "carolin": "Quarthiel Silvereye",
  "maximilian": "Manack Nightdigger",
  "andy": "Game Master"
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
