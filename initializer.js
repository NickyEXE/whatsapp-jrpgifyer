// When a message is clicked, grab all the messages and set the clicked one as the first one to render
let selectNode = (node) => {
  setReaderByFirstName("nicky")
  grabMessages()
  currentMessageIndex = messagesArray.findIndex(hash => node.innerText.includes(hash.time))
  renderApp()
  handleMessage(messagesArray[currentMessageIndex])
  beginMessagePolling()
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
