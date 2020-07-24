let messagesArray = []

let charactersHash = {}
let selectedNode
let currentMessageIndex
let memoizedMessages = {}

function grabMessages(){
  // Clean the previous messages array
  messagesArray = []
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
      if (arr.length === 2 && node.closest(".message-in")){
        // this is going to cause bugs, needs to be abstracted and done recursively:
        let nearestNodeWithName = firstPreviousSiblingWithFunc(node, doesMessageHavePlayerName)
        console.log(nearestNodeWithName)
        // this almost definitely can be done without mapping through all children
        let name = [...nearestNodeWithName.querySelector("._274yw").children].map(item => item.innerText)[0];
        let time = arr[1]
        messagesArray.push({name: name, message: message, time: time})
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
