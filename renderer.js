document.querySelector("#app").appendChild(document.querySelector("footer"))
document.querySelector("#app").children[0].remove()

let main = document.createElement("main")
main.innerHTML = `<div class="jrpg-main">
<div class="player left">
    <header class="character-name">Mar Sanchez</header>
    <div class="player-card left" id="reader">
        <img src="https://i.ytimg.com/vi/ezcFLc0D5P0/maxresdefault.jpg"><div class="message"></div>
    </div>
</div>
<div class="player right">
    <header class="character-name">Tilly Scorch-the-Earth Schleppen</header>
    <div class="player-card right" id="carla">
        <img src="https://64.media.tumblr.com/e33a94ae45041d7b3530098789d2d996/tumblr_o8ve2qTnAG1vsv40mo1_1280.jpg"><div class="message"></div>
    </div>
</div>
<div class="player left">
    <header class="character-name">Alarielle Silvertongue</header>
    <div class="player-card left" id="grace">
        <img src="https://i.imgur.com/OmnlJb7.jpg"><div class="message"></div>
    </div>
</div>
<div class="player right">
    <header class="character-name">Quarthiel Silvereye</header>
    <div class="player-card right" id="carolin">
        <img src="https://i.imgur.com/yZkpDwi.jpg"><div class="message"></div>
    </div>
</div>
<div class="player left">
    <header class="character-name">Manack Nightdigger</header>
    <div class="player-card left" id="maximilian">
        <img src="https://i.imgur.com/puZ0eJ7.jpg"><div class="message"></div>
    </div>
</div>
<div class="player right">
    <header class="character-name">GM</header>
    <div class="player-card right" id="andy">
        <img src="https://cdnb.artstation.com/p/assets/images/images/013/400/025/large/antonio-j-manzanedo-red-dragon-manzanedo3.jpg?1539429909"><div class="message"></div>
    </div>
</div>
</div>`

document.querySelector("#app").appendChild(main)


let style = document.createElement("style")
style.innerHTML = `.jrpg-main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: black;
  color: #747474;
  font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
  font-size: .9em;
}

.player {
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
}

.character-name{
  color: white;
}

.player-card.selected {
  background-color: #db9559;
  color: black;
}

.player-card.right {
  flex-direction: row-reverse;
}

.player.right {
  padding-right: 0em;
  text-align: right;
}

.player.left {
  padding-left: 0em;
}

.player-card.left .message{
  padding-left: .9em;
}

.player-card.right .message{
  padding-right: .9em;
}

.player-card img {
  width: 20vh;
  height: 20vh;
  object-fit: cover;
  object-position: 50% 0%;
}`

document.head.appendChild(style)
