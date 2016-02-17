var timer = require('sdk/timers');
var self = require('sdk/self');
var worker = require('./lib/worker');

var links;

var button = require("sdk/ui/button/action").ActionButton({
	id: "style-tab",
	label: "Style Tab",
	icon: "./icon-16.png",
	onClick: getLinks
});

var entry = require('sdk/panel').Panel({
	contentURL: self.data.url('prompt/prompt.html'),
	position: {
		top: 50,
		bottom: 50,
		left: 100,
		right: 100
	}
});

var menu = require('sdk/panel').Panel({
	contentURL: self.data.url('menu/menu.html'),
	position: button
});

entry.port.on('ok-button', handleLinks);
menu.port.on('menu-delete', handleDelete);
menu.port.on('menu-sold', handleSold);
menu.port.on('menu-archived', handleArchived);

function handleDelete()
{
	console.log('Handling delete');
}

function handleSold()
{
	console.log('Handling sold');
}

function handleArchived()
{
	console.log('Handling archived');
}

function getLinks()
{
	entry.show();
	entry.port.emit('prep', 'Enter a list of links, one per line', '');
}

function handleLinks(gottenLinks)
{
	entry.hide();
	links = gottenLinks.split('\n');
	links = links.filter(function(link) { return (link.length > 0); });

	console.log('Starting deleting');

	worker.init(self.data.url('delete.js'), deletePost);
	timer.setTimeout(tryStart, 1000);
}

function tryStart()
{
	if (worker.isReady())
	{
		deletePost();
	}
	else
	{
		console.log('Waiting for worker to get ready');
		timer.setTimeout(tryStart, 1000);
	}
}

function deletePost()
{
	if (links.length > 0)
	{
		console.log('Deleting post: ' + links.length + ' remaining');
		worker.setUrl(links.pop());
	}
	else
	{
		console.log('Out of links');
	}
}
