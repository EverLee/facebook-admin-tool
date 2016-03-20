var timer = require('sdk/timers');
var self = require('sdk/self');
var tabs = require('sdk/tabs');
var url = require('sdk/url');
var worker = require('./lib/worker');

var links;

var button = require("sdk/ui/button/action").ActionButton({
	id: "style-tab",
	label: "Song's Facebook Admin Tool",
	icon: "./icon-16.png",
	onClick: showMenu
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
menu.port.on('menu-extract', handleExtract);

function handleDelete()
{
	hideMenu();
	getLinks();
}

function handleExtract()
{
	hideMenu();
	tabs.activeTab.attach({
		contentScriptFile: self.data.url('extractor.js')
	});
}

function getLinks()
{
	entry.show();
	entry.port.emit('prep', 'Enter a list of links, one per line', '');
}

function showMenu()
{
	menu.show();
}

function hideMenu()
{
	menu.hide();
}

function handleLinks(gottenLinks)
{
	entry.hide();
	links = gottenLinks.split('\n');
	links = links.filter(isPermalink);

	if (links.length > 0)
	{
		console.log('Starting deleting');

		worker.init(self.data.url('delete.js'), deletePost);
		timer.setTimeout(tryStart, 1000);
	}
	else
	{
		console.log('No links passed the filter.');
	}
}

function isPermalink(href)
{
	try
	{
		var link = url.URL(href);
		var protocolPattern = /^https:$/;
		var hostPattern = /^www\.facebook\.com$/;
		var pathPattern = /^\/groups\/\d+\/permalink\/\d+\/$/;
		var queryPattern = /^$/;

		if (protocolPattern.test(link.protocol) === false)
		{
			return false;
		}
		if (hostPattern.test(link.host) === false)
		{
			return false;
		}
		if (pathPattern.test(link.pathname) === false)
		{
			return false;
		}
		if (queryPattern.test(link.search) === false)
		{
			return false;
		}
		return true;
	}
	catch (exc)
	{
		return false;
	}
	console.log('impossible fail');
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
