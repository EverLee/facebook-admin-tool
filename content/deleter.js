let step = undefined;
let prevStep = undefined;
let isFinished = false;

let timeout = 120;
let tickInterval = 500;

start();

function start() {
	step = openMenu;
	doStep(0);
}

function doStep(tick) {
	if (tick > timeout && prevStep === step) {
		step = done;
		step();
		return;
	}

	if (tick % 25 === 0) {
		console.log('something is stalled... ' + tick + '/' + timeout);
	}

	if (prevStep !== step) {
		prevStep = step;
		tick = 0;
	}

	step();
	window.setTimeout(doStep, tickInterval, tick + 1);
}

function openMenu() {
	let deleteMessage = getElement('div', isDeleteMessage);
	if (deleteMessage) {
		step = done;
		return;
	}

	let arrow = getElement('a', isArrow);
	if (arrow) {
		arrow.click();
		step = clickDeletePostOption;
	}
}

function clickDeletePostOption() {
	let deletePostOption = getElement('div', isDeletePostOption);
	if (deletePostOption) {
		deletePostOption.click();
		step = clickDeleteButton;
	}
}

function clickDeleteButton() {
	let deleteButton = getElement('button', isDeleteButton);
	if (deleteButton) {
		deleteButton.click();
		step = done;
	}
}

function done() {
	// this may get called multiple times since the
	// timer is still going
	if (isFinished) {
		return;
	}

	isFinished = true;
	browser.runtime.sendMessage({
		to: "deleter",
		body: window.location.href
	});
}

function getElement(tagName, predicate) {
	let elems = document.getElementsByTagName(tagName);
	for (let elem of elems) {
		if (predicate(elem)) {
			return elem;
		}
	}

	return null;
}

function isDeleteMessage(elem) {
	let content = 'This post has been removed or could not be loaded.';
	return (elem.innerHTML === content);
}

function isArrow(elem) {
	return (elem.getAttribute('aria-label') === 'Story options');
}

function isDeletePostOption(elem) {
	return (
		elem.childNodes.length === 3 &&
		elem.childNodes[2].nodeValue &&
		elem.childNodes[2].nodeValue.toUpper() === 'DELETE POST'
	);
}

function isDeleteButton(elem) {
	let deleteMessage = "Delete";
	let noSoldMessage = "Haven't Sold";

	return (
		elem.innerHTML === deleteMessage ||
		elem.innerHTML === noSoldMessage
	);
}
