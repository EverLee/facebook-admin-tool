var timer = require('sdk/timers');
var self = require('sdk/self');

var entry = require('sdk/panel').Panel({
	contentURL: self.data.url('prompt/prompt.html'),
	contentScriptFile: self.data.url('prompt/prompt.js'),
	position: {
		top: 50,
		bottom: 50,
		left: 100,
		right: 100
	}
});

var links;

var worker = require('./lib/worker');

var button = require("sdk/ui/button/action").ActionButton({
	id: "style-tab",
	label: "Style Tab",
	icon: "./icon-16.png",
	onClick: getLinks
});

function getLinks()
{
	entry.port.on('ok-button', gotLinks);
	entry.show();
	entry.port.emit('prep', 'Enter a list of links, one per line', '');
}

function gotLinks(gottenLinks)
{
	entry.hide();
	links = gottenLinks.split('\n');
	links = links.filter(function(link) { return (link.length > 0); });
	handleButton();
}

function handleButton()
{
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
