// When a message is clicked, grab all the messages and set the clicked one as the first one to render
let selectNode = (node) => {
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
