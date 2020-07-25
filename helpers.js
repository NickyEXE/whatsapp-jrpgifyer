let firstPreviousSiblingWithFunc = (node, func) => {
  let sibling = node.previousElementSibling;
  while (sibling){
    if (func(sibling)){return sibling}
    sibling = sibling.previousElementSibling
  }
}

let doesMessageHavePlayerName = (node) => {
  // Checking a previous node bypasses the if statement in create message from node. This ensures that it doesn't error.
  if (node.querySelector("._274yw")){
    return [...node.querySelector("._274yw").children].length === 3
  }
}

function hashCode(s) {
  let h;
  for(let i = 0; i < s.length; i++)
    h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  return h;
}
