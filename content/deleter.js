let step = undefined;
let prevStep = undefined;
let isFinished = false;

let timeout = 120;
let tickInterval = 500;
let monitorPulse = undefined;

console.log("deleter injected");
start();

function start() {
	console.log('delete: starting');
	step = waitForLoad;
	doStep(0);
}

function doStep(tick) {
	if (tick % 25 === 0) {
		console.log('delete: waited ' + tick + '/' + timeout + ' ticks before timeout');
	}
	if (tick > timeout && prevStep === step) {
		console.log('delete: timed out on page: ' + window.location.href);
		step = done;
		step();
		return;
	}
	if (prevStep !== step) {
		prevStep = step;
		tick = 0;
	}

	step();
	window.setTimeout(doStep, tickInterval, tick + 1);
}

function waitForLoad() {
	let arrow = getArrow();

	if (isDeleted()) {
		console.log('delete: post already deleted');
		step = done;
	}
	else if (arrow === null) {
		console.log('delete: page not loaded yet');
	}
	else {
		console.log('delete: page loaded');
		step = openDropdown;
	}
}

function openDropdown() {
	console.log('delete: opening drop down');
	let arrow = getArrow();
	arrow.click();
	step = waitForDropdownOpened;
}

function waitForDropdownOpened() {
	let delPostButton = getDeletePostButton();

	if (delPostButton === null) {
		console.log('delete: dropdown not open yet');
	} 
	else {
		console.log('delete: dropdown opened');
		step = clickDeletePost;
	}
}

function clickDeletePost() {
	console.log('delete: clicking Delete Post button');
	let deletePostButton = getDeletePostButton();
	deletePostButton.click();
	step = waitForDeleteAvailable;
}

function waitForDeleteAvailable() {
	let deleteButton = getDeleteButton();

	if (deleteButton === null) {
		console.log('delete: dialog not open yet');
	}
	else {
		console.log('delete: dialog opened');
		step = clickDelete
	}
}

function clickDelete() {
	console.log('delete: deleting the post');
	let deleteButton = getDeleteButton();
	deleteButton.click();
	step = done;
}

function done() {
	if (!isFinished) {
		isFinished = true;
		console.log('delete: done!');
		browser.runtime.sendMessage({
			to: "deleter",
			body: window.location.href
		});
	}
}

function isDeleted() {
	let elems = document.getElementsByTagName('div');

	for (let index = 0; index < elems.length; index++) {
		if (elems[index].innerHTML === 
			'This post has been removed or could not be loaded.') {
			return true;
		}
	}

	return false;
}

function getArrow() {
	let elems = document.getElementsByTagName('a');
	for (let elem of elems) {
		if (elem.getAttribute('aria-label') === 'Story options') {
			return elem;
		}
	}

	return null;
}

function getDeletePostButton() {
	let elems = document.getElementsByTagName('div');

	for (let index = 0; index < elems.length; index++) {
		if (elems[index].childNodes.length === 3 &&
			elems[index].childNodes[2].nodeValue === 'Delete Post') {
			return elems[index];
		}
	}

	return null;
}

function getDeleteButton() {
	let deleteMessage = "Delete";
	let noSoldMessage = "Haven't Sold";

	let elems = document.getElementsByClassName('uiOverlayButton');

	for (let index = 0; index < elems.length; index++) {
		if (elems[index].innerHTML === deleteMessage ||
			elems[index].innerHTML === noSoldMessage) {
			return elems[index];
		}
	}

	return null;
}
