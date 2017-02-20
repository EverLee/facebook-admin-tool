let permalinks = [];
browser.browserAction.onClicked.addListener(handleButton);
browser.runtime.onInstalled.addListener(onUpdated);

function handleButton() {
	if (permalinks.length > 0) {
		permalinks = [];
		cancelDelete();
	}
	else {
		extractPosts();
	}
}

function onUpdated(details) {
	if (details.reason !== "update") {
		return;
	}

	let creating = browser.tabs.create({ url: "/pages/changelog.html" });
	creating.then(function(){}, function(reason){ console.log(reason); });
}
