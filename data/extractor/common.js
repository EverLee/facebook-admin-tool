

function showLinks(links)
{
	var child = document.body.firstChild;
	while (child)
	{
		document.body.removeChild(child);
		child = document.body.firstChild;
	}

	var text = document.createElement('textarea');
	text.value = links.join('\n');
	text.rows = 25;
	text.cols = 75;
	document.body.appendChild(text);
}

function isInvalidHost(host)
{
	return (host !== 'facebook.com' && host !== 'www.facebook.com');
}

function getElementsByIds(pattern, root)
{
	var result = [];
	var toProcess = [];

	toProcess.push(root);

	while (toProcess.length > 0)
	{
		var elem = toProcess.pop();
		if (elem.id.search(pattern) >= 0)
		{
			result.push(elem);
		}
		for (var index = 0; index < elem.children.length; index++)
		{
			toProcess.push(elem.children[index]);
		}
	}

	return result;
}
