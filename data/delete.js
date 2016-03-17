var stepPulse;
var step = undefined;

var tick = 0;
var timeout = 120;
var last = undefined;
var monitorPulse = undefined;

//self.port.on('delete-post', start);
start();

function start()
{
	console.log('delete: starting');
	step = waitForLoad;
	stepPulse = window.setInterval(doStep, 1000);
	monitorPulse = window.setInterval(monitor, 1000);
}

function monitor()
{
	if (last === step)
	{
		tick++;

		if (tick % 5 === 0)
		{
			console.log('delete: on tick ' + tick);
		}
	}
	else
	{
		tick = 0;
	}

	if (tick > timeout)
	{
		console.log('delete: timed out on page: ' + window.location.href);
		step = done;
		tick = 0;
	}
}

function doStep()
{
	step();
}

function waitForLoad()
{
	var arrow = getArrow();

	if (isDeleted())
	{
		console.log('delete: post already deleted');
		step = done;
	}
	else if (arrow === null)
	{
		console.log('delete: page not loaded yet');
	}
	else
	{
		console.log('delete: page loaded');
		step = openDropdown;
	}
}

function openDropdown()
{
	console.log('delete: opening drop down');
	var arrow = getArrow();
	arrow.click();
	step = waitForDropdownOpened;
}

function waitForDropdownOpened()
{
	var delPostButton = getDeletePostButton();

	if (delPostButton === null)
	{
		console.log('delete: dropdown not open yet');
	} 
	else
	{
		console.log('delete: dropdown opened');
		step = clickDeletePost;
	}
}

function clickDeletePost()
{
	console.log('delete: clicking Delete Post button');
	var deletePostButton = getDeletePostButton();
	deletePostButton.click();
	step = waitForDeleteAvailable;
}

function waitForDeleteAvailable()
{
	var deleteButton = getDeleteButton();

	if (deleteButton === null)
	{
		console.log('delete: dialog not open yet');
	} 
	else
	{
		console.log('delete: dialog opened');
		step = clickDelete
	}
}

function clickDelete()
{
	console.log('delete: deleting the post');
	var deleteButton = getDeleteButton();
	deleteButton.click();
	step = done;
}

function done()
{
	console.log('delete: done!');
	window.clearInterval(stepPulse);
	window.setTimeout(function() { self.port.emit('emit'); }, 2500);
	self.port.emit('emit');
}

function isDeleted()
{
	var elems = document.getElementsByTagName('div');

	for (var index = 0; index < elems.length; index++)
	{
		if (elems[index].innerHTML === 
			'This post has been removed or could not be loaded.')
		{
			return true;
		}
	}

	return false;
}

function getArrow()
{
	try
	{
		var ancestor = document.getElementsByClassName('userContentWrapper')[0];
		var arrow = ancestor.firstChild.firstChild.firstChild.firstChild;
		return arrow;
	}
	catch (err) { }

	return null;
}

function getDeletePostButton()
{
	var elems = document.getElementsByTagName('div');

	for (var index = 0; index < elems.length; index++)
	{
		if (elems[index].childNodes.length === 3 &&
			elems[index].childNodes[2].nodeValue === 'Delete Post')
		{
			return elems[index];
		}
	}

	return null;
}

function getDeleteButton()
{
	var deleteMessage = "Delete";
	var noSoldMessage = "Haven't Sold";

	var elems = document.getElementsByClassName('uiOverlayButton');

	for (var index = 0; index < elems.length; index++)
	{
		if (elems[index].innerHTML === deleteMessage ||
			elems[index].innerHTML === noSoldMessage)
		{
			return elems[index];
		}
	}

	return null;
}
