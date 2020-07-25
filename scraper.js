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
  console.log("new Message Array Length", messagesArray.length)
  console.log("currentMessageIndex", currentMessageIndex)
  console.log("currentMessageAtIndex", messagesArray[currentMessageIndex])
}
