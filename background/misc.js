let permalinks = [];
browser.browserAction.onClicked.addListener(handleButton);

function handleButton() {
	if (permalinks.length > 0) {
		cancelDelete();
	}
	else {
		extractPosts();
	}
}
