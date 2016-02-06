var	self = require("sdk/self"),
	url = require('sdk/url'),
	timer = require('sdk/timers'),
	pageWorker = require("sdk/page-worker");

exports.beginExtraction = begin;
exports.isDone = isDone;
exports.linkAvailable = linkAvailable;
exports.getLink = getLink;

var 	worker,
	links = [],
	done = false,
	tick = 0, // in seconds
	timeout = 30, // in seconds
	monitorPulse;

function begin(groupId)
{
	console.log('link-extractor: starting');

	var pageUrl = 'https://www.facebook.com/groups/' + groupId + '/forsaleposts/?&availability=sold';
	worker = pageWorker.Page({
		contentURL: pageUrl,
		contentScriptFile: self.data.url('fetch.js')
	});

	worker.port.on('post-link', handleUrl);
	monitorPulse = timer.setInterval(monitor, 1000);
}

function monitor()
{
	tick++;
	if (tick > timeout)
	{
		finalize();
	}
}

function finalize()
{
	console.log('link-extractor: done');
	done = true;
	worker.destroy();
	worker = undefined;
	timer.clearInterval(monitorPulse);
	monitorPulse = undefined;
}

function isDone()
{
	if (linkAvailable())
	{
		return false;
	}
	else
	{
		return done;
	}
}

function linkAvailable()
{
	return (links.length > 0);
}

function handleUrl(href)
{
	// tick is reset whether the link is a permalink or not since otherwise
	// a bunch of non-permalinks could trigger a premature termination.
	tick = 0;
	if (isPermalinkUrl(href))
	{
		console.log('link-extractor: pushing link');
		links.push(href);
	}
}

function getLink()
{
	return links.pop();
}

function isPermalinkUrl(href)
{
	var pathPattern = /^\/groups\/\d+\/permalink\/\d+\/?$/i;
	var path = url.URL(href).pathname;
	if (path.search(pathPattern) === -1)
	{
		return false;
	}
	else
	{
		return true;
	}
}
