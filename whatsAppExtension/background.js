// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({reader: 'nicky'}, function() {
    console.log('Current reader is nicky.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'web.whatsapp.com', schemes: ['https']},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
