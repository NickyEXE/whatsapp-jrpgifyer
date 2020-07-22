let nodes = [...document.querySelectorAll(".message-in, .message-out")]

// Ensure the first message isn't one with no name
let checkMessage = (node) => {
    return [...node.querySelector("._274yw").children].length === 3
}
let starting_num = nodes.findIndex(checkMessage)
nodes = nodes.slice(starting_num, nodes.length)

// turn messages into array of hashes
let messages_array = []
let itemToHash = (node) => {
    if (node.querySelector("._274yw")){
        let arr = [...node.querySelector("._274yw").children].map(item => item.innerText)
        let message = node.querySelector("._274yw").querySelector(".copyable-text").firstChild.firstChild.firstChild.innerHTML
        if (arr.length === 2 && node.closest(".message-in")){
            messages_array.push({name: messages_array[messages_array.length -1].name, message: message, time: arr[1]})
        }
        else if (arr.length === 2 && node.closest(".message-out")){
            messages_array.push({name: "reader", message: message, time: arr[1]})
        }
        else {
            messages_array.push({name: arr[0], message: message, time: arr[2]})
        }
    }
}

nodes.forEach(itemToHash)

let hash = {}

let objInHash = (obj) => {
    let nam = obj.name
    hash[nam] = 1
}

messages_array.forEach(objInHash)

document.body.innerText = JSON.stringify(messages_array)

document.head.innerHTML = ""