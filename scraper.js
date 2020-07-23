let messagesArray

let charactersHash = {}
let selectedNode
let currentMessageIndex

function grabMessages(){
  let nodes = [...document.querySelectorAll(".message-in, .message-out")]

  // Ensure the first message isn't one with no name
  let checkMessage = (node) => {
    return [...node.querySelector("._274yw").children].length === 3
  }
  let starting_num = nodes.findIndex(checkMessage)
  nodes = nodes.slice(starting_num, nodes.length)

  // turn messages into array of hashes
  messagesArray = []
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

// When a message is clicked, grab all the messages and set the clicked one as the first one to render
let selectNode = (e) => {
  console.log(e)
  selectedNode = e.target
  grabMessages()
  currentMessageIndex = messagesArray.findIndex(hash => hash.message === selectedNode.querySelector(".copyable-text").firstChild.firstChild.firstChild.innerHTML)
}
document.querySelectorAll(".message-in, .message-out").forEach(node => node.addEventListener("click", selectNode))
