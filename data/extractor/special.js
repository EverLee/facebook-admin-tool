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
		isInvalidPathname(window.location.pathname) ||
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
