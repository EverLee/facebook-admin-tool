let timeout = 120;
let tickInterval = 500;

let steps = {
	"openMenu" : {
		stepName : "openMenu",
		className: "a",
		predicate: isArrow,
		nextStep : "clickDeletePost"
	},
	"clickDeletePost" : {
		stepName : "clickDeletePost",
		className: "div",
		predicate: isDeletePostOption,
		nextStep : "clickDelete"
	},
	"clickDelete" : {
		stepName : "clickDelete",
		className: "button",
		predicate: isDeleteButton,
		nextStep : null
	}
};

let currentStep = steps["openMenu"];
let prevStep = undefined;
let isFinished = false;

timeoutMonitor();
deletedMonitor();
doStep(0);

function timeoutMonitor() {
	if (currentStep === prevStep) {
		cleanup();
		return;
	}

	prevStep = currentStep;
	window.setTimeout(timeoutMonitor, timeout * tickInterval);
}

function deletedMonitor() {
	let deleteMessage = getElement("div", isDeleteMessage);
	if (deleteMessage) {
		cleanup();
		return;
	}

	window.setTimeout(deletedMonitor, tickInterval);
}

function doStep(tick) {
	if (currentStep === null) {
		cleanup();
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

function cleanup() {
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

function caseInsensitiveEqual(a, b) {
	if (a === b) {
		return true;
	}

	if (!a || !b) {
		return false;
	}

	return (a.toUpperCase() === b.toUpperCase());
}

function isDeleteMessage(elem) {
	let content = "This post has been removed or could not be loaded.";
	return (caseInsensitiveEqual(elem.innerHTML, content));
}

function isArrow(elem) {
	let attribute = "Story options";
	return (caseInsensitiveEqual(elem.getAttribute("aria-label"), attribute);
}

function isDeletePostOption(elem) {
	let nodeValue = "Delete Post";
	return (
		elem.childNodes.length === 3 &&
		elem.childNodes[2].nodeValue &&
		caseInsensitiveEqual(elem.childNodes[2].nodeValue, nodeValue)
	);
}

function isDeleteButton(elem) {
	let deleteMessage = "Delete";
	let noSoldMessage = "Haven't Sold";

	return (
		caseInsensitiveEqual(elem.innerHTML, deleteMessage) ||
		caseInsensitiveEqual(elem.innerHTML, noSoldMessage)
	);
}
