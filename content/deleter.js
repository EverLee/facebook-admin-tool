let timeout = 120;
let tickInterval = 500;

let steps = {
	'openMenu' : {
		stepName : 'openMenu',
		className: 'a',
		predicate: isArrow,
		nextStep : 'clickDeletePost'
	},
	'clickDeletePost' : {
		stepName : 'clickDeletePost',
		className: 'div',
		predicate: isDeletePostOption,
		nextStep : 'clickDelete'
	},
	'clickDelete' : {
		stepName : 'clickDelete',
		className: 'button',
		predicate: isDeleteButton,
		nextStep : null
	}
};

let currentStep = steps['openMenu'];
let prevStep = undefined;
let isFinished = false;

timeoutMonitor();
deletedMonitor();
doStep(0);

function timeoutMonitor() {
	if (step === prevStep) {
		done(); // give up
		return;
	}

	prevStep = step;
	window.setTimeout(timeoutMonitor, timeout * tickInterval);
}

function deletedMonitor() {
	let deleteMessage = getElement('div', isDeleteMessage);
	if (deleteMessage) {
		done();
		return;
	}

	window.setTimeout(deletedMonitor, tickInterval);
}

function doStep(tick) {
	if (currentStep === null) {
		done();
		return;
	}

	if (tick % 25 === 0 && tick > 0) {
		console.log(`${currentStep.stepName} has used ${tick} ticks`);
	}

	let element = getElement(currentStep.className, currentStep.predicate)
	if (element) {
		element.click();
		currentStep = steps[currentStep.nextStep];
		tick = 0;
	}

	window.setTimeout(doStep, tickInterval, tick + 1);
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
