var fetchPulse = window.setInterval(fetch, 1000);

function terminate()
{
	console.log('fetch: terminating');
	window.clearInterval(fetchPulse);
}

function fetch()
{
	try
	{
		// Reports suggest things go weird when you load too many posts in
		// a single page, so we want to detach any posts we're done with to
		// see if that prevents the weirdness. A backup of elems is preserved
		// so that ALL of the posts (even the skipped ones) can be detached
		// even though elems is filtered to ignore some posts we don't
		// want to delete.
		var elems = getElementsByIds(/mall_post_\d+/i, document.body);
		var backup = elems;

		if (elems.length > 0)
		{
			console.log('fetch: filtering elements');
			elems = elems.filter(isSoldPost);
			console.log(elems.length + ' elements remain');
			console.log('fetch: extracting links');
			var links = extractLinks(elems);
			console.log('fetch: detaching elements');
			detachElements(backup);
			console.log('fetch: posting links');
			postLinks(links);
		}

		triggerLoad();
	}
	catch (e)
	{
		// If the timer isn't terminated, it will just keep calling
		// this function again and spam the logs with duplicate crashes.
		// One crash per bug is plenty, thank you.
		terminate();
		throw e;
	}
}

function triggerLoad()
{
	window.scrollBy(0, 100);
	window.scrollBy(0, -100);
}

function postLinks(links)
{
	for (var index = 0; index < links.length; index++)
	{
		console.log('fetch: posting link: ' + links[index]);
		self.port.emit('post-link', links[index]);
	}
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

function isSoldPost(elem)
{
	try
	{
		var target = elem.firstChild.children[1].firstChild.firstChild.firstChild.firstChild;
		if (target.innerHTML === '(SOLD)')
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	catch (exc)
	{
		return false;
	}
}

function detachElements(elems)
{
	for (var index = 0; index < elems.length; index++)
	{
		elems[index].parentNode.removeChild(elems[index]);
	}
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
