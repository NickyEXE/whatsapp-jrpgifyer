// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let page = document.getElementById('buttonDiv');

const nameHash = {
  "carla": {characterName: "Tilly Scorch-the-Earth Schleppen", image: "https://64.media.tumblr.com/e33a94ae45041d7b3530098789d2d996/tumblr_o8ve2qTnAG1vsv40mo1_1280.jpg"},
  "nicky": {characterName: "Mar Sanchez", image: "https://i.ytimg.com/vi/ezcFLc0D5P0/maxresdefault.jpg"},
  "grace": {characterName: "Alarielle Silvertongue", image: "https://i.imgur.com/OmnlJb7.jpg" },
  "carolin": {characterName: "Quarthiel Silvereye", image: "https://i.imgur.com/yZkpDwi.jpg" },
  "maximilian": {characterName: "Manack Nightdigger", image: "https://i.imgur.com/puZ0eJ7.jpg"},
  "andy": {characterName: "Game Master", image: "https://cdnb.artstation.com/p/assets/images/images/013/400/025/large/antonio-j-manzanedo-red-dragon-manzanedo3.jpg?1539429909"},
}

const handleChar = (reader) => {
  if (reader){
    document.querySelector("h1").innerText = `Your character is currently set to ${nameHash[reader].characterName}`
  }
}

chrome.storage.sync.get('reader', function(data) {
  handleChar(data.reader);
});

const charactersList = document.getElementById("charactersList")

const renderChar = (char) => {
  const div = document.createElement('div')
  div.innerHTML = `
      <img src=${nameHash[char].image} alt=${nameHash[char].characterName}/>
      <h3>${nameHash[char].characterName}</h3>
  `
  div.classList.add("card")
  div.id = char
  div.addEventListener('click', () => {
    chrome.storage.sync.set({reader: char}, function() {
      alert(`Welcome, ${nameHash[char].characterName}. You are good to begin playing!`);
      handleChar(char)
    })
  })
  charactersList.appendChild(div)
}

// chrome.storage.sync.set({reader: "nicky"}, function() {
  // console.log('Value is set to ' + "nicky");
// })

function constructOptions() {
  Object.keys(nameHash).forEach(renderChar)
}

constructOptions()
