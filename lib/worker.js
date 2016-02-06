var tabs = require('sdk/tabs');

exports.open = open;

function open(scriptFile, loadedCallback, progressCallback, doneCallback)
{
	return new Worker(scriptFile, loadedCallback, progressCallback, doneCallback);
}

function Worker(scriptFile, loadedCallback, progressCallback, doneCallback)
{
	console.log('worker: constructing');

	this.id = id;
	this.tab = undefined;
	this.worker = undefined;
	this.scriptFile = scriptFile;
	this.loadedCallback = loadedCallback;
	this.progressCallback = progressCallback;
	this.doneCallback = doneCallback;

	tabs.open({
		url: 'about:blank',
		onOpen: this.register
	});

	this.register = function(tab)
	{
		console.log('worker: registering');
		this.tab = tab;
		this.tab.on('ready', this.reattach);
	};

	this.reattach = function(w)
	{
		console.log('worker: getting worker');
		this.tab.removeListener('ready', this.getWorker);
		this.tab.on('ready', this.reattach);

		this.worker = w.attach({
			contentScriptFile: script
		});

		if (this.loadedCallback)
		{
			worker.port.on('loaded', this.loadedCallback);
		}
		if (this.progressCallback)
		{
			worker.port.on('progress', this.progressCallback);
		}
		if (this.doneCallback)
		{
			worker.port.on('done', this.doneCallback);
		}
	};

	this.isReady = function()
	{
		return (worker != undefined && tab != undefined);
	};

	this.setUrl = function(url)
	{
		console.log('worker: setting url');
		this.tab.url = url;
	};
}
