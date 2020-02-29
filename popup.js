// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var intervals = [...Array(100).keys()];
var counter = 0

var a = `
	var img = document.createElement('img');
	img.src = '`;

var b = `';
    if (`;


var d = ` = setInterval(
		function() {
			pos++;
			img.style.right = pos + 'px';
		},
		20,
	);`

var g = `';
	img.style.width = '120px';
	img.style.position = 'fixed';
	img.style.right = 0;
	img.style.top = Math.floor(Math.random() * Math.floor(600)) + 'px';
	img.style.zIndex = '10000';
	document.body.appendChild(img);
	var pos = 0;
	var id = setInterval(frame, 50);
	function frame() {
	    pos++;
	    img.style.right = pos + 'px';
	}
	`

var h = (src) => (
	`var img = document.createElement('img');
	img.src = '` +
	src +
	`';
	img.style.width = '120px';
	img.style.position = 'fixed';
	img.style.right = 0;
	img.style.top = Math.floor(Math.random() * Math.floor(600)) + 'px';
	img.style.zIndex = '10000';
	document.body.appendChild(img);
	var pos = 0;
	var id = setInterval(frame, 50);
	function frame() {
	    pos++;
	    img.style.right = pos + 'px';
	}
	`
);

function click(e) {

    chrome.tabs.executeScript(null,
      {code: h(e.target.src)}
  );

  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var imgs = document.querySelectorAll('img.grid-item');
  for (var i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('click', click);
  }
});
