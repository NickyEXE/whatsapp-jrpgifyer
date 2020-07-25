// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let startJrpg = document.getElementById('startJrpg');

// chrome.storage.sync.get('color', function(data) {
//   startJrpg.style.backgroundColor = data.color;
//   startJrpg.setAttribute('value', data.color);
// });

startJrpg.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'combined.js'});
  });
};
