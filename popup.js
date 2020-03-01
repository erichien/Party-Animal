// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


var renderCode = (eventTarget) => (
	`window.counter = (window.counter === undefined) ? 0 : window.counter + 1;
	window.imgs = (window.imgs === undefined) ? [] : window.imgs;
	window.intervals = (window.intervals === undefined) ? [] : window.intervals;
	window.pos = (window.pos === undefined) ? [] : window.pos;
	var classNames = '` + eventTarget.className + `'.split(' ');

	window.imgs[` + eventTarget.id + `] = document.createElement('img');
	window.imgs[` + eventTarget.id + `].src = '` + eventTarget.src + `'
	window.imgs[` + eventTarget.id + `].style.width = '150px';
	window.imgs[` + eventTarget.id + `].style.height = 'auto';
	window.imgs[` + eventTarget.id + `].style.transform =
	    (classNames.includes('mirror')) ? "scaleX(-1)" : null;
	window.imgs[` + eventTarget.id + `].style.webkitTransform =
	    (classNames.includes('mirror')) ? "scaleX(-1)" : null;
	window.imgs[` + eventTarget.id + `].style.position = 'fixed';
	window.imgs[` + eventTarget.id + `].style.right = 0;
	window.imgs[` + eventTarget.id + `].style.top = Math.floor(Math.random() * Math.floor(600)) + 'px';
	window.imgs[` + eventTarget.id + `].style.zIndex = '10000';
	document.body.appendChild(window.imgs[` + eventTarget.id + `]);

	window.pos[` + eventTarget.id + `] = 0;
	window.intervals[` + eventTarget.id + `] = setInterval(
		() => {
		    window.pos[` + eventTarget.id + `]++;
		    window.imgs[` + eventTarget.id + `].style.right = window.pos[` + eventTarget.id + `] + 'px';
		},
		50
	);`
);


function click(e) {
    chrome.tabs.executeScript(
    	null,
    	{
    		code: renderCode(e.target)
    	}
  	);
  window.close();
}


document.addEventListener('DOMContentLoaded', function () {
	var imgs = document.querySelectorAll('img.grid-item');
	for (var i = 0; i < imgs.length; i++) {
		imgs[i].addEventListener('click', click);
	}
});
