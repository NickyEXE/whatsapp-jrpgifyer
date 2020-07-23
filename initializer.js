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
