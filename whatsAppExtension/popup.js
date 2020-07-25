// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let reader

let startJrpg = document.getElementById('startJrpg');

chrome.storage.sync.get('reader', function(data) {
  reader = data.reader
  console.log(reader)

  let injection = () => {
    console.log("clicked!")
    chrome.tabs.query({active: true, currentWindow: true},
      function(tabs){
        chrome.tabs.executeScript(
          tabs[0].id,
            {file: '/combined.js'},
            )
          }
      )
  }

  //   chrome.tabs.executeScript(tab.id, {
  //     code: 'let cheese = "batman";'
  //   }, function() {
  //     chrome.tabs.executeScript(tab.id, {file: 'combined.js'});
  //   })
  // }
  startJrpg.addEventListener("click", injection)

});

// startJrpg.onclick = function () {
//   // let color = element.target.value;
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.executeScript(
//         tabs[0].id,
//         {code: 'console.log("hello world"'},
//         function(){
//           chrome.tabs.executeScript(
//             tabs[0].id,
//             {file: '/combined.js'});
//         });
//   });
// };
