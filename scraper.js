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

function grabMessages(){
  let nodes = [...document.querySelectorAll(".message-in, .message-out")]
  console.log("grabbing nodes", nodes.length)
  // Ensure the first message isn't one with no name
  let starting_num = nodes.findIndex(doesMessageHavePlayerName)
  nodes = nodes.slice(starting_num, nodes.length)

  // turn messages into array of hashes
  let itemToHash = (node) => {
    if (node.querySelector("._274yw")){
      let arr = [...node.querySelector("._274yw").children].map(item => item.innerText)
      let message = node.querySelector("._274yw").querySelector(".copyable-text").firstChild.firstChild.firstChild.innerHTML
      let name, time
      if (arr.length === 2 && node.closest(".message-in")){
        let nearestNodeWithName = firstPreviousSiblingWithFunc(node, doesMessageHavePlayerName)
        name = nearestNodeWithName.querySelector("._274yw").firstChild.innerText
        time = arr[1]
      }
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
  nodes.forEach(itemToHash)
  let objInHash = (obj) => {
    let nam = obj.name
    charactersHash[nam] = 1
  }
  messagesArray.forEach(objInHash)
}
