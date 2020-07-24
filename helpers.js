let firstPreviousSiblingWithFunc = (node, func) => {
  let sibling = node.previousElementSibling;
  while (sibling){
    if (func(sibling)){return sibling}
    sibling = sibling.previousElementSibling
  }
}

let doesMessageHavePlayerName = (node) => {
  return [...node.querySelector("._274yw").children].length === 3
}
