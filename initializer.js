// Event listener on the character select screen. Once selected, the app is enabled aand reaady to be triggered on message click.
const selectCharAndReturnPage = (char) => {
  document.getElementById("characterSelect").remove()
  document.querySelector("#app").children[0].style.display = ""
  document.querySelector("#characterSelectStyle").remove()
  document.addEventListener("click", handleUserMessageClick)
  alert("You're now ready! Click a message and it will load that and all following messages, JRPG-style. Use UP and DOWN to navigate, or catch up using Real Time Messages.")
  setReaderByFirstName(char)
}

// When a message is clicked, grab all the messages and set the clicked one as the first one to render. This initializes the App.
let selectNode = (node) => {
  grabMessages()
  currentMessageIndex = messagesArray.findIndex(hash => node.innerText.includes(hash.time))
  renderApp()
  handleMessage(messagesArray[currentMessageIndex])
  addEventListeners()
  beginMessagePolling()
}

const addEventListeners = () => {
  document.addEventListener("keydown", (e) => {
    e.keyCode === 40 && messageForward();
    e.keyCode === 38 && messageBackward();
    e.keyCode === 13 && turnOnAutoReader()
  })
  document.getElementById("back-arrow").addEventListener("click", messageBackward)
  document.getElementById("forward-arrow").addEventListener("click", messageForward)
}

const handleUserMessageClick = (e) => {
  if (e.target.closest(".message-in, .message-out")){
    selectNode(e.target.closest(".message-in, .message-out"))
  }
}

let autoReader = false

const turnOffAutoReader = () => {
  autoReader = false
  document.getElementById("auto-reader-button").innerText = "Real Time Messages: Off"
}

const turnOnAutoReader = () => {
  autoReader = true
  document.getElementById("auto-reader-button").innerText = "Real Time Messages: On"
}

const autoReaderButtonPress = () => autoReader ? turnOffAutoReader() : turnOnAutoReader()

const autoRead = () => {
  if (messagesArray.length - 1 > currentMessageIndex){
    messagesArray.slice(currentMessageIndex, messagesArray.length).forEach(handleMessage)
    currentMessageIndex = messagesArray.length - 1
  }
}

const beginMessagePolling = () => {
  setInterval(() => {
    grabMessages()
    checkArrows()
    autoReader && autoRead()
  }, 2000)
}

renderSelect()
