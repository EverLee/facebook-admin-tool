var tabs = require("sdk/tabs");
var url = require('sdk/url');
var timer = require('sdk/timers');
var self = require('sdk/self');

var links = require('./lib/links').links;

var worker = require('./lib/worker');
var w;

var	pulse;

var button = require("sdk/ui/button/action").ActionButton({
	id: "style-tab",
	label: "Style Tab",
	icon: "./icon-16.png",
	onClick: handleButton
});

function handleButton()
{
	//var groupId = extractGroupId(tabs.activeTab.url);

	//if(groupId !== '')
	//{
	//	console.log('index: handling button');
	//	linkExtractor.beginExtraction(groupId);
		console.log('Starting pulse');
		w = worker.open(self.data.url('delete.js'), loaded, progress, done);
		//timer.setTimeout(tryStart, 1000);
	//}
}

function loaded()
{
	w.set
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

function getPost()
{
	if (linkExtractor.linkAvailable())
	{
		console.log('index: pushed link');
		links.push(linkExtractor.getLink());
	}
	else if (linkExtractor.isDone())
	{
		console.log('index: extraction done');
		timer.clearInterval(pulse);
		displayLinks();
	}
}

function extractGroupId(href)
{
	var hostPattern = /^(www\.)?facebook\.com$/i;
	var pathPattern = /^\/groups\/(\d+)\/$/i;

	href = url.URL(href);

	var host = href.host;
	var path = href.pathname;
	
	if (!host || !path)
	{
		console.log('index: missing URL piece; assuming wrong page');
		return '';
	}

	if (host.search(hostPattern) >= 0 &&
		path.search(pathPattern) >= 0)
	{
		var match = pathPattern.exec(path);
		console.log('index: extracted group id: ' + match[1]);
		return match[1];
	}
	else
	{
		console.log('index: not on forsaleposts page');
		return '';
	}
}
