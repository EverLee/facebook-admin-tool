console.log('extractor: started');
if (shouldExtract())
{
	extract();
}
console.log('extractor: done');

function shouldExtract()
{
	var availability = getAvailability(window.location.search);

	if (isInvalidHost(window.location.hostname) ||
		isInvalidPath(window.location.pathname) ||
		isInvalidAvailability(availability)
		)
	{
		return false;
	}
	else
	{
		return true;
	}
}

function extract()
{
	var elems = getElementsByIds(/mall_post_\d+/i, document.body);
	var links = extractLinks(elems);
	showLinks(links);
}

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

function isInvalidPathname(path)
{
	return (path.search(/^\/groups\/\d+\/forsaleposts\/$/) === -1);
}

function isInvalidAvailability(availability)
{
	return (availability !== 'available' &&
		availability !== 'archived' &&
		availability !== 'sold');
}

function getAvailability(query)
{
	if (query[0] === '?')
	{
		query = query.slice(1);
	}

	var queryFragments = query.split('&');

	for (var i = 0; i < queryFragments.length; i++)
	{
		if (queryFragments[i].search('availability=') === 0)
		{
			return queryFragments[i].split('=')[1];
		}
	}

	return null;
}

function extractLinks(elems)
{
	var links = [];

	for (var index = 0; index < elems.length; index++)
	{
		var target = elems[index].firstChild.children[1].firstChild.firstChild;
		links.push(target.href);
	}

	return links;
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
