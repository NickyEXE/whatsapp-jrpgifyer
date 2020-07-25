function renderApp(){
  document.querySelector("#app").appendChild(document.querySelector("footer"))
  document.querySelector("#app").children[0].style.display = "none"

  let main = document.createElement("main")
  main.innerHTML = `
  <div class="jrpg-main">
    <div class="arrows"><span id="back-arrow">▴</span> <span id="forward-arrow">▾</span></div>
    <button id="auto-reader-button">Real Time Messages: Off</button>
  </div>`

  document.querySelector("#app").appendChild(main)


  let style = document.createElement("style")
  style.innerHTML = `.jrpg-main {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: black;
    background-image: url(https://i.imgur.com/TuTeXwS.jpg);
    color: #747474;
    font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
    font-size: .9em;
    height: 90vh;
    padding: 3em;
    padding-top: 0;
  }

  .jrpg-main .player {
    width: 45%;
    margin-top: 1.5em;
  }

  .player-card {
    display: flex;
    background-color: #272727;
    border-radius: 0.5em;
    padding: 1em;
    border-style: solid;
    border-width: 2px;
    border-color: white;
    overflow: scroll;
    max-height: 20vh;
  }

  .character-name{
    color: white;
  }

  .player-card.selected {
    background-color: #db9559;
    color: black;
  }

  .player:nth-child(even) .player-card {
    flex-direction: row-reverse;
  }

  .player:nth-child(even) {
    padding-right: 0em;
    text-align: right;
  }

  .player:nth-child(odd) {
    padding-left: 0em;
  }

  .player:nth-child(odd) .player-card .message{
    padding-left: .9em;
  }

  .player:nth-child(even) .player-card .message{
    padding-right: .9em;
  }

  .player-card img {
    width: 20vh;
    height: 20vh;
    object-fit: cover;
    object-position: 50% 0%;
  }

  .arrows {
    position: fixed;
    font-size: 4em;
    z-index: 2;
    color: black;
    right: .5em;
    -webkit-text-fill-color: #db955991;
    -webkit-text-stroke-width: 3px;
    -webkit-text-stroke-color: #272727;
    bottom: 0em;
  }

  .deactivated-arrow {
    display: none;
  }

  #auto-reader-button{
    position: fixed;
    bottom: 1.5em;
    left: 1em;
    background-color: #db955991;
    padding: .5em;
    border-style: solid;
    border-width: 3px;
    border-radius: .5em;
  }
  `

  document.head.appendChild(style)
  // reuse whatsapp message bar
  document.querySelector("footer").querySelector(".copyable-area").style.backgroundColor = "black"
  document.querySelector("footer").querySelector(".copyable-area").style.fontFamily = `"Palatino Linotype", "Book Antiqua", Palatino, serif`
  document.querySelector("._1JNuk").style.display = "none"
  document.getElementById("auto-reader-button").addEventListener("click", autoReaderButtonPress)
}

const renderSelect = () => {
  let characters = ["carla", "nicky", "grace", "carolin", "maximilian", "andy"]
  document.querySelector("#app").children[0].style.display = "none"
  const topDiv = document.createElement("div")
  topDiv.id = "characterSelect"
  const h1 = document.createElement("h1")
  h1.innerText = "Select Your Character!"
  topDiv.appendChild(h1)
  const innerDiv = document.createElement("div")
  innerDiv.id = "charactersList"
  let style = document.createElement("style")
  style.id = "characterSelectStyle"
  style.innerHTML = `
  #characterSelect {
    color: yellow;
    text-align: center;
    background-color: black;
    height: 100vh;
  }

  #characterSelect h1 {
    font-size: 2em;
  }
  #charactersList{
    padding-top: 1em;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: black;
    color: white;
  }
  .card {
    margin: 1em 1em;
    padding-top: 1em;
    padding-bottom: 1em;
    background-color: #000000;
    color: white;
    border-style: solid;
    border-color: yellow;
    border-radius: 1em;
    border-width: 2px;
    width: 30%;
    text-align: center;
  }
  .card img{
    width: 200px;
    height: 200px;
  }`
  document.querySelector("#app").appendChild(topDiv)
  topDiv.appendChild(innerDiv)
  document.head.appendChild(style)
  characters.forEach(renderChar)
}

const renderChar = (char) => {
  const div = document.createElement('div')
  div.innerHTML = `
      <img src=${nameHash[char].image} alt=${nameHash[char].characterName}/>
      <h3>${nameHash[char].characterName}</h3>
  `
  div.classList.add("card")
  div.id = char
  div.addEventListener('click', () => selectCharAndReturnPage(char))
  document.querySelector("#charactersList").appendChild(div)
}
